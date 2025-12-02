import { supabase } from '../lib/supabase';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  specialization: string;
  image: string;
  email: string;
  phone: string;
  linkedin?: string;
  is_partner: boolean;
  qualifications: string[];
  experience: string;
  achievements: string[];
  description: string;
  expertise: string[];
  education: string[];
  admissions: string[];
  languages: string[];
  created_at?: string;
  updated_at?: string;
}

export const teamApi = {
  async fetchAll(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching team members:', error);
      throw new Error(`Failed to fetch team members: ${error.message}`);
    }

    return data || [];
  },

  async fetchByCategory(category: string): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching team members by category:', error);
      throw new Error(`Failed to fetch team members: ${error.message}`);
    }

    return data || [];
  },

  async fetchById(id: string): Promise<TeamMember | null> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching team member:', error);
      throw new Error(`Failed to fetch team member: ${error.message}`);
    }

    return data;
  },

  async create(member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember> {
    const { data, error } = await supabase
      .from('team_members')
      .insert([member])
      .select()
      .single();

    if (error) {
      console.error('Error creating team member:', error);
      throw new Error(`Failed to create team member: ${error.message}`);
    }

    return data;
  },

  async update(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
    const { data, error } = await supabase
      .from('team_members')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating team member:', error);
      throw new Error(`Failed to update team member: ${error.message}`);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting team member:', error);
      throw new Error(`Failed to delete team member: ${error.message}`);
    }
  },

  async subscribeToChanges(callback: (payload: any) => void) {
    const subscription = supabase
      .channel('team_members_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_members',
        },
        callback
      )
      .subscribe();

    return subscription;
  },
};
