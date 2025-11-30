/*
  # Seed Initial Services Data

  1. Data Import
    - Insert sample legal services data
    - Services include core practice areas
    - Data formatted as simple text for easy editing

  2. Notes
    - Text fields use newlines to separate items
    - Can be easily updated in Supabase dashboard
*/

INSERT INTO legal_services (title, description, overview, icon_name, header_image, key_services, why_choose_us, process, is_active) VALUES
(
  'Civil and Criminal Litigation',
  'Expert representation in civil disputes and criminal defense matters with proven track record in Kenyan courts.',
  'Our litigation practice provides comprehensive representation in both civil and criminal matters. We handle complex disputes with strategic thinking and aggressive advocacy to achieve favorable outcomes for our clients.',
  'Scale',
  'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  'Civil Litigation
Criminal Defense
Commercial Disputes
Contract Disputes
Tort Claims
Appeals
Injunctive Relief
Debt Recovery
Property Disputes
Constitutional Matters
Judicial Review
Class Action Suits',
  'Proven Track Record: Over 500 successful cases with extensive experience in Kenyan courts at all levels.

Strategic Litigation: We develop comprehensive litigation strategies that consider both legal and business implications.

Experienced Trial Lawyers: Our team includes seasoned trial lawyers with deep courtroom experience.',
  'Case Assessment: Comprehensive evaluation of your case merits and potential outcomes.

Strategy Development: Development of tailored litigation strategy aligned with your objectives.

Pre-trial Preparation: Thorough preparation including evidence gathering and witness preparation.

Court Representation: Aggressive representation in court proceedings with experienced advocates.

Post-judgment Support: Assistance with judgment enforcement and appeals if necessary.',
  true
),
(
  'Alternative Dispute Resolution (ADR)',
  'Arbitration, mediation and structured negotiation services for efficient dispute resolution.',
  'Our ADR practice offers efficient alternatives to traditional litigation, helping clients resolve disputes through arbitration, mediation, and structured negotiation processes that save time and costs.',
  'Users',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  'Commercial Arbitration
Family Mediation
Workplace Mediation
Construction Arbitration
International Arbitration
Structured Negotiation
Conciliation Services
Expert Determination
Settlement Conferences
Multi-party Mediation
Online Dispute Resolution
Arbitrator Services',
  'Certified Mediators: Our team includes certified mediators and arbitrators with extensive ADR experience.

Cost-Effective Solutions: ADR processes typically cost less and resolve faster than traditional litigation.

Confidential Process: ADR proceedings are private and confidential, protecting your business interests.',
  'Dispute Analysis: Assessment of the dispute and recommendation of appropriate ADR method.

Process Selection: Selection of the most suitable ADR process for your specific situation.

Preparation: Thorough preparation of your case for the ADR proceedings.

ADR Proceedings: Skilled representation during arbitration, mediation or negotiation.

Implementation: Assistance with implementation and enforcement of ADR outcomes.',
  true
),
(
  'Commercial and Corporate Law',
  'Comprehensive corporate legal services including company formation, governance, and commercial transactions.',
  'Our commercial and corporate law practice provides comprehensive legal services to businesses across Kenya. We assist companies in navigating complex regulatory environments and structuring transactions for growth.',
  'Building',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  'Company Formation
Corporate Governance
Mergers & Acquisitions
Commercial Contracts
Joint Ventures
Shareholders Agreements
Due Diligence
Corporate Restructuring
Compliance Advisory
Commercial Transactions
Business Registration
Corporate Finance',
  'Business-Focused Approach: We understand business needs and provide practical legal solutions.

Regulatory Expertise: Deep understanding of Kenyan corporate and commercial regulations.

Transaction Experience: Extensive experience in structuring and executing complex transactions.',
  'Initial Consultation: Understanding your business needs and objectives.

Legal Strategy: Development of corporate legal strategy aligned with business goals.

Documentation: Preparation of all necessary legal documentation.

Implementation: Guidance through implementation and regulatory compliance.

Ongoing Support: Continued legal support for corporate governance and transactions.',
  true
)
ON CONFLICT (id) DO NOTHING;
