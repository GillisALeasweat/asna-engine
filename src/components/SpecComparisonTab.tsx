import React, { useState } from 'react';
import { SPEC_V01_TEXT, SPEC_V02_TEXT } from '../data/v02SpecContent';
import { Copy, Check, Split, FileText, ArrowRight, Download } from 'lucide-react';

export const SpecComparisonTab: React.FC = () => {
  const [viewMode, setViewMode] = useState<'v02' | 'split' | 'v01'>('v02');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const majorChangesSummary = [
    {
      title: '閉ループ状態機械 (FSM) とロールバック制御の追加',
      desc: '単なる矢印から、トリガー条件・発振防止ダンパー（最大2回）・禁忌探索付きのFSMへと厳密化。'
    },
    {
      title: 'Grounded Negation（反証ハルシネーション防壁）',
      desc: '自己否定エージェント自身が架空の反証をでっち上げないよう、反証にも一次原典Evidence Unitの提示を義務付け。'
    },
    {
      title: 'Convergence S/A/B/C/Reject の定量的決定表',
      desc: '主サブ問題の解決割合、未解消反証数、証拠強度によるマトリクス決定表を定義し、実装可能性を担保。'
    },
    {
      title: '未確定項目 ⑥〜⑩ の完全設計を正式仕様として組み込み',
      desc: '弁証法的統合AI、動的計算予算関数、推論失敗メモリ、ECEベンチマーク、リポジトリ構成を完全策定。'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono mb-2 border border-indigo-500/20">
            <span>RFC-0001 Ready Specification</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            仕様書 v0.1 (原案) vs v0.2 (ブラッシュアップ改定版)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            原案の哲学・美点を100%継承し、オープンソースおよび学術的検証に耐えうる数理・状態機械・型定義を補強したフルスペックです。
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => handleCopy(SPEC_V02_TEXT)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Markdownコピー完了！' : 'v0.2 をMarkdownコピー'}</span>
          </button>
        </div>
      </div>

      {/* Changes Summary Card */}
      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30">
        <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
          v0.2 で追加・強化された4大コア仕様
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {majorChangesSummary.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-indigo-900/40 text-xs">
              <div className="font-semibold text-indigo-200 mb-1">
                {idx + 1}. {item.title}
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('v02')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'v02' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            改定版仕様書 v0.2 (推奨)
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all hidden md:flex items-center space-x-1 ${
              viewMode === 'split' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>左右並列比較 (Split)</span>
          </button>
          <button
            onClick={() => setViewMode('v01')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'v01' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            原案 v0.1 (提出PDF内容)
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          {viewMode === 'v02' && 'v0.2 Complete Specification (Draft)'}
          {viewMode === 'v01' && 'v0.1 Original Text (6 Pages)'}
          {viewMode === 'split' && 'v0.1 (Left) vs v0.2 (Right)'}
        </div>
      </div>

      {/* Document View Area */}
      {viewMode === 'split' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 overflow-y-auto max-h-[700px] text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
            <div className="sticky top-0 bg-slate-900 py-1 font-bold text-amber-400 border-b border-slate-800 mb-3 flex items-center justify-between">
              <span>【原案】v0.1 仕様書</span>
              <span className="text-[10px] text-slate-500">6 Pages OCR</span>
            </div>
            {SPEC_V01_TEXT}
          </div>
          <div className="p-5 rounded-xl bg-slate-900 border border-indigo-500/30 overflow-y-auto max-h-[700px] text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
            <div className="sticky top-0 bg-slate-900 py-1 font-bold text-indigo-400 border-b border-indigo-900/40 mb-3 flex items-center justify-between">
              <span>【改定版】v0.2 フルスペック</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Enhanced</span>
            </div>
            {SPEC_V02_TEXT}
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
            <pre className="p-4 sm:p-6 rounded-xl bg-slate-950 border border-slate-800/80 text-xs sm:text-sm font-mono text-slate-200 whitespace-pre-wrap overflow-x-auto leading-relaxed">
              {viewMode === 'v02' ? SPEC_V02_TEXT : SPEC_V01_TEXT}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
