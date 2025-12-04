import { useState, useEffect } from 'react';
import { categoriesApi, TeamCategory } from '../services/categoriesApi';

interface UseCategoriesState {
  categories: TeamCategory[];
  loading: boolean;
  error: string | null;
}

export const useCategories = () => {
  const [state, setState] = useState<UseCategoriesState>({
    categories: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const data = await categoriesApi.fetchAll();
        setState({ categories: data, loading: false, error: null });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch categories';
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      }
    };

    fetchCategories();

    const subscription = categoriesApi.subscribeToChanges(() => {
      fetchCategories();
    });

    return () => {
      subscription.then(sub => sub?.unsubscribe());
    };
  }, []);

  return state;
};
