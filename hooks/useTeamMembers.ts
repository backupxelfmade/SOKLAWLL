import { useState, useEffect } from 'react';
import { teamApi, TeamMember } from '../services/teamApi';

interface UseTeamMembersState {
  members: TeamMember[];
  loading: boolean;
  error: string | null;
}

export const useTeamMembers = () => {
  const [state, setState] = useState<UseTeamMembersState>({
    members: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const data = await teamApi.fetchAll();
        setState({ members: data, loading: false, error: null });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team members';
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      }
    };

    fetchMembers();

    const subscription = teamApi.subscribeToChanges(() => {
      fetchMembers();
    });

    return () => {
      subscription.then(sub => sub?.unsubscribe());
    };
  }, []);

  return state;
};
