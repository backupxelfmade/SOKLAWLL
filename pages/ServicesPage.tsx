import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';
import { useServices } from '../hooks/useServices';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();
  const { services: dynamicServices, loading, error } = useServices();

  // Handle back navigation using browser history
  const handleBackToHome = () => {
    navigate(-1); // Uses browser history without page refresh
  };

  // Navigate to individual service detail
  const handleServiceClick = (service: any) => {
    const slug = service.slug || service.id;
    navigate(`/services/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors font-medium group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Legal Services
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive legal solutions across various practice areas, 
              ensuring expert representation for all your legal needs.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-auto mt-6"></div>
          </div>

          {error && (
            <div className="text-center mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Note: Displaying default services. {error}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(dynamicServices.length > 0 ? dynamicServices : servicesData).map((service) => {
              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className="relative service-card overflow-hidden rounded-3xl group opacity-100 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl min-h-[400px]"
                  aria-label={`Learn more about ${service.title}`}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.header_image || service.headerImage})` }}
                  />

                  {/* Blur and Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-black/10 group-hover:backdrop-blur-none transition-all duration-300" />

                  {/* Card Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    {/* Yellow Circle Icon */}
                    <div className="absolute top-6 right-6">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ArrowRight className="h-6 w-6 text-black transform rotate-45" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-yellow-400/30 transition-all duration-300"></div>
                </div>
              );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;