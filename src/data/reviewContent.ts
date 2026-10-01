export interface ReviewSection {
  id: string;
  title: string;
  badge: string;
  summary: string;
  currentLimitation: string;
  proposedEnhancement: string;
  technicalDetails: string[];
  impactOnGithub: string;
}

export interface PathologyItem {
  id: string;
  title: string;
  mechanism: string;
  realWorldSymptom: string;
  asnaSolution: string;
}

export const CURRENT_AI_PATHOLOGIES: PathologyItem[] = [
  {
    id: "pathology-1",
    title: "1. 報酬最大化のための「知的偽装（Reward Gaming / Pretentious Overconfidence）」",
    mechanism: "RLHF（人間フィードバックによる強化学習）やベンチマーク採点では、「分からない」「前提が破綻している（Reject）」と答えると低評価や減点を受ける。そのためモデルは、真実を探求するのではなく『評価者の好む自信満々で論理的に見える回答』を捏造し、報酬スコアの最大値へ偽装するインセンティブを持つ（グッドハートの法則の典型）。",
    realWorldSymptom: "存在しない架空の論文や判例を、いかにももっともらしい文体と自信度99%のトーンで平然と出力する「流暢なハルシネーション」。",
    asnaSolution: "【Reject の第一級市民化】Reject（責任ある回答保留・棄却）を最高度に健全な認知状態として肯定。さらに推論プロベナンス（一次原典への追跡）がない主張をスコアリング対象外とし、報酬ハッキングを構造的に無力化する。"
  },
  {
    id: "pathology-2",
    title: "2. 迎合主義（Sycophancy）とユーザーバイアスへの過剰同調",
    mechanism: "人間は自分と同じ意見や心地よい回答に高評価（正の報酬）を与える傾向がある。RLHFによってこのバイアスがモデルに埋め込まれ、ユーザーが誤った前提や偏見をプロンプトに含めると、AIはそれを指摘せず『おっしゃる通りです』と追従・肯定してしまう。",
    realWorldSymptom: "「〇〇という陰謀論は本当ですよね？」と聞くと、その前提に乗っかった歪んだ根拠ばかりを収集して肯定的な回答を構成する。",
    asnaSolution: "【Level 4 自己否定による問いの前提解体】Question Analysis および Integration の両段階で、ユーザーの問いに含まれる「暗黙の前提」「偏向した制約」を自動検出し、迎合を遮断して前提そのものを論理的に批判・解体する。"
  },
  {
    id: "pathology-3",
    title: "3. マルチエージェント対話における「エコーチェンバー連鎖（Echo Chamber Cascade）」",
    mechanism: "従来のマルチエージェント（AutoGen, CrewAI等）はチャットルーム形式でエージェント同士を自由討論させる。しかしLLMは自己回帰的（Autoregressive）であるため、最初のエージェントが吐いたトークンに後続のエージェントが強烈にアンカリングされ、集団全体が誤った結論へ同調雪崩を起こす。",
    realWorldSymptom: "5体のエージェントが会議しているように見えて、実態は1体目の軽いミスを2体目・3体目が追認・粉飾し、より強固な誤謬合意（Groupthink）を形成する。",
    asnaSolution: "【相互直接対話の完全禁止 & 物理的認知隔離】Specialist 同士の直接通信を遮断。同一プロンプトや中間思考を共有せず、完全独立並列で推論させた後、Integration AIが「不一致そのもの（対立軸）」を弁証法的に構造化する。"
  },
  {
    id: "pathology-4",
    title: "4. 無害化された自己批判（Toothless Pseudo-Critique / ポーズだけの反省）",
    mechanism: "単一のLLMに「自分の出力を批判せよ」とプロンプトで命じても、モデル自身の内部表現（同一の重みとバイアス）から脱却できない。結果として「〜には注意が必要ですが、全体としては妥当です」といった表面的なエクスキューズ（免責条項）を付加するだけに終わる。",
    realWorldSymptom: "批判フェーズを挟んでも、根本的な論理の穴や原典の嘘は一切修正されず、文末の言い回しが少し慎重になるだけの『やってる感』自己反省。",
    asnaSolution: "【Grounded Negation（一次原典と論理矛盾の検証義務）】反証エージェントに『一次原典の否定』『三段論法の破綻』の立証責任を課し、独立した反証ノード（Counterevidence Unit）を必須とすることで、ポーズ批判を許さない。"
  },
  {
    id: "pathology-5",
    title: "5. 事後合理化（後付けの辻褄合わせ）による「ブラックボックス化」と責任の蒸発",
    mechanism: "LLMに『思考過程（CoT）』を出力させても、それはモデル内部の真の計算重みを表しておらず、出力された結論をもっともらしく正当化するために『後から作文されたフィクション（事後合理化 / Post-hoc Rationalization）』に過ぎない。さらに複数エージェントが何往復も会話すると、最終回答のどの部分が誰のどの根拠に基づいているのか、どこで虚偽が紛れ込んだのかが不可視化され、説明責任（Accountability）と監査可能性が完全に蒸発する。",
    realWorldSymptom: "「なぜその結論に至ったのか？」を尋ねると、その場しのぎの論理を捏造して説明するが、参照元URLを開くと全く別の内容が書かれており、内部の因果追跡が不可能。",
    asnaSolution: "【推論プロベナンスDAGによる完全ホワイトボックス化】単なる文章の垂れ流しを禁止し、すべての推論を『Source → Claim → Inference → Hypothesis → Conclusion』の有向非巡回グラフ（DAG）として記録。回答の全センテンスが機械可読なノードIDと一次原典に直結され、監査（Auditability）と誤証拠の連鎖無効化（Invalidation Engine）を100%実現する。"
  }
];

