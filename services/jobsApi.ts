import { supabase } from '../lib/supabase';

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const getActiveJobPositions = async (): Promise<JobPosition[]> => {
  try {
    const { data, error } = await supabase
      .from('job_positions')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching job positions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch job positions:', error);
    return [];
  }
};

export const getAllJobPositions = async (): Promise<JobPosition[]> => {
  try {
    const { data, error } = await supabase
      .from('job_positions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all job positions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch all job positions:', error);
    return [];
  }
};
