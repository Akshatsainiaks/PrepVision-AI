// src/hooks/useUser.js
import { useQuery } from '@tanstack/react-query';
import { API } from '../api/api';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await API.get('/auth/me');
      return res.data.user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
