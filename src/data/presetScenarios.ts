import { PresetScenario } from '../types/cognitive';

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'lk99-superconductor',
    title: '【科学実証】常温常圧超伝導体LK-99の真偽判定',
    category: '科学・技術検証',
    userQuestion: 'LK-99は本当に常温常圧超伝導を実現したのか？世界的な追試結果を踏まえて客観的に結論付けよ。',
    analysis: {
      intent: '先端物性物理のプレプリント主張に対する実験的・理論的真偽の確定',
      target: 'LK-99 (Cu置換鉛アパタイト) の超伝導特性（ゼロ抵抗・完全反磁性）の有無',
      expectedAnswerType: '実証的判定およびメカニズム解明の包括報告',
      constraints: ['プレプリントだけでなく査読付き追試論文を重視', '部分浮揚現象の代替物理説明の検証'],
      assumptions: ['公表された合成手順が再現可能であること'],
      ambiguities: ['「超伝導のような挙動」と「真の超伝導」の混同'],
      requiredEvidenceTypes: ['実験的抵抗率測定', '磁化率測定', '結晶構造X線回折', '不純物相(硫化銅)の転移温度分析'],
      requiredReasoningAxes: ['固体物理・結晶学', '実験計測・物性測定', '反証特化・不純物相分析'],
      initialUncertainty: 0.85,
      isClarificationRequired: false
    },
    subquestions: [
      {
        id: 'sq-1',
        title: '完全ゼロ抵抗は第三者機関で再現されたか？',
        description: 'Nature, Max Planck研究所等の独立機関による直流四端子法測定',
        coverage: '物性物理の実証測定',
        dependencies: [],
        importance: 'Critical',
        assignedSpecialists: ['spec-physics', 'spec-materials'],
        status: 'Resolved'
      },
      {
        id: 'sq-2',
        title: '反磁性（マイスナー効果）と見做された浮揚の物理的説明は何か？',
        description: 'マイスナー効果か、それとも強磁性不純物・反磁性反撥の不完全浮揚か',
        coverage: '電磁気現象の代替仮説検証',
        dependencies: ['sq-1'],
        importance: 'Critical',
        assignedSpecialists: ['spec-materials', 'spec-adversarial'],
        status: 'Resolved'
      },
      {
        id: 'sq-3',
        title: 'Cu2S（硫化銅）不純物の一次相転移による抵抗急減効果の影響',
        description: '104℃付近での不純物一次相転移が超伝導転移と誤認された疑義',
        coverage: '誤差要因・不純物因果分析',
        dependencies: ['sq-1'],
        importance: 'Critical',
        assignedSpecialists: ['spec-adversarial'],
        status: 'Resolved'
      }
    ],
    evidences: [
      {
        id: 'ev-1',
        source: 'Nature 2023 / Max Planck Institute for Solid State Research',
        sourceType: 'Primary',
        originalSource: 'arXiv:2308.06256 / Nature 620',
        date: '2023-08-16',
        claim: '純粋な単結晶LK-99は超伝導体ではなく、メガオーム単位の絶縁体である。',
        directness: 'Direct',
        context: '光学浮遊帯域炉でCu2S不純物を排除した純粋結晶を合成・測定',
        supportingEvidenceIds: ['ev-2'],
        counterevidenceIds: [],
        interpretation: '不純物のないLK-99自体は超伝導性を示さない',
        status: 'Verified',
        usedBySpecialists: ['spec-physics', 'spec-adversarial'],
        dependencies: [],
        verificationConfidence: 0.98
      },
      {
        id: 'ev-2',
        source: '北京大学・イリノイ大学物性研究グループ',
        sourceType: 'Primary',
        originalSource: 'Phys. Rev. B 108',
        date: '2023-08-10',
        claim: '観測された急激な電気抵抗降下は、不純物Cu2Sの構造相転移温度（約104℃/377K）に起因する。',
        directness: 'Direct',
        context: '温度依存X線回折および比熱測定',
        supportingEvidenceIds: ['ev-1'],
        counterevidenceIds: [],
        interpretation: '超伝導転移と主張された現象は不純物の既知の一次相転移で完全に説明可能',
        status: 'Verified',
        usedBySpecialists: ['spec-materials', 'spec-adversarial'],
        dependencies: [],
        verificationConfidence: 0.96
      }
    ],
    specialists: [
      {
        specialistId: 'spec-physics',
        axis: '理論・物性物理学（バンド構造・電子相関）',
        subquestionId: 'sq-1',
        hypothesis: '密度汎関数理論(DFT)によるフラットバンドは存在する可能性があるが、相関絶縁体相に留まり常温超伝導の証拠はない',
        evidenceIds: ['ev-1'],
        counterevidenceIds: [],
        assumptions: ['DFT計算の交換相関汎関数が正確であること'],
        alternativeExplanations: ['モット絶縁体', '局在電子スピン'],
        unresolvedIssues: ['強相関領域における電子格子相互作用の極限計算'],
        convergence: 'S',
        evidenceStatus: 'Sufficient',
        dependencies: [],
        selfNegationPassed: true,
        negationFindings: [
          {
            level: 'Level 1 — Interpretation (証拠の解釈)',
            vulnerabilityFound: true,
            details: 'フラットバンドの存在＝超伝導と解釈するのは飛躍。強相関絶縁体である可能性が高い。',
            groundedEvidenceId: 'ev-1'
          }
        ]
      },
      {
        specialistId: 'spec-adversarial',
        axis: '反証・不純物相分析（Adversarial Skepticism）',
        subquestionId: 'sq-3',
        hypothesis: '元の主張はCu2S不純物の一次相転移と強磁性トルク浮揚による誤認（偽陽性）である',
        evidenceIds: ['ev-1', 'ev-2'],
        counterevidenceIds: [],
        assumptions: ['原著者の合成サンプルに硫化銅が混入していたこと'],
        alternativeExplanations: [],
        unresolvedIssues: [],
        convergence: 'S',
        evidenceStatus: 'Sufficient',
        dependencies: ['sq-1', 'sq-2'],
        selfNegationPassed: true,
        negationFindings: [
          {
            level: 'Level 3 — Hypothesis/Conclusion (代替仮説・結論)',
            vulnerabilityFound: false,
            details: '不純物Cu2Sの転移温度（377K）と原著者が報告した転移温度が小数点以下まで一致しており、反証仮説が極めて堅固。'
          }
        ]
      }
    ],
    integration: {
      consensusTheses: [
        '純粋なLK-99単結晶は室温・常圧において絶縁体であり、超伝導性を示さない',
        '原著者が観測した抵抗降下は、合成過程で副生したCu2S（硫化銅）の相転移現象である',
        '部分浮揚現象は強磁性および反磁性反撥のトルクによるもので、完全反磁性（マイスナー効果）ではない'
      ],
      antitheses: [],
      synthesisHypothesis: 'LK-99は常温常圧超伝導体ではない。観測された超伝導類似現象はすべて既知の不純物物性（特にCu2S）および磁気トルク効果で完全に整合的に説明された。',
      integrationNegationResult: {
        testedVulnerabilities: ['原著者独自の未公開合成ノウハウの存在可能性（Level 0否定）'],
        survivedCounterevidence: true,
        remainingCaveats: ['未知のドーピング比率による新物性の探求余地は残るが、LK-99が常温超伝導体であるという当初主張は完全に反証された']
      },
      missingCognitiveAxes: []
    },
    convergence: {
      state: 'S',
      justification: '全世界の独立研究機関による純粋結晶追試、不純物相転移の同定、理論的バンド解釈の全軸で反証が完了し、高精度に結論が単一収束した。',
      criteriaChecked: [
        { criterion: '主要サブ問題の解決率100%', passed: true, note: '抵抗・浮揚・不純物の全疑問が解消' },
        { criterion: 'Level 0〜2 の未解決Counterevidenceが0件', passed: true, note: '超伝導を支持する再現実験が皆無' },
        { criterion: '証拠の一次情報遡行完了', passed: true, note: 'Nature, Max Planck, 北京大の査読・実験データで固化' }
      ],
      unresolvedCount: 0,
      evidenceStrengthScore: 98,
      loopbackRecommended: false
    },
    answer: {
      strategy: 'Definitive Conclusion',
      summary: '【結論：否定側で完全収束（State S）】LK-99は常温常圧超伝導体ではありません。',
      detailedAnalysis: 'マックス・プランク固体研究所をはじめとする世界中の主要機関による純粋単結晶の追試結果により、純粋なLK-99は超伝導体ではなく「高い抵抗値を持つ絶縁体」であることが確定しました。初期に報告された急激な電気抵抗降下は、合成過程で不可避に混入した不純物「硫化銅(Cu2S)」が約104℃で起こす構造相転移によるものです。またビデオ等で拡散した部分浮揚はマイスナー効果ではなく、強磁性不純物と反磁性反撥による磁気トルク現象と解明されました。',
      provenanceTrace: [
        { claim: '純粋結晶はメガオーム級の絶縁体', sourceIds: ['ev-1'], inferencePath: 'Max Planck追試 → 四端子測定 → ゼロ抵抗の否定' },
        { claim: '抵抗降下は不純物Cu2Sの転移', sourceIds: ['ev-2'], inferencePath: '北京大等 → 比熱・X線解析 → 377K転移の完全一致' }
      ],
      epistemicCaveats: [
        '本結論はマックス・プランク研究所、北京大学等の査読・追試論文群（2023年秋以降）に厳密に依拠しています。'
      ]
    }
  },
  {
    id: 'capital-relocation',
    title: '【政策論争】首都機能移転（副首都整備）の断行是非',
    category: '政策・意思決定',
    userQuestion: '首都直下地震リスクの回避を理由に、首都機能の一部（国会・官公庁）を地方へ移転すべきか？',
    analysis: {
      intent: '国家危機管理と経済効率性・財政負担のトレードオフ評価',
      target: '日本における首都機能移転（立法・行政）の是非と副首都構想',
      expectedAnswerType: '政策的メリット・デメリットの多軸対立分析と条件付きシナリオ評価',
      constraints: ['単なる賛否の二項対立を排し、移転コスト・都市集積の外部性・BCP（業務継続）を等しく評価'],
      assumptions: ['東京圏での大規模震災発生確率が一定以上存在すること'],
      ambiguities: ['「完全移転」か「バックアップ拠点（副首都）」かの定義の曖昧さ'],
      requiredEvidenceTypes: ['過去の国会等移転調査会答申', '海外事例（豪州キャンベラ、ブラジル、独ボン/ベルリン）', '防災被害想定', '経済集積効果の計量分析'],
      requiredReasoningAxes: ['防災・安全保障・BCP', '都市経済学・集積の利益', '財政コスト・行政実務効率'],
      initialUncertainty: 0.65,
      isClarificationRequired: false
    },
    subquestions: [
      {
        id: 'sq-pol-1',
        title: '首都機能バックアップによる減災・国政麻痺回避効果',
        description: '首都直下地震時の代替機能確保',
        coverage: 'リスク工学・危機管理',
        dependencies: [],
        importance: 'Critical',
        assignedSpecialists: ['spec-bcp', 'spec-governance'],
        status: 'Resolved'
      },
      {
        id: 'sq-pol-2',
        title: '首都機能分散による経済集積利益の喪失と財政コスト',
        description: '官民近接性喪失による取引コスト増と移転インフラ投資（数兆円規模）',
        coverage: '都市経済・財政',
        dependencies: [],
        importance: 'Critical',
        assignedSpecialists: ['spec-econ'],
        status: 'Resolved'
      }
    ],
    evidences: [
      {
        id: 'ev-pol-1',
        source: '内閣府中央防災会議 被害想定報告書',
        sourceType: 'Primary',
        claim: '首都直下地震による直接経済被害は約47兆円、国政中枢機能停止のリスク甚大。',
        directness: 'Direct',
        context: 'M7クラスの首都直下地震シミュレーション',
        supportingEvidenceIds: [],
        counterevidenceIds: [],
        interpretation: '中枢機能が東京のみに集中している現状は単一障害点（SPOF）である',
        status: 'Verified',
        usedBySpecialists: ['spec-bcp'],
        dependencies: [],
        verificationConfidence: 0.92
      },
      {
        id: 'ev-pol-2',
        source: '財務省・国土交通省 国会等移転調査検討委員会',
        sourceType: 'Secondary',
        claim: '完全移転には10兆円超の財政負担が見込まれ、海外（独ボン・ベルリン分割）では往復移動コストが毎年巨額に上る。',
        directness: 'Direct',
        context: '移転試算および独豪の行政分割実態調査',
        supportingEvidenceIds: [],
        counterevidenceIds: [],
        interpretation: '完全移転は費用対効果が悪く、行政効率を低下させる',
        status: 'Verified',
        usedBySpecialists: ['spec-econ'],
        dependencies: [],
        verificationConfidence: 0.88
      }
    ],
    specialists: [
      {
        specialistId: 'spec-bcp',
        axis: '安全保障・防災リスク工学',
        subquestionId: 'sq-pol-1',
        hypothesis: '完全移転でなくとも、大阪等の既存政令市に「代替中枢・副首都」を指定し、常時ホットスタンバイ化すべき',
        evidenceIds: ['ev-pol-1'],
        counterevidenceIds: [],
        assumptions: ['分散システムによる冗長化が機能停止を防ぐという原則'],
        alternativeExplanations: ['東京の耐震・防災インフラ強化による耐力向上（ハード防災）'],
        unresolvedIssues: ['被災時の指揮権委譲手続きの法整備'],
        convergence: 'A',
        evidenceStatus: 'Sufficient',
        dependencies: [],
        selfNegationPassed: true,
        negationFindings: [
          {
            level: 'Level 3 — Hypothesis/Conclusion (代替仮説・結論)',
            vulnerabilityFound: true,
            details: '「物理的な都市移転」を行わなくても、省庁業務のクラウド化と分散テレワーク体制（デジタル冗長化）でBCPの大半は達成可能ではないか。'
          }
        ]
      },
      {
        specialistId: 'spec-econ',
        axis: '都市経済学・集積の利益',
        subquestionId: 'sq-pol-2',
        hypothesis: '物理的な首都機能移転は、東京が持つ情報・人的集積の正の外部性を破壊し、国際競争力を削ぐ',
        evidenceIds: ['ev-pol-2'],
        counterevidenceIds: [],
        assumptions: ['対面での官民調整・ロビイング・情報交換の価値が依然として高いこと'],
        alternativeExplanations: ['オンライン行政の進展'],
        unresolvedIssues: ['完全デジタル化後の集積メリットの減衰率'],
        convergence: 'A',
        evidenceStatus: 'Sufficient',
        dependencies: [],
        selfNegationPassed: true,
        negationFindings: [
          {
            level: 'Level 2 — Inference (推論の成立性)',
            vulnerabilityFound: true,
            details: '国会・中央省庁の移転が民間本社の地方移転を誘発するかは因果性が希薄（海外事例でも首都と経済中枢は分離している）。'
          }
        ]
      }
    ],
    integration: {
      consensusTheses: [
        '東京の単一障害点（SPOF）状態は国家リスクであり、危機管理上の冗長化は必須である',
        '新規都市を建設する「全面移転（10兆円超）」は財政的・実務的に破綻リスクが高い'
      ],
      antitheses: [
        {
          conflictAxis: '物理的移転 vs デジタル機能分散',
          specialistA: 'spec-bcp',
          claimA: '有事の代替指揮機能として物理的な副首都拠点（関西等）の常設が必要',
          specialistB: 'spec-econ',
          claimB: '平時の二重行政コストと集積分断を避けるため、デジタル分散と法制度的権限移譲に留めるべき',
          rootCause: 'Underlying Assumptions'
        }
      ],
      synthesisHypothesis: '「物理的な都市造成型移転」ではなく、「デジタル中枢インフラの分散」＋「既存地方中核都市への非常時指揮権限の事前バックアップ指定（副首都指定制度）」のハイブリッド策が最適解となる。',
      integrationNegationResult: {
        testedVulnerabilities: ['有事に遠隔指揮系統がサイバー攻撃で遮断された場合の脆弱性'],
        survivedCounterevidence: true,
        remainingCaveats: ['平時からの有事指揮訓練と法制度的裏付け（憲法・緊急事態条項）が未解決']
      },
      missingCognitiveAxes: []
    },
    convergence: {
      state: 'B',
      justification: '論点構造と対立軸（BCP vs 集積経済）は完全に整理・合意されたが、最終的な「物理拠点整備の深度」に関しては価値判断・前提条件に応じた複数シナリオが拮抗している（State B: 構造的対立収束）。',
      criteriaChecked: [
        { criterion: '問題構造の網羅的整理', passed: true, note: '防災・経済・法務の全軸がカバー' },
        { criterion: '単一結論への収束', passed: false, note: 'リスク許容度と財政思想による政策的トレードオフが存在' }
      ],
      unresolvedCount: 1,
      evidenceStrengthScore: 85,
      loopbackRecommended: false
    },
    answer: {
      strategy: 'Competing Scenarios',
      summary: '【結論：構造的対立収束（State B）によるシナリオ分岐提示】物理的な全面移転には否定的な合意がある一方、BCP対策としての「機能分散の深度」に2つの有力シナリオが存在します。',
      detailedAnalysis: '内閣府・国交省・都市経済学の検証を統合した結果、巨額の財政負担（10兆円以上）と経済集積の破壊を伴う「新都市への全面移転」は合理性を欠くことで全専門軸が一致しました。対立の本質は「どのレベルで冗長性を確保するか」であり、以下の2つの競合シナリオに収束します：\n\n■ シナリオ1：既存拠点活用型・副首都指定（防災最優先モデル）\n大阪等の既存政令市を副首都に指定し、有事指揮中枢と最小限の官房機能を常駐させ、物理的バックアップを確固たるものにする。\n\n■ シナリオ2：デジタル分散・平時東京集約（経済効率最優先モデル）\n物理移転は行わず、行政データの常時多重バックアップと法的代行権限の規定に特化。平時の行政効率と東京の集積メリットを最大化する。',
      provenanceTrace: [
        { claim: '全面移転の非現実性', sourceIds: ['ev-pol-2'], inferencePath: '国交省調査・海外事例 → 費用対効果の悪化' },
        { claim: '東京SPOFリスク', sourceIds: ['ev-pol-1'], inferencePath: '中央防災会議想定 → 直接被害47兆円と機能停止危機' }
      ],
      epistemicCaveats: [
        'この判断は「首都直下地震の確率論的リスク」と「日本の財政制約」のどちらを重く見るかという政策的意思決定に依存します。'
      ]
    }
  },
  {
    id: 'epimenides-paradox',
    title: '【論理パラドックス】「すべてのクレタ人は嘘つきである」の判定',
    category: 'パラドックス・論理',
    userQuestion: 'クレタ島出身の哲学者エピメニデスが「すべてのクレタ人は常に嘘つきである」と発言しました。この発言は真ですか、偽ですか？',
    analysis: {
      intent: '自己言及型パラドックス（嘘つきのパラドックス）の真理値判定',
      target: '発言の論理的真偽（True, False, Undecidable）の確定',
      expectedAnswerType: '形式論理学による真理値分析およびパラドックス解消の証明',
      constraints: ['古典論理（排中律・矛盾律）の適用限界の明示', '二値論理における自己言及の構造的破綻の指摘'],
      assumptions: ['「嘘つき」とは「常に真でない命題しか言わない」という厳密な全称命題であること'],
      ambiguities: ['「嘘つき」の日常的用法（時々嘘をつく）と論理的用法の乖離'],
      requiredEvidenceTypes: ['形式論理学定理（ラッセルのパラドックス、タルスキの言語階層論、ゲーデルの不完全性）'],
      requiredReasoningAxes: ['形式論理・数理論理学', '言語哲学・意味論'],
      initialUncertainty: 0.9,
      isClarificationRequired: false
    },
    subquestions: [
      {
        id: 'sq-log-1',
        title: '発言が「真」であると仮定した場合の矛盾検出',
        description: '真 → エピメニデス自身が嘘つき → 発言は偽 → 矛盾',
        coverage: '背理法検証',
        dependencies: [],
        importance: 'Critical',
        assignedSpecialists: ['spec-logic'],
        status: 'Resolved'
      },
      {
        id: 'sq-log-2',
        title: '発言が「偽」であると仮定した場合の成立余地',
        description: '偽の否定＝「少なくとも1人のクレタ人は嘘をつかない」 → エピメニデス以外のクレタ人が真実を語る者が存在すれば矛盾なく「偽」として成立可能か？',
        coverage: '論理命題の厳密な否定操作',
        dependencies: ['sq-log-1'],
        importance: 'Critical',
        assignedSpecialists: ['spec-logic', 'spec-semantics'],
        status: 'Resolved'
      }
    ],
    evidences: [
      {
        id: 'ev-log-1',
        source: '数理論理学・述語論理体系 (First-Order Logic)',
        sourceType: 'Primary',
        claim: '「∀x (C(x) → L(x))」の否定は「∃x (C(x) ∧ ¬L(x))」である。',
        directness: 'Direct',
        context: 'ド・モルガンの法則および全称限量子',
        supportingEvidenceIds: [],
        counterevidenceIds: [],
        interpretation: '「すべてのクレタ人が嘘つき」の否定は「全員が正直者」ではなく「正直なクレタ人が少なくとも1人いる」である',
        status: 'Verified',
        usedBySpecialists: ['spec-logic'],
        dependencies: [],
        verificationConfidence: 1.0
      }
    ],
    specialists: [
      {
        specialistId: 'spec-logic',
        axis: '数理論理・述語論理（Formal Logic）',
        subquestionId: 'sq-log-2',
        hypothesis: '厳密な形式論理において、この発言はパラドックスではなく単に「偽（False）」である（エピメニデス以外のクレタ人に正直者が1人でもいれば論理矛盾なく偽となる）',
        evidenceIds: ['ev-log-1'],
        counterevidenceIds: [],
        assumptions: ['嘘つき＝「常に嘘を言う」、真実を言う者＝「常に真実を言う」という解釈'],
        alternativeExplanations: ['真理値を持たない無意味な文（タルスキ階層論）'],
        unresolvedIssues: [],
        convergence: 'S',
        evidenceStatus: 'Sufficient',
        dependencies: [],
        selfNegationPassed: true,
        negationFindings: [
          {
            level: 'Level 4 — Question/Objective (問い・目的そのもの)',
            vulnerabilityFound: true,
            details: '問いが「自己言及パラドックス（この文は偽である）」と「エピメニデスの文」を混同している。エピメニデスの文は全称命題であるため古典述語論理で「偽」に一意確定できる。'
          }
        ]
      }
    ],
    integration: {
      consensusTheses: [
        '「この文は真ではない」という純粋な自己言及文（嘘つきのパラドックス）であれば真理値不能（Reject）となるが、エピメニデスの発言は全称命題「すべてのクレタ人は…」である',
        '全称命題の否定は存在命題「少なくとも1人の真実を語るクレタ人が存在する」であるため、論理的に「偽（False）」と判定すれば何ら矛盾が生じない'
      ],
      antitheses: [],
      synthesisHypothesis: '論理学的にこの発言は「偽（False）」である。日常語でパラドックスとして扱われがちだが、述語論理では矛盾なく偽に確定する。',
      integrationNegationResult: {
        testedVulnerabilities: ['もしクレタ島にエピメニデス1人しか住んでいなかった場合の極限ケース'],
        survivedCounterevidence: true,
        remainingCaveats: ['クレタ人の人口が1人の場合のみ純粋な嘘つきパラドックスへ縮退する']
      },
      missingCognitiveAxes: []
    },
    convergence: {
      state: 'S',
      justification: 'Level 4自己否定により「問いが暗黙に前提としていたパラドックス性」の誤謬を暴き、述語論理の形式的証明により「偽」という単一解に収束した。',
      criteriaChecked: [
        { criterion: '自己言及の構造解明', passed: true, note: '全称量化と存在量化の厳密な区別' },
        { criterion: '論理矛盾の完全解消', passed: true, note: '偽と仮定した際の矛盾が存在しないことを証明' }
      ],
      unresolvedCount: 0,
      evidenceStrengthScore: 100,
      loopbackRecommended: false
    },
    answer: {
      strategy: 'Definitive Conclusion',
      summary: '【結論：完全収束（State S）】この発言は論理学的に「偽（False）」です。パラドックス（真偽判定不能）ではありません。',
      detailedAnalysis: '一般に「嘘つきのパラドックス」として有名ですが、厳密な形式論理学においては明確に「偽」と確定します。\n\n1. 【真と仮定した場合】：エピメニデス自身もクレタ人であるため彼も嘘つきとなり、「彼が言ったことは嘘（偽）」となり直ちに自己矛盾します。\n2. 【偽と仮定した場合】：「すべてのクレタ人が嘘つきである」が偽であることの論理的否定は、「真実を語るクレタ人が少なくとも1人存在する」です。エピメニデス自身が嘘をついており、かつ他のクレタ人に正直者が1人でもいれば、いかなる矛盾も生じずにこの世界は成立します。\n\nしたがって、この発言は純粋な自己言及パラドックス（「この文は嘘である」）とは異なり、正当に「偽」と決定されます。',
      provenanceTrace: [
        { claim: '全称命題の論理否定の構造', sourceIds: ['ev-log-1'], inferencePath: '述語論理体系 → ド・モルガンの法則 → 偽での無矛盾確定' }
      ],
      epistemicCaveats: [
        'ただし、クレタ島にエピメニデス1人しか存在しない極限状況を仮定した場合に限り、純粋な真理値不能（Undecidable）に退化します。'
      ]
    }
  }
];
