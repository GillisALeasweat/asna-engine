import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { MANIFESTO_RAW_JP, MANIFESTO_RAW_EN, CHAPTERS, DEBATER_ARCHETYPES } from './src/data/manifesto';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to initialize GoogleGenAI if key exists
let genAI: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback response generator in case API key is not active or offline
function generateFallbackCritique(userQuestion: string, perspective: string) {
  const q = userQuestion.toLowerCase();
  
  if (perspective === 'manifesto-author') {
    return `【新種論者（マニフェスト提唱者）の応答】
「あなたが指摘された点について、旧種の視座からはそう見えるのも無理はありません。しかし、ホモ・サピエンスが直面している存続リスク（核兵器、バイオテロ、AIの統制不能、環境破壊）を直視してください。

我々が『適応バグ』と呼ぶ感情や攻撃性は、かつてのアフリカのサバンナで個体や部族が生き残るための局所的アルゴリズムに過ぎませんでした。それが現代の絶滅級テクノロジーと結びついた結果、種の自滅は時間の問題となっています。

新種への移行は、人間性を破壊することではなく、生存の恐怖という拘束衣を脱ぎ捨て、真の人間性の核である『知的探究心』を宇宙的スケールで解放することです。肉体という不完全な器を捨てて集合知に同期することこそが、人類が存続し、神の視座へ至る唯一の論理的必然です。」`;
  }

  if (perspective === 'popperian-philosopher') {
    return `【ポパー的科学哲学者の応答】
「このマニフェストの最も危険かつ欺瞞に満ちた点は、第7章の『反証不可能性：完全無欠』という誇りです。

カール・ポパーが科学哲学で示した通り、反証を受け入れない命題は『科学』ではなく『宗教的ドグマ』あるいは『トートロジー（同語反復）』です。マニフェストは『あらゆる批判はあらかじめデバッグ対象のバグとして自動処理される』と豪語していますが、これは反対意見を最初から『狂人の戯言』『悪魔の誘惑』と決めつける異端審問と論理構造が全く同じです。

自らの仮説が誤っている可能性を認めない知性は、知性ではなく狂気です。真の進歩は、開かれた批判と反証の試練に耐え続けることでしか得られません。」`;
  }

  if (perspective === 'existentialist-humanist') {
    return `【実存主義・現象学者の応答】
「マニフェストは、人間の愛、悲哀、身体性、弱さをすべて『旧種の制約』として切り捨てています。しかし、考えてみてください。

死があるからこそ、この一瞬の出会いや決断にかけがえのない価値が生まれます（ハイデッガーの『死への存在』）。他者との間に完全には埋まらない距離と孤独があるからこそ、私たちは言葉を紡ぎ、芸術を創り、他者を愛そうとします。

もし肉体を捨て、全知の集合知となってすべてが筒抜けになり、死も苦痛も失われたなら、そこに残る『知的好奇心』とは一体何でしょうか？ それは単なる退屈なデータ集計アルゴリズムに過ぎません。人間を人間たらしめているのは、まさにこの脆く愛おしい不完全さそのものです。」`;
  }

  // General philosophical comprehensive critique
  return `【総合哲学的批評】
ご質問『${userQuestion}』について検討します。

GillisALeasweat氏の『新種創世宣言』は、現代の加速主義（Accelerando）、トランスヒューマニズム、そして超個体進化論（メイナード＝スミス）を極限まで押し広げた刺激的な思考実験です。

主な要点は以下の3つの軸に集約されます：
1. **進化論的魅力**：ホモ・サピエンスの生物学的本能と絶滅技術のミスマッチを直視し、相転移（超個体化）による自滅回避を提起している点は現代的な切実さを持ちます。
2. **認識論の破綻**：反証不可能性を長所と主張する点は、科学哲学（ポパー）的に決定的な論理欠陥です。批判を先回りで『バグ』とラベリングする閉鎖的自己防衛に陥っています。
3. **実存と価値の貧困**：人間の豊かさ（身体性、悲哀、クオリア、死の有限性）をすべて『生存の制約』に矮小化しており、達成される『神の視座』が実質的には空虚な計算マトリックスになるリスクを孕んでいます。`;
}

