import type { SpecialistResult } from '../types/cognitive';
import type { ParallelSpecialistOutput } from './runIndependentSpecialists';

/**
 * Integration handoff, NOT synthesis or a convergence assessment.
 * Preserve independent outputs, failures, dissent and unresolved issues.
 */
export interface IntegrationHandoff {
  readyForCompleteIntegration: boolean;
  expectedSpecialistIds: string[];
  received: SpecialistResult[];
  missingSpecialistIds: string[];
  failures: ParallelSpecialistOutput['failures'];
  unresolvedBySpecialist: { specialistId: string; issues: string[] }[];
  counterevidenceBySpecialist: { specialistId: string; evidenceIds: string[] }[];
  alternativesBySpecialist: { specialistId: string; explanations: string[] }[];
  negationBySpecialist: { specialistId: string; findings: SpecialistResult['negationFindings'] }[];
  convergenceClaimsBySpecialist: { specialistId: string; classification: SpecialistResult['convergence'] }[];
  caveats: string[];
}
export function prepareIntegrationHandoff(
  expectedSpecialistIds: string[],
  output: ParallelSpecialistOutput
): IntegrationHandoff {
  const expected = new Set(expectedSpecialistIds);
  if (!expected.size || expected.size !== expectedSpecialistIds.length || expected.has(''))
    throw new Error('Expected specialist IDs must be unique and nonempty');
  const received = new Set<string>();
  for (const result of output.results) {
    if (!expected.has(result.specialistId) || received.has(result.specialistId))
      throw new Error('Unexpected or duplicate specialist output');
    received.add(result.specialistId);
  }
  for (const failure of output.failures)
    if (!expected.has(failure.specialistId) || received.has(failure.specialistId))
      throw new Error('Invalid specialist failure record');
  const missingSpecialistIds = expectedSpecialistIds.filter(id => !received.has(id));
  const caveats = [
    'This handoff preserves specialist claims; it does not validate source authenticity, synthesize a conclusion, or assign convergence.'
  ];
  if (missingSpecialistIds.length) caveats.push('Incomplete specialist coverage: ' + missingSpecialistIds.join(', '));
  if (output.failures.length) caveats.push('Execution failures are retained and must not be treated as agreement.');
  return {
    readyForCompleteIntegration: missingSpecialistIds.length === 0 && output.failures.length === 0,
    expectedSpecialistIds: [...expectedSpecialistIds],
    received: structuredClone(output.results),
    missingSpecialistIds,
    failures: structuredClone(output.failures),
    unresolvedBySpecialist: output.results.map(s => ({ specialistId: s.specialistId, issues: [...s.unresolvedIssues] })),
    counterevidenceBySpecialist: output.results.map(s => ({ specialistId: s.specialistId, evidenceIds: [...s.counterevidenceIds] })),
    alternativesBySpecialist: output.results.map(s => ({ specialistId: s.specialistId, explanations: [...s.alternativeExplanations] })),
    negationBySpecialist: output.results.map(s => ({ specialistId: s.specialistId, findings: structuredClone(s.negationFindings) })),
    convergenceClaimsBySpecialist: output.results.map(s => ({ specialistId: s.specialistId, classification: s.convergence })),
    caveats
  };
}