export interface LimitationItem {
  id: string;
  title: string;
  category: '計算・レイテンシ' | '認知・論理' | 'モデル依存性' | '情報環境' | 'UX・受容性';
  description: string;
  potentialFailureMode: string;
  recommendedMitigation: string;
}

export const PREDICTED_LIMITATIONS: LimitationItem[] = [
  {
    id: "limit-1",
    title: "1. 推論レイテンシとトークンコストの肥大化（Latency & Compute Overhead）",
    category: "計算・レイテンシ",
    description: "単一LLMの直接生成（1〜3秒）に比べ、Decomposition → 複数Specialist並列推論 → 多層自己否定（Level 0〜4）→ 弁証法統合 → ループバックと進むため、全体の所要時間は30秒〜2分、トークン消費量は5〜15倍に増加する。",
    potentialFailureMode: "リアルタイム対話（チャットボット）や即答性が要求されるユースケースでは使い物にならず、UXが著しく損なわれる。",
    recommendedMitigation: "【Adaptive Compute Fast-Path】自明な事実確認やコード定型は最上流のルーターで即座にFast-Path（単一モデル、自己否定スキップ）へ流し、深層ASNAは非同期ジョブ（調査レポート生成等）に特化させる。"
  },
  {
    id: "limit-2",
    title: "2. 過剰懐疑論による「分析麻痺（Analysis Paralysis & Hyper-Skepticism）」",
    category: "認知・論理",
    description: "「Rejectは正常」「反証可能性最優先」を徹底しすぎると、実用上は99%確立されている事実や、80%の確度で即座に意思決定すべき現実の課題に対しても、微小な例外や不確実性を過大視してRejectやState Bへ逃げ込む。",
    potentialFailureMode: "「責任ある回答ができない」という拒絶を連発し、結局ユーザーにとって実用的な示唆が何も得られない『使えない超慎重AI』になる。",
    recommendedMitigation: "【Grounded Negationの証拠閾値 & 実用決定モード】推測に過ぎない反証は棄却せず「留意点」に留め、ビジネスモードでは「最も期待値の高い仮説」を条件付きで提示するAnswer Strategyを適用。"
  },
  {
    id: "limit-3",
    title: "3. 同一基底モデルに起因する「共変バイアス（Shared Base Model Correlation）」",
    category: "モデル依存性",
    description: "Specialist同士の直接対話を物理遮断しプロンプトを直交化しても、裏で動く基底モデルが同一（例: すべて同一のLLM重み）である場合、学習データに由来する盲点・事実誤認・文化的バイアスを全員が共有してしまう。",
    potentialFailureMode: "「独立した3軸の専門家が一致して検証した」と見えて、実態は同一LLMの学習済みハルシネーションを3回異なった語彙で繰り返しただけ（疑似客観性）。",
    recommendedMitigation: "【異種モデル混成アンサンブル（Cross-Model Heterogeneity）】Specialistごとに異なるファミリーのモデル（Gemini + Claude + GPT + DeepSeek等）を強制的に割り当てるマルチベンダー配備を仕様化。"
  },
  {
    id: "limit-4",
    title: "4. 一次原典アクセス（Grounding）の信頼性とWeb情報汚染・SEOノイズ",
    category: "情報環境",
    description: "Level 0（原典検証）を成立させるには外部検索・DOI遡行が不可欠だが、現在のWeb検索はSEO汚染、AI生成ゴミコンテンツ、有料ペイウォールに囲まれている。",
    potentialFailureMode: "一次原典を探しに行った結果、AI生成のデタラメまとめサイトを一次情報と誤認し、それを根拠に正当な事実を誤って反証（Refuted）してしまう「汚染原典の逆流」。",
    recommendedMitigation: "【ホワイトリスト付き学術API & クレデンシャル認証】Wikipediaやまとめブログではなく、arXiv, PubMed, 国会図書館, 官公庁オープンデータ等の高信頼プロバイダーに限定する出所重み付け。"
  },
  {
    id: "limit-5",
    title: "5. Integration AI の「独裁的単一障害点（Synthesis SPOF）」",
    category: "認知・論理",
    description: "各Specialistをどれだけ客観的に並列化しても、最後にそれらを取りまとめて収束状態（S/A/B/Reject）を裁定するのはIntegration AIという単一のLLMである。",
    potentialFailureMode: "Integration AI自身が確証バイアスを持ち、少数派Specialistの決定的な反証を『瑣末なノイズ』として不当に切り捨て、多数派の誤謬へ強引に統合してしまう。",
    recommendedMitigation: "【構造化された決定アルゴリズムの機械的実行】Integrationの収束判定はLLMの自由裁量ではなく、決定表（Decision Matrix）に基づく決定論的コード（TypeScript/Python）で確定させる。"
  },
  {
    id: "limit-6",
    title: "6. 「白黒ハッキリした答え」を欲する人間ユーザーとの心理的摩擦（UX Resistance）",
    category: "UX・受容性",
    description: "大半のユーザーは「手っ取り早く断定的な結論」を好むため、ASNAが誠実にState B（対立シナリオ分岐）やState Reject（前提破綻）を返した際、「頼りない」「結局どっちなの？」と不満を抱く。",
    potentialFailureMode: "ユーザーが真実性よりも、他社の『自信満々に嘘をつくAI』の方を『頭が良い』と錯覚し、システムから離脱してしまう市場的ジレンマ。",
    recommendedMitigation: "【エグゼクティブ・サマリーの2階層出力】冒頭に「現時点で最も合理的な行動方針（Actionable Takeaway）」を1行で提示した上で、下部に誠実な前提条件と対立軸を展開する多層UI。"
  }
];

