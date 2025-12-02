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
  qualifications?: string;
  experience: string;
  achievements?: string;
  description: string;
  expertise?: string;
  education?: string;
  admissions?: string;
  languages?: string;
  display_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TeamMemberFormatted {
  id: string;
  name: string;
  role: string;
  category: string;
  specialization: string;
  image: string;
  email: string;
  phone: string;
  linkedin?: string;
  isPartner: boolean;
  qualifications: string[];
  experience: string;
  achievements: string[];
  description: string;
  expertise: string[];
  education: string[];
  admissions: string[];
  languages: string[];
}

export const teamApi = {
  async fetchAll(): Promise<TeamMemberFormatted[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching team members:', error);
      throw new Error(`Failed to fetch team members: ${error.message}`);
    }

    return (data || []).map(this.formatTeamMember);
  },

  formatTeamMember(member: TeamMember): TeamMemberFormatted {
    return {
      id: member.id,
      name: member.name,
      role: member.role,
      category: member.category,
      specialization: member.specialization,
      image: member.image,
      email: member.email,
      phone: member.phone,
      linkedin: member.linkedin,
      isPartner: member.is_partner,
      qualifications: member.qualifications ? member.qualifications.split(',').map(s => s.trim()) : [],
      experience: member.experience,
      achievements: member.achievements ? member.achievements.split(',').map(s => s.trim()) : [],
      description: member.description,
      expertise: member.expertise ? member.expertise.split(',').map(s => s.trim()) : [],
      education: member.education ? member.education.split(',').map(s => s.trim()) : [],
      admissions: member.admissions ? member.admissions.split(',').map(s => s.trim()) : [],
      languages: member.languages ? member.languages.split(',').map(s => s.trim()) : []
    };
  },

  async fetchByCategory(category: string): Promise<TeamMemberFormatted[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching team members by category:', error);
      throw new Error(`Failed to fetch team members: ${error.message}`);
    }

    return (data || []).map(this.formatTeamMember);
  },

  async fetchById(id: string): Promise<TeamMemberFormatted | null> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching team member:', error);
      throw new Error(`Failed to fetch team member: ${error.message}`);
    }

    return data ? this.formatTeamMember(data) : null;
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
