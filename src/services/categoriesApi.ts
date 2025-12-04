import { supabase } from '../lib/supabase';

export interface TeamCategory {
  id: string;
  name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const categoriesApi = {
  async fetchAll(): Promise<TeamCategory[]> {
    const { data, error } = await supabase
      .from('team_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data || [];
  },

  async fetchById(id: string): Promise<TeamCategory | null> {
    const { data, error } = await supabase
      .from('team_categories')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching category:', error);
      throw new Error(`Failed to fetch category: ${error.message}`);
    }

    return data;
  },

  subscribeToChanges(callback: () => void) {
    const subscription = supabase
      .channel('team_categories_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_categories',
        },
        callback
      )
      .subscribe();

    return subscription;
  },
};
