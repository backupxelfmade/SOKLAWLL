import React, { useEffect, useRef } from 'react';
import { Users, Award, Clock, TrendingUp } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const easeOutQuad = (t: number) => t * (2 - t);

  const animateCount = (el: HTMLElement, target: number, suffix = '', duration = 2500) => {
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = easeOutQuad(Math.min(elapsed / duration, 1));
      el.innerText = `${Math.floor(progress * target)}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elements = entry.target.querySelectorAll('.animate-on-scroll');
          const counters = entry.target.querySelectorAll('.count-up');

          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            elements.forEach((el, i) => {
              setTimeout(() => el.classList.add('animate-fade-in-up'), i * 150);
            });
            counters.forEach((counter) => {
              const countTo = Number(counter.getAttribute('data-count-to'));
              const suffix = counter.getAttribute('data-suffix') || '';
              animateCount(counter as HTMLElement, countTo, suffix);
            });
          }

          if (!entry.isIntersecting) {
            hasAnimated = false;
            counters.forEach((c) => { (c as HTMLElement).innerText = '0'; });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Clock,      label: 'Years of Experience', value: 15,   suffix: '+' },
    { icon: Award,      label: 'Cases Won',            value: 500,  suffix: '+' },
    { icon: Users,      label: 'Satisfied Clients',    value: 1000, suffix: '+' },
    { icon: TrendingUp, label: 'Success Rate',         value: 98,   suffix: '%' },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 sm:py-28 bg-[#f9f7f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Section header ── */}
        <div className="mb-14 sm:mb-18">
          <div className="animate-on-scroll opacity-0 flex items-center gap-3 mb-4">
            <span className="block h-px w-8 bg-[#bfa06f]" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
              Who We Are
            </span>
          </div>
          <h2 className="animate-on-scroll opacity-0 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight max-w-xl">
            About SOK Law Associates
          </h2>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Image col ── */}
          <div className="animate-on-scroll opacity-0 relative">
            {/* Decorative frame */}
            <div className="absolute -inset-3 rounded-3xl border border-[#bfa06f]/20 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 rounded-3xl bg-[#bfa06f]/8 pointer-events-none" />

            <img
              loading="lazy"
              src="https://i.postimg.cc/Px2cZQf5/7-X2-A2923-1.jpg"
              alt="SOK Law Associates"
              className="relative w-full rounded-2xl object-cover object-center shadow-xl"
              style={{ maxHeight: '520px' }}
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                if (t.parentElement) {
                  t.parentElement.style.background = 'linear-gradient(135deg, #bfa06f 0%, #8b7355 100%)';
                  t.parentElement.style.minHeight = '400px';
                  t.parentElement.style.borderRadius = '1rem';
                }
              }}
            />

            {/* Floating badge */}
            <div className="absolute -bottom-5 left-6 sm:left-10 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-[#e8e0d0]">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#bfa06f]/10">
                <Award className="h-4 w-4 text-[#bfa06f]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1a1a1a]">Est. 2009</p>
                <p className="text-[10px] text-gray-400 leading-tight">15+ years of practice</p>
              </div>
            </div>
          </div>

          {/* ── Content col ── */}
          <div className="space-y-8 pt-6 lg:pt-0">

            {/* Body copy */}
            <div className="animate-on-scroll opacity-0 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">
                Excellence in Legal Practice Since 2009
              </h3>
              <p className="text-[#4a4a4a] leading-relaxed text-sm sm:text-base">
                SOK Law Associates has been at the forefront of legal practice in Kenya,
                providing comprehensive legal solutions to individuals, corporations, and
                institutions. Our commitment to excellence, integrity, and client
                satisfaction has made us one of the most trusted law firms in the region.
              </p>
              <p className="text-[#4a4a4a] leading-relaxed text-sm sm:text-base">
                We combine deep legal expertise with innovative approaches to deliver
                outstanding results. Our experienced team specialises in a broad range
                of practice areas, handling complex matters with precision and care.
              </p>
            </div>

            {/* Divider */}
            <div className="animate-on-scroll opacity-0 h-px w-full bg-[#e8e0d0]" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="animate-on-scroll opacity-0 group bg-white border border-[#e8e0d0] hover:border-[#bfa06f]/40 rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#bfa06f]/10 group-hover:bg-[#bfa06f]/20 transition-colors duration-200">
                        <Icon className="h-4 w-4 text-[#bfa06f]" />
                      </div>
                    </div>
                    <div
                      className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] leading-none mb-1 count-up"
                      data-count-to={stat.value}
                      data-suffix={stat.suffix}
                    >
                      0
                    </div>
                    <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
