import assert from 'node:assert/strict';
import { PRESET_SCENARIOS } from '../src/data/presetScenarios';
import { prepareIntegrationHandoff } from '../src/engine/prepareIntegrationHandoff';

const [a, b] = PRESET_SCENARIOS[0].specialists;
assert.ok(a && b);
const expected = [a.specialistId, b.specialistId];
const partial = prepareIntegrationHandoff(expected, {
  results: [a],
  failures: [{ specialistId: b.specialistId, reason: 'provider timeout' }]
});
assert.equal(partial.readyForCompleteIntegration, false);
assert.deepEqual(partial.missingSpecialistIds, [b.specialistId]);
assert.deepEqual(partial.unresolvedBySpecialist[0].issues, a.unresolvedIssues);
assert.deepEqual(partial.counterevidenceBySpecialist[0].evidenceIds, a.counterevidenceIds);
assert.deepEqual(partial.alternativesBySpecialist[0].explanations, a.alternativeExplanations);
assert.deepEqual(partial.negationBySpecialist[0].findings, a.negationFindings);
assert.equal(partial.convergenceClaimsBySpecialist[0].classification, a.convergence);
assert.ok(partial.caveats.some(s => s.includes('Incomplete')));
const complete = prepareIntegrationHandoff(expected, { results: [a, b], failures: [] });
assert.equal(complete.readyForCompleteIntegration, true);
assert.deepEqual(complete.missingSpecialistIds, []);
assert.throws(() => prepareIntegrationHandoff(expected, { results: [a, a], failures: [] }), /duplicate/);
console.log('Integration handoff tests passed');
