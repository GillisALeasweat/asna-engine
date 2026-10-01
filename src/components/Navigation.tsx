import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Cpu, 
  Code2, 
  GitBranch, 
  Layers, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export type ActiveTab = 'review' | 'spec_compare' | 'simulator' | 'items_6_10' | 'schemas' | 'github_kit';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'review' as ActiveTab, label: 'ブラッシュアップ総合提案', icon: Sparkles, badge: '8大提言' },
    { id: 'spec_compare' as ActiveTab, label: '仕様書 v0.1 vs v0.2', icon: FileText, badge: '改定スペック' },
    { id: 'simulator' as ActiveTab, label: '認知パイプライン・シミュレータ', icon: Cpu, badge: 'Live Demo' },
    { id: 'items_6_10' as ActiveTab, label: '未確定項目 ⑥〜⑩ 設計ドラフト', icon: Layers, badge: '完全補完' },
    { id: 'schemas' as ActiveTab, label: '実装用 TypeScript / JSON Schema', icon: Code2, badge: '型定義' },
    { id: 'github_kit' as ActiveTab, label: 'GitHub 公開キット (README/RFC)', icon: GitBranch, badge: 'RFC-0001' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-bold text-sm tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                  ASNA
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-100 text-sm sm:text-base tracking-tight">
                  適応型・自己否定型マルチエージェント AI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                  Spec Review &amp; v0.2 Studio
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                認知アーキテクチャ設計仕様書 v0.1 に対する詳細改善提言・実行シミュレータ
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>v0.1 → v0.2 Ready</span>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-slate-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-indigo-700/80 text-indigo-100'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
