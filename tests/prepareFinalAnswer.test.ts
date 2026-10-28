import assert from 'node:assert/strict';
import { PRESET_SCENARIOS } from '../src/data/presetScenarios';
import { prepareFinalAnswer } from '../src/engine/prepareFinalAnswer';
import type { ConvergenceDecision } from '../src/engine/assessConvergence';
import type { NegatedIntegrationHandoff } from '../src/engine/reviewIntegrationNegation';
const preset = PRESET_SCENARIOS[0];
const evidenceId = preset.evidences[0].id;
const negation: NegatedIntegrationHandoff = {
  eligibleForConvergenceReview: true, integration: preset.integration,
  unresolvedIssues: [], findings: [], caveats: []
};
const decision: ConvergenceDecision = {
  assessment: { ...preset.convergence, state: 'B', unresolvedCount: 0, loopbackRecommended: false,
    loopbackTargetStage: undefined, loopbackReason: undefined },
  blockedReasons: [], caveats: []
};
const answer = {
  ...preset.answer, strategy: 'Conditional Synthesis' as const,
  summary: 'Conditional result', detailedAnalysis: 'Evidence and assumptions discussed',
  provenanceTrace: [{ claim: 'Test claim', sourceIds: [evidenceId], inferencePath: 'Reviewer-authored inference' }],
  epistemicCaveats: ['Structural checks do not establish truth']
};
assert.equal(prepareFinalAnswer(decision, negation, preset.evidences, answer).ready, true);
assert.equal(prepareFinalAnswer({ ...decision, assessment: { ...decision.assessment!, loopbackRecommended: true,
  loopbackTargetStage: 'Evidence Gathering', loopbackReason: 'Missing evidence' } },
  negation, preset.evidences, answer).ready, false);
assert.equal(prepareFinalAnswer(decision, negation, preset.evidences, {
  ...answer, provenanceTrace: [{ ...answer.provenanceTrace[0], sourceIds: ['invented'] }]
}).ready, false);
assert.equal(prepareFinalAnswer({ ...decision, assessment: { ...decision.assessment!, state: 'Reject' } },
  negation, preset.evidences, answer).ready, false);
assert.equal(prepareFinalAnswer(decision, negation, preset.evidences, {
  ...answer, epistemicCaveats: []
}).ready, false);
console.log('Final answer handoff tests passed');
