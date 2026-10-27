import type { EvidenceUnit, QuestionAnalysis, SubQuestion } from '../src/types/cognitive';
import { runIndependentSpecialists } from '../src/engine/runIndependentSpecialists';
import { createGeminiSpecialistExecutor } from './geminiSpecialist';

/**
 * Server-side entry point. It deliberately does not expose an unauthenticated
 * public HTTP route. An authenticated transport may call this function later.
 * Inputs are supplied by a trusted server workflow, not accepted as verified
 * facts merely because a caller labels them Verified.
 */
export interface SpecialistRunRequest {
  question: string;
  analysis: QuestionAnalysis;
  subquestions: SubQuestion[];
  evidence: EvidenceUnit[];
  assignments: { specialistId: string; axis: string }[];
}
export async function runServerSpecialists(
  request: SpecialistRunRequest,
  options: { apiKey: string; model?: string; fetchImpl?: typeof fetch }
) {
  if (!request.question.trim() || request.question.length > 8000) throw new Error('Invalid question length');
  if (request.assignments.length < 1 || request.assignments.length > 8) throw new Error('Invalid specialist count');
  if (request.evidence.length > 100 || request.subquestions.length > 50)
    throw new Error('Input exceeds bounded execution limits');
  if (request.assignments.some(a => !a.specialistId.trim() || !a.axis.trim()))
    throw new Error('Invalid specialist assignment');
  const known = new Set(request.evidence.map(e => e.id));
  if (known.size !== request.evidence.length || known.has('')) throw new Error('Evidence IDs must be unique and nonempty');
  const execute = createGeminiSpecialistExecutor(options);
  const output = await runIndependentSpecialists(
    request.question, request.analysis, request.subquestions, request.evidence,
    request.assignments.map(({ specialistId, axis }) => ({ specialistId, axis, execute }))
  );
  // No synthesis or convergence is claimed here: incomplete specialist runs
  // remain explicitly incomplete for the later integration stage.
  return { ...output, complete: output.failures.length === 0 && output.results.length === request.assignments.length };
}
