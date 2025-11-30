import { servicesApi } from '../services/servicesApi';
import { teamApi } from '../services/teamApi';
import { servicesData } from '../data/servicesData';
import { teamMembers } from '../data/teamData';

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    const existingServices = await servicesApi.fetchAll();
    if (existingServices.length === 0) {
      console.log('Seeding legal services...');
      for (const service of servicesData) {
        await servicesApi.create({
          title: service.title,
          description: service.description,
          overview: service.overview,
          icon_name: service.icon.name || 'Scale',
          header_image: service.headerImage,
          key_services: service.keyServices.join('\n'),
          why_choose_us: service.whyChooseUs.map((item: any) => `${item.title}: ${item.description}`).join('\n\n'),
          process: service.process.map((item: any) => `${item.title}: ${item.description}`).join('\n\n'),
          is_active: true,
        });
      }
      console.log('Legal services seeded successfully');
    }

    const existingTeam = await teamApi.fetchAll();
    if (existingTeam.length === 0) {
      console.log('Seeding team members...');
      for (const member of teamMembers) {
        await teamApi.create({
          name: member.name,
          role: member.role,
          category: member.category,
          specialization: member.specialization,
          image: member.image,
          email: member.email,
          phone: member.phone,
          qualifications: member.qualifications.join('\n'),
          experience: member.experience,
          achievements: member.achievements.join('\n'),
          description: member.description,
          expertise: member.expertise.join('\n'),
          education: member.education.join('\n'),
          admissions: member.admissions.join('\n'),
          languages: member.languages.join(', '),
          is_active: true,
        });
      }
      console.log('Team members seeded successfully');
    }

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
