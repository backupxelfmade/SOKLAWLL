import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  const slides = [
    {
      image: 'https://i.postimg.cc/Px2cZQf5/7-X2-A2923-1.jpg',
      title: 'Expert Legal Representation',
      position: 'center 30%',
      mobilePosition: 'center 35%',
    },
    {
      image: 'https://i.postimg.cc/0NGHt0hF/7X2A2913-(1).jpg',
      title: 'Comprehensive Legal Solutions',
      position: 'center 30%',
      mobilePosition: 'center 35%',
    },
    {
      image: 'https://i.postimg.cc/Wzd9ZRf5/7X2A2982.jpg',
      title: 'Your Trusted Legal Partner',
      position: 'center 50%',
      mobilePosition: 'center 45%',
    },
  ];

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = slides.map((slide) => {
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

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToTarget = (selector: string) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
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
      className="
        relative w-full
        min-h-[70vh] md:min-h-[80vh] lg:h-screen
        flex items-center
        overflow-hidden
      "
      aria-label="Law firm hero section"
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0
            transition-opacity duration-700 ease-out
            ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
          `}
          aria-hidden={index !== currentSlide}
        >
          {!imagesLoaded[index] && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#bfa06f] to-[#8b7355] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
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
                setImagesLoaded((prev) => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              }}
              onError={(e) => {
                console.error(`Failed to load image: ${slide.image}`);
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.style.background =
                    'linear-gradient(135deg, #bfa06f 0%, #8b7355 100%)';
                }
              }}
            />
          </div>

          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/75" />
        </div>
      ))}

      {/* Slide click areas */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-0 w-1/2 h-full lg:h-[80%] z-10 opacity-0 cursor-pointer touch-manipulation"
        aria-label="Previous slide"
      />
      <button
        onClick={nextSlide}
        className="absolute right-0 top-0 w-1/2 h-full lg:h-[80%] z-10 opacity-0 cursor-pointer touch-manipulation"
        aria-label="Next slide"
      />

      {/* Content */}
      <div
        className="
          relative z-20
          w-full
          px-4 sm:px-6 lg:px-10
          flex items-center
        "
      >
        <div
          className="
            max-w-3xl mx-auto
            text-center
            py-14 sm:py-16 md:py-20
            flex flex-col gap-6
          "
        >
          {/* Badge */}
          <div className="inline-flex items-center justify-center gap-2 self-center bg-black/40 border border-white/20 text-xs sm:text-sm text-white/80 px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#bfa06f]" />
            <span>Toronto-Based Law Firm</span>
          </div>

          {/* Heading + Subcopy */}
          <div className="space-y-3 sm:space-y-4">
            <h1
              className="
                text-white font-semibold
                text-[1.7rem] leading-tight
                sm:text-3xl md:text-4xl lg:text-5xl
              "
              style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
            >
              {slides[currentSlide].title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto">
              Strategic legal guidance for complex disputes, business matters, and regulatory issues—delivered with clarity and discretion.
            </p>
          </div>

          {/* CTA cluster */}
          <div
            className="
              mt-3 sm:mt-5
              flex flex-col items-stretch
              sm:flex-row sm:items-center
              justify-center
              gap-3 sm:gap-4
            "
          >
            {/* Primary CTA */}
            <button
              onClick={() => scrollToTarget('#contact')}
              className="
                group
                bg-[#bfa06f] hover:bg-[#a08a5f]
                text-white font-semibold
                rounded-full
                flex items-center justify-center gap-2
                shadow-lg hover:shadow-xl
                transition-all duration-200
                text-sm sm:text-base
                px-5 sm:px-7 py-3
                w-full sm:w-auto
              "
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Book a Consultation</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary + microcopy as one block for modern look */}
            <div
              className="
                flex flex-col sm:flex-row
                items-stretch sm:items-center
                gap-2 sm:gap-3
                w-full sm:w-auto
              "
            >
              <button
                onClick={() => scrollToTarget('#services')}
                className="
                  group
                  bg-white/5 hover:bg-white/15
                  border border-white/30
                  text-white font-medium
                  rounded-full
                  flex items-center justify-center gap-2
                  shadow-md hover:shadow-lg
                  backdrop-blur-sm
                  transition-all duration-200
                  text-sm sm:text-base
                  px-5 sm:px-7 py-3
                  w-full sm:w-auto
                "
              >
                <span>View Practice Areas</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Small trust cue */}
              <span className="text-[0.7rem] sm:text-xs text-white/65 text-center sm:text-left px-1">
                Confidential, no‑obligation consultation.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              h-1.5 rounded-full
              transition-all duration-200
              ${index === currentSlide ? 'w-6 bg-[#bfa06f]' : 'w-2.5 bg-white/50 hover:bg-white/80'}
            `}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
