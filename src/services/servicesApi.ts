import { supabase } from '../lib/supabase';

export interface Service {
  id: string;
  title: string;
  description: string;
  overview: string;
  icon_name: string;
  header_image: string;
  key_services: string;
  why_choose_us: string;
  process: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const servicesApi = {
  async fetchAll(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('legal_services')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      throw new Error(`Failed to fetch services: ${error.message}`);
    }

    return data || [];
  },

  async fetchById(id: string): Promise<Service | null> {
    const { data, error } = await supabase
      .from('legal_services')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching service:', error);
      throw new Error(`Failed to fetch service: ${error.message}`);
    }

    return data;
  },

  async create(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
    const { data, error } = await supabase
      .from('legal_services')
      .insert([service])
      .select()
      .single();

    if (error) {
      console.error('Error creating service:', error);
      throw new Error(`Failed to create service: ${error.message}`);
    }

    return data;
  },

  async update(id: string, updates: Partial<Service>): Promise<Service> {
    const { data, error } = await supabase
      .from('legal_services')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating service:', error);
      throw new Error(`Failed to update service: ${error.message}`);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('legal_services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      throw new Error(`Failed to delete service: ${error.message}`);
    }
  },

  async subscribeToChanges(callback: (payload: any) => void) {
    const subscription = supabase
      .channel('legal_services_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'legal_services',
        },
        callback
      )
      .subscribe();

    return subscription;
  },
};
