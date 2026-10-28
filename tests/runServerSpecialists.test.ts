import assert from 'node:assert/strict';
import { PRESET_SCENARIOS } from '../src/data/presetScenarios';
import { runServerSpecialists } from '../server/runServerSpecialists';

async function main() {
  const preset = structuredClone(PRESET_SCENARIOS[0]);
  const specialists = preset.specialists.slice(0, 2);
  const subquestions = specialists.map((s, i) => ({
    ...structuredClone(preset.subquestions[0]),
    id: 'assigned-' + i,
    assignedSpecialists: [s.specialistId]
  }));
  const request = {
    question: preset.userQuestion,
    analysis: preset.analysis,
    subquestions,
    evidence: preset.evidences,
    assignments: specialists.map(s => ({ specialistId: s.specialistId, axis: s.axis }))
  };
  let calls = 0;
  const fetchImpl: typeof fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body));
    const prompt: string = body.contents[0].parts[0].text;
    const i = specialists.findIndex(s => prompt.includes('"specialistId":"' + s.specialistId + '"'));
    assert.notEqual(i, -1);
    calls++;
    const result = { ...specialists[i], subquestionId: subquestions[i].id };
    return new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: JSON.stringify(result) }] } }]
    }), { status: 200 });
  };
  const output = await runServerSpecialists(request, { apiKey: 'test-key', fetchImpl });
  assert.equal(calls, 2);
  assert.equal(output.complete, true);
  assert.equal(output.results.length, 2);
  assert.equal(output.failures.length, 0);
  await assert.rejects(() => runServerSpecialists({
    ...request, assignments: []
  }, { apiKey: 'test-key', fetchImpl }), /Invalid specialist count/);
  console.log('Server specialist entry mocked tests passed');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
