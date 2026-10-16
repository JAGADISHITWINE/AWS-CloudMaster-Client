const BASE_URL = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('aws_learning_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401 && !endpoint.includes('/auth/login')) {
      localStorage.removeItem('aws_learning_token');
      localStorage.removeItem('aws_learning_user');
      window.dispatchEvent(new Event('auth-change'));
    }
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const api = {
  // Auth
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (name, email, password) => request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  getMe: () => request('/auth/me'),
  updateProfile: (profile) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(profile) }),

  // Modules & Topics
  getModules: () => request('/modules'),
  getTopic: (id) => request(`/modules/topics/${id}`),

  // Notes
  getNotes: (topicId) => request(`/notes/${topicId}`),
  markNotesRead: (topicId, timeSpentSeconds = 60) => request(`/notes/${topicId}/read`, { method: 'POST', body: JSON.stringify({ timeSpentSeconds }) }),

  // Labs
  getLab: (id) => request(`/labs/${id}`),
  toggleLabStep: (labId, stepNumber) => request(`/labs/${labId}/steps/${stepNumber}`, { method: 'POST' }),
  markLabCleanup: (labId) => request(`/labs/${labId}/cleanup`, { method: 'POST' }),

  // Scenarios
  getScenarios: (params = '') => request(`/scenarios${params ? `?${params}` : ''}`),
  getScenario: (id) => request(`/scenarios/${id}`),
  submitScenario: (id, answer) => request(`/scenarios/${id}/submit`, { method: 'POST', body: JSON.stringify({ answer }) }),

  // Interviews
  getInterviewQuestions: (params = '') => request(`/interviews/questions${params ? `?${params}` : ''}`),
  evaluateMockAnswer: (questionId, answer, topicId) => request('/interviews/evaluate', { method: 'POST', body: JSON.stringify({ questionId, answer, topicId }) }),

  // Quizzes
  getTopicQuiz: (topicId) => request(`/quizzes/topic/${topicId}`),
  submitQuiz: (topicId, answers, timeSpentSeconds) => request(`/quizzes/topic/${topicId}/submit`, { method: 'POST', body: JSON.stringify({ answers, timeSpentSeconds }) }),

  // Progress & Dashboard
  getDashboardSummary: () => request('/progress/dashboard'),
  getProgressAnalytics: () => request('/progress/analytics'),

  // Free Tier Safety Center
  getSafetyCenter: () => request('/safety/center'),
  updateSafetySettings: (settings) => request('/safety/settings', { method: 'PUT', body: JSON.stringify(settings) }),
  verifyCleanupRecord: (recordId) => request(`/safety/cleanup/${recordId}/verify`, { method: 'POST' }),

  // Revisions & Bookmarks
  getDueRevisions: () => request('/revisions/due'),
  completeRevision: (id, easeRating) => request(`/revisions/complete/${id}`, { method: 'POST', body: JSON.stringify({ easeRating }) }),
  getBookmarks: () => request('/revisions/bookmarks'),
  toggleBookmark: (itemType, itemId, notes = '') => request('/revisions/bookmarks/toggle', { method: 'POST', body: JSON.stringify({ itemType, itemId, notes }) })
};
