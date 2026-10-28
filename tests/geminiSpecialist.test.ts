import assert from 'node:assert/strict';
import { PRESET_SCENARIOS } from '../src/data/presetScenarios';
import { createGeminiSpecialistExecutor } from '../server/geminiSpecialist';

async function main() {
  const preset = PRESET_SCENARIOS[0];
  const original = preset.specialists[0];
  let requestUrl = '';
  let requestHeaders: Headers | undefined;
  const fetchImpl: typeof fetch = async (input, init) => {
    requestUrl = String(input);
    requestHeaders = new Headers(init?.headers);
    const body = JSON.parse(String(init?.body));
    assert.ok(!JSON.stringify(body).includes('otherSpecialistOutput'));
    return new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: JSON.stringify(original) }] } }]
    }), { status: 200 });
  };
  const execute = createGeminiSpecialistExecutor({ apiKey: 'test-key', fetchImpl });
  const task = {
    specialistId: original.specialistId, axis: original.axis,
    question: preset.userQuestion, analysis: preset.analysis,
    subquestion: { ...preset.subquestions[0], id: original.subquestionId },
    evidence: preset.evidences
  };
  const result = await execute(task);
  assert.equal(result.specialistId, original.specialistId);
  assert.ok(requestUrl.startsWith('https://generativelanguage.googleapis.com/'));
  assert.equal(requestHeaders?.get('x-goog-api-key'), 'test-key');
  await assert.rejects(() => createGeminiSpecialistExecutor({
    apiKey: 'test-key',
    fetchImpl: async () => new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: JSON.stringify({ ...original, evidenceIds: ['invented-id'] }) }] } }]
    }), { status: 200 })
  })(task), /unknown evidence ID/);
  console.log('Gemini adapter mocked transport tests passed');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
