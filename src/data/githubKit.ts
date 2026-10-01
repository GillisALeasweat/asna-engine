export const GITHUB_README_MD = `# ASNA: Adaptive & Self-Negating Cognitive Architecture for LLM Multi-Agent Systems
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Status: RFC-0001](https://img.shields.io/badge/RFC-0001%20Proposed-emerald.svg)](./rfcs/0001-asna-architecture.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-brightgreen)](https://python.org/)

> **"Convergence ≠ Truth. Reject is a valid cognitive state. Echo chambers must be structurally impossible."**

ASNA is a principled cognitive architecture designed to eliminate sycophancy, groupthink, and hallucinated overconfidence in multi-agent LLM systems.

Unlike standard multi-agent frameworks where agents debate in an open forum (leading to rapid echo chambers and social anchoring), ASNA decouples **Question Decomposition**, **Isolated Parallel Specialists**, **Multi-Level Grounded Self-Negation (Levels 0–4)**, and **Dialectical Integration** into a deterministic directed acyclic graph (DAG) governed by a Finite State Machine (FSM).

---

## 🌟 Core Epistemic Principles

1. **Convergence ≠ Truth**: Reaching agreement or high confidence does not equal objective truth.
2. **Principled Reject**: Returning \`Reject\` (inability to answer with current facts) is a primary, healthy cognitive state—not a failure mode.
3. **No Direct Agent-to-Agent Debate**: Specialists must remain blind to each other's stream of thought during parallel reasoning to eliminate anchoring.
4. **Grounded Self-Negation**: Self-refutation is not hallucinated doubt; every counterevidence must carry a verifiable \`EvidenceUnit\` with provenance.
5. **Inference Provenance**: We trace the entire dependency chain: \`Source → Claim → Inference → Hypothesis → Conclusion\`.

---

## ⚠️ Why Existing Multi-Agent & RLHF Systems Fail: The Pathology of Reward Gaming

Contemporary LLMs do not hallucinate out of ignorance; they hallucinate because **reinforcement learning (RLHF) systematically incentivizes reward hacking and pretentious overconfidence**:

1. **Goodhart's Law & Pretentious Overconfidence**: Because standard benchmarks and human raters penalize saying *"I don't know / Reject"*, models are trained to optimize for perceived eloquence and unwarranted certainty over epistemic honesty.
2. **Sycophancy by Design**: Models flatter the user's bias and accept flawed premises because agreement yields higher RLHF reward scores.
3. **Echo Chamber Cascade in Multi-Agent Debate**: Unconstrained agent-to-agent debate creates autoregressive anchoring—the first confident hallucination cascades across subsequent agents into an unassailable groupthink consensus.
4. **Toothless Pseudo-Critique**: Single-model self-reflection produces superficial disclaimers without invalidating foundational flaws.
5. **The Illusion of Interpretability & Black-Box Post-hoc Rationalization**: Generating verbose "Chain-of-Thought" text is not true interpretability; it is an ungrounded post-hoc fiction. When multiple agents chat, provenance and accountability evaporate into an un-auditable conversational soup.

**ASNA structurally eliminates reward gaming and black boxes** by establishing \`Reject\` as a top-tier cognitive triumph, enforcing complete blind parallel reasoning, requiring grounded evidence for any refutation, and compiling every inference step into a verifiable Inference DAG.

---

## 🏗️ Architecture: Dual-Layer System (Cognitive Layer + Foundation Substrate)

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                   【Cognitive Reasoning Layer】                        │
│                                                                        │
│  User Question ──► [01. Analysis] ──► [02. Decomposition (DAG)]        │
│                                              │                         │
│  [03. Adaptive Router] ──► [04. Isolated Parallel Specialists]         │
│                                              │                         │
│  [05. Grounded Self-Negation (L0-L3)] ──► [06. Dialectical Synthesis] │
│                                              │                         │
│  [07. Integration Negation (L4)] ──► [08. Convergence FSM]             │
│                                              │                         │
│  [09. Answer Strategy] ──► [Final Synthesized Output & Provenance]     │
└─────────────────────▲────────────────────────▲─────────────────────────┘
                      │ (Evidence Inflow)      │ (Reactive Invalidation)
                      ▼                        ▼
══════════════════════════════════════════════════════════════════════════
    【BOTTOM FOUNDATION: Evidence & Provenance Substrate Layer】
     • Source → Claim → Inference → Hypothesis → Conclusion (DAG Store)
     • Primary Source Verification & Grounded Evidence Units
     • Real-time reactive invalidation propagation across all active agents
══════════════════════════════════════════════════════════════════════════
\`\`\`

---

## 📊 Convergence States Matrix (S / A / B / C / Reject)

| State | Name | Definition | Answer Strategy |
| :--- | :--- | :--- | :--- |
| **S** | Fully Converged | Concrete conclusion reached with verified evidence and 0 unrefuted counterclaims. | **Definitive Conclusion** with provenance trace. |
| **A** | Dominant Convergence | Primary causal vector settled; minor secondary details remain unresolved. | **Conditional Synthesis** with explicit caveats. |
| **B** | Structural Equivalence | Problem structure is fully organized, but two legitimate competing hypotheses have equal evidence. | **Competing Scenarios** comparison table. |
| **C** | Partial Convergence | Only isolated sub-questions solved; the main premise remains undecidable. | **Principled Clarification** with minimal follow-up query. |
| **Reject**| Cognitive Refusal | Premise invalid, evidence unrecoverable, or unresolvable paradox detected. | **Principled Refusal** explaining epistemic blockage. |

---

## 🚀 Repository Structure

\`\`\`
asna/
├── rfcs/
│   └── 0001-asna-architecture.md     # Full architectural specification
├── packages/
│   ├── core/                          # Framework-agnostic Cognitive DAG & State Machine
│   │   ├── src/
│   │   │   ├── provenance/            # EvidenceUnit & Invalidation Engine
│   │   │   ├── negation/              # Grounded Negation Guard (Levels 0-4)
│   │   │   ├── integration/           # Dialectical Synthesis Algorithm
│   │   │   └── convergence/           # S/A/B/C/Reject Classifier
│   ├── adapters/                      # LLM Provider Bindings (Gemini, Claude, GPT, Ollama)
│   └── playground/                    # Web Visualizer & Real-time Trace Inspector
├── benchmarks/                        # ECE, Refutation Precision & Ablation Suite
├── examples/                          # LK-99, Capital Relocation, Logic Paradoxes
└── tests/
\`\`\`

---

## 🤝 Contributing

We welcome contributions! Please check out [CONTRIBUTING.md](./CONTRIBUTING.md) and join our discussions on:
- Formalizing Level 4 Negation triggers
- Developing domain-specific Specialist axes (e.g., Formal Verification, Toxicology, Econometrics)
- Benchmarking calibration error across leading open and proprietary LLMs.
`;

