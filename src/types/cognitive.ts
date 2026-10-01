export type ConvergenceLevel = 'S' | 'A' | 'B' | 'C' | 'Reject';

export type NegationHierarchyLevel = 
  | 'Level 0 — Evidence (情報・出典)'
  | 'Level 1 — Interpretation (証拠の解釈)'
  | 'Level 2 — Inference (推論の成立性)'
  | 'Level 3 — Hypothesis/Conclusion (代替仮説・結論)'
  | 'Level 4 — Question/Objective (問い・目的そのもの)';

export type SourceType = 
  | 'Primary' 
  | 'Secondary' 
  | 'Tertiary' 
  | 'Derived' 
  | 'AI-generated' 
  | 'User-provided' 
  | 'Unknown';

export interface EvidenceUnit {
  id: string;
  source: string;
  sourceType: SourceType;
  originalSource?: string;
  date?: string;
  claim: string;
  directness: 'Direct' | 'Indirect' | 'Circumstantial';
  context: string;
  supportingEvidenceIds: string[];
  counterevidenceIds: string[];
  interpretation: string;
  status: 'Verified' | 'Unverified' | 'Contested' | 'Refuted';
  usedBySpecialists: string[];
  dependencies: string[];
  verificationConfidence: number; // 0.0 - 1.0 (Convergence != Truth だが検証強度は保持)
}

export interface QuestionAnalysis {
  intent: string;
  target: string;
  expectedAnswerType: string;
  constraints: string[];
  assumptions: string[];
  ambiguities: string[];
  requiredEvidenceTypes: string[];
  requiredReasoningAxes: string[];
  initialUncertainty: number; // 0.0 - 1.0
  isClarificationRequired: boolean;
}

export interface SubQuestion {
  id: string;
  title: string;
  description: string;
  coverage: string;
  dependencies: string[];
  importance: 'Critical' | 'High' | 'Medium' | 'Low';
  assignedSpecialists: string[];
  status: 'Pending' | 'In_Progress' | 'Resolved' | 'Contested';
}

export interface SpecialistResult {
  specialistId: string;
  axis: string; // e.g., '因果推論', '統計実証', '反証探索', '地政学/法務'
  subquestionId: string;
  hypothesis: string;
  evidenceIds: string[];
  counterevidenceIds: string[];
  assumptions: string[];
  alternativeExplanations: string[];
  unresolvedIssues: string[];
  convergence: ConvergenceLevel;
  evidenceStatus: 'Sufficient' | 'Partial' | 'Insufficient' | 'Conflicted';
  dependencies: string[];
  selfNegationPassed: boolean;
  negationFindings: {
    level: NegationHierarchyLevel;
    vulnerabilityFound: boolean;
    details: string;
    groundedEvidenceId?: string;
  }[];
}

export interface DialecticalIntegration {
  consensusTheses: string[]; // 合意領域
  antitheses: {
    conflictAxis: string;
    specialistA: string;
    claimA: string;
    specialistB: string;
    claimB: string;
    rootCause: 'Definition Difference' | 'Source Quality' | 'Underlying Assumptions' | 'Causal Modeling';
  }[];
  synthesisHypothesis: string; // 統合仮説（ジンテーゼ）
  integrationNegationResult: {
    testedVulnerabilities: string[];
    survivedCounterevidence: boolean;
    remainingCaveats: string[];
  };
  missingCognitiveAxes: string[];
}

export interface ConvergenceAssessment {
  state: ConvergenceLevel;
  justification: string;
  criteriaChecked: {
    criterion: string;
    passed: boolean;
    note: string;
  }[];
  unresolvedCount: number;
  evidenceStrengthScore: number; // 0-100
  loopbackRecommended: boolean;
  loopbackTargetStage?: 'Question Analysis' | 'Question Decomposition' | 'Specialist Selection' | 'Evidence Gathering';
  loopbackReason?: string;
}

export interface FinalAnswerOutput {
  strategy: 'Definitive Conclusion' | 'Conditional Synthesis' | 'Competing Scenarios' | 'Clarification Request' | 'Principled Refusal';
  summary: string;
  detailedAnalysis: string;
  provenanceTrace: {
    claim: string;
    sourceIds: string[];
    inferencePath: string;
  }[];
  epistemicCaveats: string[]; // 「この回答は〜の前提に基づく」「未解決の不確実性」
}

export interface SimulationStep {
  stepNumber: number;
  stageName: string;
  stageDescription: string;
  agentRole: string;
  data: any;
  status: 'idle' | 'running' | 'completed' | 're-evaluating';
  logs: string[];
}

export interface PresetScenario {
  id: string;
  title: string;
  category: '科学・技術検証' | '政策・意思決定' | 'パラドックス・論理' | '情報未確定・フェイク';
  userQuestion: string;
  analysis: QuestionAnalysis;
  subquestions: SubQuestion[];
  specialists: SpecialistResult[];
  evidences: EvidenceUnit[];
  integration: DialecticalIntegration;
  convergence: ConvergenceAssessment;
  answer: FinalAnswerOutput;
}
