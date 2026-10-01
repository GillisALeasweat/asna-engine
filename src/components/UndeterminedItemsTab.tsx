import React, { useState } from 'react';
import { 
  GitMerge, 
  Cpu, 
  BrainCircuit, 
  BarChart3, 
  FolderGit2, 
  CheckCircle2, 
  Copy, 
  Check,
  Code2,
  ExternalLink
} from 'lucide-react';

export const UndeterminedItemsTab: React.FC = () => {
  const [activeItem, setActiveItem] = useState<'item6' | 'item7' | 'item8' | 'item9' | 'item10'>('item6');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono mb-2 border border-indigo-500/20">
          <span>Roadmap Concrete Specifications</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          未確定項目 ⑥〜⑩ の完全設計ドラフト
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          v0.1 の第8節に「次に確定する項目」として挙げられていた ⑥〜⑩ について、GitHub 公開および PoC 実装にそのまま使えるレベルまで詳細仕様を策定しました。
        </p>

        {/* 5 Tabs */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setActiveItem('item6')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeItem === 'item6'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>⑥ Integration AI 正式仕様</span>
          </button>
          <button
            onClick={() => setActiveItem('item7')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeItem === 'item7'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>⑦ Adaptive Compute 割当規則</span>
          </button>
          <button
            onClick={() => setActiveItem('item8')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeItem === 'item8'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>⑧ Reasoning Case Memory</span>
          </button>
          <button
            onClick={() => setActiveItem('item9')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeItem === 'item9'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>⑨ 評価指標 &amp; Ablation Study</span>
          </button>
          <button
            onClick={() => setActiveItem('item10')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeItem === 'item10'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>⑩ GitHub 公開方針 &amp; リポジトリ構成</span>
          </button>
        </div>
      </div>

      {/* Content for Item 6 */}
      {activeItem === 'item6' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <GitMerge className="w-5 h-5 text-indigo-400" />
              <span>⑥ Integration AI の正式仕様（弁証法的合成アルゴリズム）</span>
            </h3>
            <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 font-mono">
              Dialectical Synthesis Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400">従来のマルチエージェントの欠点</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                多数決（Voting）や平均化要約（Summary）により、少数派の決定的な反証や境界条件の違いが消し去られてしまう。
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400">ASNA Integration AI のアプローチ</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                「テーゼ（合意点）」と「アンチテーゼ（対立点）」を分解し、「どのような条件下で対立が生じたか」を明らかにする「ジンテーゼ（統合メタ因果モデル）」を構成。
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-300 uppercase">
              Integration AI 実行の4ステップ・プロトコル
            </div>
            <ol className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="font-mono text-indigo-400 font-bold shrink-0">Step 1:</span>
                <span><strong>Consensus Core 抽出:</strong> 全Specialistが依拠している共通命題・合意事実を抽出。</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-mono text-indigo-400 font-bold shrink-0">Step 2:</span>
                <span><strong>Antithesis 根本原因特定:</strong> Specialist間の不一致を「①用語定義の差」「②参照原典の信頼度差」「③暗黙の前提」「④因果モデル」に分類。</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-mono text-indigo-400 font-bold shrink-0">Step 3:</span>
                <span><strong>Conditioned Synthesis 導出:</strong> 「条件A下では仮説1、条件B下では仮説2」という条件付きメタ命題を生成。</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-mono text-indigo-400 font-bold shrink-0">Step 4:</span>
                <span><strong>Integration Self-Negation:</strong> 統合結果そのものに「合成の誤謬」や「認知軸の欠落」がないか Level 4 否定を実行。</span>
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Content for Item 7 */}
      {activeItem === 'item7' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <span>⑦ Adaptive Compute の割当規則（動的計算スケーリング）</span>
            </h3>
            <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 font-mono">
              Dynamic Budget Allocation
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 space-y-1">
            <div className="text-[11px] text-slate-400">数理計算予算モデル:</div>
            <div className="text-sm font-bold text-white">
              ComputeBudget = clamp( w₁ · Uncertainty + w₂ · ImpactRisk + w₃ · SubQuestionCount, MinBudget, MaxBudget )
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400">Fast Path (Low Budget)</div>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• 単純な事実確認・翻訳・コード定型</li>
                <li>• Specialist: 1名（自己否定 Level 1まで）</li>
                <li>• トークン上限: 2,000 / レイテンシ: 1〜2秒</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-400">Standard Path (Medium)</div>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• 通常の意思決定、複数仮説の比較</li>
                <li>• Specialist: 2〜3名（自己否定 Level 3まで）</li>
                <li>• トークン上限: 8,000 / レイテンシ: 5〜8秒</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-400">Deep Adversarial (Critical)</div>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• 医療・法務・学術真偽・安全保障</li>
                <li>• Specialist: 4名以上 + 外部原典検索</li>
                <li>• 自己否定 Level 4（二重ループロールバック許容）</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Content for Item 8 */}
      {activeItem === 'item8' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              <span>⑧ Reasoning Case Memory（推論失敗・バイアス記憶ストア）</span>
            </h3>
            <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 font-mono">
              Episodic Failure Memory
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            AIが「過度の揚げ足取りで正しい結論を不当にRejectした過去の失敗」や「反証を見落としてハルシネーションを認容した失敗」をエピソード記憶として蓄積し、類似の推論タスク発生時にメタ認知的プロンプトとして注入する仕組みです。
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-400">Memory Unit のスキーマ構造:</div>
            <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto">
{`interface ReasoningMemoryCase {
  caseId: string;
  questionEmbedding: number[];
  failureMode: 'HyperSkepticism' | 'OverconfidenceBlindspot' | 'EchoChamberContagion';
  triggerCondition: string;
  incorrectOutcome: ConvergenceLevel;
  remedyAction: string; // 例: 「反証エージェントに対し、原典のない推測的批判の棄却を指示」
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Content for Item 9 */}
      {activeItem === 'item9' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <span>⑨ 評価指標・ベンチマーク・Ablation Study</span>
            </h3>
            <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 font-mono">
              Evaluation Metrics
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            一般的な正答率（Accuracy）だけでは、自己否定型アーキテクチャの真価（過信の抑制、嘘の棄却）を測れません。以下の4大独自指標を策定します。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-indigo-300">1. Expected Calibration Error (ECE)</div>
              <p className="text-xs text-slate-400">
                AIの確信度と実際の正答率の一致度。ASNAの導入により過信（Overconfidence）がどれだけ減衰したかを測定。
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-emerald-300">2. Refutation Precision &amp; Recall</div>
              <p className="text-xs text-slate-400">
                意図的に偽の前提や論理破綻を混入した「Adversarial Benchmark」において、Level 0〜4 の反証が正しく検知できたか。
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-amber-300">3. Valid Reject Rate</div>
              <p className="text-xs text-slate-400">
                情報不足・パラドックス・回答不可能な質問に対して、適当な嘘をつかずに正しく「Reject」を返せた割合。
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-rose-300">4. Over-Skepticism Penalty</div>
              <p className="text-xs text-slate-400">
                正当で確実な事実に対して、自己否定が過剰に働いてS収束を妨げてしまったペナルティ率。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content for Item 10 */}
      {activeItem === 'item10' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <FolderGit2 className="w-5 h-5 text-indigo-400" />
              <span>⑩ GitHub 公開方針・リポジトリ構成・README</span>
            </h3>
            <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 font-mono">
              Open Source Packaging
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-white">GitHub公開で世界的な支持を集めるための3大戦略:</div>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>RFC-0001 仕様書を中心とする:</strong> ソフトウェアコードだけでなく、思想と仕様（RFC）を前面に出すことで学術界・エージェント研究者からの引用・注目度を最大化。</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>CoreとLLMアダプターの完全分離:</strong> 特定のLLM（OpenAIやGemini）に依存せず、ローカルLLM（Ollama, vLLM）でも動作可能な純粋なDAG/FSMライブラリとしてパッケージング。</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Web Visualizer（本アプリ同等）の同梱:</strong> 推論過程が見えないブラックボックスを解消し、ブラウザ上でステップ実行できるデモを提供。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
