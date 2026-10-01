import React, { useState } from 'react';
import { 
  GITHUB_README_MD, 
  RFC_0001_MD, 
  REPO_DIRECTORY_TREE, 
  CITATION_CFF, 
  ZENODO_JSON, 
  ACADEMIC_PEER_REVIEW_CHECKLIST,
  EVALUATE_ECE_PY
} from '../data/githubKit';
import { 
  Copy, 
  Check, 
  GitBranch, 
  FileCode, 
  FolderTree, 
  Star, 
  BookOpen, 
  GraduationCap, 
  FileCheck2, 
  AlertTriangle,
  BarChart2
} from 'lucide-react';

export const GithubKitTab: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'readme' | 'rfc' | 'tree' | 'cff' | 'zenodo' | 'benchmark' | 'checklist'>('checklist');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getActiveContent = () => {
    switch (activeFile) {
      case 'readme': return GITHUB_README_MD;
      case 'rfc': return RFC_0001_MD;
      case 'tree': return REPO_DIRECTORY_TREE;
      case 'cff': return CITATION_CFF;
      case 'zenodo': return ZENODO_JSON;
      case 'benchmark': return EVALUATE_ECE_PY;
      default: return '';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-2 border border-emerald-500/20">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Zenodo DOI &amp; Academic Publishing Suite</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              GitHub 公開 &amp; Zenodo DOI 査読準備キット
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Zenodo連携によるDOI即時付与、arXiv・学会（NeurIPS/ICLR等）への査読提出に必要なメタデータとギャップ分析です。
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {activeFile !== 'checklist' && (
              <button
                onClick={() => handleCopy(activeFile, getActiveContent())}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                {copied === activeFile ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied === activeFile ? 'コピー完了！' : '現在のファイルをコピー'}</span>
              </button>
            )}
          </div>
        </div>

        {/* File Selectors */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setActiveFile('checklist')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFile === 'checklist'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>🎓 査読・DOI付与 不足情報チェックリスト</span>
          </button>
          <button
            onClick={() => setActiveFile('cff')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFile === 'cff'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>CITATION.cff (DOI引用メタデータ)</span>
          </button>
          <button
            onClick={() => setActiveFile('zenodo')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFile === 'zenodo'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>.zenodo.json (CERNアーカイブ設定)</span>
          </button>
          <button
            onClick={() => setActiveFile('benchmark')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFile === 'benchmark'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>benchmarks/evaluate_ece.py (実験コード)</span>
          </button>
          <button
            onClick={() => setActiveFile('readme')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFile === 'readme'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>README.md</span>
          </button>
          <button
            onClick={() => setActiveFile('rfc')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFile === 'rfc'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>rfcs/0001-asna-architecture.md</span>
          </button>
          <button
            onClick={() => setActiveFile('tree')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFile === 'tree'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>リポジトリ構造</span>
          </button>
        </div>
      </div>

      {/* Main Display: Checklist or File Viewer */}
      {activeFile === 'checklist' ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200">
            <strong>ZenodoでDOIを取得し、査読付き論文・国際会議を通すためのギャップ分析:</strong>
            <p className="mt-1 text-slate-300">
              Zenodo単体でのDOI発行（アーカイブ）自体は `CITATION.cff` とリポジトリを繋げば即日発行できます。しかし、arXivプレプリント登録や査読（Peer Review: JOSS, NeurIPS, ICLR, ACL等）をパスするには、以下の<strong>6大要件のうち特に「実証実験テーブル」と「形式的数理モデル」の補強</strong>が決定的に必要です。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACADEMIC_PEER_REVIEW_CHECKLIST.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-slate-200">{item.category}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      item.severity.includes('Showstopper') 
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : item.severity.includes('Critical')
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {item.severity}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="font-semibold text-slate-400 text-[11px]">不足している具体的項目:</div>
                    <ul className="space-y-1">
                      {item.lackingItems.map((lacking, lIdx) => (
                        <li key={lIdx} className="flex items-start space-x-1.5 text-slate-300 text-xs">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{lacking}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-rose-300/90 bg-rose-950/20 p-2.5 rounded border border-rose-900/30">
                  ⚠️ <strong>査読者の視点（Rejection Risk）:</strong> {item.reviewerPerspective}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="font-mono text-xs text-indigo-400 font-bold">
              {activeFile === 'readme' && 'README.md'}
              {activeFile === 'rfc' && 'rfcs/0001-asna-architecture.md'}
              {activeFile === 'tree' && 'Directory Structure (Monorepo)'}
              {activeFile === 'cff' && 'CITATION.cff (Place in Repository Root)'}
              {activeFile === 'zenodo' && '.zenodo.json (Place in Repository Root)'}
              {activeFile === 'benchmark' && 'benchmarks/evaluate_ece.py (Python Evaluation Benchmark)'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Ready to commit</span>
          </div>
          <pre className="p-6 font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[600px]">
            {getActiveContent()}
          </pre>
        </div>
      )}
    </div>
  );
};