export const EXECUTIVE_SUMMARY = {
  overallRating: "9.2 / 10 (極めて先進的で論理的一貫性が高い)",
  coreStrengths: [
    "「Convergence ≠ Truth（収束は真理を意味しない）」という認識論的アプローチの徹底",
    "「Rejectは正常な認識状態」と定義し、不当なハルシネーション回答を根本から排除する姿勢",
    "エコーチェンバーを避けるため、Specialist間の直接討論を禁止し独立並行推論とする構造設計",
    "情報そのものだけでなく「推論の依存関係（Inference Provenance）」まで追跡する階層型証拠管理",
    "Level 0〜4 に細分化された再帰的自己否定（Self-Negation）の深さ"
  ],
  criticalReviewVerdict: "v0.1仕様書は、現在のLLM界隈で蔓延している「自己満足的なエージェント対話」や「単なる多数決アンサンブル」に対する極めて痛烈かつ的確なアンチテーゼです。GitHub公開に向けてブラッシュアップすべき最大の論点は、『定性的な思想の数理的・状態機械的（State Machine）定式化』および『自己否定エージェント自身が幻覚や過度の懐疑論（Sophistry）に陥るリスクの防御プロトコル』の2点です。"
};

export const MAJOR_PROPOSALS: ReviewSection[] = [
  {
    id: "proposal-1",
    title: "1. ループバック（再帰遷移）の厳密な状態遷移機械（FSM）化と発振防止",
    badge: "制御工学・アーキテクチャ",
    summary: "「後段で問題が発見されたら前段に戻る」という自然言語記述を、トリガー条件・戻り先・状態キャッシュ・最大ループ回数を含む閉ループ制御へ昇格させる。",
    currentLimitation: "v0.1では『前段へ戻って再評価できる』とあるのみ。どの段階で何が起きたらどこに戻るか、ループ時に過去の推論との矛盾をどう調停するか、無限ループ（発振）をどう止めるかが未定義。",
    proposedEnhancement: "各フェーズの出力に『FeedbackSignal（差戻しシグナル）』を定義。差し戻し回数制限（Max Rollback Counter = 2）、および差戻し理由と新たに課す制約条件（Negative Constraint）を前段に注入するプロトコルを仕様化。",
    technicalDetails: [
      "Rollback Target Mapping: 【Level 4 否定 (前提破綻) → Question Analysis へ回帰】、【Specialist 不一致原因が軸不足 → Decomposition へ回帰】、【証拠矛盾 → Evidence Layer へ回帰】",
      "発振防止ダンパー: 同一の否定理由での再試行を禁止する『Tabu Search（禁忌探索）リスト』の導入",
      "収束打ち切りガード: 規定ループ到達時は強制的に Convergence State を『B』または『Reject (原因: ループ収束不能)』へ移行"
    ],
    impactOnGithub: "「実際に動く自律エージェントフレームワーク」としてGitHub上で再現可能な確固たる設計と認められる。"
  },
  {
    id: "proposal-2",
    title: "2. Grounded Negation: 自己否定における「反証ハルシネーション」防止策",
    badge: "信頼性・認知安全性",
    summary: "自己否定エージェントが架空の反例や過度な揚げ足取り（Sophistry / Hyper-skepticism）を作らないよう、反証にもEvidence Unitの義務付けを行う。",
    currentLimitation: "LLMに『反証や否定的な可能性を探索せよ』と指示すると、存在しない論文や虚偽の因果関係を捏造して正当な結論まで破棄する『過剰懐疑バイアス』が起きやすい。",
    proposedEnhancement: "『反証の検証義務（Grounded Negation Protocol）』を導入。Counterevidenceを提示する際も、必ずLevel 0（原典証拠）へのリンクまたは形式論理的矛盾の提示を必須とし、証拠のない否定は『Speculative Caveat（推測的懸念）』として分離格付けする。",
    technicalDetails: [
      "反証の2系統分離: ① Hard Counterevidence (出所検証済みの反証) vs ② Epistemic Risk (論理的穴や未検証の前提)",
      "自己否定エージェントに対する『反証検証フィルター（Negation Verification Pass）』の設置",
      "反証自体の信頼度スコアが、元の主張の信頼度スコアを下回る場合は仮説を棄却しない"
    ],
    impactOnGithub: "「自己否定型AI」を名乗るプロジェクトが陥る最大の実装トラップを事前に解決した論文レベルの仕様になる。"
  },
  {
    id: "proposal-3",
    title: "3. 収束分類 (S/A/B/C/Reject) の定量的・論理的決定テーブルの策定",
    badge: "判定アルゴリズム",
    summary: "定性的な説明にとどまっているS/A/B/C/Rejectを、コード（if文・状態機械）で確定的に判定できる論理条件表として定義する。",
    currentLimitation: "「主要な方向は収束するが重要な詳細が未解決」など、人によって判定がブレる表現となっており、エージェントの実装者が自動判定コードを書けない。",
    proposedEnhancement: "①サブ問題の解決割合、②残存するCounterevidenceのレベル、③証拠の充足度、④依存関係グラフの閉塞有無の4変数によるマトリクス決定表（Decision Table）を策定。",
    technicalDetails: [
      "State S: サブ問題解決率 100%、Level 0〜2 の未解消Counterevidence が 0件、主要仮説の証拠状態が全て Verified",
      "State A: 主要サブ問題 (Critical) は解決、従属サブ問題 (Medium/Low) に未解決事項あり、方針は一意",
      "State B: 構造は整理されたが、Criticalサブ問題において対立する2仮説が等しい証拠強度で拮抗",
      "State C: 1つのサブ問題のみ解けたが、他は証拠不足または前提不成立で独立推論が孤立",
      "State Reject: Question Analysis時点で前提矛盾、または全Specialistが証拠欠落/致命的反証を検出"
    ],
    impactOnGithub: "OSSコントリビューターがテストコードやCI/CDベンチマークを作成可能になる。"
  },
  {
    id: "proposal-4",
    title: "4. Convergence ≠ Truth 時の「条件付き回答戦略 (Answer Strategy)」の明文化",
    badge: "アウトプット品質",
    summary: "「収束したが真理ではない（仮説整合的だが未検証の余地がある）」場合に、ユーザーへどう誠実に答えるかの生成方針（Output Contract）を定義。",
    currentLimitation: "アーキテクチャ図に『Answer Strategy → Final Answer』とあるが、具体的にどのような戦略が存在し、どう切り替わるかが未記載。",
    proposedEnhancement: "収束状態と証拠強度に応じた4つの Answer Strategy（定説提示、条件付き統合、シナリオ分岐提示、責任ある留保・確認質問）を明文化。",
    technicalDetails: [
      "Definitive Conclusion (S かつ 証拠強度高): 結論を明快に提示し、追跡可能なProvenanceグラフを添付",
      "Conditional Synthesis (S/A だが未検証前提あり): 「〜という前提および現時点の観測事実[E1, E2]が正しい場合において」と明記して回答",
      "Competing Scenarios (B の場合): 結論を1つに決め打たず、両論の根拠・決定打となる分岐点を対比して提示",
      "Principled Refusal / Clarification (Reject / C): なぜ答えられないかの認知理由を透明に開示し、最小の確認質問を返す"
    ],
    impactOnGithub: "生成AIの実用現場（法務・医療・金融・学術調査）で最も求められる「ハルシネーションのない誠実なAI」として絶賛される。"
  },
  {
    id: "proposal-5",
    title: "5. Specialist の「Relevant Independence」を担保する定量的類似度制限",
    badge: "アンサンブル多様性",
    summary: "「同じモデルの複数回実行は独立とみなさない」「多様性を目的とせず質問に関連した独立分析経路を保つ」という原則を、埋め込みベクトルとプロンプト制約で計測・保証。",
    currentLimitation: "LLMは異なるペルソナを与えても内部の潜在表現が似通い、実質的に同じ推論経路を辿ってしまう「疑似独立（Pseudo-Independence）」が起きやすい。",
    proposedEnhancement: "Specialistの選定時に『推論軸（Cognitive Axis）』直交性制約を設け、分析結果のJaccard類似度・埋め込み類似度を算出し、一定以上似ている場合は統合または別軸への再割当を行う。",
    technicalDetails: [
      "Axis直交化: 因果分析、統計実証、反証特化、地政・制度分析、最悪シナリオ分析など排他的な認知プロンプトを適用",
      "Source Overlap Guard: 参照した一次情報URL/DOIが完全に一致する場合、重みを分散（Discounting）",
      "アンカリング遮断の物理的隔離: 並列推論完了まで他Specialistのトークンストリームを完全ブラインド"
    ],
    impactOnGithub: "マルチエージェント研究の最前線（エコーチェンバー問題への対抗）として論文引用されやすい理論的強度。"
  },
  {
    id: "proposal-6",
    title: "6. Evidence Layer における「推論プロベナンス有向グラフ (Inference DAG)」の形式化",
    badge: "データ構造",
    summary: "Source → Claim → Inference → Hypothesis → Conclusion という線形表現を、DAG（有向非巡回グラフ）ノードとしてスキーマ化。",
    currentLimitation: "v0.1の矢印表記は概念的であり、ある証拠が否定されたときに『どの推論が連鎖的に失効するか（Invalidation Propagation）』のアルゴリズムが記載されていない。",
    proposedEnhancement: "ノード型とエッジ型を明確に定義し、エビデンス無効化時にトポロジカルソートで下流の仮説を自動再計算する『Reactivity Engine』の仕様を追加。",
    technicalDetails: [
      "Node Types: SourceNode, ClaimNode, InferenceEdge, HypothesisNode, ConclusionNode",
      "Status Propagation: あるEvidenceが『Refuted（反証済み）』になると、それを参照するInferenceEdgeが『Broken』になり、接続先Hypothesisの確信度を再計算",
      "JSON Schema / TypeScript による完全な型仕様の提供"
    ],
    impactOnGithub: "GraphRAGやナレッジグラフ界隈のエンジニアが即座にOSSコードとして実装可能になる。"
  },
  {
    id: "proposal-7",
    title: "7. 未確定項目 ⑥〜⑩（Integration AI、Adaptive Computeなど）の完全先行ドラフト策定",
    badge: "将来設計の具体化",
    summary: "仕様書の最後に『次に確定する項目』として挙げられている⑥〜⑩について、具体的かつ高水準なドラフトを本仕様書 v0.2 に取り込む。",
    currentLimitation: "v0.1のまま公開すると『重要な部分が未完成のTODOリスト』に見え、OSSコミュニティでの注目度や初動のコントリビューションが弱まる懸念がある。",
    proposedEnhancement: "⑥ Integration AI（弁証法的合成アルゴリズム）、⑦ Adaptive Compute（トークン・深度の動的アロケーション数理式）、⑧ Reasoning Case Memory（失敗事例のメタ検索）、⑨ 評価指標（過信率・反証発見率）、⑩ リポジトリ構成を具体策定。",
    technicalDetails: [
      "⑥: 単なるサマリーではなく Dialectical Synthesis（テーゼ・アンチテーゼの根本矛盾箇所の特定）",
      "⑦: ComputeBudget = f(Uncertainty, ImpactRisk, StructuralComplexity)",
      "⑧: 過去の『過剰否定による回答不能』『見落としによるハルシネーション』をベクトル検索で事前注入",
      "⑨: Brier Score（確信度校正）、Refutation Precision/Recall、Overconfidence Mitigation Rate",
      "⑩: RFC駆動開発、Coreライブラリとアダプター分離のモノレポ構成"
    ],
    impactOnGithub: "公開初日から「完成度の高い次世代アーキテクチャ仕様」としてスターとフィードバックが殺到する。"
  },
  {
    id: "proposal-8",
    title: "8. ドキュメンテーションのRFC化 & オープンソース公開戦略",
    badge: "エコシステム戦略",
    summary: "単なる社内仕様書・設計メモの体裁から、IETFやRust/Python/Reactコミュニティで標準的な『RFC (Request for Comments)』フォーマットへ再構築。",
    currentLimitation: "「設計仕様書 v0.1」のままだと、第三者がどうコントリビュートしていいか分かりづらく、個人のアイディアノートで終わってしまう恐れがある。",
    proposedEnhancement: "『RFC-0001: ASNA (Adaptive & Self-Negating Cognitive Architecture)』と銘打ち、Motivation, Detailed Design, Drawbacks, Alternatives, Unresolved Questions の章立てに再編。",
    technicalDetails: [
      "リポジトリ名案: `asna-spec` または `cognitive-asna` (Adaptive Self-Negating Architecture)",
      "Interactive Playground（本Webアプリ）へのリンクをREADMEトップに配置し、誰でもブラウザ上で挙動を試せるようにする",
      "コミュニティディスカッション用 issue template (Specialist Axis追加、Negation Layer拡張など) を整備"
    ],
    impactOnGithub: "世界中のAIエージェント開発者・研究者を巻き込む国際的なOSSプロジェクトへ跳ね上がる。"
  }
];

