import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';
import { useServices } from '../hooks/useServices';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();
  const { services: dynamicServices, loading, error } = useServices();

  const handleBackToHome = () => navigate(-1);

  const handleServiceClick = (service: any) => {
    const slug = service.slug || service.id;
    navigate(`/services/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const services = dynamicServices.length > 0 ? dynamicServices : servicesData;

  return (
    <>
      <div className="min-h-screen bg-[#f9f7f1] pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 py-8 sm:py-14 lg:py-20">

          {/* ── Back button ── */}
          <button
            onClick={handleBackToHome}
            className="group inline-flex items-center gap-2 text-[0.7rem] sm:text-sm font-semibold text-[#4a4a4a] hover:text-[#bfa06f] transition-colors duration-200 mb-7 sm:mb-12"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          {/* ── Section header ── */}
          <div className="mb-8 sm:mb-14">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="block h-px w-5 sm:w-6 bg-[#bfa06f]" />
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                What We Do
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight">
              Our Legal Services
            </h1>
            <p className="hidden sm:block text-base text-[#4a4a4a] max-w-xl mt-3 leading-relaxed">
              Comprehensive legal solutions across various practice areas, ensuring
              expert representation for all your legal needs.
            </p>
          </div>

          {/* ── Error banner ── */}
          {error && (
            <div className="flex items-start gap-3 bg-white border border-[#e8e0d0] rounded-xl px-4 py-3 mb-6 sm:mb-8 max-w-lg">
              <AlertCircle className="h-4 w-4 text-[#bfa06f] mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-[#4a4a4a]">
                Displaying default services. {error}
              </p>
            </div>
          )}

          {/* ── Loading ── */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl sm:rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[340px] bg-[#e8e0d0]"
                />
              ))}
            </div>
          ) : (
            /* ── Services grid ── */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
              {services.map((service: any) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleServiceClick(service);
                    }
                  }}
                  aria-label={`Learn more about ${service.title}`}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer
                    min-h-[200px] sm:min-h-[360px] lg:min-h-[400px]
                    shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${service.header_image || service.headerImage})` }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/75 transition-all duration-500" />

                  {/* Gold top-right arrow chip */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                    <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#bfa06f] group-hover:bg-white transition-colors duration-300 shadow-md">
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-[#bfa06f] transition-colors duration-300 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="absolute inset-0 p-4 sm:p-7 flex flex-col justify-end">
                    {/* Gold rule */}
                    <div className="w-5 sm:w-6 h-0.5 bg-[#bfa06f] mb-2 sm:mb-3 transition-all duration-300 group-hover:w-8 sm:group-hover:w-10" />

                    <h3 className="text-white font-bold leading-tight
                      text-base sm:text-2xl lg:text-3xl
                      group-hover:text-white transition-colors">
                      {service.title}
                    </h3>

                    {/* Excerpt — shown on hover on desktop */}
                    {service.excerpt && (
                      <p className="hidden sm:block text-white/0 group-hover:text-white/75 text-sm leading-relaxed mt-2 max-w-sm line-clamp-2 transition-all duration-300 max-h-0 group-hover:max-h-16 overflow-hidden">
                        {service.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Gold border on hover */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-transparent group-hover:border-[#bfa06f]/30 transition-all duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServicesPage;
