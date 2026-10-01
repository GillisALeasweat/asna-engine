import React, { useState } from 'react';
import { Navigation, ActiveTab } from './components/Navigation';
import { ReviewTab } from './components/ReviewTab';
import { SpecComparisonTab } from './components/SpecComparisonTab';
import { SimulatorTab } from './components/SimulatorTab';
import { UndeterminedItemsTab } from './components/UndeterminedItemsTab';
import { SchemaTab } from './components/SchemaTab';
import { GithubKitTab } from './components/GithubKitTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('review');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navigation Header */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'review' && (
          <ReviewTab onNavigateTab={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === 'spec_compare' && (
          <SpecComparisonTab />
        )}
        {activeTab === 'simulator' && (
          <SimulatorTab />
        )}
        {activeTab === 'items_6_10' && (
          <UndeterminedItemsTab />
        )}
        {activeTab === 'schemas' && (
          <SchemaTab />
        )}
        {activeTab === 'github_kit' && (
          <GithubKitTab />
        )}
      </main>

      {/* Minimal Academic Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-slate-400">ASNA</span>
            <span>— Adaptive &amp; Self-Negating multi-agent Cognitive Architecture</span>
          </div>
          <div className="font-mono text-slate-500">
            Convergence ≠ Truth | Reject is a valid cognitive state
          </div>
        </div>
      </footer>
    </div>
  );
}
