import React, { useState, useEffect } from 'react';
import {
  Briefcase, MapPin, Clock, GraduationCap, Heart,
  Users, TrendingUp, Award, X, ArrowRight, CheckCircle, Loader2,
} from 'lucide-react';
import Footer from '../components/Footer';
import { getActiveJobPositions, JobPosition } from '../services/jobsApi';

const benefits = [
  { icon: GraduationCap, title: 'Professional Development', description: 'Continuous learning and support for professional certifications.' },
  { icon: Heart,         title: 'Work-Life Balance',        description: 'Flexible working arrangements and comprehensive leave policies.' },
  { icon: Users,         title: 'Collaborative Culture',    description: 'Work with experienced professionals in a supportive environment.' },
  { icon: TrendingUp,    title: 'Career Growth',            description: 'Clear progression paths and mentorship programs.' },
  { icon: Award,         title: 'Competitive Pay',          description: 'Industry-leading salary packages and performance bonuses.' },
];

const values = [
  { title: 'Excellence',     description: 'We strive for excellence in everything we do, delivering outstanding legal services.' },
  { title: 'Integrity',      description: 'We uphold the highest ethical standards and maintain transparency in all dealings.' },
  { title: 'Innovation',     description: 'We embrace innovative approaches to legal practice and continuously improve delivery.' },
  { title: 'Collaboration',  description: 'We believe in the power of teamwork and foster a collaborative work environment.' },
];

const steps = [
  { label: 'Submit',  desc: 'Send your CV and cover letter' },
  { label: 'Review',  desc: 'We review your application'    },
  { label: 'Interview', desc: 'Meet with our team'          },
  { label: 'Offer',   desc: 'Welcome to SOK Law!'           },
];

