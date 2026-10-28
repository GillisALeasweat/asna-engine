import type { ConvergenceAssessment, ConvergenceLevel } from '../types/cognitive';
import type { NegatedIntegrationHandoff } from './reviewIntegrationNegation';

/**
 * A traceable reviewer decision, not an automatic rank, truth test, or
 * conversion from specialist votes. The caller must document each criterion.
 */
export interface ConvergenceReview {
  proposedState: ConvergenceLevel;
  justification: string;
  criteriaChecked: ConvergenceAssessment['criteriaChecked'];
  evidenceStrengthScore: number;
  loopbackRecommended: boolean;
  loopbackTargetStage?: ConvergenceAssessment['loopbackTargetStage'];
  loopbackReason?: string;
}
export interface ConvergenceDecision {
  assessment: ConvergenceAssessment | null;
  blockedReasons: string[];
  caveats: string[];
}
export function assessConvergence(
  handoff: NegatedIntegrationHandoff,
  review: ConvergenceReview
): ConvergenceDecision {
  const blockedReasons: string[] = [];
  if (!handoff.eligibleForConvergenceReview || !handoff.integration)
    blockedReasons.push('Integration negation handoff is not eligible for convergence review');
  if (!review.justification.trim()) blockedReasons.push('A written justification is required');
  if (!review.criteriaChecked.length || review.criteriaChecked.some(c => !c.criterion.trim() || !c.note.trim()))
    blockedReasons.push('Each criterion requires an explicit description and note');
  if (!Number.isFinite(review.evidenceStrengthScore) || review.evidenceStrengthScore < 0 || review.evidenceStrengthScore > 1)
    blockedReasons.push('Evidence strength must be a bounded reviewer-supplied number');
  if (review.loopbackRecommended && (!review.loopbackTargetStage || !review.loopbackReason?.trim()))
    blockedReasons.push('A loopback requires a target stage and reason');
  if (!review.loopbackRecommended && (review.loopbackTargetStage || review.loopbackReason))
    blockedReasons.push('Loopback details require loopbackRecommended');
  // S/A/B/C/Reject are categories. A failed criterion must be discussed, not
  // silently transformed into a lower category or a Reject decision.
  if (review.criteriaChecked.some(c => !c.passed) && !review.loopbackRecommended)
    blockedReasons.push('Failed criteria require an explicit loopback review');
  const caveats = [
    ...handoff.caveats,
    'Convergence is a reviewer-attributed classification, not truth, confidence, a quality rank, or a specialist vote.',
    'Evidence strength is reported separately and does not calculate the convergence category.'
  ];
  if (blockedReasons.length) return { assessment: null, blockedReasons, caveats };
  return {
    assessment: {
      state: review.proposedState,
      justification: review.justification.trim(),
      criteriaChecked: structuredClone(review.criteriaChecked),
      unresolvedCount: handoff.unresolvedIssues.length,
      evidenceStrengthScore: review.evidenceStrengthScore,
      loopbackRecommended: review.loopbackRecommended,
      ...(review.loopbackRecommended ? {
        loopbackTargetStage: review.loopbackTargetStage,
        loopbackReason: review.loopbackReason!.trim()
      } : {})
    },
    blockedReasons, caveats
  };
}
