import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Clock, TrendingUp, UserCheck } from 'lucide-react';

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Expert Legal Team',
      description: 'Seasoned attorneys with decades of combined experience and specialised knowledge across every practice area.',
      stat: '25+',
      statLabel: 'Years Experience',
    },
    {
      icon: Clock,
      title: '24/7 Client Support',
      description: 'Round-the-clock availability ensures you always have access to legal guidance when you need it most.',
      stat: '24/7',
      statLabel: 'Availability',
    },
    {
      icon: TrendingUp,
      title: 'Proven Track Record',
      description: 'Consistently delivering favourable outcomes through strategic litigation and skilled negotiation.',
      stat: '95%',
      statLabel: 'Success Rate',
    },
    {
      icon: UserCheck,
      title: 'Personalised Approach',
      description: 'Every client receives individualised attention with legal strategies tailored to their unique situation.',
      stat: '1:1',
      statLabel: 'Personal Attention',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reason-card').forEach((card, i) => {
              setTimeout(() => card.classList.add('animate-fade-in-up'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">

        {/* ── Section header ── */}
        <div className="mb-8 sm:mb-14">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="block h-px w-5 sm:w-6 bg-[#bfa06f]" />
            <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
              Our Difference
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight max-w-lg">
              Why Choose Us
            </h2>
            <p className="hidden sm:block text-sm sm:text-base text-[#4a4a4a] max-w-sm leading-relaxed sm:text-right">
              Discover why clients trust us with their most important legal matters.
            </p>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={i}
                className="reason-card opacity-0 group bg-white border border-[#e8e0d0] hover:border-[#bfa06f]/40 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Top accent + stat */}
                <div className="relative bg-[#f9f7f1] px-3 sm:px-5 pt-4 sm:pt-6 pb-3 sm:pb-5">
                  {/* Gold top rule */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#bfa06f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start justify-between">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#bfa06f]/10 group-hover:bg-[#bfa06f]/20 transition-colors duration-200">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#bfa06f]" />
                    </div>

                    {/* Stat chip */}
                    <div className="text-right">
                      <div className="text-base sm:text-2xl font-bold text-[#1a1a1a] leading-none">
                        {reason.stat}
                      </div>
                      <div className="text-[0.55rem] sm:text-[0.65rem] text-[#6a6a6a] font-medium mt-0.5 leading-tight">
                        {reason.statLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-3 sm:px-5 py-3 sm:py-5">
                  <div className="w-4 sm:w-5 h-0.5 bg-[#bfa06f] mb-1.5 sm:mb-3 transition-all duration-300 group-hover:w-6 sm:group-hover:w-8" />
                  <h3 className="font-bold text-[#1a1a1a] leading-tight mb-1 sm:mb-2
                    text-[0.65rem] sm:text-base lg:text-lg">
                    {reason.title}
                  </h3>
                  <p className="text-[#6a6a6a] leading-relaxed line-clamp-3
                    text-[0.55rem] sm:text-sm hidden sm:block">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