const CareersPage = () => {
  const [openPositions, setOpenPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getActiveJobPositions().then((p) => { setOpenPositions(p); setLoading(false); });
  }, []);

  const handleApply = (position: JobPosition) => {
    const subject = encodeURIComponent(`Application for ${position.title}`);
    const body = encodeURIComponent(`Dear Hiring Team,\n\nI am writing to express my interest in the ${position.title} position in the ${position.department} department.\n\nBest regards`);
    window.location.href = `mailto:careers@soklaw.co.ke?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">

      {/* ── Dark header band ── */}
      <div className="bg-[#0d2340] pt-24 sm:pt-28 pb-8 sm:pb-14">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="block h-px w-5 sm:w-6 bg-[#bfa06f] flex-shrink-0" />
            <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
              Careers
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Join Our Team
          </h1>
          <p className="hidden sm:block text-base text-white/60 max-w-xl mt-3 leading-relaxed">
            Build your legal career with one of Kenya's leading law firms. We're always looking
            for talented, passionate individuals to join our growing team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-14 lg:py-20 space-y-10 sm:space-y-20">

        {/* ── Why Join Us ── */}
        <section>
          <div className="mb-5 sm:mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="block h-px w-4 sm:w-5 bg-[#bfa06f] flex-shrink-0" />
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                Why SOK Law
              </span>
            </div>
            <h2 className="text-base sm:text-2xl font-bold text-[#1a1a1a]">
              More Than Just a Job
            </h2>
            <p className="hidden sm:block text-sm text-[#4a4a4a] max-w-lg mt-1.5 leading-relaxed">
              We provide a platform for growth, learning, and meaningful impact.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-5">
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <div
                key={i}
                className="bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:border-[#bfa06f]/40 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-[#bfa06f]/10 mb-2 sm:mb-3">
                  <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#bfa06f]" />
                </div>
                <h3 className="text-[0.65rem] sm:text-sm font-bold text-[#1a1a1a] mb-0.5 sm:mb-1 leading-snug">
                  {title}
                </h3>
                <p className="text-[0.6rem] sm:text-sm text-[#6a6a6a] leading-relaxed hidden sm:block">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Core Values ── */}
        <section>
          <div className="mb-5 sm:mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="block h-px w-4 sm:w-5 bg-[#bfa06f] flex-shrink-0" />
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                Our Values
              </span>
            </div>
            <h2 className="text-base sm:text-2xl font-bold text-[#1a1a1a]">Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5">
            {values.map(({ title, description }, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 sm:gap-4 bg-[#f9f7f1] border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-3 sm:p-5"
              >
                <div className="w-0.5 self-stretch bg-[#bfa06f] rounded-full flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-[0.7rem] sm:text-sm font-bold text-[#1a1a1a] mb-0.5 sm:mb-1">{title}</h3>
                  <p className="text-[0.6rem] sm:text-sm text-[#6a6a6a] leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section>
          <div className="mb-5 sm:mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="block h-px w-4 sm:w-5 bg-[#bfa06f] flex-shrink-0" />
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                Openings
              </span>
            </div>
            <h2 className="text-base sm:text-2xl font-bold text-[#1a1a1a]">Current Positions</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10 gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#bfa06f]/10">
                <Loader2 className="h-4 w-4 text-[#bfa06f] animate-spin" />
              </div>
              <p className="text-xs text-[#6a6a6a]">Loading positions…</p>
            </div>
          ) : openPositions.length === 0 ? (
            <div className="bg-[#f9f7f1] border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#bfa06f]/10 mx-auto mb-3">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-[#bfa06f]" />
              </div>
              <p className="text-xs sm:text-sm text-[#6a6a6a]">
                No open positions at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 sm:space-y-4">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 hover:border-[#bfa06f]/40 transition-colors duration-200"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3 min-w-0">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-xl font-bold text-[#1a1a1a] leading-snug truncate">
                        {position.title}
                      </h3>
                      <p className="text-[0.6rem] sm:text-sm font-semibold text-[#bfa06f] mt-0.5">
                        {position.department}
                      </p>
                    </div>
                    <button
                      onClick={() => handleApply(position)}
                      className="flex-shrink-0 flex items-center gap-1 sm:gap-1.5 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-[0.6rem] sm:text-sm font-semibold px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full transition-colors"
                    >
                      Apply
                      <ArrowRight className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                    </button>
                  </div>

                  <p className="text-[0.65rem] sm:text-sm text-[#4a4a4a] leading-relaxed mb-2.5 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                    {position.description}
                  </p>

                  {/* Meta tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-3">
                    {[
                      { icon: MapPin,    val: position.location   },
                      { icon: Clock,     val: position.type       },
                      { icon: Briefcase, val: position.experience },
                    ].map(({ icon: Icon, val }) => (
                      <div
                        key={val}
                        className="flex items-center gap-1 sm:gap-1.5 bg-[#f9f7f1] border border-[#e8e0d0] rounded-full px-2 py-0.5 sm:px-3 sm:py-1"
                      >
                        <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#bfa06f] flex-shrink-0" />
                        <span className="text-[0.55rem] sm:text-xs text-[#4a4a4a] whitespace-nowrap">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Internship & Pupillage CTA ── */}
        <section className="bg-[#f9f7f1] border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-4 sm:p-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-[#bfa06f]/15 flex-shrink-0">
            <GraduationCap className="h-5 w-5 sm:h-7 sm:w-7 text-[#bfa06f]" />
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h2 className="text-sm sm:text-xl font-bold text-[#1a1a1a] mb-1">
              Internship & Pupillage Programs
            </h2>
            <p className="text-[0.65rem] sm:text-sm text-[#6a6a6a] leading-relaxed">
              Comprehensive programs for law students and recent graduates to gain practical experience.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex-shrink-0 flex items-center gap-1.5 border border-[#bfa06f] text-[#bfa06f] hover:bg-[#bfa06f] hover:text-white text-[0.65rem] sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200"
          >
            Learn More
            <ArrowRight className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
          </button>
        </section>

        {/* ── Application Process ── */}
        <section>
          <div className="mb-5 sm:mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="block h-px w-4 sm:w-5 bg-[#bfa06f] flex-shrink-0" />
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                How It Works
              </span>
            </div>
            <h2 className="text-base sm:text-2xl font-bold text-[#1a1a1a]">Application Process</h2>
          </div>

          {/* Mobile: vertical timeline | Desktop: 4-col horizontal */}
          <div className="sm:hidden space-y-0">
            {steps.map(({ label, desc }, i) => (
              <div key={i} className="flex items-start gap-3 relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-[13px] top-7 bottom-0 w-px bg-[#e8e0d0]" />
                )}
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#bfa06f] text-white text-[0.55rem] font-black flex-shrink-0 z-10">
                  {i + 1}
                </div>
                <div className="pb-4 min-w-0">
                  <h3 className="text-[0.7rem] font-bold text-[#1a1a1a]">{label}</h3>
                  <p className="text-[0.6rem] text-[#6a6a6a]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden sm:grid grid-cols-4 gap-4 lg:gap-6">
            {steps.map(({ label, desc }, i) => (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-px bg-[#e8e0d0]" />
                )}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#bfa06f] text-white text-sm font-black mx-auto mb-3 relative z-10">
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-1">{label}</h3>
                <p className="text-xs text-[#6a6a6a]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Open Application ── */}
        <section className="bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-4 sm:p-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="block h-px w-4 sm:w-5 bg-[#bfa06f] flex-shrink-0" />
            <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
              Open Application
            </span>
          </div>
          <h2 className="text-sm sm:text-xl font-bold text-[#1a1a1a] mb-1.5 sm:mb-2">
            Don't See a Suitable Position?
          </h2>
          <p className="text-[0.65rem] sm:text-sm text-[#6a6a6a] leading-relaxed mb-3 sm:mb-5 max-w-xl">
            We're always interested in hearing from talented legal professionals.
            Send us your CV and we'll keep you in mind for future opportunities.
          </p>
          <a
            href="mailto:careers@soklaw.co.ke"
            className="inline-flex items-center gap-1.5 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-[0.65rem] sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-colors"
          >
            Email Your CV
            <ArrowRight className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
          </a>
          <p className="text-[0.55rem] sm:text-xs text-[#aaa] mt-2 sm:mt-3">
            Use subject: "Open Application — [Your Name]"
          </p>
        </section>
      </div>

      <Footer />

      {/* ── Internship Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto">

            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-[#e8e0d0] px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="block h-px w-3 sm:w-4 bg-[#bfa06f]" />
                <h2 className="text-xs sm:text-base font-bold text-[#1a1a1a]">
                  Internship & Pupillage Programs
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f9f7f1] hover:bg-[#e8e0d0] transition-colors"
              >
                <X className="h-3.5 w-3.5 text-[#4a4a4a]" />
              </button>
            </div>

            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-7">

              {[
                {
                  title: 'Internship Program',
                  eligibility: [
                    'Current law students (2nd year and above)',
                    'Recent law graduates awaiting admission',
                    'Strong academic performance',
                  ],
                  features: [
                    'Duration: 3–6 months',
                    'Exposure to various practice areas',
                    'Legal research and drafting experience',
                    'Court attendance opportunities',
                    'Mentorship from experienced advocates',
                    'Certificate of completion',
                  ],
                },
                {
                  title: 'Pupillage Program',
                  eligibility: [
                    'Completed Kenya School of Law',
                    'Awaiting admission to the bar',
                    'Commitment to complete 6-month program',
                  ],
                  features: [
                    'Duration: 6 months (as required by law)',
                    'Comprehensive training across all practice areas',
                    'Client interaction under supervision',
                    'Court appearances and advocacy training',
                    'Professional development workshops',
                    'Monthly stipend provided',
                    'Possibility of retention after admission',
                  ],
                },
              ].map(({ title, eligibility, features }) => (
                <div key={title}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="block h-px w-3 bg-[#bfa06f]" />
                    <h3 className="text-[0.7rem] sm:text-sm font-bold text-[#1a1a1a] uppercase tracking-wide">{title}</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[{ label: 'Eligibility', items: eligibility }, { label: 'Features', items: features }].map(({ label, items }) => (
                      <div key={label} className="bg-[#f9f7f1] border border-[#e8e0d0] rounded-xl p-3">
                        <p className="text-[0.6rem] sm:text-xs font-bold text-[#bfa06f] uppercase tracking-widest mb-2">{label}</p>
                        <ul className="space-y-1.5">
                          {items.map((item) => (
                            <li key={item} className="flex items-start gap-1.5">
                              <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#bfa06f] mt-0.5 flex-shrink-0" />
                              <span className="text-[0.6rem] sm:text-xs text-[#4a4a4a] leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* How to apply */}
              <div className="bg-[#bfa06f]/8 border border-[#bfa06f]/25 rounded-xl p-3.5 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="block h-px w-3 bg-[#bfa06f]" />
                  <p className="text-[0.6rem] sm:text-xs font-bold text-[#bfa06f] uppercase tracking-widest">How to Apply</p>
                </div>
                <p className="text-[0.65rem] sm:text-sm text-[#4a4a4a] mb-2 leading-relaxed">
                  Submit: cover letter, CV, academic transcripts, two letters of recommendation, copy of ID/Passport.
                </p>
                <a
                  href="mailto:careers@soklaw.co.ke"
                  className="inline-flex items-center gap-1 text-[0.65rem] sm:text-sm font-semibold text-[#bfa06f] hover:underline"
                >
                  careers@soklaw.co.ke
                  <ArrowRight className="h-2.5 w-2.5" />
                </a>
                <p className="text-[0.55rem] sm:text-xs text-[#aaa] mt-1">
                  Subject: "Internship Application" or "Pupillage Application"
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full flex items-center justify-center gap-1.5 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-xs sm:text-sm font-semibold py-2.5 sm:py-3 rounded-full transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
