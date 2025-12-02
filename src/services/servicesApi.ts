import { supabase } from '../lib/supabase';

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;
  description: string;
  detailed_description?: string;
  color?: string;
  icon_color?: string;
  overview?: string;
  header_image?: string;
  key_services?: string;
  why_choose_us_1_title?: string;
  why_choose_us_1_description?: string;
  why_choose_us_2_title?: string;
  why_choose_us_2_description?: string;
  why_choose_us_3_title?: string;
  why_choose_us_3_description?: string;
  process_step_1_title?: string;
  process_step_1_description?: string;
  process_step_2_title?: string;
  process_step_2_description?: string;
  process_step_3_title?: string;
  process_step_3_description?: string;
  process_step_4_title?: string;
  process_step_4_description?: string;
  process_step_5_title?: string;
  process_step_5_description?: string;
  is_active?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceFormatted {
  id: string;
  slug: string;
  title: string;
  icon: string;
  description: string;
  detailedDescription?: string;
  color?: string;
  iconColor?: string;
  overview?: string;
  headerImage?: string;
  keyServices?: string[];
  whyChooseUs?: Array<{title: string; description: string}>;
  process?: Array<{title: string; description: string}>;
}

export const servicesApi = {
  async fetchAll(): Promise<ServiceFormatted[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      throw new Error(`Failed to fetch services: ${error.message}`);
    }

    return (data || []).map(this.formatService);
  },

  formatService(service: Service): ServiceFormatted {
    const whyChooseUs = [];
    if (service.why_choose_us_1_title) {
      whyChooseUs.push({
        title: service.why_choose_us_1_title,
        description: service.why_choose_us_1_description || ''
      });
    }
    if (service.why_choose_us_2_title) {
      whyChooseUs.push({
        title: service.why_choose_us_2_title,
        description: service.why_choose_us_2_description || ''
      });
    }
    if (service.why_choose_us_3_title) {
      whyChooseUs.push({
        title: service.why_choose_us_3_title,
        description: service.why_choose_us_3_description || ''
      });
    }

    const process = [];
    if (service.process_step_1_title) {
      process.push({
        title: service.process_step_1_title,
        description: service.process_step_1_description || ''
      });
    }
    if (service.process_step_2_title) {
      process.push({
        title: service.process_step_2_title,
        description: service.process_step_2_description || ''
      });
    }
    if (service.process_step_3_title) {
      process.push({
        title: service.process_step_3_title,
        description: service.process_step_3_description || ''
      });
    }
    if (service.process_step_4_title) {
      process.push({
        title: service.process_step_4_title,
        description: service.process_step_4_description || ''
      });
    }
    if (service.process_step_5_title) {
      process.push({
        title: service.process_step_5_title,
        description: service.process_step_5_description || ''
      });
    }

    return {
      id: service.id,
      slug: service.slug,
      title: service.title,
      icon: service.icon,
      description: service.description,
      detailedDescription: service.detailed_description,
      color: service.color,
      iconColor: service.icon_color,
      overview: service.overview,
      headerImage: service.header_image,
      keyServices: service.key_services ? service.key_services.split(',').map(s => s.trim()) : [],
      whyChooseUs,
      process
    };
  },

  async fetchById(id: string): Promise<ServiceFormatted | null> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching service:', error);
      throw new Error(`Failed to fetch service: ${error.message}`);
    }

    return data ? this.formatService(data) : null;
  },

  async create(service: Omit<Service, 'created_at' | 'updated_at'>): Promise<Service> {
    const { data, error } = await supabase
      .from('services')
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
      .from('services')
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
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      throw new Error(`Failed to delete service: ${error.message}`);
    }
  },

  async subscribeToChanges(callback: (payload: any) => void) {
    const subscription = supabase
      .channel('services_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services',
        },
        callback
      )
      .subscribe();

    return subscription;
  },
};
