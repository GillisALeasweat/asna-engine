import assert from 'node:assert/strict';
import { PRESET_SCENARIOS } from '../src/data/presetScenarios';
import { validatePresetScenario } from '../src/engine/validateEngineInput';

const scenario = structuredClone(PRESET_SCENARIOS[0]);
const baseline = validatePresetScenario(scenario);
assert.equal(typeof baseline.accepted, 'boolean');
assert.ok(baseline.findings.some(f => f.code === 'NOT_EMPIRICALLY_VERIFIED'));

const missing = structuredClone(scenario);
missing.specialists[0].evidenceIds.push('missing-test-evidence');
const invalid = validatePresetScenario(missing);
assert.equal(invalid.accepted, false);
assert.equal(invalid.state, null);
assert.equal(invalid.answer, null);
assert.ok(invalid.findings.some(f => f.code === 'MISSING_EVIDENCE'));

const confidence = structuredClone(scenario);
confidence.evidences[0].verificationConfidence = 1.5;
assert.ok(validatePresetScenario(confidence).findings.some(f => f.code === 'CONFIDENCE_RANGE'));

const duplicate = structuredClone(scenario);
duplicate.evidences.push(structuredClone(duplicate.evidences[0]));
assert.ok(validatePresetScenario(duplicate).findings.some(f => f.code === 'EVIDENCE_ID'));

console.log('ASNA validator smoke tests passed');
