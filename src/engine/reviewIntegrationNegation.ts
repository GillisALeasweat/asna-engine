import type { DialecticalIntegration, EvidenceUnit, NegationHierarchyLevel } from '../types/cognitive';
import type { IntegrationDraft } from './draftDialecticalIntegration';

/**
 * Reviewer-supplied integration negation record. This checks traceability and
 * completion; it does not perform inference, verify evidence, or award S/A/B/C.
 */
export interface IntegrationNegationFinding {
  level: NegationHierarchyLevel;
  issue: string;
  evidenceIds: string[];
  disposition: 'survived' | 'unresolved' | 'revised';
  rationale: string;
}
export interface IntegrationNegationReview {
  findings: IntegrationNegationFinding[];
  remainingCaveats: string[];
}
export interface NegatedIntegrationHandoff {
  eligibleForConvergenceReview: boolean;
  integration: DialecticalIntegration | null;
  unresolvedIssues: string[];
  findings: IntegrationNegationFinding[];
  caveats: string[];
}
export function reviewIntegrationNegation(
  draft: IntegrationDraft,
  review: IntegrationNegationReview,
  evidence: EvidenceUnit[]
): NegatedIntegrationHandoff {
  const ids = new Set(evidence.map(e => e.id));
  if (ids.size !== evidence.length || ids.has('')) throw new Error('Evidence IDs must be unique and nonempty');
  for (const f of review.findings) {
    if (!f.issue.trim() || !f.rationale.trim()) throw new Error('Negation requires an issue and rationale');
    if (f.evidenceIds.some(id => !ids.has(id))) throw new Error('Negation references unknown evidence');
  }
  const unresolvedIssues = [
    ...draft.unresolvedConflicts.map(c => c.claimA + ' <> ' + c.claimB + ': conflict attribution unresolved'),
    ...draft.unresolvedBySpecialist.flatMap(s => s.issues.map(issue => s.specialistId + ': ' + issue)),
    ...review.findings.filter(f => f.disposition === 'unresolved').map(f => f.issue),
    ...review.remainingCaveats
  ];
  const eligibleForConvergenceReview = draft.status === 'review_required' &&
    !!draft.synthesisHypothesis && draft.missingCognitiveAxes.length === 0 &&
    draft.unresolvedConflicts.length === 0 && unresolvedIssues.length === 0 &&
    review.findings.length > 0;
  const caveats = [
    ...draft.caveats,
    'Negation dispositions are reviewer-supplied, not proof of truth or source authentication.',
    ...(eligibleForConvergenceReview ? [] : ['Convergence review is blocked until integration and negation gaps are resolved.'])
  ];
  const integration: DialecticalIntegration | null = eligibleForConvergenceReview ? {
    consensusTheses: [...draft.consensusTheses],
    antitheses: structuredClone(draft.antitheses),
    synthesisHypothesis: draft.synthesisHypothesis!,
    integrationNegationResult: {
      testedVulnerabilities: review.findings.map(f => f.issue),
      survivedCounterevidence: review.findings.every(f => f.disposition === 'survived'),
      remainingCaveats: [...review.remainingCaveats]
    },
    missingCognitiveAxes: [...draft.missingCognitiveAxes]
  } : null;
  return { eligibleForConvergenceReview, integration, unresolvedIssues,
    findings: structuredClone(review.findings), caveats };
}