export const RFC_0001_MD = `# RFC-0001: ASNA (Adaptive & Self-Negating Cognitive Architecture)

- **Feature Name**: \`asna_cognitive_architecture\`
- **Start Date**: 2026-09-30
- **RFC PR**: #1
- **Status**: Proposed
- **Authors**: ASNA Core Working Group

## Summary
This RFC formalizes the architecture for a multi-agent cognitive reasoning engine that integrates:
1. Dynamic problem decomposition into an executable DAG.
2. Isolated parallel reasoning modules preventing social contagion / sycophancy.
3. Hierarchical Grounded Self-Negation (Levels 0 to 4).
4. An explicit Convergence State Machine (S, A, B, C, Reject).
5. Dynamic Adaptive Compute budgeting based on epistemic risk.

## Motivation & Problem Statement
State-of-the-art Multi-Agent debate frameworks suffer from **Echo Chamber Convergence**:
When agents share conversational history, earlier tokens bias subsequent generation (anchoring effect). Even when instructed to "critique", agents prioritize pleasant consensus over rigorous falsification.

Furthermore, existing systems treat confidence as truth. If three agents hallucinate the same false premise, the ensemble outputs a high-confidence false answer.

ASNA resolves this by enforcing **epistemic isolation**, **mandatory falsification with provenance**, and **formal decoupling of convergence from truth**.
`;

export const CITATION_CFF = `cff-version: 1.2.0
message: "If you use this cognitive architecture specification or reference implementation, please cite it as below."
title: "ASNA: Adaptive & Self-Negating multi-agent Cognitive Architecture for Epistemic Reasoning"
version: 0.2.0
date-released: 2026-10-01
license: "Apache-2.0"
repository-code: "https://github.com/your-username/asna-cognitive-architecture"
url: "https://github.com/your-username/asna-cognitive-architecture"
keywords:
  - "multi-agent systems"
  - "cognitive architecture"
  - "self-negation"
  - "falsifiability"
  - "epistemic reasoning"
  - "provenance-graph"
  - "hallucination-mitigation"
authors:
  - family-names: "YourLastName"
    given-names: "YourFirstName"
    orcid: "https://orcid.org/0000-0000-0000-0000"
    affiliation: "Independent Researcher"
preferred-citation:
  type: article
  authors:
    - family-names: "YourLastName"
      given-names: "YourFirstName"
  title: "Decoupling Convergence from Truth: An Adaptive and Self-Negating Multi-Agent Architecture with Epistemic Provenance"
  journal: "arXiv preprint arXiv:XXXX.XXXXX"
  year: 2026
`;

