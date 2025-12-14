// src/hooks/useQuestions.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../api/api';

// Fetch questions (optional filters)
export function useQuestions(filters = {}) {
  const queryKey = ['questions', filters];
  const queryFn = async () => {
    const params = new URLSearchParams();
    if (filters.company) params.set('company', filters.company);
    if (filters.role) params.set('role', filters.role);
    const url = params.toString() ? `/questions?${params.toString()}` : '/questions';
    const res = await API.get(url);
    return res.data.questions;
  };

  return useQuery({ queryKey, queryFn, keepPreviousData: true });
}

// Mutation: add question
export function useAddQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await API.post('/questions', payload);
      return res.data;
    },
    onSuccess: () => {
      // invalidate all questions queries so lists refresh
      qc.invalidateQueries({ queryKey: ['questions'] });
    }
  });
}

// Mutation: upvote question
export function useUpvoteQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (questionId) => {
      const res = await API.post(`/questions/${questionId}/upvote`);
      return res.data;
    },
    onSuccess: (data) => {
      // optimistic approach: invalidate queries to refetch
      qc.invalidateQueries({ queryKey: ['questions'] });
      // could also update cache manually for better UX
    }
  });
}
