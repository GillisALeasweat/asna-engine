import assert from 'node:assert/strict';
import { PRESET_SCENARIOS } from '../src/data/presetScenarios';
import { runIndependentSpecialists } from '../src/engine/runIndependentSpecialists';
import type { SpecialistTask } from '../src/engine/runIndependentSpecialists';

async function main() {
  const preset = structuredClone(PRESET_SCENARIOS[0]);
  const originals = preset.specialists.slice(0, 2);
  assert.equal(originals.length, 2);
  const subquestions = originals.map((s, i) => ({
    ...structuredClone(preset.subquestions[0]),
    id: 'test-sub-' + i,
    assignedSpecialists: [s.specialistId]
  }));
  const observed: string[] = [];
  const executors = originals.map((s, i) => ({
    specialistId: s.specialistId,
    axis: s.axis,
    execute: async (task: Readonly<SpecialistTask>) => {
      observed.push(task.specialistId);
      assert.equal(task.subquestion.id, subquestions[i].id);
      // A mutation in one task must not leak into the other task or original.
      task.evidence[0].claim = 'mutated by ' + task.specialistId;
      return { ...structuredClone(s), subquestionId: task.subquestion.id };
    }
  }));
  const output = await runIndependentSpecialists(preset.userQuestion, preset.analysis, subquestions, preset.evidences, executors);
  assert.equal(output.results.length, 2);
  assert.equal(output.failures.length, 0);
  assert.equal(observed.length, 2);
  assert.notEqual(preset.evidences[0].claim, 'mutated by ' + originals[0].specialistId);

  const withFailure = executors.map((e, i) => i === 0 ? { ...e, execute: async () => { throw new Error('test failure'); } } : e);
  const partial = await runIndependentSpecialists(preset.userQuestion, preset.analysis, subquestions, preset.evidences, withFailure);
  assert.equal(partial.results.length, 1);
  assert.equal(partial.failures.length, 1);
  assert.equal(partial.failures[0].specialistId, originals[0].specialistId);
  console.log('Independent specialist orchestrator smoke tests passed');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
