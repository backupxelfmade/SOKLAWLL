import { useState, useEffect } from 'react';
import { servicesApi, Service } from '../services/servicesApi';

interface UseServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

export const useServices = () => {
  const [state, setState] = useState<UseServicesState>({
    services: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const data = await servicesApi.fetchAll();
        setState({ services: data, loading: false, error: null });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services';
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      }
    };

    fetchServices();

    const subscription = servicesApi.subscribeToChanges(() => {
      fetchServices();
    });

    return () => {
      subscription.then(sub => sub?.unsubscribe());
    };
  }, []);

  return state;
};
