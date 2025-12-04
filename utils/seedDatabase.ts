// utils/seedDatabase.ts
import { servicesApi } from '../services/servicesApi';
import { teamApi } from '../services/teamApi';
import { servicesData } from '../data/servicesData';
import { teamMembers } from '../data/teamData';

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // === Seed Services ===
    try {
      const existingServices = await servicesApi.fetchAll();
      if (existingServices.length === 0) {
        console.log('📝 Seeding legal services...');
        for (const service of servicesData) {
          await servicesApi.create({
            title: service.title,
            description: service.description,
            overview: service.overview,
            icon_name: service.icon?.name || 'Scale',
            header_image: service.headerImage,
            key_services: service.keyServices.join('\n'),
            why_choose_us: service.whyChooseUs.map((item: any) => 
              `${item.title}: ${item.description}`
            ).join('\n\n'),
            process: service.process.map((item: any) => 
              `${item.title}: ${item.description}`
            ).join('\n\n'),
            is_active: true,
          });
        }
        console.log('✅ Legal services seeded successfully');
      } else {
        console.log('⏭️  Legal services already exist');
      }
    } catch (error) {
      console.error('❌ Error seeding services:', error);
      // Continue to team seeding even if services fail
    }

    // === Seed Team Members ===
    try {
      const existingTeam = await teamApi.fetchAll();
      if (existingTeam.length === 0) {
        console.log('📝 Seeding team members...');
        for (const member of teamMembers) {
          await teamApi.create({
            name: member.name,
            role: member.role,
            category: member.category,
            specialization: member.specialization,
            image: member.image,
            email: member.email,
            phone: member.phone,
            linkedin: member.linkedin,
            isPartner: member.isPartner,
            // ✅ Keep as arrays (Supabase will handle text[] columns)
            qualifications: member.qualifications,
            experience: member.experience,
            achievements: member.achievements,
            description: member.description,
            expertise: member.expertise,
            education: member.education,
            admissions: member.admissions,
            languages: member.languages,
            is_active: true,
          });
        }
        console.log('✅ Team members seeded successfully');
      } else {
        console.log('⏭️  Team members already exist');
      }
    } catch (error) {
      console.error('❌ Error seeding team members:', error);
    }

    console.log('✅ Database seeding completed!');

  } catch (error) {
    console.error('💥 Error seeding database:', error);
  }
};