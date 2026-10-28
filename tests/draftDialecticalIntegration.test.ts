import assert from 'node:assert/strict';
import { PRESET_SCENARIOS } from '../src/data/presetScenarios';
import { prepareIntegrationHandoff } from '../src/engine/prepareIntegrationHandoff';
import { draftDialecticalIntegration } from '../src/engine/draftDialecticalIntegration';

const [a, b] = PRESET_SCENARIOS[0].specialists;
assert.ok(a && b);
const ids = [a.specialistId, b.specialistId];
const complete = prepareIntegrationHandoff(ids, { results: [a, b], failures: [] });
const review = {
  agreements: [{ thesis: 'Reviewer-proposed common point', supportingSpecialistIds: ids }],
  conflicts: [{ specialistA: a.specialistId, claimA: a.hypothesis, specialistB: b.specialistId, claimB: b.hypothesis }]
};
const draft = draftDialecticalIntegration(complete, review);
assert.equal(draft.status, 'review_required');
assert.equal(draft.antitheses.length, 0);
assert.equal(draft.unresolvedConflicts.length, 1);
assert.equal(draft.synthesisHypothesis, null);
assert.deepEqual(draft.unresolvedBySpecialist[0].issues, a.unresolvedIssues);
assert.throws(() => draftDialecticalIntegration(complete, {
  ...review, synthesisHypothesis: 'premature synthesis'
}), /blocked/);
const partial = prepareIntegrationHandoff(ids, {
  results: [a], failures: [{ specialistId: b.specialistId, reason: 'timeout' }]
});
const incomplete = draftDialecticalIntegration(partial, { agreements: [], conflicts: [] });
assert.equal(incomplete.status, 'incomplete');
assert.deepEqual(incomplete.missingCognitiveAxes, [b.specialistId]);
assert.throws(() => draftDialecticalIntegration(complete, {
  agreements: [], conflicts: [{ ...review.conflicts[0], rootCause: 'Source Quality' as const }]
}), /rationale/);
console.log('Conservative dialectical integration tests passed');
