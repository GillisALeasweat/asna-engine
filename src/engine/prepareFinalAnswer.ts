import type { EvidenceUnit, FinalAnswerOutput } from '../types/cognitive';
import type { ConvergenceDecision } from './assessConvergence';
import type { NegatedIntegrationHandoff } from './reviewIntegrationNegation';

/** Validates a reviewer-authored final answer; it never generates claims. */
export interface FinalAnswerHandoff {
  ready: boolean;
  answer: FinalAnswerOutput | null;
  blockedReasons: string[];
  caveats: string[];
}
export function prepareFinalAnswer(
  decision: ConvergenceDecision,
  negation: NegatedIntegrationHandoff,
  evidence: EvidenceUnit[],
  candidate: FinalAnswerOutput
): FinalAnswerHandoff {
  const blockedReasons = [...decision.blockedReasons];
  const assessment = decision.assessment;
  if (!assessment || !negation.eligibleForConvergenceReview || !negation.integration)
    blockedReasons.push('A valid integration and convergence review are required');
  if (assessment?.loopbackRecommended)
    blockedReasons.push('Loopback must be resolved before final answer publication');
  if (!candidate.summary.trim() || !candidate.detailedAnalysis.trim())
    blockedReasons.push('Final answer requires a summary and detailed analysis');
  const known = new Set(evidence.map(e => e.id));
  if (known.size !== evidence.length || known.has(''))
    blockedReasons.push('Evidence IDs must be unique and nonempty');
  if (!candidate.provenanceTrace.length)
    blockedReasons.push('Final answer requires at least one provenance trace');
  for (const trace of candidate.provenanceTrace) {
    if (!trace.claim.trim() || !trace.inferencePath.trim() || !trace.sourceIds.length)
      blockedReasons.push('Each claim needs an inference path and evidence references');
    if (trace.sourceIds.some(id => !known.has(id)))
      blockedReasons.push('Final answer cites an unknown evidence ID');
  }
  if (assessment?.state === 'Reject' && candidate.strategy !== 'Principled Refusal')
    blockedReasons.push('Reject requires an explicitly documented refusal strategy');
  if (candidate.strategy === 'Definitive Conclusion' &&
    (assessment?.unresolvedCount !== 0 || negation.findings.some(f => f.disposition !== 'survived')))
    blockedReasons.push('Definitive conclusion cannot suppress unresolved or revised negation');
  if (!candidate.epistemicCaveats.length)
    blockedReasons.push('Epistemic caveats must explicitly document remaining limits');
  const caveats = [
    ...decision.caveats, ...negation.caveats,
    'Provenance links are structurally checked; source authenticity and claim entailment are not established by this module.'
  ];
  return {
    ready: blockedReasons.length === 0,
    answer: blockedReasons.length ? null : structuredClone(candidate),
    blockedReasons, caveats
  };
}
