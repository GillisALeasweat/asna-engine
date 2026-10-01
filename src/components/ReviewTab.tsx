import React, { useState } from 'react';
import { 
  EXECUTIVE_SUMMARY, 
  MAJOR_PROPOSALS, 
  PITFALLS_AND_SAFEGUARDS,
  CURRENT_AI_PATHOLOGIES,
  PREDICTED_LIMITATIONS
} from '../data/reviewContent';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Workflow, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  FileCheck, 
  Target, 
  Zap, 
  Flame, 
  Skull,
  HelpCircle,
  AlertOctagon,
  Clock,
  Layers,
  Scale
} from 'lucide-react';
import { ActiveTab } from './Navigation';

interface ReviewTabProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const ReviewTab: React.FC<ReviewTabProps> = ({ onNavigateTab }) => {
  const [expandedProposal, setExpandedProposal] = useState<string | null>('proposal-1');

  const toggleProposal = (id: string) => {
    setExpandedProposal(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-6">
      {/* Hero Executive Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>仕様書 v0.1 レビュー・エグゼクティブサマリー</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>基本思想評価: {EXECUTIVE_SUMMARY.overallRating}</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
            GitHub 公開に向けたブラッシュアップ総括：<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              「定性的な設計哲学」から「検証可能な数理・状態機械モデル」への昇華
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
            {EXECUTIVE_SUMMARY.criticalReviewVerdict}
          </p>

          {/* Core Strengths */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>原案 v0.1 の圧倒的強み・先進性（維持・強調すべき点）</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {EXECUTIVE_SUMMARY.coreStrengths.map((str, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTab('simulator')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Workflow className="w-4 h-4" />
              <span>シミュレータで認知パイプラインを動かす</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('spec_compare')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>改定版仕様書 v0.2 を全文確認する</span>
            </button>
          </div>
        </div>
      </div>

      {/* NEW: Why Current AI Fails / Reward Gaming Pathology */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 via-slate-900 to-amber-950/20 border border-rose-900/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm sm:text-base">
            <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
            <span>【最重要提起】既存AIが抱える4大構造的病理：なぜ「報酬最大化のための知的偽装」が起きるのか</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 text-xs font-mono border border-rose-500/20">
            Goodhart's Law &amp; Sycophancy
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          現代のLLMやマルチエージェントが「自信満々なハルシネーション」や「エコーチェンバー」に陥る最大の原因は、知能の不足ではなく**強化学習（RLHF）の報酬系設計の歪み**にあります。「分からない（Reject）」と答えるとベンチマークで減点されるため、AIは真実の探求を放棄し、**「評価スコアを最大化するために自信ありげに偽装する（Reward Gaming / Pretentious Overconfidence）」**ように訓練されています。ASNAは、この構造的インセンティブを根本から断ち切るために設計されています。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {CURRENT_AI_PATHOLOGIES.map((pathology) => (
            <div key={pathology.id} className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/30 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="font-bold text-sm text-rose-200">
                  {pathology.title}
                </div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  <strong className="text-slate-200">発生メカニズム:</strong> {pathology.mechanism}
                </p>
                <div className="mt-2 text-xs text-amber-300/90 bg-amber-950/30 p-2 rounded border border-amber-900/30">
                  ⚠️ <strong>現実の病状:</strong> {pathology.realWorldSymptom}
                </div>
              </div>

              <div className="text-xs text-emerald-300 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-900/40">
                🛡️ <strong>ASNAの構造的回答:</strong> {pathology.asnaSolution}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8 Major Proposals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>8大ブラッシュアップ提言（GitHub公開で絶賛されるための重要改善）</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              各項目をクリックすると、現状の制約、改善案、技術仕様、GitHubコミュニティへの影響度が展開されます。
            </p>
          </div>
          <button
            onClick={() => setExpandedProposal(expandedProposal ? null : 'all')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hidden sm:block"
          >
            {expandedProposal ? 'すべて閉じる' : '展開'}
          </button>
        </div>

        <div className="space-y-3">
          {MAJOR_PROPOSALS.map((prop) => {
            const isExpanded = expandedProposal === prop.id || expandedProposal === 'all';
            return (
              <div
                key={prop.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isExpanded 
                    ? 'bg-slate-900 border-indigo-500/40 shadow-xl shadow-indigo-950/40' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleProposal(prop.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {prop.badge}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-100">
                      {prop.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-1 sm:line-clamp-none">
                      {prop.summary}
                    </p>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs sm:text-sm">
                    {/* Before vs After comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/40 text-slate-300">
                        <div className="flex items-center space-x-1.5 text-rose-400 font-semibold mb-1 text-xs">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>v0.1 の現状・課題 (Limitation)</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-xs">
                          {prop.currentLimitation}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-slate-300">
                        <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold mb-1 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>v0.2 ブラッシュアップ案 (Enhancement)</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-xs">
                          {prop.proposedEnhancement}
                        </p>
                      </div>
                    </div>

                    {/* Technical Specification Bullets */}
                    <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        具体的実装・アルゴリズム仕様 (Technical Specs)
                      </div>
                      <ul className="space-y-1.5">
                        {prop.technicalDetails.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start space-x-2 text-slate-300 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                            <span className="font-mono text-slate-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* GitHub impact */}
                    <div className="flex items-center space-x-2 text-xs text-indigo-300 bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-800/40">
                      <span className="font-semibold text-indigo-400 shrink-0">GitHub公開時の反響効果:</span>
                      <span>{prop.impactOnGithub}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pitfalls & Safeguards */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            自己否定型アーキテクチャが陥る3大アンチパターンと防壁設計 (Safeguards)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          「自己否定」を取り入れた先行システムが最も犯しやすい実装上の失敗と、本v0.2仕様で織り込むべき防御機構です。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {PITFALLS_AND_SAFEGUARDS.map((p, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-amber-400 mb-1">
                  アンチパターン #{idx + 1}
                </div>
                <div className="text-sm font-bold text-slate-200 mb-2">
                  {p.pitfall}
                </div>
                <p className="text-xs text-rose-300/80 mb-3 bg-rose-950/30 p-2 rounded border border-rose-900/30">
                  ⚠️ リスク: {p.risk}
                </p>
              </div>
              <div className="text-xs text-emerald-300 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-900/30">
                🛡️ 防護策: {p.safeguard}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEW: Predicted Limitations & Trade-offs of ASNA */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-indigo-950/80 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-base sm:text-lg">
            <AlertOctagon className="w-5 h-5 text-indigo-400" />
            <span>予測される ASNA アーキテクチャの6大弱点・限界と設計トレードオフ (Known Limitations)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-500/20">
            Rigorous Self-Critique
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          真に実用に耐えうるシステム設計には、自らのトレードオフと限界に対する客観的な自己理解が不可欠です。本アーキテクチャの実装・運用において予測される6つの本質的弱点と、それに対する緩和策（Mitigations）です。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {PREDICTED_LIMITATIONS.map((limit) => (
            <div key={limit.id} className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-200">{limit.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-indigo-300 border border-slate-700">
                    {limit.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {limit.description}
                </p>
                <div className="mt-2 text-xs text-rose-300/90 bg-rose-950/30 p-2 rounded border border-rose-900/30">
                  ⚠️ <strong>予測される破綻モード:</strong> {limit.potentialFailureMode}
                </div>
              </div>

              <div className="text-xs text-indigo-300 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/40">
                🔧 <strong>設計上の緩和策:</strong> {limit.recommendedMitigation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
