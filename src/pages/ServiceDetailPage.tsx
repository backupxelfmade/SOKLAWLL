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

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceId) return;
      try {
        setLoading(true);
        const serviceData = await servicesApi.fetchById(serviceId);
        if (!serviceData) {
          const found = servicesData.find((s: any) => s.slug === serviceId || s.id === serviceId);
          setService(found || null);
        } else {
          setService(serviceData);
        }
        const allServices = await servicesApi.fetchAll();
        setRelatedServices(allServices.filter((s) => s.id !== serviceId));
      } catch {
        const found = servicesData.find((s: any) => s.slug === serviceId || s.id === serviceId);
        setService(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceData();
  }, [serviceId]);

  const handleBack = () => navigate(-1);
  const goToContact = () => { navigate('/contact'); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const goToService = (s: ServiceFormatted) => { navigate(`/services/${s.slug || s.id}`); window.scrollTo({ top: 0, behavior: 'instant' }); };

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

  if (!service) {
    return (
      <>
        <div className="min-h-screen bg-white flex items-center justify-center pt-20 px-4">
          <div className="text-center max-w-sm">
            <div className="w-5 h-0.5 bg-[#bfa06f] mx-auto mb-4" />
            <h1 className="text-xl font-bold text-[#1a1a1a] mb-2">Service Not Found</h1>
            <p className="text-sm text-[#6a6a6a] mb-6">This service doesn't exist or has been removed.</p>
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
  const keyServices: string[] = service.keyServices || [];
  const whyChooseUs: any[] = service.whyChooseUs || [];
  const process: any[] = service.process || [];

  return (
    <>
      <div className="min-h-screen bg-white">

        {/* ── Hero ── */}
        <div
          className="relative flex items-end pt-20 overflow-hidden"
          style={{ height: 'clamp(260px, 50vw, 580px)' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.headerImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 pb-5 sm:pb-10">
            <button
              onClick={handleBack}
              className="group inline-flex items-center gap-1.5 text-white/55 hover:text-white text-[0.65rem] sm:text-sm font-semibold transition-colors mb-4 sm:mb-7"
            >
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2.5">
              <span className="block h-px w-4 bg-[#bfa06f]" />
              <span className="text-[0.55rem] sm:text-[0.65rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                Practice Area
              </span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-4 mb-1.5 sm:mb-3">
              <div className="flex items-center justify-center w-7 h-7 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl bg-[#bfa06f]/20 flex-shrink-0">
                <IconComponent className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#d4b483]" />
              </div>
              <h1
                className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
              >
                {service.title}
              </h1>
            </div>
            <p className="text-white/65 text-[0.7rem] sm:text-base max-w-2xl leading-relaxed line-clamp-2 sm:line-clamp-none pl-9 sm:pl-0">
              {service.description}
            </p>
          </div>
        </div>

        {/* ── Mobile CTA strip — below hero, above content ── */}
        <div className="sm:hidden border-b border-[#e8e0d0] bg-[#f9f7f1] px-3 py-3 flex items-center gap-2">
          <a
            href="tel:+254205285048"
            className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-[#e8e0d0] rounded-lg py-2 text-[0.65rem] font-semibold text-[#4a4a4a]"
          >
            <Phone className="h-3 w-3 text-[#bfa06f]" />
            Call Us
          </a>
          <a
            href="mailto:info@soklaw.co.ke"
            className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-[#e8e0d0] rounded-lg py-2 text-[0.65rem] font-semibold text-[#4a4a4a]"
          >
            <Mail className="h-3 w-3 text-[#bfa06f]" />
            Email Us
          </a>
          <button
            onClick={goToContact}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#bfa06f] rounded-lg py-2 text-[0.65rem] font-semibold text-white"
          >
            Consult
            <ArrowRight className="h-2.5 w-2.5" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 py-5 sm:py-14 lg:py-20">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-14 items-start">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-12">

              {/* Overview */}
              {service.overview && (
                <div>
                  <div className="flex items-center gap-2 mb-2 sm:mb-4">
                    <span className="block h-px w-4 bg-[#bfa06f]" />
                    <h2 className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Overview
                    </h2>
                  </div>
                  <p className="text-xs sm:text-base text-[#4a4a4a] leading-relaxed">
                    {service.overview}
                  </p>
                </div>
              )}

              {/* Key Services */}
              {keyServices.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2 sm:mb-4">
                    <span className="block h-px w-4 bg-[#bfa06f]" />
                    <h2 className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Key Services
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
                    {keyServices.map((item: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 bg-[#f9f7f1] border border-[#e8e0d0] rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-4 sm:py-3"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#bfa06f] mt-0.5 flex-shrink-0" />
                        <span className="text-[0.65rem] sm:text-sm text-[#1a1a1a] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose Us */}
              {whyChooseUs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2 sm:mb-4">
                    <span className="block h-px w-4 bg-[#bfa06f]" />
                    <h2 className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Why Choose SOK Law
                    </h2>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {whyChooseUs.map((reason: any, i: number) => (
                      <div
                        key={i}
                        className="bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:border-[#bfa06f]/40 transition-colors duration-200"
                      >
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <div className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-[#bfa06f]/10 flex-shrink-0 mt-0.5">
                            <span className="text-[0.55rem] sm:text-[0.65rem] font-black text-[#bfa06f]">{i + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-[0.7rem] sm:text-sm font-bold text-[#1a1a1a] mb-0.5">{reason.title}</h3>
                            <p className="text-[0.65rem] sm:text-sm text-[#6a6a6a] leading-relaxed">{reason.description}</p>
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
                  <div className="flex items-center gap-2 mb-2 sm:mb-4">
                    <span className="block h-px w-4 bg-[#bfa06f]" />
                    <h2 className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Our Process
                    </h2>
                  </div>
                  <div className="space-y-0">
                    {process.map((step: any, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 sm:gap-4 relative">
                        {i < process.length - 1 && (
                          <div className="absolute left-[11px] sm:left-[15px] top-6 sm:top-7 bottom-0 w-px bg-[#e8e0d0]" />
                        )}
                        <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#bfa06f] text-white text-[0.55rem] sm:text-xs font-black flex-shrink-0 z-10">
                          {i + 1}
                        </div>
                        <div className="pb-4 sm:pb-6 flex-1 min-w-0">
                          <h3 className="text-[0.7rem] sm:text-sm font-bold text-[#1a1a1a] mb-0.5">{step.title}</h3>
                          <p className="text-[0.65rem] sm:text-sm text-[#6a6a6a] leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile related services — horizontal scroll */}
              {relatedServices.length > 0 && (
                <div className="sm:hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="block h-px w-4 bg-[#bfa06f]" />
                    <h2 className="text-[0.6rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Related Services
                    </h2>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 -mx-3 px-3 scrollbar-none">
                    {relatedServices.slice(0, 6).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => goToService(s)}
                        className="flex-shrink-0 text-[0.65rem] font-semibold text-[#4a4a4a] border border-[#e8e0d0] bg-[#f9f7f1] hover:border-[#bfa06f]/50 hover:text-[#bfa06f] rounded-full px-3 py-1.5 transition-colors whitespace-nowrap"
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar — desktop only ── */}
            <div className="hidden sm:flex flex-col gap-5 lg:sticky lg:top-24">

              {/* Contact card */}
              <div className="bg-[#f9f7f1] border border-[#e8e0d0] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="block h-px w-4 bg-[#bfa06f]" />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-[#bfa06f]">Get Help</span>
                </div>
                <h3 className="text-base font-bold text-[#1a1a1a] mb-2">Need Legal Assistance?</h3>
                <p className="text-sm text-[#6a6a6a] leading-relaxed mb-4">
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
                    <span className="text-sm text-[#4a4a4a] group-hover:text-[#bfa06f] transition-colors">
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
                    <span className="text-sm text-[#4a4a4a] group-hover:text-[#bfa06f] transition-colors">
                      info@soklaw.co.ke
                    </span>
                  </a>
                </div>
                <button
                  onClick={goToContact}
                  className="w-full flex items-center justify-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-sm font-semibold py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Schedule Consultation
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Related services */}
              {relatedServices.length > 0 && (
                <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="block h-px w-4 bg-[#bfa06f]" />
                    <h3 className="text-[0.65rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                      Related Services
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {relatedServices.slice(0, 5).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => goToService(s)}
                        className="group w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-[#f9f7f1] transition-colors text-left"
                      >
                        <span className="text-sm text-[#4a4a4a] group-hover:text-[#bfa06f] transition-colors truncate">
                          {s.title}
                        </span>
                        <ArrowRight className="h-3 w-3 text-[#bfa06f] opacity-0 group-hover:opacity-100 flex-shrink-0 group-hover:translate-x-0.5 transition-all" />
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

      <style>{`
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
};

export default ServiceDetailPage;
