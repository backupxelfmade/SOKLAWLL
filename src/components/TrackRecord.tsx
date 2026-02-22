import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bento-card').forEach((card, i) => {
              setTimeout(() => card.classList.add('animate-fade-in-up'), i * 80);
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
    <section ref={sectionRef} className="py-10 sm:py-20 lg:py-28 bg-[#f9f7f1]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="block h-px w-5 sm:w-6 bg-[#bfa06f]" />
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                Our Difference
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight">
              Why Choose Us
            </h2>
          </div>
          <p className="hidden sm:block text-sm text-[#6a6a6a] max-w-xs leading-relaxed sm:text-right">
            Trusted by individuals, corporations, and institutions across Kenya.
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 lg:gap-4">

          {/* ── Card 1 — Large feature image ── */}
          <div className="bento-card opacity-0 col-span-2 lg:col-span-5 lg:row-span-2 relative overflow-hidden rounded-xl sm:rounded-2xl min-h-[180px] sm:min-h-[320px] group cursor-default">
            <img
              src="https://i.postimg.cc/Px2cZQf5/7-X2-A2923-1.jpg"
              alt="SOK Law Team"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
            <div className="absolute inset-0 p-4 sm:p-7 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="block h-px w-4 sm:w-5 bg-[#bfa06f]" />
                <span className="text-[0.55rem] sm:text-[0.65rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                  Established 2009
                </span>
              </div>
              <h3 className="text-white font-bold leading-tight mb-2 sm:mb-3
                text-sm sm:text-2xl lg:text-3xl">
                A Legacy of Legal Excellence
              </h3>
              <p className="text-white/65 leading-relaxed hidden sm:block
                text-[0.6rem] sm:text-sm lg:text-base">
                Over 15 years serving individuals, corporations, and institutions
                across Kenya with integrity, precision, and unwavering commitment.
              </p>
            </div>
          </div>

          {/* ── Card 2 — Years — gold fill ── */}
          <div className="bento-card opacity-0 col-span-1 lg:col-span-4 bg-[#bfa06f] rounded-xl sm:rounded-2xl p-3 sm:p-6 flex flex-col justify-between group hover:bg-[#a08a5f] transition-colors duration-300 cursor-default">
            <div className="flex items-start justify-between">
              <span className="text-[0.55rem] sm:text-xs font-semibold uppercase tracking-widest text-white/70">
                Experience
              </span>
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-white/50 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="font-black text-white leading-none mb-0.5 sm:mb-1
                text-4xl sm:text-6xl lg:text-7xl">
                15+
              </div>
              <p className="text-white/70 font-medium text-[0.6rem] sm:text-sm">
                Years of legal practice
              </p>
            </div>
          </div>

          {/* ── Card 3 — Success Rate ── */}
          <div className="bento-card opacity-0 col-span-1 lg:col-span-3 bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-3 sm:p-6 flex flex-col justify-between group hover:border-[#bfa06f]/40 hover:shadow-md transition-all duration-300 cursor-default">
            <div className="flex items-start justify-between">
              <span className="text-[0.55rem] sm:text-xs font-semibold uppercase tracking-widest text-[#6a6a6a]">
                Track Record
              </span>
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#bfa06f]/40 group-hover:text-[#bfa06f] transition-colors" />
            </div>
            <div>
              <div className="font-black text-[#1a1a1a] leading-none mb-0.5 sm:mb-1
                text-4xl sm:text-6xl lg:text-7xl">
                98<span className="text-[#bfa06f]">%</span>
              </div>
              <p className="text-[#6a6a6a] font-medium text-[0.6rem] sm:text-sm">
                Case success rate
              </p>
            </div>
          </div>

          {/* ── Card 4 — Clients ── */}
          <div className="bento-card opacity-0 col-span-1 lg:col-span-3 bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-3 sm:p-6 flex flex-col justify-between group hover:border-[#bfa06f]/40 hover:shadow-md transition-all duration-300 cursor-default">
            <div className="flex items-start justify-between">
              <span className="text-[0.55rem] sm:text-xs font-semibold uppercase tracking-widest text-[#6a6a6a]">
                Clients
              </span>
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#bfa06f]/40 group-hover:text-[#bfa06f] transition-colors" />
            </div>
            <div>
              <div className="font-black text-[#1a1a1a] leading-none mb-0.5 sm:mb-1
                text-4xl sm:text-6xl lg:text-7xl">
                1K<span className="text-[#bfa06f]">+</span>
              </div>
              <p className="text-[#6a6a6a] font-medium text-[0.6rem] sm:text-sm">
                Satisfied clients
              </p>
            </div>
          </div>

          {/* ── Card 5 — Personalised — spans full remaining row 2 width ── */}
          <div className="bento-card opacity-0 col-span-2 lg:col-span-7 bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-3 sm:p-5 lg:p-6 group hover:border-[#bfa06f]/40 hover:shadow-md transition-all duration-300 cursor-default">
            <div className="flex items-start justify-between mb-3 sm:mb-5">
              <span className="text-[0.55rem] sm:text-xs font-semibold uppercase tracking-widest text-[#6a6a6a]">
                Our Approach
              </span>
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#bfa06f]/40 group-hover:text-[#bfa06f] transition-colors" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-6">
              <div>
                <div className="w-4 sm:w-5 h-0.5 bg-[#bfa06f] mb-1.5 sm:mb-2.5 transition-all duration-300 group-hover:w-7 sm:group-hover:w-9" />
                <h3 className="text-[#1a1a1a] font-bold leading-tight
                  text-xs sm:text-xl lg:text-2xl">
                  Personalised Legal Strategy
                </h3>
                <p className="text-[#6a6a6a] leading-relaxed mt-1 sm:mt-2 hidden sm:block
                  sm:text-sm lg:text-base max-w-lg">
                  Every mandate handled with a bespoke strategy built around your
                  specific circumstances, goals, and risk profile — no cookie-cutter
                  solutions, only counsel that fits.
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl sm:text-5xl lg:text-6xl font-black text-[#1a1a1a] leading-none">
                  1:1
                </div>
                <div className="text-[0.55rem] sm:text-xs text-[#6a6a6a] font-medium mt-0.5">
                  Dedicated counsel
                </div>
              </div>
            </div>
          </div>

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
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
