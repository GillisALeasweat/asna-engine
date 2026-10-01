import React, { useState, useEffect } from 'react';
import { PRESET_SCENARIOS } from '../data/presetScenarios';
import { PresetScenario, EvidenceUnit, SpecialistResult } from '../types/cognitive';
import { 
  Play, 
  RotateCcw, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Split, 
  FileText,
  Activity,
  ArrowRight,
  Database,
  ExternalLink,
  Info
} from 'lucide-react';

export const SimulatorTab: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(PRESET_SCENARIOS[0].id);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);

  const scenario = PRESET_SCENARIOS.find(s => s.id === selectedScenarioId) || PRESET_SCENARIOS[0];

  const pipelineStages = [
    { id: 0, title: '01. Question Analysis', subtitle: '何を答えるべきか・前提・曖昧性の抽出', icon: Search },
    { id: 1, title: '02. Decomposition', subtitle: '解ける構造へのサブ問題DAG分解', icon: Split },
    { id: 2, title: '03. Adaptive Compute', subtitle: 'リスクと複雑度に応じた資源割当', icon: Zap },
    { id: 3, title: '04. Evidence Layer', subtitle: '一次原典遡行とプロベナンス追跡', icon: Database },
    { id: 4, title: '05. Parallel Specialists', subtitle: '相互通信遮断・独立並行推論', icon: Layers },
    { id: 5, title: '06. Grounded Self-Negation', subtitle: 'Level 0〜4 階層的反証探索', icon: ShieldCheck },
    { id: 6, title: '07. Dialectical Integration', subtitle: '合意領域と対立領域の弁証法的統合', icon: Activity },
    { id: 7, title: '08. Convergence State Machine', subtitle: 'S / A / B / C / Reject 確定判定', icon: CheckCircle2 },
    { id: 8, title: '09. Epistemic Answer', subtitle: '前提・留保事項付き最終回答の生成', icon: FileText },
  ];

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isRunning && currentStep < pipelineStages.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
    } else if (currentStep >= pipelineStages.length - 1) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setSelectedNodeData(null);
  };

  const handleRunFull = () => {
    setCurrentStep(0);
    setIsRunning(true);
  };

  const handleStepForward = () => {
    if (currentStep < pipelineStages.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6">
      {/* Scenario Selector & Controls */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 mb-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Cognitive Pipeline Trace Inspector</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              認知パイプライン・リアルタイムシミュレータ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              ASNAアーキテクチャの推論プロセスをステップ実行し、各ノードの内部状態（Evidence、自己否定、収束判定）を検証します。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleRunFull}
              disabled={isRunning}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-lg transition-all cursor-pointer ${
                isRunning 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isRunning ? '推論実行中...' : 'パイプライン全自動実行'}</span>
            </button>
            <button
              onClick={handleStepForward}
              disabled={isRunning || currentStep >= pipelineStages.length - 1}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer"
            >
              <span>次の段階へ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all cursor-pointer"
              title="リセット"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="mt-5 pt-5 border-t border-slate-800/80">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            検証シナリオの選択（科学・政策・論理パラドックス）:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRESET_SCENARIOS.map((sc) => {
              const isSelected = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenarioId(sc.id);
                    setCurrentStep(0);
                    setSelectedNodeData(null);
                  }}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 text-indigo-100 shadow-md shadow-indigo-950/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {sc.category}
                    </span>
                    <span className="font-bold text-indigo-400">
                      State {sc.convergence.state}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 truncate">
                    {sc.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current Question Display */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start space-x-3">
            <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 mt-0.5 shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-mono text-slate-400 block mb-0.5">投入された質問 (User Prompt):</span>
              <p className="text-xs sm:text-sm font-medium text-slate-200">
                "{scenario.userQuestion}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Progress Stages Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
        <div className="flex items-center min-w-[700px] justify-between relative">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 -z-0"></div>
          {pipelineStages.map((stage) => {
            const isCompleted = currentStep > stage.id;
            const isCurrent = currentStep === stage.id;
            const isUpcoming = currentStep < stage.id;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => setCurrentStep(stage.id)}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 scale-110 shadow-lg shadow-indigo-600/50'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-[10px] font-mono font-bold mt-2 text-center whitespace-nowrap">
                  <span className={isCurrent ? 'text-indigo-400' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}>
                    Step 0{stage.id + 1}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation View Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Stage Details (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 min-h-[480px]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Step 0{currentStep + 1} / 09
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {pipelineStages[currentStep].title}
                </h3>
              </div>
              <span className="text-xs text-slate-400 hidden sm:block">
                {pipelineStages[currentStep].subtitle}
              </span>
            </div>

            <div className="py-4">
              {/* Step 0: Question Analysis */}
              {currentStep === 0 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400 mb-1">Intent (真の質問意図)</div>
                      <div className="text-xs sm:text-sm text-slate-200 font-medium">{scenario.analysis.intent}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400 mb-1">Target (対象エンティティ)</div>
                      <div className="text-xs sm:text-sm text-slate-200 font-medium">{scenario.analysis.target}</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-[11px] font-mono text-slate-400">Assumptions &amp; Ambiguities (暗黙の前提と曖昧性)</div>
                    <div className="flex flex-wrap gap-1.5">
                      {scenario.analysis.assumptions.map((a, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-amber-950/40 text-amber-300 border border-amber-800/40">
                          前提: {a}
                        </span>
                      ))}
                      {scenario.analysis.ambiguities.map((a, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-rose-950/40 text-rose-300 border border-rose-800/40">
                          曖昧性: {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 mb-2">Required Reasoning Axes (必要な推論軸)</div>
                    <div className="flex flex-wrap gap-2">
                      {scenario.analysis.requiredReasoningAxes.map((axis, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 text-xs font-mono">
                          ⚡ {axis}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Decomposition */}
              {currentStep === 1 && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <p className="text-xs text-slate-400">
                    質問を相互排他的かつ解ける構造へサブ問題DAGとして分解しました（Coverage &amp; Dependency）：
                  </p>
                  <div className="space-y-2.5">
                    {scenario.subquestions.map((sq, i) => (
                      <div key={sq.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-300 font-mono">
                            Sub-Question #{i + 1} [{sq.importance}]
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-mono">
                            {sq.status}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-200">
                          {sq.title}
                        </div>
                        <p className="text-xs text-slate-400">
                          {sq.description}
                        </p>
                        <div className="flex items-center space-x-2 pt-1 text-[11px] text-slate-400">
                          <span>割り当て専門軸:</span>
                          <span className="font-mono text-indigo-400">{sq.assignedSpecialists.join(', ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Adaptive Compute */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/50 space-y-2">
                    <div className="text-xs font-mono text-indigo-300 font-bold uppercase">
                      Compute Budget Router Evaluation
                    </div>
                    <div className="text-sm text-slate-200">
                      初期不確実性: <span className="font-mono text-indigo-300 font-bold">{(scenario.analysis.initialUncertainty * 100).toFixed(0)}%</span> / 
                      リスクレベル: <span className="font-mono text-amber-300 font-bold">High (Critical Verification)</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      自明な質問ではないため Fast-Path はバイパスされ、<strong>Deep-Adversarial Path（Level 0〜4 完全自己否定および並列Specialist完全隔離）</strong>が動的アロケートされました。
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">割当Specialist数</div>
                      <div className="text-lg font-mono font-bold text-white">{scenario.specialists.length} 軸</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">否定深度 (Max Depth)</div>
                      <div className="text-lg font-mono font-bold text-amber-400">Level 4</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">最大ロールバック許容</div>
                      <div className="text-lg font-mono font-bold text-emerald-400">2 回</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Evidence Layer */}
              {currentStep === 3 && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span>収集・原典検証された Evidence Unit (Primary source ≠ Truth):</span>
                    <span className="font-mono text-indigo-400">{scenario.evidences.length} 件登録</span>
                  </div>
                  <div className="space-y-2.5">
                    {scenario.evidences.map((ev) => (
                      <div 
                        key={ev.id} 
                        onClick={() => setSelectedNodeData({ type: 'evidence', data: ev })}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-indigo-400 font-bold">{ev.id} [{ev.sourceType}]</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                            {ev.status} (信頼度 {(ev.verificationConfidence * 100).toFixed(0)}%)
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-200">
                          {ev.claim}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                          <span>出所:</span>
                          <span className="font-mono text-slate-300">{ev.source}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Parallel Specialists */}
              {currentStep === 4 && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/30 text-xs text-indigo-300">
                    🔒 <strong>エコーチェンバー遮断</strong>: 各Specialistは他者の推論ストリームを閲覧できない隔離サンドボックスで独立推論を実行。
                  </div>
                  <div className="space-y-2.5">
                    {scenario.specialists.map((spec) => (
                      <div 
                        key={spec.specialistId}
                        onClick={() => setSelectedNodeData({ type: 'specialist', data: spec })}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200">{spec.axis}</span>
                          <span className="font-mono text-[10px] text-indigo-400">ID: {spec.specialistId}</span>
                        </div>
                        <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                          <strong>導出仮説:</strong> {spec.hypothesis}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Grounded Self-Negation */}
              {currentStep === 5 && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/30 text-xs text-amber-300">
                    🛡️ <strong>Grounded Negation</strong>: 反証エージェントが各仮説に対して Level 0〜4 の脆弱性・代替説明を積極探索。
                  </div>
                  <div className="space-y-3">
                    {scenario.specialists.map((spec) => (
                      <div key={spec.specialistId} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="text-xs font-bold text-slate-200">
                          {spec.axis} への反証テスト結果:
                        </div>
                        {spec.negationFindings.map((finding, fIdx) => (
                          <div key={fIdx} className="text-xs p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] text-amber-400 font-bold">{finding.level}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                                finding.vulnerabilityFound ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'
                              }`}>
                                {finding.vulnerabilityFound ? '脆弱性検出・再解釈要求' : '反証テスト通過'}
                              </span>
                            </div>
                            <p className="text-slate-300 text-xs">
                              {finding.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Dialectical Integration */}
              {currentStep === 6 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase">合意領域 (Consensus Core)</div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {scenario.integration.consensusTheses.map((thesis, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{thesis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {scenario.integration.antitheses.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs font-mono font-bold text-amber-400 uppercase">対立領域 (Antitheses Breakdown)</div>
                      {scenario.integration.antitheses.map((anti, i) => (
                        <div key={i} className="text-xs p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                          <div className="font-semibold text-slate-200">対立軸: {anti.conflictAxis} (原因: {anti.rootCause})</div>
                          <div className="text-slate-400">A説 ({anti.specialistA}): {anti.claimA}</div>
                          <div className="text-slate-400">B説 ({anti.specialistB}): {anti.claimB}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/50 space-y-1">
                    <div className="text-xs font-mono font-bold text-indigo-300 uppercase">高次統合仮説 (Synthesis Hypothesis)</div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">
                      {scenario.integration.synthesisHypothesis}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 7: Convergence State Machine */}
              {currentStep === 7 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">確定収束判定ステート</span>
                      <div className="text-2xl font-mono font-extrabold text-indigo-400 flex items-center space-x-2">
                        <span>State {scenario.convergence.state}</span>
                        <span className="text-xs font-normal text-slate-400">
                          (証拠強度スコア: {scenario.convergence.evidenceStrengthScore}/100)
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                      Convergence ≠ Truth
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase">定量的クライテリア合致検証 (Decision Table)</div>
                    <div className="space-y-1.5">
                      {scenario.convergence.criteriaChecked.map((c, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-slate-900/70">
                          <span className="text-slate-300">{c.criterion}</span>
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                            c.passed ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                          }`}>
                            {c.passed ? 'PASSED' : 'CONDITION_SPLIT'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong>判定根拠:</strong> {scenario.convergence.justification}
                  </div>
                </div>
              )}

              {/* Step 8: Final Epistemic Answer */}
              {currentStep === 8 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-300 uppercase">
                        Answer Strategy: {scenario.answer.strategy}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white">
                      {scenario.answer.summary}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {scenario.answer.detailedAnalysis}
                  </div>

                  {/* Provenance trace */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase">追跡可能プロベナンス (Inference Provenance Trace)</div>
                    <div className="space-y-1.5">
                      {scenario.answer.provenanceTrace.map((tr, i) => (
                        <div key={i} className="text-xs p-2 rounded bg-slate-900/70 border border-slate-800/80">
                          <div className="font-semibold text-indigo-300">{tr.claim}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 font-mono">経路: {tr.inferencePath}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Node Inspector Sidebar (1 Col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 h-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                <span>ノード・インスペクター</span>
              </h4>
              <span className="text-[10px] text-slate-500">Live Inspector</span>
            </div>

            {selectedNodeData ? (
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-indigo-200 font-mono text-[11px]">
                  Selected: {selectedNodeData.type}
                </div>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-96">
                  {JSON.stringify(selectedNodeData.data, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Database className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-xs">
                  左画面のEvidence UnitやSpecialistをクリックすると、内部の完全なJSONメタデータをリアルタイム検査できます。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NEW: Bottom Substrate Layer (情報AI・プロベナンス常時下支え基盤) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/30 to-slate-950 border-2 border-indigo-500/30 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-900/40 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-bold text-white tracking-wide">
                  【底部情報基盤】Evidence &amp; Provenance Substrate Layer (情報 AI 層)
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Always-On Foundation
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                全認知エージェント（Specialists, Negation, Integration）を物理的に下支えし、因果DAGを常時蓄積・無効化伝播するアーキテクチャの土台
              </p>
            </div>
          </div>
          <div className="text-xs text-indigo-300 font-mono">
            Active Evidences: <span className="font-bold text-white">{scenario.evidences.length}</span> units
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {scenario.evidences.map((ev) => (
            <div
              key={ev.id}
              onClick={() => setSelectedNodeData({ type: 'evidence', data: ev })}
              className="p-3 rounded-xl bg-slate-900/90 border border-indigo-900/40 hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-indigo-400 font-bold">{ev.id} ({ev.sourceType})</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-mono">
                    Status: {ev.status}
                  </span>
                </div>
                <div className="font-semibold text-slate-200 line-clamp-2">
                  {ev.claim}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                <span>出所: {ev.source}</span>
                <span className="text-indigo-400">依存Specialist: {ev.usedBySpecialists.length}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-900/30 text-xs text-indigo-200 flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span><strong>垂直フィードバック機構:</strong> 新しい反証が底部に登録された場合、トポロジカルソートで上部推論ノードへ即座に無効化（Invalidation）が伝播します。</span>
          </span>
          <span className="font-mono text-[10px] text-slate-400">Substrate Bus: Active</span>
        </div>
      </div>
    </div>
  );
};
