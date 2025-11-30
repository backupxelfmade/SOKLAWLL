import { 
  Scale, 
  Users, 
  Building, 
  Home, 
  Briefcase, 
  Shield, 
  FileText, 
  Gavel,
  Zap,
  Hammer,
  Heart,
  DollarSign,
  Car,
  Wheat,
  HelpCircle
} from 'lucide-react';

export const servicesData = [
  {
    id: 'civil-criminal-litigation',
    icon: Scale,
    title: 'Civil and Criminal Litigation',
    description: 'Expert representation in civil disputes and criminal defense matters with proven track record in Kenyan courts.',
    detailedDescription: 'Comprehensive litigation services covering both civil and criminal matters with experienced trial lawyers.',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    overview: 'Our litigation practice provides comprehensive representation in both civil and criminal matters. We handle complex disputes with strategic thinking and aggressive advocacy to achieve favorable outcomes for our clients.',
    headerImage: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Civil Litigation',
      'Criminal Defense',
      'Commercial Disputes',
      'Contract Disputes',
      'Tort Claims',
      'Appeals',
      'Injunctive Relief',
      'Debt Recovery',
      'Property Disputes',
      'Constitutional Matters',
      'Judicial Review',
      'Class Action Suits'
    ],
    whyChooseUs: [
      {
        title: 'Proven Track Record',
        description: 'Over 500 successful cases with extensive experience in Kenyan courts at all levels.'
      },
      {
        title: 'Strategic Litigation',
        description: 'We develop comprehensive litigation strategies that consider both legal and business implications.'
      },
      {
        title: 'Experienced Trial Lawyers',
        description: 'Our team includes seasoned trial lawyers with deep courtroom experience.'
      }
    ],
    process: [
      {
        title: 'Case Assessment',
        description: 'Comprehensive evaluation of your case merits and potential outcomes.'
      },
      {
        title: 'Strategy Development',
        description: 'Development of tailored litigation strategy aligned with your objectives.'
      },
      {
        title: 'Pre-trial Preparation',
        description: 'Thorough preparation including evidence gathering and witness preparation.'
      },
      {
        title: 'Court Representation',
        description: 'Aggressive representation in court proceedings with experienced advocates.'
      },
      {
        title: 'Post-judgment Support',
        description: 'Assistance with judgment enforcement and appeals if necessary.'
      }
    ]
  },
  {
    id: 'alternative-dispute-resolution',
    icon: Users,
    title: 'Alternative Dispute Resolution (ADR) Arbitration, Mediation and Structured Negotiation',
    description: 'Arbitration, mediation and structured negotiation services for efficient dispute resolution.',
    detailedDescription: 'Cost-effective dispute resolution through arbitration, mediation and structured negotiation processes.',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    overview: 'Our ADR practice offers efficient alternatives to traditional litigation, helping clients resolve disputes through arbitration, mediation, and structured negotiation processes that save time and costs.',
    headerImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Commercial Arbitration',
      'Family Mediation',
      'Workplace Mediation',
      'Construction Arbitration',
      'International Arbitration',
      'Structured Negotiation',
      'Conciliation Services',
      'Expert Determination',
      'Settlement Conferences',
      'Multi-party Mediation',
      'Online Dispute Resolution',
      'Arbitrator Services'
    ],
    whyChooseUs: [
      {
        title: 'Certified Mediators',
        description: 'Our team includes certified mediators and arbitrators with extensive ADR experience.'
      },
      {
        title: 'Cost-Effective Solutions',
        description: 'ADR processes typically cost less and resolve faster than traditional litigation.'
      },
      {
        title: 'Confidential Process',
        description: 'ADR proceedings are private and confidential, protecting your business interests.'
      }
    ],
    process: [
      {
        title: 'Dispute Analysis',
        description: 'Assessment of the dispute and recommendation of appropriate ADR method.'
      },
      {
        title: 'Process Selection',
        description: 'Selection of the most suitable ADR process for your specific situation.'
      },
      {
        title: 'Preparation',
        description: 'Thorough preparation of your case for the ADR proceedings.'
      },
      {
        title: 'ADR Proceedings',
        description: 'Skilled representation during arbitration, mediation or negotiation.'
      },
      {
        title: 'Implementation',
        description: 'Assistance with implementation and enforcement of ADR outcomes.'
      }
    ]
  },
  {
    id: 'commercial-corporate-law',
    icon: Building,
    title: 'Commercial and Corporate Law',
    description: 'Comprehensive corporate legal services including company formation, governance, and commercial transactions.',
    detailedDescription: 'Expert corporate legal services for businesses of all sizes, ensuring compliance and strategic growth.',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
    overview: 'Our commercial and corporate law practice provides comprehensive legal services to businesses across Kenya. We assist companies in navigating complex regulatory environments and structuring transactions for growth.',
    headerImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Company Formation',
      'Corporate Governance',
      'Mergers & Acquisitions',
      'Joint Ventures',
      'Commercial Contracts',
      'Securities Law',
      'Corporate Restructuring',
      'Due Diligence',
      'Regulatory Compliance',
      'Board Advisory',
      'Shareholder Agreements',
      'Corporate Finance'
    ],
    whyChooseUs: [
      {
        title: 'Business-Focused Approach',
        description: 'We understand business needs and provide practical legal solutions.'
      },
      {
        title: 'Regulatory Expertise',
        description: 'Deep knowledge of Kenyan corporate law and regulatory requirements.'
      },
      {
        title: 'Transaction Experience',
        description: 'Extensive experience in complex commercial transactions and deals.'
      }
    ],
    process: [
      {
        title: 'Business Consultation',
        description: 'Understanding your business objectives and legal requirements.'
      },
      {
        title: 'Legal Structure',
        description: 'Designing optimal legal structures for your business operations.'
      },
      {
        title: 'Documentation',
        description: 'Preparation of all necessary corporate and commercial documents.'
      },
      {
        title: 'Implementation',
        description: 'Execution of corporate strategies and transaction completion.'
      },
      {
        title: 'Ongoing Support',
        description: 'Continuous legal support for corporate governance and compliance.'
      }
    ]
  },
  {
    id: 'bank-securities-conveyancing-real-estate',
    icon: Home,
    title: 'Bank Securities, Conveyancing and Real Estate Law',
    description: 'Property transactions, land disputes, conveyancing, and banking securities legal services.',
    detailedDescription: 'Comprehensive real estate and banking securities services covering all aspects of property law.',
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600',
    overview: 'Our real estate and banking securities practice covers all aspects of property law and banking securities in Kenya. We provide comprehensive services for property transactions and banking security arrangements.',
    headerImage: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Property Conveyancing',
      'Land Title Verification',
      'Banking Securities',
      'Mortgage Documentation',
      'Lease Agreements',
      'Property Development',
      'Land Disputes',
      'Security Perfection',
      'Property Finance',
      'Real Estate Investment',
      'Landlord-Tenant Law',
      'Zoning Applications'
    ],
    whyChooseUs: [
      {
        title: 'Local Expertise',
        description: 'Deep understanding of Kenyan land law and banking regulations.'
      },
      {
        title: 'Due Diligence Excellence',
        description: 'Thorough property searches and security verification processes.'
      },
      {
        title: 'Banking Relationships',
        description: 'Strong relationships with major banks and financial institutions.'
      }
    ],
    process: [
      {
        title: 'Property/Security Search',
        description: 'Comprehensive verification of property titles and security interests.'
      },
      {
        title: 'Due Diligence',
        description: 'Thorough investigation of legal and financial aspects.'
      },
      {
        title: 'Documentation',
        description: 'Preparation of all necessary legal documents and agreements.'
      },
      {
        title: 'Registration',
        description: 'Handling registration with relevant authorities and institutions.'
      },
      {
        title: 'Post-transaction Support',
        description: 'Ongoing support for property management and security enforcement.'
      }
    ]
  },
  {
    id: 'employment-labour-law',
    icon: Briefcase,
    title: 'Employment and Labour Law',
    description: 'Employment contracts, workplace disputes, labor relations, and human resources legal guidance.',
    detailedDescription: 'Comprehensive employment law services for both employers and employees, ensuring compliance with Kenyan labor laws.',
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-600',
    overview: 'Our employment and labour law practice serves both employers and employees in navigating the complex landscape of Kenyan labor law and employment regulations.',
    headerImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Employment Contracts',
      'Workplace Policies',
      'Disciplinary Procedures',
      'Wrongful Termination',
      'Discrimination Claims',
      'Wage and Hour Issues',
      'Workers Compensation',
      'Union Relations',
      'Employment Compliance',
      'Executive Compensation',
      'Non-compete Agreements',
      'Workplace Safety'
    ],
    whyChooseUs: [
      {
        title: 'Dual Perspective',
        description: 'We represent both employers and employees with balanced expertise.'
      },
      {
        title: 'Regulatory Knowledge',
        description: 'Up-to-date knowledge of Kenyan employment law and regulations.'
      },
      {
        title: 'Practical Solutions',
        description: 'Business-oriented solutions to employment challenges.'
      }
    ],
    process: [
      {
        title: 'Employment Consultation',
        description: 'Assessment of employment issues and legal options available.'
      },
      {
        title: 'Legal Analysis',
        description: 'Analysis of employment contracts, policies, and applicable laws.'
      },
      {
        title: 'Strategy Development',
        description: 'Development of strategic approach to resolve employment matters.'
      },
      {
        title: 'Implementation',
        description: 'Implementation through negotiation, mediation, or litigation.'
      },
      {
        title: 'Compliance Support',
        description: 'Ongoing support to ensure compliance and prevent future issues.'
      }
    ]
  },
  {
    id: 'family-law',
    icon: Heart,
    title: 'Family Law',
    description: 'Divorce proceedings, child custody, adoption, matrimonial property, and family dispute resolution.',
    detailedDescription: 'Compassionate and professional family law services handling sensitive matters with discretion.',
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    overview: 'Our family law practice provides compassionate legal services for families, handling sensitive matters with discretion while prioritizing the best interests of children and families.',
    headerImage: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Divorce and Separation',
      'Child Custody',
      'Child Support',
      'Adoption Proceedings',
      'Matrimonial Property',
      'Prenuptial Agreements',
      'Domestic Violence',
      'Guardianship',
      'Paternity Issues',
      'Family Mediation',
      'Succession Planning',
      'Marriage Contracts'
    ],
    whyChooseUs: [
      {
        title: 'Compassionate Approach',
        description: 'Understanding and supportive guidance through difficult family matters.'
      },
      {
        title: 'Child-Focused',
        description: 'Always prioritizing the best interests of children in all proceedings.'
      },
      {
        title: 'Confidential Service',
        description: 'Strict confidentiality and discrete handling of sensitive matters.'
      }
    ],
    process: [
      {
        title: 'Confidential Consultation',
        description: 'Private consultation to understand your family situation and needs.'
      },
      {
        title: 'Case Preparation',
        description: 'Gathering necessary documentation and evidence for your case.'
      },
      {
        title: 'Negotiation',
        description: 'Attempting amicable agreements through negotiation and mediation.'
      },
      {
        title: 'Court Proceedings',
        description: 'Professional representation when court intervention is necessary.'
      },
      {
        title: 'Post-decree Support',
        description: 'Ongoing support for enforcement and modification of orders.'
      }
    ]
  },
  {
    id: 'consultancy',
    icon: HelpCircle,
    title: 'Consultancy',
    description: 'Legal consultancy services providing strategic advice and guidance across various legal matters.',
    detailedDescription: 'Professional legal consultancy services offering strategic guidance and expert advice.',
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600',
    overview: 'Our consultancy services provide strategic legal advice and guidance to individuals, businesses, and organizations across various legal matters and industries.',
    headerImage: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Legal Strategy Consulting',
      'Risk Assessment',
      'Compliance Consulting',
      'Business Advisory',
      'Legal Audits',
      'Policy Development',
      'Training Services',
      'Legal Research',
      'Regulatory Guidance',
      'Contract Advisory',
      'Dispute Prevention',
      'Legal Opinions'
    ],
    whyChooseUs: [
      {
        title: 'Strategic Thinking',
        description: 'We provide strategic legal advice that aligns with your business objectives.'
      },
      {
        title: 'Industry Knowledge',
        description: 'Deep understanding of various industries and their legal requirements.'
      },
      {
        title: 'Proactive Approach',
        description: 'Focus on preventing legal issues before they become problems.'
      }
    ],
    process: [
      {
        title: 'Needs Assessment',
        description: 'Understanding your specific consultancy needs and objectives.'
      },
      {
        title: 'Analysis',
        description: 'Comprehensive analysis of your legal and business situation.'
      },
      {
        title: 'Strategy Development',
        description: 'Development of tailored strategies and recommendations.'
      },
      {
        title: 'Implementation Support',
        description: 'Guidance and support during strategy implementation.'
      },
      {
        title: 'Ongoing Advisory',
        description: 'Continuous advisory support and strategy refinement.'
      }
    ]
  },
  {
    id: 'health-medical-law',
    icon: Heart,
    title: 'Health and Medical Law',
    description: 'Healthcare law, medical malpractice, regulatory compliance, and healthcare facility legal services.',
    detailedDescription: 'Specialized legal services for healthcare providers, medical professionals, and healthcare institutions.',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    overview: 'Our health and medical law practice provides specialized legal services to healthcare providers, medical professionals, and healthcare institutions across Kenya.',
    headerImage: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Medical Malpractice Defense',
      'Healthcare Regulatory Compliance',
      'Medical Licensing',
      'Healthcare Contracts',
      'Patient Rights',
      'Medical Ethics',
      'Healthcare Facility Licensing',
      'Pharmaceutical Law',
      'Medical Device Regulation',
      'Healthcare Employment',
      'Medical Records',
      'Healthcare Disputes'
    ],
    whyChooseUs: [
      {
        title: 'Medical Knowledge',
        description: 'Understanding of medical practices and healthcare regulations.'
      },
      {
        title: 'Regulatory Expertise',
        description: 'Deep knowledge of healthcare regulatory requirements in Kenya.'
      },
      {
        title: 'Professional Network',
        description: 'Strong relationships with medical professionals and institutions.'
      }
    ],
    process: [
      {
        title: 'Healthcare Assessment',
        description: 'Assessment of healthcare legal and regulatory requirements.'
      },
      {
        title: 'Compliance Review',
        description: 'Review of current compliance with healthcare regulations.'
      },
      {
        title: 'Risk Mitigation',
        description: 'Development of strategies to mitigate healthcare legal risks.'
      },
      {
        title: 'Documentation',
        description: 'Preparation of healthcare policies, contracts, and procedures.'
      },
      {
        title: 'Ongoing Support',
        description: 'Continuous support for healthcare compliance and legal matters.'
      }
    ]
  },
  {
    id: 'finance-banking-law',
    icon: DollarSign,
    title: 'Finance and Banking Law',
    description: 'Banking regulations, financial services law, fintech compliance, and financial institution legal services.',
    detailedDescription: 'Comprehensive legal services for banks, financial institutions, and fintech companies.',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    overview: 'Our finance and banking law practice provides comprehensive legal services to banks, financial institutions, fintech companies, and clients with financial legal needs.',
    headerImage: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Banking Regulations',
      'Financial Services Licensing',
      'Fintech Compliance',
      'Securities Law',
      'Capital Markets',
      'Banking Litigation',
      'Financial Contracts',
      'Regulatory Compliance',
      'Anti-Money Laundering',
      'Consumer Finance',
      'Investment Advisory',
      'Financial Restructuring'
    ],
    whyChooseUs: [
      {
        title: 'Financial Expertise',
        description: 'Deep understanding of financial services and banking regulations.'
      },
      {
        title: 'Regulatory Knowledge',
        description: 'Up-to-date knowledge of financial regulatory requirements.'
      },
      {
        title: 'Industry Relationships',
        description: 'Strong relationships with financial regulators and institutions.'
      }
    ],
    process: [
      {
        title: 'Financial Assessment',
        description: 'Assessment of financial legal and regulatory requirements.'
      },
      {
        title: 'Compliance Strategy',
        description: 'Development of financial compliance and regulatory strategy.'
      },
      {
        title: 'Documentation',
        description: 'Preparation of financial agreements and regulatory filings.'
      },
      {
        title: 'Regulatory Liaison',
        description: 'Liaison with financial regulators and authorities.'
      },
      {
        title: 'Ongoing Compliance',
        description: 'Continuous support for financial compliance and regulations.'
      }
    ]
  },
  {
    id: 'insurance-personal-injury',
    icon: Shield,
    title: 'Insurance and Personal Injury Law',
    description: 'Insurance claims, personal injury litigation, motor vehicle accidents, and insurance coverage disputes.',
    detailedDescription: 'Comprehensive legal services for insurance matters and personal injury claims.',
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    overview: 'Our insurance and personal injury practice provides comprehensive legal services for insurance claims, personal injury litigation, and insurance coverage disputes.',
    headerImage: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Personal Injury Claims',
      'Motor Vehicle Accidents',
      'Insurance Coverage Disputes',
      'Workers Compensation',
      'Medical Malpractice',
      'Product Liability',
      'Wrongful Death',
      'Insurance Bad Faith',
      'Disability Claims',
      'Property Insurance',
      'Professional Liability',
      'Insurance Defense'
    ],
    whyChooseUs: [
      {
        title: 'Insurance Knowledge',
        description: 'Deep understanding of insurance law and coverage issues.'
      },
      {
        title: 'Trial Experience',
        description: 'Extensive trial experience in personal injury and insurance cases.'
      },
      {
        title: 'Client Advocacy',
        description: 'Strong advocacy for clients against insurance companies.'
      }
    ],
    process: [
      {
        title: 'Claim Assessment',
        description: 'Comprehensive assessment of insurance claims and personal injury cases.'
      },
      {
        title: 'Investigation',
        description: 'Thorough investigation of facts and circumstances.'
      },
      {
        title: 'Negotiation',
        description: 'Skilled negotiation with insurance companies and opposing parties.'
      },
      {
        title: 'Litigation',
        description: 'Aggressive litigation when fair settlement cannot be reached.'
      },
      {
        title: 'Recovery',
        description: 'Assistance with claim recovery and settlement implementation.'
      }
    ]
  }
];