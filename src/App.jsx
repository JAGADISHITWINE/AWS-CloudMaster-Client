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
import { api } from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTopicSlug, setSelectedTopicSlug] = useState('regions-azs-and-edge-infrastructure');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Theme state: 'coral' (AWS Signature Amber/Gold), 'indigo', 'emerald', 'light'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('aws_platform_theme');
    if (!saved || saved === 'indigo') return 'coral';
    return saved;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aws_platform_theme', theme);
  }, [theme]);

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
        setModules(res.modules || []);
      })
      .catch(err => console.error(err));
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navigation with Theme Switcher */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenSafety={() => setActiveTab('free-tier-safety')}
        currentTheme={theme}
        onSelectTheme={(t) => setTheme(t)}
      />

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          pendingCleanups={dashboardStats?.stats?.pendingCleanups || 0}
          dueRevisions={dashboardStats?.stats?.dueRevisions || 0}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <Dashboard
              stats={dashboardStats?.stats}
              recentQuizzes={dashboardStats?.recentQuizzes}
              recentActivities={dashboardStats?.recentActivities}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectTopic={handleSelectTopic}
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
    </div>
  );
}
