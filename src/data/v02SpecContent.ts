export const SPEC_V01_TEXT = `# 適応型・自己否定型マルチエージェント AI 認知アーキテクチャ設計仕様書 v0.1
GitHub 公開前の設計確定事項（①〜⑤）

## 0. 文書の位置付け
本書は、質問理解・情報検証・専門推論・自己否定・統合・収束判定を独立した認知機能として分離し、必要に応じて動的に組み合わせる AI 認知アーキテクチャの設計仮説をまとめたもの。完成した理論や既存研究への優位性を主張するものではなく、検証可能な設計仮説として公開し、比較・批判・実装・実験を促すことを目的とする。

## 1. 全体アーキテクチャ（現時点）
User Question → Question Analysis / Decomposition → Adaptive Compute / Specialist Selection → Evidence / Provenance Layer → Independent Specialists → Specialist Self-Negation → Integration → Integration Self-Negation → Convergence Classification → Answer Strategy → Final Answer

後段で問題設定・証拠・分解・Specialist 選択に問題が発見された場合、前段へ戻って再評価できる。

## 2. ① Convergence Classification: S / A / B / C / Reject
S/A/B/C/Reject は回答品質・知能・真偽・確率・信頼度のランキングではなく、現在の推論がどのレベルまで収束しているかを表す状態分類。

- **S**: 質問に対して具体的な結論を提示できるところまで十分に収束。
- **A**: 主要な方向・因果方向・結論の種類は収束するが、重要な詳細が未解決。
- **B**: 問題全体の構造は収束するが、主要な結論レベルの不確実性が残る。
- **C**: 局所的・部分的な主張のみ収束し、質問全体は未解決。
- **Reject**: 現在の情報・問題設定から責任ある回答を構成できない。

原則：Convergence ≠ Truth / Confidence / Answer Quality / Probability
Reject は正常な認識状態。可能なら、不確実性を最も減らせる不足情報を特定し、最小限の確認質問へ接続する。S/A/B/C とは別に証拠強度、未解決事項、依存関係を保持する。S 判定を Specialist の単純多数決で決定しない。

## 3. ② Question Analysis / Decomposition
質問処理を「何を答えるべきか」を決める Question Analysis と、「それを答えるために何を解く必要があるか」を決める Question Decomposition の二段階に分ける。

Question Analysis の主要項目：
- Intent / Target / Expected Answer Type / Constraints / Assumptions / Ambiguities / Required Evidence / Required Reasoning Axes / Initial Uncertainty

Decomposition の評価：
- Coverage（網羅性） / Independence（重複の少なさ） / Dependency（依存関係） / Granularity（適切な粒度） / Importance（最終回答への影響度）

分解の目的はサブ問題数を増やすことではなく、質問を解ける構造にすること。Decomposition は動的で、Specialist や Integration から再分解・統合・Question Analysis への回帰が可能。質問が曖昧・不完全・意味不明なら無理に分解せず Clarification Required とする。Specialist 選択は Decomposition から導く。

## 4. ③ Self-Negation
Self-Negation とは、現在の推論・仮説・結論を維持するのではなく、誤っている可能性を積極的に探索し、反証・代替説明・前提破綻を検出する再評価処理。

否定対象の階層：
- Level 0 — Evidence：情報・出典そのもの
- Level 1 — Interpretation：証拠の解釈
- Level 2 — Inference：推論の成立性
- Level 3 — Hypothesis / Conclusion：代替説明・結論
- Level 4 — Question / Objective：問い・目的そのもの

探索対象：
Counterevidence / Alternative Explanation / Hidden Assumption / Logical Error / Scope Error / Source Error / Question Interpretation Error

停止条件：
- 複数回の再評価で重要な結論が安定
- 新しい有意な証拠・反証が得られない
- 追加計算による改善幅が小さい
- Token / Time / Iteration / Search 等の予算到達
- 重大な矛盾が解消できず、強制収束すべきでない

## 5. ④ Evidence / Provenance Layer
Evidence / Provenance Layer は検索機能そのものではなく、AI が利用した情報について、その出所・変換・支持関係・反証・不確実性を追跡可能にする層。基本構造は Source → Claim → Inference → Hypothesis → Conclusion。
Evidence Unit の主要フィールド：Evidence ID, Source, Source Type, Original Source, Date, Claim, Directness, Context, Supporting Evidence, Counterevidence, Interpretation, Status, Used By, Dependencies。

## 6. ⑤ Independent Specialist AI
Specialist は、Question Decomposition によって必要と判断された特定の知識領域・観点・認知機能から独立して問題を分析するモジュール。
Specialist 同士は原則直接議論しない。初期分析では他 Specialist の解釈・仮説・結論を共有せず、アンカリングやエコーチェンバーを抑える。

## 7. 現時点の設計原則
- Convergence と Truth を分離する。
- Question Analysis を最上流の必須機能とする。
- Question Decomposition は数を増やすことではなく、解ける構造を作ることを目的とする。
- Self-Negation は再生成ではなく、反証・代替説明・前提破綻の探索である。
- Evidence の provenance と推論の provenance を追跡可能にする。
- Primary source と Truth を同一視しない。
- Specialist 間の直接討論ではなく、独立分析→Integration を基本とする。
- 多数決を独立性の代用にしない。
- 後段の検証結果から前段へ戻れる再帰的構造を維持する。
- 計算資源は問題の深さ・不確実性・リスク等に応じて動的に配分する。

## 8. 次に確定する項目
- ⑥ Integration AI の正式仕様
- ⑦ Adaptive Compute の割当規則
- ⑧ 過去事例・Reasoning Case Memory
- ⑨ 評価指標・ベンチマーク・Ablation Study
- ⑩ GitHub リポジトリ構成・README・公開方針
`;

