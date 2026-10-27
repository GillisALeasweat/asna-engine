import type { DialecticalIntegration, SpecialistResult } from '../types/cognitive';
import type { IntegrationHandoff } from './prepareIntegrationHandoff';

/**
 * A conservative integration draft. Agreement/conflict is never inferred from
 * textual similarity, majority vote or convergence labels. A separate reviewer
 * must supply explicitly attributed propositions and conflict assessments.
 */
export interface IntegrationReview {
  agreements: { thesis: string; supportingSpecialistIds: string[] }[];
  conflicts: {
    specialistA: string; claimA: string; specialistB: string; claimB: string;
    rootCause?: DialecticalIntegration['antitheses'][number]['rootCause'];
    rationale?: string;
  }[];
  synthesisHypothesis?: string;
}
export interface IntegrationDraft {
  status: 'incomplete' | 'review_required';
  consensusTheses: string[];
  antitheses: DialecticalIntegration['antitheses'];
  unresolvedConflicts: IntegrationReview['conflicts'];
  unresolvedBySpecialist: IntegrationHandoff['unresolvedBySpecialist'];
  missingCognitiveAxes: string[];
  synthesisHypothesis: string | null;
  caveats: string[];
}
export function draftDialecticalIntegration(handoff: IntegrationHandoff, review: IntegrationReview): IntegrationDraft {
  const specialists = new Map<string, SpecialistResult>(handoff.received.map(s => [s.specialistId, s]));
  const valid = (id: string) => specialists.has(id);
  for (const agreement of review.agreements) {
    if (!agreement.thesis.trim() || agreement.supportingSpecialistIds.length < 2 ||
      new Set(agreement.supportingSpecialistIds).size !== agreement.supportingSpecialistIds.length ||
      agreement.supportingSpecialistIds.some(id => !valid(id)))
      throw new Error('Agreement needs two distinct received specialists and a thesis');
  }
  for (const conflict of review.conflicts) {
    if (!valid(conflict.specialistA) || !valid(conflict.specialistB) ||
      conflict.specialistA === conflict.specialistB || !conflict.claimA.trim() || !conflict.claimB.trim())
      throw new Error('Conflict requires two distinct received specialists and explicit claims');
    if (conflict.rootCause && (!conflict.rationale || !conflict.rationale.trim()))
      throw new Error('Conflict root cause requires a documented rationale');
  }
  if (review.synthesisHypothesis?.trim() && (!handoff.readyForCompleteIntegration || review.conflicts.some(c => !c.rootCause)))
    throw new Error('Synthesis is blocked while coverage or conflict attribution is incomplete');
  const antitheses = review.conflicts.filter(c => c.rootCause).map(c => ({
    conflictAxis: c.rationale!.trim(),
    specialistA: c.specialistA, claimA: c.claimA,
    specialistB: c.specialistB, claimB: c.claimB,
    rootCause: c.rootCause!
  }));
  const unresolvedConflicts = review.conflicts.filter(c => !c.rootCause);
  return {
    status: handoff.readyForCompleteIntegration ? 'review_required' : 'incomplete',
    consensusTheses: review.agreements.map(a => a.thesis),
    antitheses, unresolvedConflicts,
    unresolvedBySpecialist: structuredClone(handoff.unresolvedBySpecialist),
    missingCognitiveAxes: [...handoff.missingSpecialistIds],
    synthesisHypothesis: review.synthesisHypothesis?.trim() || null,
    caveats: [
      ...handoff.caveats,
      'Agreement and conflict assessments are reviewer-supplied claims, not automatically verified facts.',
      ...(unresolvedConflicts.length ? ['Some conflict causes remain unattributed; do not force reconciliation.'] : [])
    ]
  };
}