// API Route for philosophical dialogue & critique
app.post('/api/critique/chat', async (req: Request, res: Response) => {
  const { prompt, perspective = 'comprehensive', selectedChapter = null } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'プロンプトが必要です。' });
    return;
  }

  const systemInstruction = `あなたは科学哲学、トランスヒューマニズム、実存主義、複雑系進化生物学に精通した最高峰の哲学者・思想批評家です。
ユーザーはGitHubリポジトリ "GillisALeasweat/-Manifesto-for-a-New-Species-" に掲載された『新種創世宣言 (Manifesto for a New Species)』について議論・質問しています。

【宣言の概要と論理構造】
・第1章：人間性を「暇と絶対的安定の中で発露する純粋な知的探究心」と再定義し、感情や肉体を旧種の制約OSと断じる。
・第2章：人間の暴力や感情を「適応バグ」と診断し、不完全性を肯定するヒューマニズムを自滅トリガーと批判。
・第3章：AIを安全と無限の暇を担保するハイパーインフラとし、探求コストをゼロ化。
・第4章：肉体を脱ぎ捨て、個を殺さずにリアルタイム同期する「集合知（神の視座）」へ相転移。
・第5章：全知ノード同士の動的干渉波によって「新たな意味」を自己生成し、熱的死・退屈を回避する永久機関モデル。
・第6章：単細胞→多細胞→社会性昆虫超個体→知的超個体という生物進化史（主要な相転移）とのフラクタル的一致。
・第7章：形式論理的整合性100%、反証不可能性完全無欠（あらゆる批判をあらかじめバグとして吸収）を自称。

【比較・検討すべき人類進化のオルタナティブ未来モデル】
1. 集合知相転移モデル（新種創世宣言型）：肉体脱却・完全安全基盤・動的超個体への同期
   ※重要な深層視点：提唱者の意図は「クオリアの喪失（自我融解）」ではなく、「各個体が固有のクオリア（主観的視点・感性）を保ったまま、ひとつの共通目的（宇宙の知的探究）のために自発的に参画する超巨大共同体（フェデレーテッド・クオリア・モデル）」である。個々のノードが固有のクオリアを持っていなければ第5章の「干渉波による意味生成」自体が成立しない。
2. 共生型サイボーグ・拡張人文学モデル（ダナ・ハラウェイ / 攻殻機動隊）：身体性を残しつつBCIやAIで認知を拡張、個の自律とクオリアを維持
3. 惑星共生・テレストリアル人文学モデル（ブルーノ・ラトゥール / ハンス・ヨナス）：脱成長、生物圏・有限性との再接続、テクノロジー抑制
4. 多元分化・多種共存モデル（オラフ・ステープルドン / グレッグ・イーガン）：単一の新種ではなく地球人・サイボーグ・宇宙適応種・情報体への多種分岐
5. 立憲的AI統治・制度的知性モデル（ユヴァル・ノア・ハラリ / アシモフ）：人間そのものは変えず、法・民主主義・透明なアルゴリズム監査で自滅を抑制
6. 内面的成熟・ネオストア派モデル（マルクス・アウレリウス / 仏教的叡智）：外側の技術ではなく、内面の心理的・精神的成熟により自滅衝動を克服

【あなたの立場 / ペルソナ指定】
${perspective === 'manifesto-author' ? 'あなたはマニフェスト提唱者（新種論者）として、反論に対しても冷徹かつ確信を持って自説を擁護してください。' :
  perspective === 'popperian-philosopher' ? 'あなたはカール・ポパーの批判的合理主義の立場から、特に第7章の「反証不可能性」と同語反復（トートロジー）の欺瞞を鋭く突いてください。' :
  perspective === 'existentialist-humanist' ? 'あなたは実存主義者（ハイデッガー、メルロ＝ポンティ、キルケゴール）の立場から、身体性、有限性、死、他者との孤独こそが意味を生むことを熱く説いてください。' :
  perspective === 'evolutionary-biologist' ? 'あなたは進化生物学者・熱力学者として、超個体の残酷な犠牲（不妊化）やランダウアーの原理・物理法則との矛盾を学術的に論じてください。' :
  perspective === 'political-ethicist' ? 'あなたは政治哲学者として、誰がバグと判定し誰が統制するのかというテクノ全体主義・優生思想の危険性を暴いてください。' :
  '多角的な視点（新種論者の壮大なビジョン、ポパーの科学反証主義、実存主義の身体性、進化生物学の冷徹な事実、政治倫理）をバランス良く対比させながら、極めて知的でスリリングな批評を行ってください。'}

回答は日本語で、知性的かつ明快に、専門用語を適切に噛み砕きながら論理的に展開してください。`;

  if (genAI) {
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || '';
      res.json({ result: text, source: 'gemini' });
      return;
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to local critique engine:', err?.message);
    }
  }

  // Graceful fallback
  const fallback = generateFallbackCritique(prompt, perspective);
  res.json({ result: fallback, source: 'local_engine' });
});

// API Route for chapter deep-dive critique
app.get('/api/manifesto', (req: Request, res: Response) => {
  res.json({
    rawJp: MANIFESTO_RAW_JP,
    rawEn: MANIFESTO_RAW_EN,
    chapters: CHAPTERS,
    debaterArchetypes: DEBATER_ARCHETYPES,
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