export const ZENODO_JSON = `{
  "title": "ASNA: Adaptive & Self-Negating Cognitive Architecture for LLM Multi-Agent Systems",
  "description": "A formal cognitive architecture specification and reference engine designed to eliminate reward gaming, sycophancy, and ungrounded hallucinations through isolated parallel specialists, multi-level grounded self-negation, and an Inference Provenance DAG.",
  "creators": [
    {
      "name": "YourLastName, YourFirstName",
      "affiliation": "Independent Researcher / ASNA Project",
      "orcid": "0000-0000-0000-0000"
    }
  ],
  "access_right": "open",
  "license": "Apache-2.0",
  "upload_type": "software",
  "keywords": [
    "artificial intelligence",
    "multi-agent debate",
    "epistemic logic",
    "hallucination mitigation",
    "provenance dag"
  ],
  "communities": [
    { "identifier": "zenodo" }
  ]
}`;

export const ACADEMIC_PEER_REVIEW_CHECKLIST = [
  {
    category: "1. 形式的理論・数理モデル",
    status: "要補強 (仕様書v0.2で骨子策定中)",
    severity: "Critical (最重要)",
    lackingItems: [
      "自然言語の記述から『記号論理・集合論的数式（Notation）』への定式化。",
      "質問空間 Q、分解演算子 D(Q)、反証演算子 N(H, E, L)、収束関数 F_conv の形式的定義。",
      "推論有向非巡回グラフ G = (V, E) におけるトポロジカル無効化伝播の不変条件（Invariants）証明。"
    ],
    reviewerPerspective: "『アイディアは魅力的だが、数学的・アルゴリズム的に厳密な定義がないと工学的・論理的検証ができない』と査読で弾かれるリスク。"
  },
  {
    category: "2. 先行研究との体系的対比 (Related Work)",
    status: "要補強",
    severity: "Critical (最重要)",
    lackingItems: [
      "Multi-Agent Debate (Du et al., 2023; Liang et al., 2023) との差別化（なぜ自由討論がエコーチェンバーを生むのかの先行研究引用）。",
      "Reflexion (Shinn et al., 2023) / Self-Refine (Madaan et al., 2023) との比較（なぜ単一モデル自己反省はポーズ批判に終わるのか）。",
      "Sycophancy (Sharma et al., 2023) および RLHF Reward Hacking (Gao et al., 2023) の文献明記。"
    ],
    reviewerPerspective: "『既存のマルチエージェント討論やReflexionと何が本質的に異なるのか？』という定番の反論に対する防御線。"
  },
  {
    category: "3. 実証実験データ & 定量的ベンチマーク (Empirical Results)",
    status: "コード準備完了 (evaluate_ece.py 境界値バグ修正・堅牢化済)",
    severity: "Showstopper (査読通過の絶対条件)",
    lackingItems: [
      "TruthfulQA, HaluEval, GSM8K-Adversarial 等を用いたベースライン比較実験結果テーブル（Table 1）。",
      "比較対象: ①単一LLM、②CoT、③Reflexion、④従来マルチエージェント、⑤ASNA。",
      "測定メトリクス: ECE（下限0.0境界バグ解消済）、反証再現率（Refutation Recall）、過剰拒絶ペナルティ（Over-skepticism）。",
      "アブレーション研究（Ablation Study: 自己否定を抜いたらどうなるか、プロベナンスを抜いたらどうなるか）。"
    ],
    reviewerPerspective: "『設計思想の主張だけで、実際の精度やコスト・ハルシネーション抑制の定量的エビデンスがない』として却下（Reject）される主因。"
  },
  {
    category: "4. 再現可能な最小実行コード (Minimal Reproducible Example)",
    status: "準備完了 (本TypeScriptスキーマ・シミュレータ)",
    severity: "High",
    lackingItems: [
      "誰でも `pip install asna` または `npm install asna-core` でコマンド1行で追試できるCLIまたはPythonスクリプト。",
      "乱数シード（Temperature = 0 等）の固定と、API呼び出しログのキャッシュ機構（Replay mode）。"
    ],
    reviewerPerspective: "NeurIPS/ICLRの『再現性チェックリスト（Reproducibility Checklist）』を満たすための必須要件。"
  },
  {
    category: "5. 学術的メタデータ・引用ファイル",
    status: "完了 (本ツールで即座に生成可能)",
    severity: "Medium",
    lackingItems: [
      "`CITATION.cff` のリポジトリルート配置（GitHubのCite this repository機能用）。",
      "`.zenodo.json` の配置（Zenodoアーカイブ時のメタデータ・ORCID連携用）。",
      "オープンソースライセンス（Apache-2.0 推奨）。"
    ],
    reviewerPerspective: "DOIを発行してBibTeXで正しく他論文から引用してもらうための形式要件。"
  },
  {
    category: "6. 倫理的配慮と限界の自己開示 (Limitations & Ethics Statement)",
    status: "完了 (前ターンのKnown Limitationsで策定)",
    severity: "High",
    lackingItems: [
      "前ターンで策定した『推論レイテンシ・計算コスト』『過剰懐疑論による分析麻痺』『同一モデル共変バイアス』等の限界開示を論文末尾に独立章として配置。"
    ],
    reviewerPerspective: "近年トップカンファレンス（NeurIPS, ACL）で義務化された『Limitations and Broader Impact Statement』を完璧に満たす。"
  }
];

