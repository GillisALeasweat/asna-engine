import React, { useState } from 'react';
import { Copy, Check, Code2, Database } from 'lucide-react';

export const SchemaTab: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const TYPESCRIPT_SCHEMA = `// ==========================================
// ASNA Core Protocol: Data Models & Interfaces
// Version: 0.2.0 (RFC-0001 Implementation)
// ==========================================

export type ConvergenceLevel = 'S' | 'A' | 'B' | 'C' | 'Reject';

export type SourceType = 
  | 'Primary'       // 査読論文、公式統計、第一当事者文書
  | 'Secondary'     // 解説記事、報道、メタ分析
  | 'Tertiary'      // 百科事典、要約集
  | 'Derived'       // 計算・集計による派生データ
  | 'AI-generated'  // LLMの推論出力（未検証）
  | 'User-provided' // ユーザーのプロンプト入力
  | 'Unknown';

export interface EvidenceUnit {
  id: string;                      // 例: "ev-2023-nature-lk99"
  source: string;                  // 書誌情報・URL・DOI
  sourceType: SourceType;
  originalSource?: string;         // 一次原典への参照
  date?: string;                   // 発行日・観測日
  claim: string;                   // 証拠が主張する命題
  directness: 'Direct' | 'Indirect' | 'Circumstantial';
  context: string;                 // 実験条件・計測手法
  supportingEvidenceIds: string[]; // 支持する他エビデンスID
  counterevidenceIds: string[];    // 反証エビデンスID
  interpretation: string;          // 本証拠に対する解釈
  status: 'Verified' | 'Unverified' | 'Contested' | 'Refuted';
  usedBySpecialists: string[];     // 参照した専門エージェント
  dependencies: string[];          // 前提となるエビデンス
  verificationConfidence: number;  // 0.0 - 1.0 (検証強度)
}

export type NegationHierarchyLevel = 
  | 'Level 0 — Evidence'        // 情報・出典そのものの誤り・捏造
  | 'Level 1 — Interpretation'  // 相関と因果の混同、データの曲解
  | 'Level 2 — Inference'       // 推論の飛躍、論理的誤謬
  | 'Level 3 — Hypothesis'      // より単純・整合的な代替説明
  | 'Level 4 — Question';       // 問いの前提自体の破綻・無意味

export interface SpecialistResult {
  specialistId: string;
  axis: string;                     // 推論軸 (例: "物性物理", "因果統計")
  subquestionId: string;
  hypothesis: string;              // 導出された専門仮説
  evidenceIds: string[];           // 根拠エビデンス
  counterevidenceIds: string[];     // 検出された反証
  assumptions: string[];           // 採用した暗黙の前提
  alternativeExplanations: string[];// 考慮した代替説
  unresolvedIssues: string[];      // 未解決の論点
  convergence: ConvergenceLevel;
  evidenceStatus: 'Sufficient' | 'Partial' | 'Insufficient' | 'Conflicted';
  selfNegationPassed: boolean;
  negationFindings: {
    level: NegationHierarchyLevel;
    vulnerabilityFound: boolean;
    details: string;
    groundedEvidenceId?: string;   // 架空反証防止用
  }[];
}

export interface DialecticalIntegration {
  consensusTheses: string[];       // テーゼ（合意点）
  antitheses: {
    conflictAxis: string;
    specialistA: string;
    claimA: string;
    specialistB: string;
    claimB: string;
    rootCause: 'Definition Difference' | 'Source Quality' | 'Underlying Assumptions' | 'Causal Modeling';
  }[];
  synthesisHypothesis: string;     // ジンテーゼ（統合メタ仮説）
  integrationNegationResult: {
    testedVulnerabilities: string[];
    survivedCounterevidence: boolean;
    remainingCaveats: string[];
  };
  missingCognitiveAxes: string[];  // 欠落していた観点
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
  evidenceStrengthScore: number;   // 0-100
  loopbackRecommended: boolean;
  loopbackTargetStage?: 'Question Analysis' | 'Question Decomposition' | 'Specialist Selection' | 'Evidence Gathering';
  loopbackReason?: string;
}
`;

  const JSON_SCHEMA = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EvidenceUnit",
  "type": "object",
  "required": ["id", "source", "sourceType", "claim", "status", "verificationConfidence"],
  "properties": {
    "id": { "type": "string" },
    "source": { "type": "string" },
    "sourceType": { 
      "enum": ["Primary", "Secondary", "Tertiary", "Derived", "AI-generated", "User-provided", "Unknown"]
    },
    "claim": { "type": "string" },
    "status": {
      "enum": ["Verified", "Unverified", "Contested", "Refuted"]
    },
    "verificationConfidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "counterevidenceIds": {
      "type": "array",
      "items": { "type": "string" }
    }
  }
}`;

  const handleCopy = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(key);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono mb-2 border border-indigo-500/20">
          <span>Engine Implementation Protocol</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          実装用 TypeScript インターフェース &amp; JSON Schema
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          本アーキテクチャを Python (Pydantic) や TypeScript / Node.js で実装する際に即座にインポートして利用できる厳密な型定義です。
        </p>
      </div>

      {/* TypeScript block */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-indigo-400">
            <Code2 className="w-4 h-4" />
            <span>asna-core/src/types/cognitive.ts</span>
          </div>
          <button
            onClick={() => handleCopy('ts', TYPESCRIPT_SCHEMA)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            {copiedType === 'ts' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === 'ts' ? 'コピー完了' : 'TypeScript 型定義をコピー'}</span>
          </button>
        </div>
        <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto max-h-[500px] leading-relaxed">
          {TYPESCRIPT_SCHEMA}
        </pre>
      </div>

      {/* JSON Schema block */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400">
            <Database className="w-4 h-4" />
            <span>schemas/evidence_unit.schema.json (Structured Outputs用)</span>
          </div>
          <button
            onClick={() => handleCopy('json', JSON_SCHEMA)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
          >
            {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === 'json' ? 'コピー完了' : 'JSON Schema をコピー'}</span>
          </button>
        </div>
        <pre className="p-5 font-mono text-xs text-slate-300 overflow-x-auto max-h-[300px] leading-relaxed">
          {JSON_SCHEMA}
        </pre>
      </div>
    </div>
  );
};