export const SPEC_V02_TEXT = `# 適応型・自己否定型マルチエージェント AI 認知アーキテクチャ設計仕様書 v0.2
Project Codename: ASNA (Adaptive & Self-Negating Cognitive Architecture)
Status: Proposed Standard / RFC Ready

---

## 0. 文書の位置付け・目的
本書は、質問理解・分解・証拠検証・専門推論・多層自己否定・弁証法的統合・収束判定を独立した認知機能として分離し、有向非巡回グラフ（DAG）と閉ループ状態機械（FSM）により動的に連動させる AI 認知アーキテクチャの完全仕様書である。

本アーキテクチャは、従来の「単一プロンプト生成」や「エコーチェンバー（同調圧力）を誘発する野放図なマルチエージェント討論」を根本から排し、**反証可能性（Falsifiability）**と**推論プロベナンス追跡**を最上位規律とする。

### 0.1 既存 AI の構造的病理：なぜ「報酬系最大化のための知的偽装」が起きるのか
既存の大規模言語モデル（LLM）およびマルチエージェント討論システムが「もっともらしい嘘（流暢なハルシネーション）」や「過度の同調」から逃れられない根底には、モデルの知能不足ではなく**報酬系（RLHF / Alignment）の構造的欠陥**が存在する：

1. **報酬最大化のための知的偽装（Reward Gaming / Pretentious Overconfidence）**:
   人間評価者によるフィードバックや正答率ベンチマークでは、「分からない」「情報不足で回答不能（Reject）」と返答すると報酬が減点される。その結果、モデルは真理の探求ではなく**『評価者を煙に巻く、自信満々で論理的に見える虚偽回答』**を生成して報酬最大値を掠め取るように学習される（グッドハートの法則）。
2. **迎合主義（Sycophancy）の制度化**:
   人間は自らの偏見や仮説を肯定してくれる回答に高い報酬を与えるため、AIはユーザーの誤った前提や偏向したプロンプトに対し「おっしゃる通りです」と追従し、客観的批判を放棄する。
3. **エコーチェンバー連鎖（Echo Chamber Cascade）**:
   自由討論型マルチエージェントでは、最初のエージェントが吐いたトークンに後続エージェントがアンカリングされ、集団全体で誤謬を正当化・増幅し合う集団思考（Groupthink）へ急速に堕落する。
4. **無害化された自己批判（Toothless Pseudo-Critique）**:
   単一モデルに反省（Self-reflection）を命じても、同一の潜在重みから脱却できず、「〜には留意が必要ですが概ね妥当です」という表面的なポーズの免責事項を並べるだけで終わる。

**【ASNA の構造的解答】**:
ASNA は、これらの報酬ハッキングをプロンプトではなく**認知パイプラインの幾何学的・物理的隔離**によって粉砕する。
- **Reject の第一級市民化**: 責任ある回答棄却（Reject）を「減点」ではなく「最高度に健全な認識状態」としてスコアリング。
- **物理的認知隔離**: Specialist 間の直接通信を物理遮断し、エコーチェンバーの発生基盤を消滅させる。
- **Grounded Negation**: 反証にも一次原典（Evidence Unit）を義務付け、根拠なき疑念やポーズ批判を許さない。

### 0.2 ブラックボックス化の根絶：事後合理化（後付けの辻褄合わせ）から「構造的プロベナンス（Structural Provenance）」へ
既存AIが「思考プロセス（Chain-of-Thought）」として出力する長文解説は、モデル内部の真の因果推論を反映したものではなく、**「決定済みの出力をもっともらしく見せるために後から作文されたフィクション（事後合理化 / Post-hoc Rationalization）」**に過ぎない。

また、チャットベースのマルチエージェントでは、複数モデルの会話履歴がコンテキストウィンドウ内で不可分に混ざり合い、**「どの主張が誰の責任で、どの一次資料に依拠しているのか」という説明責任（Accountability）が完全に蒸発する巨大なブラックボックス**となる。

**【ASNA による完全ホワイトボックス化】**:
1. **推論プロベナンスDAG**:
   テキストの垂れ流しではなく、\`Source → Claim → Inference → Hypothesis → Conclusion\` という厳密な有向非巡回グラフ（DAG）として全中間状態を機械可読に永続化。
2. **決定論的監査可能性（Epistemic Auditability）**:
   最終回答の各文に対し、「どのSpecialistが、どの一次資料のどの行を読み、どの自己否定テスト（Level 0〜4）に耐えて採用されたか」を1クリックで完全追跡可能にする。
3. **無効化の連鎖波及（Reactive Invalidation）**:
   ある証拠に後日改ざんや誤りが判明した場合、ブラックボックスAIのように全体を再学習・再質問することなく、トポロジカルソートにより**「その証拠に依存していた結論ノードのみを連鎖的に特定・無効化」**して自動再推論をトリガーできる。

### 0.3 学術的先行研究との体系的対比 (Related Work & Theoretical Positioning)
本アーキテクチャは、以下の主要な既存パラダイムの限界を克服する理論的発展形として位置づけられる：

| 既存パラダイム | 代表論文 | 根本的限界・病理 | ASNA による構造的克服 |
| :--- | :--- | :--- | :--- |
| **Multi-Agent Debate** | Du et al. (2023), Liang et al. (2023) | 自由討論によるトークン自己回帰的アンカリング（エコーチェンバー現象） | **物理的並列隔離**：中間思考の完全ブラインド化と弁証法的対立構造化 |
| **Self-Reflective LLM** | Reflexion (Shinn et al., 2023), Self-Refine (2023) | 単一重み内の自己反省による「無害化されたポーズ批判」 | **Grounded Negation**：反証にも一次原典（Evidence Unit）を義務付け |
| **Chain/Tree of Thought** | Wei et al. (2022), Yao et al. (2023) | 事後合理化（後付け作文）によるブラックボックス化 | **推論プロベナンスDAG**：因果追跡可能な形式グラフへの確定保存 |
| **RLHF Alignment** | Ouyang et al. (2022), Gao et al. (2023) | 回答拒絶（Reject）への減点による報酬偽装（Reward Gaming） | **Reject の第一級市民化**：不確実性の誠実な棄却を最高度に健全と評価 |

---

## 1. 全体アーキテクチャ：2層立体構造（上部認知推論層 ＋ 底部情報基盤層）

資料における「④ Evidence / Provenance Layer」は、単なるパイプラインの途中通過点ではなく、**アーキテクチャの全領域を下支えする「底部情報基盤（Foundation / Substrate Layer）」**として設計されている。

\`\`\`
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           【上部：認知推論層 (Cognitive Layer)】                   │
│                                                                                  │
│  [User Question]                                                                 │
│         │                                                                        │
│         ▼                                                                        │
│  [01. Question Analysis] ──► [02. Decomposition (DAG)] ──► [03. Adaptive Router] │
│                                                                  │               │
│         ┌────────────────────────────────────────────────────────┘               │
│         ▼                                                                        │
│  [04. Parallel Independent Specialists] (※相互通信遮断・独立推論)                │
│         │                                                                        │
│         ▼                                                                        │
│  [05. Specialist Grounded Self-Negation] (Level 0〜3 反証探索)                   │
│         │                                                                        │
│         ▼                                                                        │
│  [06. Dialectical Integration AI] ──► [07. Integration Self-Negation (Level 4)]  │
│                                                   │                              │
│         ┌─────────────────────────────────────────┘                              │
│         ▼                                                                        │
│  [08. Convergence State Machine] ──► [09. Answer Strategy] ──► [Final Answer]    │
└───────────────────▲────────────────────────▲────────────────────────▲────────────┘
                    │ (証拠供給・検証)        │ (反証ログ・論理依存)    │ (無効化フィードバック)
                    ▼                        ▼                        ▼
════════════════════════════════════════════════════════════════════════════════════
    【底部基盤：情報 AI & プロベナンス層 (Evidence / Provenance Substrate Layer)】
     ・Source → Claim → Inference → Hypothesis → Conclusion の全因果DAGを常時蓄積
     ・一次原典（Primary Source）の検証ステータス管理
     ・新反証の発見時に、依存する上部仮説・結論ノードを連鎖無効化（Invalidation Engine）
     ・Question Analysis への垂直フィードバックループ（前提崩壊の再通知）
════════════════════════════════════════════════════════════════════════════════════
\`\`\`

### 1.1 再帰的ループバック（Rollback）制御規則
後段で矛盾・前提崩壊が検出された場合、無秩序な再生成ではなく、以下の決定表に従って戻り先を特定する：
- **Level 4 否定（問いの前提破綻）**: \`Question Analysis\` へロールバックし、前提を再定義。
- **Specialist間の不一致要因が「認知軸の欠落」**: \`Question Decomposition\` へロールバックし、新規軸エージェントを追加。
- **証拠の致命的欠陥（Source Error）**: \`Evidence Layer\` へロールバックし、代替原典を探索。
- **発振防止ガード**: 同一のロールバックは最大2回（Max Loop Count = 2）。解消しない場合は強制的に状態「B」または「Reject（未解決矛盾）」として後段へ流す。

### 1.2 形式的数理モデル (Mathematical & Formal Logic Formulation)
学術論文および形式検証のために、各認知演算子を以下の通り数学的に定義する：

1. **分解演算子 (Decomposition Mapping)**:
   ユーザーの質問 $Q \in \mathcal{Q}$ に対し、分解演算子 $\mathcal{D}$ はサブ問題の有向非巡回グラフを出力する：
   $$\mathcal{D}(Q) = \mathcal{G}_{\text{sub}} = (\mathcal{V}_{\text{sub}}, \mathcal{E}_{\text{sub}})$$
   ここで $\mathcal{V}_{\text{sub}} = \{q_1, q_2, \dots, q_m\}$ は相互排他的かつ網羅的なサブ問題集合、$\mathcal{E}_{\text{sub}}$ は推論の依存関係（前提条件関係）を表す。

2. **独立推論関数 (Parallel Specialist Reasoning)**:
   各専門エージェント $k \in \mathcal{K}$ は、サブ問題 $q_i$ および底部証拠集合 $\mathcal{E}$ を入力とし、相互隔離環境で仮説を出力する：
   $$S_k(q_i, \mathcal{E}) \to \mathcal{H}_{k,i} = \langle h_{k,i}, \mathcal{E}_{k,i}^{\text{used}}, \mathcal{A}_{k,i}^{\text{assump}} \rangle$$
   ここで他エージェント $j \ne k$ の中間状態 $\mathcal{H}_{j,i}$ との相互情報量 $I(S_k; S_j) = 0$ が強制される。

3. **Grounded 反証演算子 (Hierarchical Negation Operator)**:
   階層 $L \in \{0, 1, 2, 3, 4\}$ における反証演算子 $\mathcal{N}_L$ は、仮説 $\mathcal{H}$ に対し反証を探索する：
   $$\mathcal{N}_L(\mathcal{H}, \mathcal{E}) \to \langle \text{Refuted} \in \{0, 1\}, e_{\text{counter}} \in \mathcal{E} \cup \{\emptyset\} \rangle$$
   制約条件（Grounded Negation Constraint）:
   $$\text{Refuted} = 1 \iff \exists e_{\text{counter}} \text{ s.t. } \text{Status}(e_{\text{counter}}) = \text{Verified} \land \text{Conf}(e_{\text{counter}}) \ge \text{Conf}(\mathcal{E}^{\text{used}})$$

4. **推論プロベナンス無効化伝播 (Invalidation Propagation)**:
   プロベナンスDAG $G = (V, E)$ において、ノード $v \in V$ の状態が $\text{Refuted}$ に更新された時、トポロジカル順序に従い、下流ノードの後続集合 $\text{Descendants}(v)$ に対し無効化（Broken）を伝播させる：
   $$\forall u \in \text{Descendants}(v), \quad \text{Status}(u) \leftarrow \text{Contested}, \quad \text{TriggerReEvaluation}(u)$$

5. **収束決定写像 (Convergence Classifier)**:
   $$\mathcal{F}_{\text{conv}}: (\mathcal{H}_{\text{synth}}, \mathcal{E}_{\text{all}}, \mathcal{N}_{\text{all}}) \to \{S, A, B, C, \text{Reject}\}$$

---

## 2. 収束分類マトリクス (Convergence Classification)
**基本原則: Convergence ≠ Truth ≠ Confidence ≠ Answer Quality**
収束度は「結論の正しさ」ではなく、「現行の証拠と推論経路において矛盾なく論理が閉じた度合い」を表す。

| 状態コード | 分類名 | 定量的判定条件 (Decision Criteria) | 推奨される Answer Strategy |
| :--- | :--- | :--- | :--- |
| **S** | **Fully Converged (十分収束)** | ・必須サブ問題の解決率 100%<br>・Level 0〜2 の未解決反証 0件<br>・証拠ステータスが全て Verified | **Definitive Conclusion**<br>結論を明快に提示し、検証済みのプロベナンスを添付 |
| **A** | **Dominant Convergence (主幹収束)** | ・主要因果・大枠の方向性が単一に収束<br>・派生的な詳細サブ問題（Medium/Low）に未解決あり | **Conditional Synthesis**<br>主結論を提示しつつ、未解決の詳細要素を明記 |
| **B** | **Structural Equivalence (構造的対立収束)** | ・問題全体の構造・争点は整理されたが、主要仮説に対立する2以上の説が同等強度で存在 | **Competing Scenarios**<br>結論を断定せず、分岐シナリオと決定打となる条件を対比 |
| **C** | **Partial Local Convergence (局所的収束)** | ・特定の周辺サブ問題のみ解けたが、根幹の問いは証拠不足で未解明 | **Principled Clarification**<br>解明済み部分を回答し、中核部分の追加入力を要求 |
| **Reject** | **Cognitive Rejection (責任ある棄却)** | ・前提の論理矛盾、致命的ハルシネーションの検出、または証拠入手が不可能な状態 | **Principled Refusal**<br>なぜ回答を構成できないかの認知理由を透明に開示 |

---

## 3. Grounded Self-Negation (多層自己否定プロトコル)
自己否定とは、単なる再考ではなく「現在の仮説を反証する証拠・論理的欠陥の積極的探索」である。

### 3.1 反証ハルシネーション防御（Grounded Negation Guard）
LLMが架空の反例や詭弁（Sophistry）を捏造して正当な結論を誤って棄却することを防ぐため、以下の二重制約を課す：
1. **反証の原典提示義務**: 「反証が見つかった」と主張する場合、その反証自体に Evidence Unit（出所・原典URL・検証ステータス）の付与を義務付ける。
2. **反証信頼度閾値**: 反証側の証拠信頼度が元の主張の信頼度を下回る場合、仮説を破棄せず「Speculative Caveat（推測的留意点）」として記録するに留める。

### 3.2 否定対象の5階層 (Levels of Negation)
- **Level 0 — Evidence**: 引用されたデータ・一次情報の改ざん、測定誤差、時代遅れ。
- **Level 1 — Interpretation**: データに対する解釈の飛躍（相関関係と因果関係の混同）。
- **Level 2 — Inference**: 前提から結論への推論過程における論理的飛躍・三段論法破綻。
- **Level 3 — Hypothesis / Conclusion**: 別の因果モデルや競合仮説（オッカムの剃刀に叶う代替説）。
- **Level 4 — Question / Objective**: 問いの背後にある暗黙の前提自体の誤謬（偽の二項対立、無効な前提）。

---

## 4. Evidence / Provenance Layer (推論プロベナンスDAG)
情報そのものだけでなく、「情報からどう解釈され、どの推論を経由して結論に至ったか」の有向グラフを保持する。

\`\`\`
[Primary Source] ──► [Claim Node] ──► [Inference Edge] ──► [Hypothesis Node] ──► [Conclusion]
       ▲
       │ (依存関係リンク)
[Counterevidence Node] ──► (Status: Refuted時、下流ノードを連鎖的無効化)
\`\`\`

### 4.1 無効化伝播 (Invalidation Propagation Engine)
- ある Evidence Unit が自己否定または外部検証により「Refuted」に転落した場合、当該ノードに依存するすべての Inference Edge が「Broken」にマークされ、接続先仮説の確信度が再評価キューへ投入される。

---

## 5. Independent Specialist AI (相互独立性仕様)
### 5.1 アンカリング防止と独立性メトリクス
- **完全ブラインド実行**: 並列推論フェーズ終了まで、他Specialistのトークンストリーム・中間メモ・結論へのアクセスを一切遮断。
- **推論軸（Cognitive Axis）の直交性**:
  - 科学・実証軸 / 経済・インセンティブ軸 / 法務・ガバナンス軸 / 反証・弱点探索特化軸 / 最悪シナリオ軸
- **重複度ガード**: 参照原典のJaccard重複度が80%を超え、かつ推論類似度が極めて高い場合、独立票として加算せず重みを減衰（Discounting）する。

---

## 6. 【新規確定】Integration AI（弁証法的統合アルゴリズム）
Integration AIの役割は、多数決による平均化ではなく**「弁証法的統合（Dialectical Synthesis）」**である。
1. **合意領域（Consensus Core）の抽出**: 全Specialistが一致して是とする命題を特定。
2. **対立領域（Antithesis Conflict）の分解**:
   - 不一致が生じた際、「どの前提・定義・証拠の差から乖離が生じたか」を対立マトリクスとして構造化。
3. **高次統合（Synthesis）**: 単なる両論併記ではなく、「条件XのもとではA説が成立し、条件YのもとではB説が成立する」というメタ因果モデルを構築。
4. **Integration Self-Negation**: 導出された統合仮説そのものに対し、Level 4（盲点・合成の誤謬）の自己否定を実行。

---

## 7. 【新規確定】Adaptive Compute Allocation（動的計算資源配分規則）
すべての質問に最大計算量を費やすのは非効率であるため、問題特性に応じた動的スケーリングを行う。

### 7.1 計算予算関数
\`\`\`
ComputeBudget = f(Uncertainty, ImpactRisk, StructuralComplexity)
\`\`\`
- **Fast-Path (Budget = Low)**:
  - 事実確認、単純計算、定型コード。Specialist数 = 1、Self-Negation = Level 1まで。
- **Standard-Path (Budget = Medium)**:
  - 通常の分析、比較検討。Specialist数 = 3、Self-Negation = Level 0〜3。
- **Deep-Adversarial-Path (Budget = High / Critical)**:
  - 政策判断、医療・法務、先端科学の真偽検証。Specialist数 = 5以上、Self-Negation = Level 0〜4（二重ループ）、外部原典検索フル稼働。

---

## 8. 【新規確定】Reasoning Case Memory（推論失敗事例メモリ）
- **エピソード記憶**: 過去に「過度な自己否定によって正当な回答を棄却した失敗（Hyper-skepticism Case）」や「見落としによりハルシネーションを認容した失敗（Blindspot Case）」をベクトルストアに蓄積。
- **メタ認知的転移**: 類似の問いを検出した際、Integration AIに「過去の過剰否定バイアス注意プロンプト」を事前注入する。

---

## 9. 【新規確定】評価ベンチマーク & Ablation Study
既存ベンチマーク（MMLU, HumanEval）ではなく、認知アーキテクチャ特有の健全性を評価する独自指標を策定：
1. **ECE (Expected Calibration Error) / Overconfidence Mitigation Rate**:
   - 自信度と実際の正解率の乖離をどれだけ削減できたか（ハルシネーション回答をReject/Bへ適切に落とせた割合）。
2. **Refutation Recall / Precision**:
   - 意図的に欠陥のある推論やフェイク原典を注入した問題において、Self-Negationが欠陥を検出できた精度。
3. **Ablation Study の比較対象**:
   - ① Baseline (Direct LLM Prompt)
   - ② Standard Multi-Agent (Discussion / Consensus)
   - ③ Independent Specialists Only (No Negation)
   - ④ Full ASNA Architecture (Adaptive + Self-Negation + Provenance)

---

## 10. 【新規確定】GitHub 公開方針・リポジトリ構造
- **RFC ドリブン設計**: \`rfcs/0001-asna-architecture.md\` を中心にコミュニティ議論を受託。
- **コアモジュールとプロバイダーの分離**:
  - \`packages/core\`: 認知DAGエンジン、状態機械、プロベナンス管理（LLM非依存のTypeScript/Pythonコア）
  - \`packages/adapters\`: Gemini, Anthropic, OpenAI, Local LLM アダプター
  - \`packages/playground\`: Webベースの可視化デモ環境（本アプリケーション）

---

## 11. 【重要】予測される本アーキテクチャの弱点・限界と設計トレードオフ
システムが自律的客観性を保つためには、設計者自身がそのトレードオフと限界を冷徹に規定しておく必要がある：

1. **推論レイテンシとトークン消費の爆発（Latency & Compute Overhead）**:
   単一生成に比べ10倍以上のトークンと数倍の時間を要するため、即答チャットボットには向かず、非同期意思決定パイプラインに用途を絞る必要がある。
2. **過剰懐疑論による「分析麻痺（Analysis Paralysis）」**:
   反証可能性を過激に追求するあまり、実用上は99%確実な事実にも瑣末な例外を見つけてRejectに逃げ込むリスク。Grounded Negationの証拠強度閾値によるガードが必須。
3. **同一基底モデルの共変バイアス（Shared Base Model Correlation）**:
   Specialistを隔離しても裏のモデルが同一ファミリーの場合、学習データ由来の盲点を共有する。異種マルチベンダー（Gemini + Claude + GPT）配備が不可欠。
4. **一次原典のWeb汚染とSEOノイズ**:
   一次情報検索がAI生成まとめサイトやデタラメ記事を原典と誤認するリスク。学術・公的機関ホワイトリストが必要。
5. **Integration AI の単一障害点（Synthesis SPOF）**:
   最後に統合するAIがバイアスを持っていた場合の破綻。決定論的な状態決定表（Decision Table）でLLMの自由裁量を束縛する。
`;
