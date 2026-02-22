import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';
import { servicesApi, ServiceFormatted } from '../services/servicesApi';
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceFormatted | null>(null);
  const [relatedServices, setRelatedServices] = useState<ServiceFormatted[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceId) return;
      try {
        setLoading(true);
        setError(null);
        const serviceData = await servicesApi.fetchById(serviceId);
        if (!serviceData) {
          const found = servicesData.find((s: any) => s.slug === serviceId || s.id === serviceId);
          setService(found || null);
        } else {
          setService(serviceData);
        }
        const allServices = await servicesApi.fetchAll();
        setRelatedServices(allServices.filter((s) => s.id !== serviceId));
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service details');
        const found = servicesData.find((s: any) => s.slug === serviceId || s.id === serviceId);
        setService(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceData();
  }, [serviceId]);

  const handleBack = () => navigate(-1);

  const navigateToService = (s: ServiceFormatted) => {
    navigate(`/services/${s.slug || s.id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToContact = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // ── Loading ──
  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-white flex items-center justify-center pt-20">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#bfa06f]/10">
              <Loader2 className="h-5 w-5 text-[#bfa06f] animate-spin" />
            </div>
            <p className="text-sm text-[#6a6a6a]">Loading service…</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ── Not found ──
  if (!service) {
    return (
      <>
        <div className="min-h-screen bg-white flex items-center justify-center pt-20 px-4">
          <div className="text-center max-w-sm">
            <div className="w-5 h-0.5 bg-[#bfa06f] mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-3">Service Not Found</h1>
            <p className="text-sm text-[#6a6a6a] mb-6">The service you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const IconComponent = (Icons as any)[service.icon] || Icons.Scale;
  const keyServices = service.keyServices || [];
  const whyChooseUs = service.whyChooseUs || [];
  const process = service.process || [];

  return (
    <>
      <div className="min-h-screen bg-white">

        {/* ── Hero ── */}
        <div
          className="relative flex items-end pt-20 overflow-hidden"
          style={{ height: 'clamp(320px, 55vw, 600px)' }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.headerImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 pb-7 sm:pb-12">
            {/* Back button */}
            <button
              onClick={handleBack}
              className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-[0.7rem] sm:text-sm font-semibold transition-colors mb-5 sm:mb-8"
            >
              <ArrowLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Services
            </button>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="block h-px w-4 sm:w-5 bg-[#bfa06f]" />
              <span className="text-[0.55rem] sm:text-[0.65rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                Practice Area
              </span>
            </div>

            {/* Title row */}
            <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
              <div className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#bfa06f]/20 flex-shrink-0">
                <IconComponent className="h-4 w-4 sm:h-6 sm:w-6 text-[#d4b483]" />
              </div>
              <h1
                className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
              >
                {service.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-white/70 text-xs sm:text-base max-w-2xl leading-relaxed hidden sm:block">
              {service.description}
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 py-7 sm:py-14 lg:py-20">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-14 items-start">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-12">

              {/* Description — mobile only */}
              <p className="text-sm text-[#4a4a4a] leading-relaxed sm:hidden">
                {service.description}
              </p>

              {/* Overview */}
              {service.overview && (
                <div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="block h-px w-4 sm:w-5 bg-[#bfa06f]" />
                    <h2 className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Overview
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-[#4a4a4a] leading-relaxed">
                    {service.overview}
                  </p>
                </div>
              )}

              {/* Key Services */}
              {keyServices.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-5">
                    <span className="block h-px w-4 sm:w-5 bg-[#bfa06f]" />
                    <h2 className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Key Services
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {keyServices.map((item: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 bg-[#f9f7f1] border border-[#e8e0d0] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3"
                      >
                        <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#bfa06f] mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-[#1a1a1a] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose Us */}
              {whyChooseUs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-5">
                    <span className="block h-px w-4 sm:w-5 bg-[#bfa06f]" />
                    <h2 className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Why Choose SOK Law
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {whyChooseUs.map((reason: any, i: number) => (
                      <div
                        key={i}
                        className="bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-[#bfa06f]/40 transition-colors duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#bfa06f]/10 flex-shrink-0 mt-0.5">
                            <span className="text-[0.6rem] sm:text-[0.65rem] font-black text-[#bfa06f]">{i + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-[#1a1a1a] mb-1">{reason.title}</h3>
                            <p className="text-xs sm:text-sm text-[#6a6a6a] leading-relaxed">{reason.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process */}
              {process.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-5">
                    <span className="block h-px w-4 sm:w-5 bg-[#bfa06f]" />
                    <h2 className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Our Process
                    </h2>
                  </div>
                  <div className="space-y-0">
                    {process.map((step: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 sm:gap-4 relative">
                        {/* Connector line */}
                        {i < process.length - 1 && (
                          <div className="absolute left-[13px] sm:left-[15px] top-7 bottom-0 w-px bg-[#e8e0d0]" />
                        )}
                        {/* Step number */}
                        <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#bfa06f] text-white text-[0.6rem] sm:text-xs font-black flex-shrink-0 z-10">
                          {i + 1}
                        </div>
                        <div className="pb-5 sm:pb-7 flex-1 min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold text-[#1a1a1a] mb-0.5 sm:mb-1">{step.title}</h3>
                          <p className="text-xs sm:text-sm text-[#6a6a6a] leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-4 sm:space-y-5 lg:sticky lg:top-24">

              {/* Contact card */}
              <div className="bg-[#f9f7f1] border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="block h-px w-4 bg-[#bfa06f]" />
                  <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                    Get Help
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#1a1a1a] mb-2 sm:mb-3">
                  Need Legal Assistance?
                </h3>
                <p className="text-xs sm:text-sm text-[#6a6a6a] leading-relaxed mb-4">
                  Contact our {service.title.toLowerCase()} specialists for a consultation.
                </p>

                <div className="space-y-2 mb-4">
                  <a
                    href="tel:+254205285048"
                    className="flex items-center gap-2.5 bg-white border border-[#e8e0d0] hover:border-[#bfa06f]/40 rounded-xl px-3 py-2.5 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#bfa06f]/10 flex-shrink-0">
                      <Phone className="h-3 w-3 text-[#bfa06f]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#4a4a4a] group-hover:text-[#bfa06f] transition-colors">
                      +254 (0) 20 5285048
                    </span>
                  </a>
                  <a
                    href="mailto:info@soklaw.co.ke"
                    className="flex items-center gap-2.5 bg-white border border-[#e8e0d0] hover:border-[#bfa06f]/40 rounded-xl px-3 py-2.5 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#bfa06f]/10 flex-shrink-0">
                      <Mail className="h-3 w-3 text-[#bfa06f]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#4a4a4a] group-hover:text-[#bfa06f] transition-colors">
                      info@soklaw.co.ke
                    </span>
                  </a>
                </div>

                <button
                  onClick={navigateToContact}
                  className="w-full flex items-center justify-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-xs sm:text-sm font-semibold py-2.5 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Schedule Consultation
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Related services */}
              {relatedServices.length > 0 && (
                <div className="bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="block h-px w-4 bg-[#bfa06f]" />
                    <h3 className="text-[0.6rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Related Services
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {relatedServices.slice(0, 5).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => navigateToService(s)}
                        className="group w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-[#f9f7f1] transition-colors duration-150 text-left"
                      >
                        <span className="text-xs sm:text-sm text-[#4a4a4a] group-hover:text-[#bfa06f] transition-colors truncate">
                          {s.title}
                        </span>
                        <ArrowRight className="h-3 w-3 text-[#bfa06f] opacity-0 group-hover:opacity-100 flex-shrink-0 group-hover:translate-x-0.5 transition-all duration-150" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServiceDetailPage;
