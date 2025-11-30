import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  const slides = [
    {
      image: 'https://i.postimg.cc/Px2cZQf5/7-X2-A2923-1.jpg',
      title: 'Expert Legal Representation',
      description: 'Providing exceptional legal services with integrity and expertise.',
      position: 'center 40%' // Adjust to focus on people's faces
    },
    {
      image: 'https://i.postimg.cc/0NGHt0hF/7X2A2913-(1).jpg',
      title: 'Comprehensive Legal Solutions',
      description: 'Our experienced team delivers comprehensive legal solutions.',
      position: 'center 35%' // Adjust to focus on people's faces
    },
    {
      image: 'https://i.postimg.cc/Wzd9ZRf5/7X2A2982.jpg',
      title: 'Your Trusted Legal Partner',
      description: 'Professional excellence combined with genuine care for clients.',
      position: 'center 45%' // Adjust for outdoor shot
    },
  ];

  // Preload images for better performance
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = slides.map((slide, index) => {
        return new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = slide.image;
        });
      });
      
      const results = await Promise.all(imagePromises);
      setImagesLoaded(results);
    };
    
    loadImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {!imagesLoaded[index] && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#bfa06f] to-[#8b7355] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}
          <div className="w-full h-full relative bg-[#2a2a2a]">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: slide.position,
              }}
              loading={index === 0 ? 'eager' : 'lazy'}
              onLoad={() => {
                setImagesLoaded(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }}
              onError={(e) => {
                console.error(`Failed to load image: ${slide.image}`);
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.style.background = 'linear-gradient(135deg, #bfa06f 0%, #8b7355 100%)';
                }
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>
      ))}

      {/* Invisible Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-0 w-1/2 h-[70%] z-20 opacity-0 cursor-pointer touch-manipulation"
        aria-label="Previous Slide"
      />
      <button
        onClick={nextSlide}
        className="absolute right-0 top-0 w-1/2 h-[70%] z-20 opacity-0 cursor-pointer touch-manipulation"
        aria-label="Next Slide"
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <div className="animate-fade-in-up mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight"
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
              {slides[currentSlide].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#f4e4c1] mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium px-4"
               style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.9)' }}>
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delay px-4">
            <button
              onClick={scrollToContact}
              className="group bg-[#bfa06f] hover:bg-[#a08a5f] text-white font-semibold rounded-lg flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-w-[280px]"
            >
              <Phone className="h-5 w-5" />
              <span>Get Legal Consultation</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToServices}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white font-semibold rounded-lg flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-w-[280px]"
            >
              <span>Our Services</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#bfa06f] w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;