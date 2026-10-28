import type {
  ConvergenceAssessment, ConvergenceLevel, EvidenceUnit, SpecialistResult,
  DialecticalIntegration, FinalAnswerOutput, PresetScenario
} from '../types/cognitive';

/**
 * Deterministic foundation for ASNA. This module DOES NOT call an LLM, retrieve
 * sources, authenticate publications, or claim to implement the full architecture.
 * It validates supplied outputs before they are displayed or used downstream.
 */
export interface EngineInput {
  evidence: EvidenceUnit[];
  specialists: SpecialistResult[];
  integration: DialecticalIntegration;
  convergence: ConvergenceAssessment;
  answer: FinalAnswerOutput;
}
export interface EngineFinding {
  severity: 'error' | 'warning';
  code: string;
  message: string;
}
export interface EngineResult {
  accepted: boolean;
  findings: EngineFinding[];
  state: ConvergenceLevel | null;
  answer: FinalAnswerOutput | null;
}

export function validateEngineInput(input: EngineInput): EngineResult {
  const findings: EngineFinding[] = [];
  const error = (code: string, message: string) =>
    findings.push({ severity: 'error', code, message });
  const warning = (code: string, message: string) =>
    findings.push({ severity: 'warning', code, message });
  const evidenceById = new Map<string, EvidenceUnit>();
  for (const ev of input.evidence) {
    if (!ev.id || evidenceById.has(ev.id)) error('EVIDENCE_ID', 'Evidence IDs must be nonempty and unique');
    evidenceById.set(ev.id, ev);
    if (!Number.isFinite(ev.verificationConfidence) || ev.verificationConfidence < 0 || ev.verificationConfidence > 1)
      error('CONFIDENCE_RANGE', ev.id + ': verificationConfidence must be between 0 and 1');
    if (ev.status === 'Verified' && !ev.originalSource)
      warning('SOURCE_TRACE', ev.id + ': Verified is asserted without an originalSource reference');
  }
  const checkRef = (id: string, owner: string) => {
    if (!evidenceById.has(id)) error('MISSING_EVIDENCE', owner + ': missing evidence reference ' + id);
  };
  for (const ev of input.evidence) {
    for (const id of [...ev.supportingEvidenceIds, ...ev.counterevidenceIds, ...ev.dependencies])
      checkRef(id, ev.id);
  }
  for (const specialist of input.specialists) {
    for (const id of [...specialist.evidenceIds, ...specialist.counterevidenceIds])
      checkRef(id, specialist.specialistId);
    for (const finding of specialist.negationFindings) {
      if (finding.groundedEvidenceId) {
        checkRef(finding.groundedEvidenceId, specialist.specialistId + ' negation');
        const ev = evidenceById.get(finding.groundedEvidenceId);
        if (ev && ev.status !== 'Verified')
          warning('UNGROUNDED_NEGATION', specialist.specialistId + ': negation cites non-verified evidence');
      } else if (finding.vulnerabilityFound) {
        warning('NEGATION_WITHOUT_REFERENCE', specialist.specialistId + ': vulnerability has no groundedEvidenceId');
      }
    }
  }
  for (const trace of input.answer.provenanceTrace)
    for (const id of trace.sourceIds) checkRef(id, 'answer provenance');
  if (!input.specialists.length) error('NO_SPECIALISTS', 'At least one specialist output is required');
  if (!input.convergence.justification.trim()) error('NO_JUSTIFICATION', 'Convergence requires a justification');
  if (input.convergence.state === 'S' && (input.convergence.unresolvedCount > 0 ||
      input.convergence.criteriaChecked.some(c => !c.passed)))
    warning('S_REVIEW', 'S is asserted with unresolved issues or failed criteria; review classification');
  if (input.convergence.state === 'Reject' && !input.answer.epistemicCaveats.length)
    warning('REJECT_EXPLANATION', 'Reject should explain its epistemic limitations');
  // This is referential validation, not source authenticity or inference entailment.
  warning('NOT_EMPIRICALLY_VERIFIED', 'Source authenticity, evidence relevance and inference validity require separate checks');
  const accepted = !findings.some(f => f.severity === 'error');
  return {
    accepted, findings,
    state: accepted ? input.convergence.state : null,
    answer: accepted ? input.answer : null
  };
}

/** Adapts existing preset data to the validator without changing the simulator. */
export function validatePresetScenario(scenario: PresetScenario): EngineResult {
  return validateEngineInput({
    evidence: scenario.evidences,
    specialists: scenario.specialists,
    integration: scenario.integration,
    convergence: scenario.convergence,
    answer: scenario.answer
  });
}
