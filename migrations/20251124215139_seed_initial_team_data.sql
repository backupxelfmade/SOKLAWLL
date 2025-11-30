/*
  # Seed Initial Team Members Data

  1. Data Import
    - Insert sample team members data
    - Includes partners and key team members
    - Data formatted as simple text for easy editing

  2. Notes
    - Text fields use newlines to separate items
    - Can be easily updated in Supabase dashboard
*/

INSERT INTO team_members (name, role, category, specialization, image, email, phone, qualifications, experience, achievements, description, expertise, education, admissions, languages, is_active) VALUES
(
  'Sospeter Opondo Aming''a',
  'Co-Founder & Managing Partner',
  'Partners',
  'Litigation & Dispute Resolution',
  'https://i.postimg.cc/MGfCq6YL/7X2A2792.jpg',
  'sospeter@soklaw.co.ke',
  '0205285048',
  'LLB (Hons)
Diploma in Law
Certified Public Secretary
Management & Customer Care Training',
  '10+ years of legal practice',
  'Successfully led high-profile litigation and dispute resolution matters
Headed legal departments in top organizations (KTDA, REAL Insurance, UAP Insurance)
Published articles in professional and corporate magazines
Founder of County Legal Aid Bureau (CLAB) CSR initiative
Active member of the Law Society of Kenya and East African Law Society',
  'Sospeter Opondo Aming''a is the Co-Founder and Managing Partner of the Firm, where he leads the Litigation and Dispute Resolution department with a steadfast commitment to justice and the best interests of his clients. With over a decade of experience in legal practice and a strong corporate background, he brings both strategic insight and genuine compassion to every case he handles.',
  'Litigation & Dispute Resolution
Employment Law
Commercial Law
Personal Injury Claims
Out-of-Court Settlements
Corporate Legal Advisory',
  'Bachelor of Laws (LLB Hons) - University of Nairobi
Diploma in Law - Kenya School of Law
Certified Public Secretary (CPS-K)',
  'Advocate of the High Court of Kenya
Member, Law Society of Kenya
Member, East African Law Society',
  'English, Kiswahili',
  true
),
(
  'Okoth Kennedy Onyango',
  'Co-Founder & Senior Partner',
  'Partners',
  'Corporate & Commercial Law',
  'https://i.postimg.cc/MpM9LWsX/7X2A2761.jpg',
  'kennedy@soklaw.co.ke',
  '0205285048',
  'LLB (Hons)
Diploma in Law
Certified Mediator',
  '12+ years of legal practice',
  'Led major corporate transactions and mergers
Advised multinational corporations on regulatory compliance
Recognized for excellence in commercial law practice
Developed innovative legal solutions for complex business challenges',
  'Okoth Kennedy Onyango is the Co-Founder and Senior Partner specializing in Corporate and Commercial Law. With extensive experience advising businesses on complex transactions, regulatory compliance, and corporate governance, Kennedy brings strategic business acumen to every engagement.',
  'Corporate & Commercial Law
Mergers & Acquisitions
Regulatory Compliance
Contract Negotiation
Corporate Governance
Business Advisory',
  'Bachelor of Laws (LLB Hons) - University of Nairobi
Diploma in Law - Kenya School of Law
Certificate in Mediation',
  'Advocate of the High Court of Kenya
Member, Law Society of Kenya
Certified Mediator',
  'English, Kiswahili',
  true
)
ON CONFLICT (id) DO NOTHING;