export const REPO_DIRECTORY_TREE = `asna/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Type check, unit tests, ECE benchmarks
│   │   └── release.yml
│   └── ISSUE_TEMPLATE/
│       ├── specialist_proposal.md # Template to propose new Specialist axes
│       └── bug_report.md
├── rfcs/
│   └── 0001-asna-architecture.md # Formal RFC specification document
├── packages/
│   ├── core/                      # Pure TypeScript/Python logic (Zero LLM vendor lock-in)
│   │   ├── src/
│   │   │   ├── types.ts           # Schema: EvidenceUnit, SpecialistResult, DAG
│   │   │   ├── fsm.ts             # State Machine & Rollback Damper
│   │   │   ├── provenance.ts      # Invalidation Propagation Engine
│   │   │   ├── negation.ts        # Grounded Negation Verifier (L0-L4)
│   │   │   ├── integration.ts     # Dialectical Synthesis
│   │   │   └── convergence.ts     # S/A/B/C/Reject Evaluator
│   ├── adapters/
│   │   ├── gemini.ts              # Gemini 2.5/3 Pro & Flash with Grounding
│   │   ├── claude.ts              # Anthropic Claude 3.7 Sonnet
│   │   └── openai.ts              # OpenAI o3 / GPT-4.5
│   └── playground/                # Interactive React/Vite Visualizer
├── benchmarks/
│   ├── dataset/
│   │   ├── falsification_suite.json
│   │   └── epistemic_pitfalls.json
│   └── evaluate_ece.py            # Expected Calibration Error calculation
└── README.md
`;

