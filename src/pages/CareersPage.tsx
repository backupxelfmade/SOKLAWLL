import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, GraduationCap, Heart, Users, TrendingUp, Award, X } from 'lucide-react';
import Footer from '../components/Footer';
import { getActiveJobPositions, JobPosition } from '../services/jobsApi';

const CareersPage = () => {
  const [openPositions, setOpenPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInternshipModal, setShowInternshipModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      setLoading(true);
      const positions = await getActiveJobPositions();
      setOpenPositions(positions);
      setLoading(false);
    };

    fetchPositions();
  }, []);

  const handleApplyNow = (position: JobPosition) => {
    setSelectedJob(position);
    const subject = encodeURIComponent(`Application for ${position.title}`);
    const body = encodeURIComponent(`Dear Hiring Team,\n\nI am writing to express my interest in the ${position.title} position in the ${position.department} department.\n\nBest regards`);
    window.location.href = `mailto:careers@soklaw.co.ke?subject=${subject}&body=${body}`;
  };

  const benefits = [
    {
      icon: GraduationCap,
      title: 'Professional Development',
      description: 'Continuous learning opportunities and support for professional certifications',
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible working arrangements and comprehensive leave policies',
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with experienced professionals in a supportive team environment',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear career progression paths and mentorship programs',
    },
    {
      icon: Award,
      title: 'Competitive Compensation',
      description: 'Industry-leading salary packages and performance bonuses',
    },
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, delivering outstanding legal services to our clients.',
    },
    {
      title: 'Integrity',
      description: 'We uphold the highest ethical standards and maintain transparency in all our dealings.',
    },
    {
      title: 'Innovation',
      description: 'We embrace innovative approaches to legal practice and continuously improve our service delivery.',
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and foster a collaborative work environment.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f1] to-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Build your legal career with one of Kenya's leading law firms. We're always looking for talented,
              passionate individuals to join our growing team.
            </p>
          </div>

          {/* Why Join Us Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join SOK Law?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer more than just a job - we provide a platform for growth, learning, and meaningful impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-[#bfa06f] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Values Section */}
          <div className="mb-16 bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These values guide everything we do and define who we are as a firm.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="border-l-4 border-[#bfa06f] pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Openings</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our current job opportunities and find the perfect role for you.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#bfa06f]"></div>
                <p className="mt-4 text-gray-600">Loading positions...</p>
              </div>
            ) : openPositions.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No open positions at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                      <p className="text-[#bfa06f] font-medium mb-3">{position.department}</p>
                    </div>
                    <button
                      onClick={() => handleApplyNow(position)}
                      className="bg-[#bfa06f] hover:bg-[#a08a5f] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium mt-4 md:mt-0"
                    >
                      Apply Now
                    </button>
                  </div>

                  <p className="text-gray-600 mb-4">{position.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-[#bfa06f]" />
                      <span>{position.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-[#bfa06f]" />
                      <span>{position.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-[#bfa06f]" />
                      <span>{position.experience}</span>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>

          {/* Internship & Pupillage Section */}
          <div className="bg-gradient-to-r from-[#bfa06f] to-[#a08a5f] rounded-xl shadow-lg p-8 md:p-12 text-white mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <GraduationCap className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Internship & Pupillage Programs</h2>
              <p className="text-lg mb-6 text-white/90">
                We offer comprehensive internship and pupillage programs for law students and recent graduates.
                Gain practical experience and learn from experienced advocates in a supportive environment.
              </p>
              <button
                onClick={() => setShowInternshipModal(true)}
                className="bg-white text-[#bfa06f] hover:bg-gray-100 px-8 py-4 rounded-lg transition-colors duration-300 font-semibold"
              >
                Learn More About Programs
              </button>
            </div>
          </div>

          {/* Application Process Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Here's what to expect when you apply to join our team.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-[#bfa06f] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Submit Application</h3>
                <p className="text-sm text-gray-600">Send your CV and cover letter</p>
              </div>
              <div className="text-center">
                <div className="bg-[#bfa06f] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Initial Review</h3>
                <p className="text-sm text-gray-600">We review your application</p>
              </div>
              <div className="text-center">
                <div className="bg-[#bfa06f] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Interview</h3>
                <p className="text-sm text-gray-600">Meet with our team</p>
              </div>
              <div className="text-center">
                <div className="bg-[#bfa06f] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Offer</h3>
                <p className="text-sm text-gray-600">Join our team!</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't See a Suitable Position?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always interested in hearing from talented legal professionals.
              Send us your CV and we'll keep you in mind for future opportunities.
            </p>
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-semibold">Email your CV to:</span>{' '}
                <a href="mailto:careers@soklaw.co.ke" className="text-[#bfa06f] hover:underline">
                  careers@soklaw.co.ke
                </a>
              </p>
              <p className="text-sm text-gray-500">
                Please include the position you're interested in the subject line.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showInternshipModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#bfa06f] to-[#a08a5f] p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Internship & Pupillage Programs</h2>
              <button
                onClick={() => setShowInternshipModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  SOK Law offers comprehensive internship and pupillage programs designed to provide practical legal experience
                  and professional development opportunities for law students and recent graduates.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Internship Program</h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Eligibility</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Current law students (2nd year and above)</li>
                    <li>Recent law graduates awaiting admission</li>
                    <li>Strong academic performance</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Program Features</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Duration: 3-6 months</li>
                    <li>Exposure to various practice areas</li>
                    <li>Legal research and drafting experience</li>
                    <li>Court attendance opportunities</li>
                    <li>Mentorship from experienced advocates</li>
                    <li>Certificate of completion</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pupillage Program</h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Eligibility</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Completed Kenya School of Law</li>
                    <li>Awaiting admission to the bar</li>
                    <li>Commitment to complete 6-month program</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Program Features</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Duration: 6 months (as required by law)</li>
                    <li>Comprehensive training across all practice areas</li>
                    <li>Client interaction under supervision</li>
                    <li>Court appearances and advocacy training</li>
                    <li>Professional development workshops</li>
                    <li>Monthly stipend provided</li>
                    <li>Possibility of retention after admission</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Apply</h3>
                <div className="bg-[#bfa06f]/10 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    To apply for our internship or pupillage program, please submit:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li>Cover letter expressing your interest</li>
                    <li>Current CV/Resume</li>
                    <li>Academic transcripts</li>
                    <li>Two letters of recommendation</li>
                    <li>Copy of ID/Passport</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Send your application to: <a href="mailto:careers@soklaw.co.ke" className="text-[#bfa06f] hover:underline font-semibold">careers@soklaw.co.ke</a>
                  </p>
                  <p className="text-sm text-gray-600">
                    Subject line: "Internship Application" or "Pupillage Application"
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowInternshipModal(false)}
                  className="bg-[#bfa06f] hover:bg-[#a08a5f] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