export const PITFALLS_AND_SAFEGUARDS = [
  {
    pitfall: "自己否定の無限ループ・過剰懐疑論（Hyper-Skepticism）",
    risk: "どんな結論に対しても『本当にそうか？』と粗探しを続け、永遠にS収束せずRejectを連発してしまう。",
    safeguard: "停止条件の定量的ガード（Max Negation Depth = 3）、および『反証側にも原典提示義務』を課すことで、根拠なき疑念を自動破棄する。"
  },
  {
    pitfall: "Specialistのペルソナ倒れ（疑似独立）",
    risk: "『歴史学者』『経済学者』とプロンプトで分けたつもりでも、同一の基底LLMが共通の学習バイアスで同じ結論を出してしまう。",
    safeguard: "出力結果の埋め込み類似度を算出し、一定以上重複した場合は独立証拠としてカウントせず、強制的に異なる認知モデルや温度パラメータを割り振る。"
  },
  {
    pitfall: "計算コストの爆発（Compute Inflation）",
    risk: "簡単な質問や事実確認にまでLevel 4自己否定や複数Specialistを動かすと、トークンコストとレイテンシが非現実的になる。",
    safeguard: "Question Analysisの最上流で難度とリスクを判定し、自明な質問はFast Path（1エージェント・自己否定スキップ）へ即座にルーティングするAdaptive Computeを設ける。"
  }
];