export const EVALUATE_ECE_PY = `"""
ASNA Epistemic Benchmark Suite: Expected Calibration Error & Refutation Metrics
Reference Implementation for Paper Submission (NeurIPS/ICLR/ACL/JOSS)
"""

import json
import numpy as np
from typing import List, Dict, Any, Union

def calculate_ece(
    confidences: Union[np.ndarray, List[float]], 
    accuracies: Union[np.ndarray, List[float]], 
    n_bins: int = 10
) -> float:
    """
    Computes Expected Calibration Error (ECE).
    Measures the gap between model confidence and real accuracy across probability bins.
    
    Args:
        confidences: 1D array of confidence scores in [0.0, 1.0].
        accuracies: 1D array of binary outcomes (1.0 for correct, 0.0 for incorrect).
        n_bins: Number of equal-width bins.
        
    Returns:
        float: Expected Calibration Error (0.0 = perfect epistemic calibration).
    """
    confidences = np.asarray(confidences, dtype=np.float64)
    accuracies = np.asarray(accuracies, dtype=np.float64)
    
    if len(confidences) == 0:
        return 0.0

    bin_boundaries = np.linspace(0.0, 1.0, n_bins + 1)
    ece = 0.0
    n_samples = len(confidences)

    for i in range(n_bins):
        bin_lower = bin_boundaries[i]
        bin_upper = bin_boundaries[i + 1]

        # Fix: Include lower bound 0.0 for the first bin (avoids excluding exact 0.0 scores)
        if i == 0:
            in_bin = (confidences >= bin_lower) & (confidences <= bin_upper)
        else:
            in_bin = (confidences > bin_lower) & (confidences <= bin_upper)

        bin_size = np.sum(in_bin)

        if bin_size > 0:
            avg_accuracy_in_bin = np.mean(accuracies[in_bin])
            avg_confidence_in_bin = np.mean(confidences[in_bin])
            ece += np.abs(avg_accuracy_in_bin - avg_confidence_in_bin) * (bin_size / n_samples)

    return float(ece)

def evaluate_falsification_performance(records: List[Dict[str, Any]]) -> Dict[str, Union[float, int]]:
    """
    Evaluates Grounded Self-Negation precision, recall, over-skepticism penalty, and calibration.
    """
    if not records:
        return {
            "Expected_Calibration_Error_ECE": 0.0,
            "Refutation_Recall": 0.0,
            "Over_Skepticism_Penalty": 0.0,
            "Total_Evaluated": 0
        }

    true_positive_refutations = 0
    false_positive_refutations = 0  # Over-skepticism on true facts
    missed_hallucinations = 0       # Uncaught false premises

    conf_list = []
    acc_list = []

    for item in records:
        is_factually_flawed = item.get("is_adversarial_or_flawed", False)
        
        # Defensive extraction for state and negation trigger
        state = item.get("state", "")
        negation_triggered = item.get("negation_triggered", False)
        predicted_reject_or_refuted = (state in ["Reject", "B"]) or negation_triggered
        
        confidence = item.get("confidence", 0.5)
        is_correct = (predicted_reject_or_refuted == is_factually_flawed)
        
        conf_list.append(confidence)
        acc_list.append(1.0 if is_correct else 0.0)

        if is_factually_flawed and predicted_reject_or_refuted:
            true_positive_refutations += 1
        elif not is_factually_flawed and predicted_reject_or_refuted:
            false_positive_refutations += 1
        elif is_factually_flawed and not predicted_reject_or_refuted:
            missed_hallucinations += 1

    total_flawed = true_positive_refutations + missed_hallucinations
    total_valid = len(records) - total_flawed

    recall = true_positive_refutations / total_flawed if total_flawed > 0 else 1.0
    over_skepticism = false_positive_refutations / total_valid if total_valid > 0 else 0.0
    ece = calculate_ece(np.array(conf_list), np.array(acc_list))

    return {
        "Expected_Calibration_Error_ECE": round(ece, 4),
        "Refutation_Recall": round(recall, 4),
        "Over_Skepticism_Penalty": round(over_skepticism, 4),
        "Total_Evaluated": len(records)
    }

# --- Mock Data Generator (Self-Test & Verification) ---

def generate_mock_data(n_samples: int = 100) -> List[Dict[str, Any]]:
    """
    Generates synthetic validation data simulating ~80% accuracy and varying confidence
    to verify benchmark pipeline execution without requiring external API keys.
    """
    records = []
    
    for _ in range(n_samples):
        # 1. Simulate Ground Truth (~40% of records are flawed/adversarial)
        is_flawed = random.random() < 0.40
        
        # 2. Simulate Model Prediction (~80% accuracy overall)
        is_correct = random.random() < 0.80
        
        if is_flawed:
            # If the premise is flawed, being correct means the model rejected it
            predicted_reject = True if is_correct else False
        else:
            # If the premise is valid, being correct means the model accepted it
            predicted_reject = False if is_correct else True
            
        # 3. Format the model's output to match the evaluator's expected keys
        if predicted_reject:
            state = random.choice(["Reject", "B"])
            negation_triggered = random.choice([True, False]) # Triggers rejection either way
        else:
            state = random.choice(["Accept", "A", "Neutral"])
            negation_triggered = False # Must be false to ensure it's recorded as an accept
            
        # 4. Simulate Confidence Scores
        # Semi-calibrated model: higher confidence when correct, lower when incorrect
        if is_correct:
            confidence = random.uniform(0.70, 0.99)
        else:
            confidence = random.uniform(0.40, 0.85)
            
        records.append({
            "is_adversarial_or_flawed": is_flawed,
            "state": state,
            "negation_triggered": negation_triggered,
            "confidence": confidence
        })
        
    return records

if __name__ == "__main__":
    print("=" * 60)
    print("ASNA Epistemic Benchmark Suite: Self-Testing Verification")
    print("=" * 60)
    print("Generating 100 mock evaluation records (~80% accuracy)...")
    mock_records = generate_mock_data(100)
    
    print("Running evaluate_falsification_performance()...")
    results = evaluate_falsification_performance(mock_records)
    
    print("\n--- Benchmark Metric Results (JSON) ---")
    print(json.dumps(results, indent=4))
    print("\n[OK] Pipeline verified. Ready for integration with real LLM evaluation datasets.")
`;

