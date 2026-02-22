import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';
import { servicesApi, ServiceFormatted } from '../services/servicesApi';
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, Loader2, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';

// Accordion — collapses sections on mobile
const Section = ({ label, children, defaultOpen = false }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#e8e0d0] last:border-0">
      {/* Mobile — tap to expand */}
      <button
        className="sm:hidden w-full flex items-center justify-between py-2.5 text-left group"
        onClick={() => setOpen((p) => !p)}
      >
        <div className="flex items-center gap-2">
          <span className="block h-px w-3 bg-[#bfa06f]" />
          <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-[#bfa06f]">{label}</span>
        </div>
        <ChevronDown className={`h-3 w-3 text-[#bfa06f] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile content */}
      <div className={`sm:hidden overflow-hidden transition-all duration-200 ${open ? 'max-h-[600px] pb-3' : 'max-h-0'}`}>
        {children}
      </div>

      {/* Desktop — always visible */}
      <div className="hidden sm:block py-0">
        <div className="flex items-center gap-2 mb-4">
          <span className="block h-px w-5 bg-[#bfa06f]" />
          <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">{label}</span>
        </div>
        {children}
      </div>
    </div>
  );
};

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
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#bfa06f]/10">
              <Loader2 className="h-4 w-4 text-[#bfa06f] animate-spin" />
            </div>
            <p className="text-xs text-[#6a6a6a]">Loading…</p>
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
          <div className="text-center max-w-xs">
            <div className="w-4 h-0.5 bg-[#bfa06f] mx-auto mb-3" />
            <h1 className="text-lg font-bold text-[#1a1a1a] mb-2">Service Not Found</h1>
            <p className="text-xs text-[#6a6a6a] mb-5">This service doesn't exist or has been removed.</p>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 bg-[#bfa06f] text-white text-xs font-semibold px-4 py-2 rounded-full"
            >
              <ArrowLeft className="h-3 w-3" /> Back
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

        {/* ── Hero — shorter on mobile ── */}
        <div
          className="relative flex items-end pt-16 sm:pt-20 overflow-hidden"
          style={{ height: 'clamp(200px, 42vw, 560px)' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.headerImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 pb-3.5 sm:pb-10">
            <button
              onClick={handleBack}
              className="group inline-flex items-center gap-1 text-white/50 hover:text-white text-[0.6rem] sm:text-sm font-semibold transition-colors mb-2.5 sm:mb-7"
            >
              <ArrowLeft className="h-2.5 w-2.5 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>

            <div className="flex items-center gap-1.5 mb-1 sm:mb-2.5">
              <span className="block h-px w-3 sm:w-5 bg-[#bfa06f]" />
              <span className="text-[0.5rem] sm:text-[0.65rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                Practice Area
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 mb-1 sm:mb-3">
              <div className="flex items-center justify-center w-6 h-6 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl bg-[#bfa06f]/20 flex-shrink-0">
                <IconComponent className="h-3 w-3 sm:h-5 sm:w-5 text-[#d4b483]" />
              </div>
              <h1
                className="text-sm sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
              >
                {service.title}
              </h1>
            </div>

            {/* Description — 1 line on mobile */}
            <p className="text-white/60 leading-relaxed pl-8 sm:pl-0 sm:max-w-2xl
              text-[0.6rem] line-clamp-1 sm:text-base sm:line-clamp-none">
              {service.description}
            </p>
          </div>
        </div>

        {/* ── Mobile CTA strip ── */}
        <div className="sm:hidden bg-[#f9f7f1] border-b border-[#e8e0d0] px-3 py-2 flex items-center gap-1.5">
          <a
            href="tel:+254205285048"
            className="flex-1 flex items-center justify-center gap-1 bg-white border border-[#e8e0d0] rounded-lg py-1.5 text-[0.6rem] font-semibold text-[#4a4a4a]"
          >
            <Phone className="h-2.5 w-2.5 text-[#bfa06f]" />
            Call
          </a>
          <a
            href="mailto:info@soklaw.co.ke"
            className="flex-1 flex items-center justify-center gap-1 bg-white border border-[#e8e0d0] rounded-lg py-1.5 text-[0.6rem] font-semibold text-[#4a4a4a]"
          >
            <Mail className="h-2.5 w-2.5 text-[#bfa06f]" />
            Email
          </a>
          <button
            onClick={goToContact}
            className="flex-1 flex items-center justify-center gap-1 bg-[#bfa06f] rounded-lg py-1.5 text-[0.6rem] font-semibold text-white"
          >
            Consult
            <ArrowRight className="h-2 w-2" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 py-3 sm:py-14 lg:py-20">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-14 items-start">

            {/* ── Main content ── */}
            <div className="lg:col-span-2">

              {/* Mobile: accordion sections, Desktop: spaced sections */}
              <div className="sm:space-y-10">

                {/* Overview */}
                {service.overview && (
                  <Section label="Overview" defaultOpen={true}>
                    <p className="text-[0.7rem] sm:text-base text-[#4a4a4a] leading-relaxed">
                      {service.overview}
                    </p>
                  </Section>
                )}

                {/* Key Services */}
                {keyServices.length > 0 && (
                  <Section label="Key Services">
                    <div className="grid grid-cols-2 gap-1 sm:gap-3">
                      {keyServices.map((item: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5 sm:gap-2 bg-[#f9f7f1] border border-[#e8e0d0] rounded-lg px-2 py-1.5 sm:px-4 sm:py-3"
                        >
                          <CheckCircle className="h-2.5 w-2.5 sm:h-4 sm:w-4 text-[#bfa06f] mt-0.5 flex-shrink-0" />
                          <span className="text-[0.6rem] sm:text-sm text-[#1a1a1a] leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {/* Why Choose Us */}
                {whyChooseUs.length > 0 && (
                  <Section label="Why SOK Law">
                    <div className="space-y-1.5 sm:space-y-3">
                      {whyChooseUs.map((reason: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 sm:gap-3 bg-white border border-[#e8e0d0] rounded-lg sm:rounded-2xl p-2.5 sm:p-5"
                        >
                          <div className="flex items-center justify-center w-4 h-4 sm:w-7 sm:h-7 rounded sm:rounded-lg bg-[#bfa06f]/10 flex-shrink-0 mt-0.5">
                            <span className="text-[0.5rem] sm:text-[0.65rem] font-black text-[#bfa06f]">{i + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-[0.65rem] sm:text-sm font-bold text-[#1a1a1a] mb-0.5">{reason.title}</h3>
                            <p className="text-[0.6rem] sm:text-sm text-[#6a6a6a] leading-relaxed">{reason.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {/* Process */}
                {process.length > 0 && (
                  <Section label="Our Process">
                    <div>
                      {process.map((step: any, i: number) => (
                        <div key={i} className="flex items-start gap-2 sm:gap-4 relative">
                          {i < process.length - 1 && (
                            <div className="absolute left-[9px] sm:left-[15px] top-5 sm:top-7 bottom-0 w-px bg-[#e8e0d0]" />
                          )}
                          <div className="flex items-center justify-center w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-[#bfa06f] text-white text-[0.5rem] sm:text-xs font-black flex-shrink-0 z-10">
                            {i + 1}
                          </div>
                          <div className="pb-3 sm:pb-6 flex-1 min-w-0">
                            <h3 className="text-[0.65rem] sm:text-sm font-bold text-[#1a1a1a] mb-0.5">{step.title}</h3>
                            <p className="text-[0.6rem] sm:text-sm text-[#6a6a6a] leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {/* Mobile related — horizontal pill chips */}
                {relatedServices.length > 0 && (
                  <div className="sm:hidden pt-1 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="block h-px w-3 bg-[#bfa06f]" />
                      <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                        Related
                      </span>
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-3 px-3 scrollbar-none">
                      {relatedServices.slice(0, 7).map((s) => (
                        <button
                          key={s.id}
                          onClick={() => goToService(s)}
                          className="flex-shrink-0 text-[0.6rem] font-medium text-[#4a4a4a] border border-[#e8e0d0] bg-[#f9f7f1] hover:border-[#bfa06f]/50 hover:text-[#bfa06f] rounded-full px-2.5 py-1 transition-colors whitespace-nowrap"
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Sidebar — desktop only ── */}
            <div className="hidden sm:flex flex-col gap-5 lg:sticky lg:top-24">
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
                  <a href="tel:+254205285048"
                    className="flex items-center gap-2.5 bg-white border border-[#e8e0d0] hover:border-[#bfa06f]/40 rounded-xl px-3 py-2.5 transition-colors group">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#bfa06f]/10 flex-shrink-0">
                      <Phone className="h-3 w-3 text-[#bfa06f]" />
                    </div>
                    <span className="text-sm text-[#4a4a4a] group-hover:text-[#bfa06f] transition-colors">+254 (0) 20 5285048</span>
                  </a>
                  <a href="mailto:info@soklaw.co.ke"
                    className="flex items-center gap-2.5 bg-white border border-[#e8e0d0] hover:border-[#bfa06f]/40 rounded-xl px-3 py-2.5 transition-colors group">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#bfa06f]/10 flex-shrink-0">
                      <Mail className="h-3 w-3 text-[#bfa06f]" />
                    </div>
                    <span className="text-sm text-[#4a4a4a] group-hover:text-[#bfa06f] transition-colors">info@soklaw.co.ke</span>
                  </a>
                </div>
                <button onClick={goToContact}
                  className="w-full flex items-center justify-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-sm font-semibold py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                  Schedule Consultation
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {relatedServices.length > 0 && (
                <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="block h-px w-4 bg-[#bfa06f]" />
                    <h3 className="text-[0.65rem] font-semibold uppercase tracking-widest text-[#bfa06f]">Related Services</h3>
                  </div>
                  <div className="space-y-1">
                    {relatedServices.slice(0, 5).map((s) => (
                      <button key={s.id} onClick={() => goToService(s)}
                        className="group w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-[#f9f7f1] transition-colors text-left">
                        <span className="text-sm text-[#4a4a4a] group-hover:text-[#bfa06f] transition-colors truncate">{s.title}</span>
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
