import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LearningRoadmap from './pages/LearningRoadmap';
import TopicDetail from './pages/TopicDetail';
import PracticeLab from './pages/PracticeLab';
import ScenarioPractice from './pages/ScenarioPractice';
import InterviewPrep from './pages/InterviewPrep';
import QuizCenter from './pages/QuizCenter';
import ProgressAnalytics from './pages/ProgressAnalytics';
import RevisionCenter from './pages/RevisionCenter';
import FreeTierSafety from './pages/FreeTierSafety';
import Settings from './pages/Settings';
import LoginModal from './pages/LoginModal';
import AiTrainer from './pages/AiTrainer';
import CommandHub from './pages/CommandHub';
import DefinitionsGlossary from './pages/DefinitionsGlossary';
import PortsReferenceHub from './pages/PortsReferenceHub';
import HandsOnProjects from './pages/HandsOnProjects';
import AiAssistantDrawer from './components/AiAssistantDrawer';
import { api } from './services/api';
import { FALLBACK_MODULES } from './data/fallbackModulesData';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTopicSlug, setSelectedTopicSlug] = useState('regions-azs-and-edge-infrastructure');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [modules, setModules] = useState(FALLBACK_MODULES);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load user from storage or fetch /auth/me
  useEffect(() => {
    const token = localStorage.getItem('aws_learning_token');
    if (token) {
      api.getMe()
        .then(res => {
          setUser(res.user);
        })
        .catch(() => {
          localStorage.removeItem('aws_learning_token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcut for Cmd/Ctrl+K search and Cmd/Ctrl+B sidebar toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveTab('roadmap');
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarCollapsed(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch Dashboard Stats & Modules whenever activeTab changes or user changes
  useEffect(() => {
    refreshDashboard();
  }, [user]);

  const refreshDashboard = () => {
    api.getDashboardSummary()
      .then(res => {
        setDashboardStats(res);
      })
      .catch(err => {
        console.log('User not logged in or dashboard loading:', err.message);
      });

    api.getModules()
      .then(res => {
        if (res.modules && res.modules.length > 0) {
          const existingNums = new Set(res.modules.map(m => m.moduleNumber));
          const missing = FALLBACK_MODULES.filter(m => !existingNums.has(m.moduleNumber));
          const merged = [...res.modules, ...missing].sort((a, b) => a.moduleNumber - b.moduleNumber);
          setModules(merged);
        } else {
          setModules(FALLBACK_MODULES);
        }
      })
      .catch(err => {
        console.warn('Backend API unavailable, using offline fallback modules:', err.message);
        setModules(FALLBACK_MODULES);
      });
  };

  const handleSelectTopic = (slug, targetTab = 'topic-detail') => {
    setSelectedTopicSlug(slug);
    setActiveTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('aws_learning_token');
    localStorage.removeItem('aws_learning_user');
    setUser(null);
    setDashboardStats(null);
    setActiveTab('dashboard');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary,#0b101b)] text-[var(--text-primary,#f8fafc)] flex flex-col font-sans transition-colors duration-300 w-full">
      {/* Full-Screen Edge-to-Edge Navigation Bar */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenSafety={() => setActiveTab('free-tier-safety')}
        onOpenAiTrainer={() => setActiveTab('ai-trainer')}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenSearch={() => setActiveTab('roadmap')}
      />

      {/* Main Full-Screen Layout */}
      <div className="flex-1 flex flex-col md:flex-row w-full min-w-0">
        {/* Collapsible / Expanding Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          pendingCleanups={dashboardStats?.stats?.pendingCleanups || 0}
          dueRevisions={dashboardStats?.stats?.dueRevisions || 0}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        />

        {/* Expansive Full-Screen Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 w-full min-w-0 overflow-x-hidden transition-all duration-300">
          {activeTab === 'dashboard' && (
            <Dashboard
              stats={dashboardStats?.stats}
              recentQuizzes={dashboardStats?.recentQuizzes}
              recentActivities={dashboardStats?.recentActivities}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectTopic={handleSelectTopic}
            />
          )}

          {activeTab === 'ai-trainer' && (
            <AiTrainer
              initialTopic={selectedTopicSlug}
            />
          )}

          {activeTab === 'command-hub' && (
            <CommandHub
              onNavigate={(tab) => setActiveTab(tab)}
              onAskAi={(prompt) => {
                setActiveTab('ai-trainer');
              }}
            />
          )}

          {activeTab === 'hands-on-projects' && (
            <HandsOnProjects
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectTopic={handleSelectTopic}
              onAskAi={(prompt) => {
                setActiveTab('ai-trainer');
              }}
            />
          )}

          {activeTab === 'definitions-glossary' && (
            <DefinitionsGlossary
              onNavigate={(tab) => setActiveTab(tab)}
              onAskAi={(prompt) => {
                setActiveTab('ai-trainer');
              }}
            />
          )}

          {activeTab === 'ports-reference' && (
            <PortsReferenceHub
              onNavigate={(tab) => setActiveTab(tab)}
              onAskAi={(prompt) => {
                setActiveTab('ai-trainer');
              }}
            />
          )}

          {activeTab === 'roadmap' && (
            <LearningRoadmap
              modules={modules}
              onSelectTopic={handleSelectTopic}
              onSelectModule={(id) => {}}
            />
          )}

          {activeTab === 'topic-detail' && (
            <TopicDetail
              topicSlug={selectedTopicSlug}
              onSelectTopic={handleSelectTopic}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'practice-lab' && (
            <PracticeLab
              topicSlug={selectedTopicSlug}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectTopic={handleSelectTopic}
            />
          )}

          {activeTab === 'scenario-practice' && (
            <ScenarioPractice
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'interview-prep' && (
            <InterviewPrep
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'quiz-center' && (
            <QuizCenter
              topicSlug={selectedTopicSlug}
              onSelectTopic={handleSelectTopic}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'analytics' && (
            <ProgressAnalytics
              onSelectTopic={handleSelectTopic}
            />
          )}

          {activeTab === 'revision-center' && (
            <RevisionCenter
              onSelectTopic={handleSelectTopic}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'free-tier-safety' && (
            <FreeTierSafety />
          )}

          {activeTab === 'settings' && (
            <Settings
              user={user}
              onProfileUpdated={(updated) => setUser(updated)}
            />
          )}
        </main>
      </div>

      {/* Auth Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onAuthSuccess={(u) => {
          setUser(u);
          refreshDashboard();
        }}
      />

      {/* Floating Live AI DevOps Trainer Drawer */}
      <AiAssistantDrawer activeTab={activeTab} selectedTopicSlug={selectedTopicSlug} />
    </div>
  );
}
