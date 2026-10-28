import assert from 'node:assert/strict';
import { PRESET_SCENARIOS } from '../src/data/presetScenarios';
import { prepareIntegrationHandoff } from '../src/engine/prepareIntegrationHandoff';
import { draftDialecticalIntegration } from '../src/engine/draftDialecticalIntegration';
import { reviewIntegrationNegation } from '../src/engine/reviewIntegrationNegation';

const preset = PRESET_SCENARIOS[0];
const [a, b] = preset.specialists;
assert.ok(a && b);
const ids = [a.specialistId, b.specialistId];
const handoff = prepareIntegrationHandoff(ids, { results: [a, b], failures: [] });
const draft = draftDialecticalIntegration(handoff, {
  agreements: [],
  conflicts: [],
  synthesisHypothesis: 'Reviewer-supplied hypothesis'
});
const finding = {
  level: 'Level 2 — Inference (推論の成立性)' as const,
  issue: 'Test whether the proposed inference follows',
  evidenceIds: [preset.evidences[0].id],
  disposition: 'survived' as const,
  rationale: 'Reviewer supplied rationale'
};
const pending = reviewIntegrationNegation(draft, { findings: [finding], remainingCaveats: [] }, preset.evidences);
assert.equal(pending.eligibleForConvergenceReview, a.unresolvedIssues.length + b.unresolvedIssues.length === 0);
assert.equal(pending.integration === null, !pending.eligibleForConvergenceReview);
const clearDraft = { ...draft, unresolvedBySpecialist: [] };
const eligible = reviewIntegrationNegation(clearDraft, { findings: [finding], remainingCaveats: [] }, preset.evidences);
assert.equal(eligible.eligibleForConvergenceReview, true);
assert.equal(eligible.integration?.integrationNegationResult.survivedCounterevidence, true);
const unresolved = reviewIntegrationNegation(clearDraft, {
  findings: [{ ...finding, disposition: 'unresolved' }], remainingCaveats: []
}, preset.evidences);
assert.equal(unresolved.eligibleForConvergenceReview, false);
assert.equal(unresolved.integration, null);
assert.throws(() => reviewIntegrationNegation(clearDraft, {
  findings: [{ ...finding, evidenceIds: ['invented'] }], remainingCaveats: []
}, preset.evidences), /unknown evidence/);
console.log('Integration negation boundary tests passed');
