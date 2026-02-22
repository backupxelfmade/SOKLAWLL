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
      mobilePosition: 'center 20%',
    },
    {
      image: 'https://i.postimg.cc/0NGHt0hF/7X2A2913-(1).jpg',
      title: 'Comprehensive Legal Solutions',
      position: 'center 30%',
      mobilePosition: 'center 15%',
    },
    {
      image: 'https://i.postimg.cc/Wzd9ZRf5/7X2A2982.jpg',
      title: 'Your Trusted Legal Partner',
      position: 'center 50%',
      mobilePosition: 'center 30%',
    },
  ];

  useEffect(() => {
    const loadImages = async () => {
      const results = await Promise.all(
        slides.map(
          (slide) =>
            new Promise<boolean>((resolve) => {
              const img = new Image();
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
              img.src = slide.image;
            })
        )
      );
      setImagesLoaded(results);
    };
    loadImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 80,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex items-end"
      style={{ height: '100svh', minHeight: '560px', maxHeight: '900px' }}
      aria-label="Hero"
    >
      {/* ── Background slides ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== currentSlide}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {!imagesLoaded[i] && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#bfa06f] to-[#8b7355] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
            </div>
          )}
          <img
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover hero-img-${i}`}
            style={{ objectPosition: slide.position }}
            loading={i === 0 ? 'eager' : 'lazy'}
            onLoad={() =>
              setImagesLoaded((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              })
            }
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = 'none';
              if (t.parentElement)
                t.parentElement.style.background =
                  'linear-gradient(135deg,#bfa06f 0%,#8b7355 100%)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/20" />
        </div>
      ))}

      {/* ── Invisible tap zones ── */}
      <button
        onClick={() => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)}
        className="absolute left-0 top-0 w-1/2 h-[80%] z-10 opacity-0 touch-manipulation"
        aria-label="Previous slide"
      />
      <button
        onClick={() => setCurrentSlide((p) => (p + 1) % slides.length)}
        className="absolute right-0 top-0 w-1/2 h-[80%] z-10 opacity-0 touch-manipulation"
        aria-label="Next slide"
      />

      {/* ── Main content ── */}
      <div className="relative z-20 w-full px-5 sm:px-8 lg:px-16 pb-14 sm:pb-16 md:pb-20">
        <div className="max-w-2xl text-left mx-auto sm:mx-0">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="block h-px w-6 bg-[#bfa06f]" />
            <span className="text-[0.7rem] sm:text-xs font-semibold uppercase tracking-widest text-[#bfa06f]">
              Nairobi-Based Law Firm
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
          >
            {slides[currentSlide].title}
          </h1>

          {/* Subheading */}
          <p className="text-white/75 text-sm sm:text-base max-w-lg mb-7 sm:mb-8 leading-relaxed">
            Strategic counsel for complex disputes, transactions, and regulatory
            matters—delivered with precision and discretion.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="group flex items-center justify-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>Book a Consultation</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('#services')}
              className="group flex items-center justify-center sm:justify-start gap-2 border border-white/40 hover:border-white/70 hover:bg-white/10 text-white/90 hover:text-white font-medium text-sm sm:text-base px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-200"
            >
              <span>Practice Areas</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-5 z-30 flex items-center gap-1.5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 lg:right-16 sm:bottom-6 lg:bottom-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === currentSlide}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? 'w-7 bg-[#bfa06f]'
                : 'w-3 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 639px) {
          .hero-img-0 { object-position: ${slides[0].mobilePosition} !important; }
          .hero-img-1 { object-position: ${slides[1].mobilePosition} !important; }
          .hero-img-2 { object-position: ${slides[2].mobilePosition} !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
