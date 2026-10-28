import assert from 'node:assert/strict';
import { assessConvergence } from '../src/engine/assessConvergence';
import type { NegatedIntegrationHandoff } from '../src/engine/reviewIntegrationNegation';

const handoff: NegatedIntegrationHandoff = {
  eligibleForConvergenceReview: true,
  integration: {
    consensusTheses: [], antitheses: [], synthesisHypothesis: 'Test synthesis',
    integrationNegationResult: { testedVulnerabilities: ['test'], survivedCounterevidence: true, remainingCaveats: [] },
    missingCognitiveAxes: []
  },
  unresolvedIssues: [], findings: [], caveats: []
};
const review = {
  proposedState: 'B' as const,
  justification: 'Reviewer explains the scope of the structural assessment',
  criteriaChecked: [{ criterion: 'Scope documented', passed: true, note: 'Reviewed explicitly' }],
  evidenceStrengthScore: 0.3,
  loopbackRecommended: false
};
const accepted = assessConvergence(handoff, review);
assert.equal(accepted.assessment?.state, 'B');
assert.equal(accepted.assessment?.evidenceStrengthScore, 0.3);
assert.equal(assessConvergence({ ...handoff, eligibleForConvergenceReview: false }, review).assessment, null);
assert.equal(assessConvergence(handoff, {
  ...review, criteriaChecked: [{ criterion: 'Coverage', passed: false, note: 'Gap' }]
}).assessment, null);
const loopback = assessConvergence(handoff, {
  ...review, proposedState: 'Reject' as const,
  criteriaChecked: [{ criterion: 'Coverage', passed: false, note: 'Gap' }],
  loopbackRecommended: true, loopbackTargetStage: 'Evidence Gathering' as const,
  loopbackReason: 'Resolve the evidence gap'
});
assert.equal(loopback.assessment?.state, 'Reject');
assert.equal(loopback.assessment?.loopbackTargetStage, 'Evidence Gathering');
assert.equal(assessConvergence(handoff, { ...review, evidenceStrengthScore: 2 }).assessment, null);
console.log('Nonordinal convergence assessment tests passed');
