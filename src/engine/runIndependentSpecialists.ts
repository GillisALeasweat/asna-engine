import type { EvidenceUnit, QuestionAnalysis, SpecialistResult, SubQuestion } from '../types/cognitive';

/**
 * The orchestrator supplies only immutable task-specific inputs to each specialist.
 * Specialist outputs are withheld from peers until all calls settle. This is
 * application-level isolation, not a claim of physical memory isolation.
 */
export interface SpecialistTask {
  specialistId: string;
  axis: string;
  question: string;
  analysis: QuestionAnalysis;
  subquestion: SubQuestion;
  evidence: EvidenceUnit[];
}
export type SpecialistExecutor = (task: Readonly<SpecialistTask>) => Promise<SpecialistResult>;
export interface SpecialistFailure { specialistId: string; reason: string }
export interface ParallelSpecialistOutput {
  results: SpecialistResult[];
  failures: SpecialistFailure[];
}
export async function runIndependentSpecialists(
  question: string,
  analysis: QuestionAnalysis,
  subquestions: SubQuestion[],
  evidence: EvidenceUnit[],
  executors: ReadonlyArray<{ specialistId: string; axis: string; execute: SpecialistExecutor }>
): Promise<ParallelSpecialistOutput> {
  const ids = new Set<string>();
  for (const executor of executors) {
    if (!executor.specialistId || ids.has(executor.specialistId)) throw new Error('Specialist IDs must be unique and nonempty');
    ids.add(executor.specialistId);
  }
  const tasks = executors.map(executor => {
    const subquestion = subquestions.find(s => s.assignedSpecialists.includes(executor.specialistId));
    if (!subquestion) throw new Error('No assigned subquestion for ' + executor.specialistId);
    const task: SpecialistTask = {
      specialistId: executor.specialistId,
      axis: executor.axis,
      question,
      analysis: structuredClone(analysis),
      subquestion: structuredClone(subquestion),
      evidence: structuredClone(evidence)
    };
    return { executor, task };
  });
  const settled = await Promise.allSettled(tasks.map(async ({ executor, task }) => {
    const result = await executor.execute(task);
    if (result.specialistId !== executor.specialistId ||
        result.axis !== executor.axis ||
        result.subquestionId !== task.subquestion.id)
      throw new Error('Specialist result identity mismatch');
    return result;
  }));
  const results: SpecialistResult[] = [];
  const failures: SpecialistFailure[] = [];
  settled.forEach((entry, i) => {
    if (entry.status === 'fulfilled') results.push(entry.value);
    else failures.push({
      specialistId: tasks[i].executor.specialistId,
      reason: entry.reason instanceof Error ? entry.reason.message : String(entry.reason)
    });
  });
  return { results, failures };
}
