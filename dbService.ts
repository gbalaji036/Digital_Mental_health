
import type { Contribution } from '../types';

const STORAGE_KEY = 'healer_positivity_db';
const FEEDBACK_KEY = 'healer_user_feedback';

export interface UserFeedback {
  id: string;
  content: string;
  timestamp: number;
}

/**
 * Industry Name: Localized State Persistence Layer
 * Mimics a backend database using browser localStorage.
 */
export const dbService = {
  // Contributions logic
  getContributions: (): Contribution[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  submitContribution: (name: string, content: string, type: 'quote' | 'story', status: 'pending' | 'published' = 'pending'): void => {
    const contributions = dbService.getContributions();
    const newEntry: Contribution = {
      id: crypto.randomUUID(),
      name: name || 'Anonymous Student',
      content,
      type,
      status,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...contributions, newEntry]));
  },

  approveContribution: (id: string): void => {
    const contributions = dbService.getContributions();
    const updated = contributions.map(c => 
      c.id === id ? { ...c, status: 'published' as const } : c
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  deleteContribution: (id: string): void => {
    const contributions = dbService.getContributions();
    const updated = contributions.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  getPublished: (): Contribution[] => {
    return dbService.getContributions().filter(c => c.status === 'published');
  },

  getPending: (): Contribution[] => {
    return dbService.getContributions().filter(c => c.status === 'pending');
  },

  // Feedback logic
  saveFeedback: (content: string): void => {
    const current = dbService.getFeedback();
    const newFeedback: UserFeedback = {
      id: crypto.randomUUID(),
      content,
      timestamp: Date.now(),
    };
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify([...current, newFeedback]));
  },

  getFeedback: (): UserFeedback[] => {
    const data = localStorage.getItem(FEEDBACK_KEY);
    return data ? JSON.parse(data) : [];
  },

  deleteFeedback: (id: string): void => {
    const feedback = dbService.getFeedback();
    const updated = feedback.filter(f => f.id !== id);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
  }
};
