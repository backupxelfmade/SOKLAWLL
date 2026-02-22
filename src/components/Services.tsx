import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { useServices } from '../hooks/useServices';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { services: dynamicServices, loading, error } = useServices();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.service-card').forEach((card, i) => {
              setTimeout(() => card.classList.add('animate-fade-in-up'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleViewAllServices = () => {
    navigate('/services');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleServiceClick = (service: any) => {
    navigate(`/services/${service.slug || service.id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const servicesToDisplay = dynamicServices.length > 0 ? dynamicServices : servicesData;

  return (
    <section ref={sectionRef} id="services" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Section header ── */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block h-px w-6 bg-[#bfa06f]" />
              <span className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                What We Do
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight max-w-lg">
              Our Legal Services
            </h2>
          </div>

          {/* Desktop "View All" — top right */}
          <button
            onClick={handleViewAllServices}
            className="hidden sm:flex items-center gap-2 self-end text-sm font-semibold text-[#bfa06f] hover:text-[#a08a5f] transition-colors duration-200 group pb-1 border-b border-[#bfa06f]/40 hover:border-[#a08a5f] whitespace-nowrap"
          >
            <span>View All Services</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Subheading */}
        <p className="text-sm sm:text-base text-[#4a4a4a] max-w-2xl mb-8 sm:mb-12 leading-relaxed">
          Comprehensive legal solutions across a broad range of practice areas—expert
          representation tailored to your needs.
        </p>

        {/* ── Error banner ── */}
        {error && (
          <div className="mb-8 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-xs sm:text-sm">
              Note: Displaying default services. {error}
            </p>
          </div>
        )}

        {/* ── Cards grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#f9f7f1] animate-pulse"
                style={{ minHeight: '280px' }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {servicesToDisplay.slice(0, 4).map((service, i) => (
              <div
                key={service.id || i}
                onClick={() => handleServiceClick(service)}
                className="service-card opacity-0 relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ minHeight: '280px' }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${service.header_image || service.headerImage})`,
                  }}
                />

                {/* Gradient overlay — stronger at bottom for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 transition-all duration-300" />

                {/* Top-right arrow chip */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#bfa06f] flex items-center justify-center shadow-md group-hover:bg-[#a08a5f] transition-colors duration-200">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 inset-x-0 z-10 p-4 sm:p-5">
                  {/* Gold accent rule */}
                  <div className="w-5 h-0.5 bg-[#bfa06f] mb-2 transition-all duration-300 group-hover:w-8" />
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-[#bfa06f] text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                    <span>Learn more</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#bfa06f]/30 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        )}

        {/* ── Mobile "View All" — bottom centered ── */}
        <div className="mt-8 sm:mt-10 flex justify-center sm:hidden">
          <button
            onClick={handleViewAllServices}
            className="flex items-center justify-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 group w-full max-w-xs"
          >
            <span>View All Services</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Services;
