import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { useServices } from '../hooks/useServices';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { services: dynamicServices, loading, error } = useServices();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleViewAllServices = () => {
    navigate('/services');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleServiceClick = (service: any) => {
    const slug = service.slug || service.id;
    navigate(`/services/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const servicesToDisplay = dynamicServices.length > 0 ? dynamicServices : servicesData;

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Our Legal Services
          </h2>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in-delay">
            We provide comprehensive legal solutions across various practice areas,
            ensuring expert representation for all your legal needs.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-auto mt-6 animate-scale-in"></div>
        </div>

        {error && (
          <div className="text-center mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Note: Displaying default services. {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">Loading services...</p>
            </div>
          ) : (
            servicesToDisplay.slice(0, 4).map((service, index) => (
              <div
                key={service.id || index}
                className="relative service-card overflow-hidden rounded-3xl group opacity-0 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                onClick={() => handleServiceClick(service)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.header_image || service.headerImage})` }}
                />

                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-black/10 group-hover:backdrop-blur-none transition-all duration-300" />

                <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[320px]">
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="h-6 w-6 text-black transform rotate-45" />
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                    {service.title}
                  </h3>
                </div>

                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-yellow-400/30 transition-all duration-300"></div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={handleViewAllServices}
            className="btn-primary inline-flex items-center space-x-2 transform hover:scale-105 shadow-lg transition-all duration-300 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-yellow-400"
          >
            <span>View All Services</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .service-card {
          background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;