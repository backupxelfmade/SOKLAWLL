// services/teamApi.ts
import { supabase } from '../lib/supabaseClient';

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  category: string;
  specialization: string;
  image: string;
  email: string;
  phone: string;
  linkedin?: string;
  isPartner?: boolean;
  qualifications: string[];
  experience: string;
  achievements: string[];
  description: string;
  expertise: string[];
  education: string[];
  admissions: string[];
  languages: string[];
  is_active?: boolean;
  display_order?: number;
}

export const teamApi = {
  fetchAll: async (): Promise<TeamMember[]> => {
    try {
      console.log('🔄 Fetching team members...');
      
      // ✅ Removed the problematic filters
      const { data, error } = await supabase
        .from('team_members')
        .select('*');

      if (error) {
        console.error('❌ Supabase error:', error);
        throw new Error(`Failed to fetch team members: ${error.message}`);
      }

      if (!data || data.length === 0) {
        console.warn('⚠️  No team members found');
        return [];
      }

      console.log('✅ Fetched team members:', data.length);
      return data as TeamMember[];

    } catch (error) {
      console.error('💥 Error in teamApi.fetchAll:', error);
      throw error;
    }
  },

  // ✅ Added create method
  create: async (member: Omit<TeamMember, 'id'>): Promise<TeamMember> => {
    try {
      console.log('➕ Creating team member:', member.name);
      
      const { data, error } = await supabase
        .from('team_members')
        .insert([member])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating member:', error);
        throw error;
      }

      console.log('✅ Created:', data.name);
      return data;

    } catch (error) {
      console.error('💥 Error in teamApi.create:', error);
      throw error;
    }
  },

  subscribeToChanges: async (callback: () => void) => {
    console.log('🔔 Setting up realtime subscription...');
    
    const channel = supabase
      .channel('team_members_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_members'
        },
        (payload) => {
          console.log('🔄 Realtime update:', payload);
          callback();
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status);
      });

    return channel;
  }
};