import React, { useState, useMemo } from 'react';
import {
  Layers,
  Globe,
  Lock,
  Database,
  Terminal,
  Radio,
  Server,
  Activity,
  Network,
  Cpu,
  Search,
  Copy,
  Check,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  Sparkles,
  Bot,
  ExternalLink,
  Code2,
  ArrowRightLeft
} from 'lucide-react';
import {
  IMPORTANT_PORTS_DATA,
  PORT_CATEGORIES,
  SECURITY_GROUP_RULES_GUIDE
} from '../data/importantPortsData';
import PortsLogo from '../components/PortsLogo';

export default function PortsReferenceHub({ onNavigate, onAskAi }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [copiedId, setCopiedId] = useState(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const [showArchitectureGuide, setShowArchitectureGuide] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Filter logic
  const filteredPorts = useMemo(() => {
    return IMPORTANT_PORTS_DATA.filter((item) => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Risk filter
      const matchesRisk = selectedRisk === 'ALL' || item.riskLevel === selectedRisk;

      // Search query
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory && matchesRisk;

      const portStr = String(item.port).toLowerCase();
      const matchesQuery =
        portStr.includes(query) ||
        item.service.toLowerCase().includes(query) ||
        item.commonName.toLowerCase().includes(query) ||
        item.protocol.toLowerCase().includes(query) ||
        item.whereToUse.toLowerCase().includes(query) ||
        item.architecturalGuidance.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesRisk && matchesQuery;
    });
  }, [selectedCategory, selectedRisk, searchQuery]);

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopySnippet = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'CRITICAL':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1 shadow-sm">
            <ShieldAlert className="w-3 h-3 text-rose-400" /> Critical Risk If Public
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-orange-400" /> High Ingress Risk
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Info className="w-3 h-3 text-amber-400" /> Internal VPC Only
          </span>
        );
      case 'SAFE':
      case 'STANDARD':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Public / Standard
          </span>
        );
    }
  };

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'web': return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'remote': return <Lock className="w-4 h-4 text-rose-400" />;
      case 'database': return <Database className="w-4 h-4 text-amber-400" />;
      case 'devops': return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'k8s': return <Radio className="w-4 h-4 text-indigo-400" />;
      case 'storage': return <Server className="w-4 h-4 text-purple-400" />;
      case 'monitoring': return <Activity className="w-4 h-4 text-teal-400" />;
      case 'network': return <Network className="w-4 h-4 text-sky-400" />;
      case 'app': return <Cpu className="w-4 h-4 text-orange-400" />;
      default: return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 w-full pb-16">
      {/* Hero Header with Brand Logo */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card border-amber-500/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          {/* Custom Ports & Protocols Cyber-Optic Logo */}
          <PortsLogo size="xl" />

          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 shadow-sm">
                <Network className="w-3.5 h-3.5 text-amber-400" /> Important Ports Hub
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-300 font-semibold">AWS Security Groups, DevOps &amp; Networking</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{IMPORTANT_PORTS_DATA.length}+ Curated Ports</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
              Important Ports &amp; Protocols Reference Guide
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Complete architectural directory of essential networking ports across <span className="text-cyan-300 font-bold">AWS Security Groups</span>, <span className="text-amber-300 font-bold">Databases</span>, <span className="text-emerald-300 font-bold">DevOps CI/CD</span>, <span className="text-indigo-300 font-bold">Kubernetes (K8s)</span>, and <span className="text-rose-300 font-bold">Remote Access</span>. Includes exact use cases, recommended source CIDRs, and copy-ready AWS CLI and Terraform rules.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex items-center gap-3 flex-wrap text-xs font-semibold text-slate-300">
              <button
                onClick={() => setShowArchitectureGuide(!showArchitectureGuide)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition flex items-center gap-1.5 font-bold shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{showArchitectureGuide ? 'Hide Security Group Golden Rules' : 'View Security Group Golden Rules'}</span>
                {showArchitectureGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {onAskAi && (
                <button
                  onClick={() => onAskAi('Explain AWS Security Group chaining and port security best practices')}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-indigo-300 border border-indigo-500/30 transition flex items-center gap-1.5 font-bold"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ask AI About Ports</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Group Golden Rules Guide (Collapsible) */}
      {showArchitectureGuide && (
        <div className="p-6 rounded-3xl neo-card border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-slate-950 to-slate-900/90 space-y-4 animate-in fade-in duration-300 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white">AWS Security Group &amp; Port Golden Rules</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SECURITY_GROUP_RULES_GUIDE.map((rule, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-sm text-white">{rule.title}</span>
                  <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {rule.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls Bar: Category Selector, Search, Risk Filter & View Mode */}
      <div className="p-4 sm:p-5 rounded-3xl neo-card space-y-4 border-amber-500/20 shadow-lg">
        {/* Top Controls: Search Bar & View Mode */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by port number (e.g. 3306, 22), service, protocol, or use case..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Filters: Risk Dropdown & Grid/Table View Toggle */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Risk Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 border border-white/[0.08] px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-400 font-bold">Risk:</span>
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="bg-transparent text-amber-300 font-extrabold focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900 text-slate-200">All Risk Levels</option>
                <option value="CRITICAL" className="bg-slate-900 text-rose-300">Critical Public Risk</option>
                <option value="HIGH" className="bg-slate-900 text-orange-300">High Ingress Risk</option>
                <option value="MEDIUM" className="bg-slate-900 text-amber-300">Internal VPC Only</option>
                <option value="SAFE" className="bg-slate-900 text-emerald-300">Public / Standard</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl bg-slate-950/80 border border-white/[0.08] p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Card Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  viewMode === 'table'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Dense Matrix Table View"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Cheat Sheet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PORT_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? IMPORTANT_PORTS_DATA.length
                : IMPORTANT_PORTS_DATA.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-white/[0.06] hover:text-slate-200 hover:border-white/[0.12]'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/[0.06] text-[10px] font-mono text-slate-400">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredPorts.length}</strong> important ports
          {searchQuery && (
            <span> matching "<strong>{searchQuery}</strong>"</span>
          )}
        </span>
        <span className="text-[11px] text-amber-400/80">Click any card to expand full Terraform &amp; AWS CLI snippets</span>
      </div>

      {/* ========================================================= */}
      {/* 1. CARD GRID VIEW */}
      {/* ========================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {filteredPorts.map((item) => {
            const isExpanded = expandedCardId === item.id;

            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-3xl neo-card border-white/[0.08] hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xl group relative"
              >
                {/* Card Top: Port Number Badge, Protocol & Risk */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {/* Port Number Pill */}
                      <div
                        onClick={() => handleCopyText(String(item.port), `port-${item.id}`)}
                        className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 font-mono font-black text-lg sm:text-xl flex items-center gap-1.5 cursor-pointer hover:border-amber-400 transition shadow-inner group/copy"
                        title="Click to copy port number"
                      >
                        <span>{item.port}</span>
                        {copiedId === `port-${item.id}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-amber-400/60 opacity-0 group-hover/copy:opacity-100 transition" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                            {item.protocol}
                          </span>
                          <span className="text-slate-600 text-xs">•</span>
                          <span className="text-[11px] font-semibold text-slate-400">{item.categoryLabel}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-white group-hover:text-amber-200 transition">
                          {item.service}
                        </h3>
                      </div>
                    </div>

                    <div>{getRiskBadge(item.riskLevel)}</div>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 bg-white/[0.02] px-2.5 py-1 rounded-xl border border-white/[0.04]">
                    {item.commonName}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.description}</p>

                  {/* 🎯 WHERE TO USE IT (Requested Feature) */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-1.5 shadow-inner">
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-black uppercase tracking-wider">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                      <span>Where To Use It (Architecture Guidance)</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">{item.whereToUse}</p>
                  </div>

                  {/* Security Group Inbound Rule Preview */}
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-slate-300">Security Group Source:</span>
                      <span className="font-mono text-cyan-300 font-bold">{item.awsSecurityGroup.ruleDirection}</span>
                    </div>
                    <p className="font-mono text-amber-300 text-xs font-bold truncate">
                      {item.awsSecurityGroup.recommendedSource}
                    </p>
                  </div>

                  {/* Expandable Section: Terraform Snippet & CLI Command */}
                  {isExpanded && (
                    <div className="space-y-3 pt-2 border-t border-white/[0.06] animate-in fade-in duration-200">
                      {/* Architectural Guidance / Pitfalls */}
                      <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-1">
                        <span className="font-bold text-rose-300 text-[11px] uppercase tracking-wider block">
                          Architectural Safeguard &amp; Pitfall
                        </span>
                        <p className="text-slate-300 leading-relaxed">{item.architecturalGuidance}</p>
                      </div>

                      {/* Interview Tip */}
                      {item.interviewTip && (
                        <div className="p-3 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 text-xs space-y-1">
                          <span className="font-bold text-indigo-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Interview Question Tip
                          </span>
                          <p className="text-slate-300 leading-relaxed">{item.interviewTip}</p>
                        </div>
                      )}

                      {/* AWS CLI Command */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-bold text-slate-300 flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-amber-400" /> AWS CLI Ingress Command
                          </span>
                          <button
                            onClick={() => handleCopySnippet(item.awsSecurityGroup.awsCliCommand, `cli-${item.id}`)}
                            className="text-[10px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                          >
                            {copiedSnippetId === `cli-${item.id}` ? (
                              <span className="text-emerald-400 flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Copied CLI
                              </span>
                            ) : (
                              <span className="flex items-center gap-0.5">
                                <Copy className="w-3 h-3" /> Copy CLI
                              </span>
                            )}
                          </button>
                        </div>
                        <pre className="p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] text-amber-300 border border-white/[0.06] overflow-x-auto whitespace-pre-wrap break-all">
                          {item.awsSecurityGroup.awsCliCommand}
                        </pre>
                      </div>

                      {/* Terraform IaC Snippet */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-bold text-slate-300 flex items-center gap-1">
                            <Code2 className="w-3 h-3 text-purple-400" /> Terraform Ingress Snippet
                          </span>
                          <button
                            onClick={() => handleCopySnippet(item.awsSecurityGroup.terraformSnippet, `tf-${item.id}`)}
                            className="text-[10px] text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                          >
                            {copiedSnippetId === `tf-${item.id}` ? (
                              <span className="text-emerald-400 flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Copied TF
                              </span>
                            ) : (
                              <span className="flex items-center gap-0.5">
                                <Copy className="w-3 h-3" /> Copy TF
                              </span>
                            )}
                          </button>
                        </div>
                        <pre className="p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] text-purple-300 border border-white/[0.06] overflow-x-auto whitespace-pre">
                          {item.awsSecurityGroup.terraformSnippet}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setExpandedCardId(isExpanded ? null : item.id)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
                  >
                    <span>{isExpanded ? 'Collapse Details' : 'View Rules & IaC'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex items-center gap-1.5">
                    {onAskAi && (
                      <button
                        onClick={() => onAskAi(`Explain port ${item.port} (${item.service}) in AWS architecture and how to properly configure its security group.`)}
                        className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-indigo-300 border border-indigo-500/20 transition"
                        title="Ask AI DevOps Trainer about this port"
                      >
                        <Bot className="w-3.5 h-3.5 text-indigo-400" />
                      </button>
                    )}
                    <button
                      onClick={() => handleCopySnippet(item.awsSecurityGroup.awsCliCommand, `cli-btn-${item.id}`)}
                      className="px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold transition flex items-center gap-1"
                      title="Copy AWS CLI rule"
                    >
                      {copiedSnippetId === `cli-btn-${item.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-amber-400" />
                          <span>Copy Rule</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. DENSE MATRIX / TABLE CHEAT SHEET VIEW */}
      {/* ========================================================= */}
      {viewMode === 'table' && (
        <div className="rounded-3xl neo-card border-white/[0.08] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/90 border-b border-white/[0.08] text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Port</th>
                  <th className="py-3.5 px-3">Protocol</th>
                  <th className="py-3.5 px-4">Service &amp; Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Where To Use It (Architecture)</th>
                  <th className="py-3.5 px-4">Recommended Source</th>
                  <th className="py-3.5 px-3">Risk Level</th>
                  <th className="py-3.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filteredPorts.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/[0.02] transition-colors group font-sans"
                  >
                    {/* Port Number */}
                    <td className="py-3 px-4 font-mono font-black text-amber-300 text-sm whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30">
                        {item.port}
                      </span>
                    </td>

                    {/* Protocol */}
                    <td className="py-3 px-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                      {item.protocol}
                    </td>

                    {/* Service & Common Name */}
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-white text-xs whitespace-nowrap">
                        {item.service}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate max-w-[160px]">
                        {item.commonName}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        {getCategoryIcon(item.category)}
                        {item.categoryLabel}
                      </span>
                    </td>

                    {/* Where to Use */}
                    <td className="py-3 px-4 max-w-md">
                      <p className="text-xs text-slate-200 line-clamp-2 leading-snug">
                        {item.whereToUse}
                      </p>
                    </td>

                    {/* Recommended Source */}
                    <td className="py-3 px-4 font-mono text-[11px] text-amber-300 font-bold whitespace-nowrap">
                      {item.awsSecurityGroup.recommendedSource}
                    </td>

                    {/* Risk Level */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {getRiskBadge(item.riskLevel)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleCopySnippet(item.awsSecurityGroup.awsCliCommand, `tbl-${item.id}`)}
                          className="px-2 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[10px] font-bold transition flex items-center gap-1"
                          title="Copy AWS CLI Ingress Command"
                        >
                          {copiedSnippetId === `tbl-${item.id}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>CLI</span>
                            </>
                          )}
                        </button>
                        {onAskAi && (
                          <button
                            onClick={() => onAskAi(`Explain how port ${item.port} (${item.service}) is configured in production AWS security groups.`)}
                            className="p-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-indigo-300 border border-indigo-500/20 transition"
                            title="Ask AI Trainer"
                          >
                            <Bot className="w-3.5 h-3.5 text-indigo-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No results fallback */}
      {filteredPorts.length === 0 && (
        <div className="p-12 text-center rounded-3xl neo-card space-y-3">
          <p className="text-slate-400 text-sm">No ports found matching your query "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedRisk('ALL');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40"
          >
            Clear Filters &amp; View All Ports
          </button>
        </div>
      )}
    </div>
  );
}
