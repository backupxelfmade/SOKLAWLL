import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { href: '/',         label: 'Home',           isRoute: true  },
  { href: '#about',    label: 'About',          isRoute: false },
  { href: '/services', label: 'Legal Services', isRoute: true  },
  { href: '/team',     label: 'Team',           isRoute: true  },
  { href: '/careers',  label: 'Careers',        isRoute: true  },
  { href: '/blog',     label: 'Blog',           isRoute: true  },
];

/* ── Logo — image with graceful text fallback ── */
const Logo = ({ scrolled }: { scrolled: boolean }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Link
      to="/"
      onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
      className="flex items-center gap-2.5 flex-shrink-0 group"
    >
      {!imgFailed ? (
        <img
          src="https://soklaw.co.ke/images/logo.png"
          alt="SOK Law"
          className={`h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300 ${
            scrolled ? 'brightness-0' : 'brightness-0 invert'
          }`}
          onError={() => setImgFailed(true)}
        />
      ) : (
        /* Text fallback when image 404s */
        <div className="flex flex-col leading-none">
          <span
            className={`text-base sm:text-lg font-black tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-[#0d2340]' : 'text-white'
            }`}
          >
            SOK<span className="text-[#bfa06f]">.</span>
          </span>
          <span
            className={`text-[0.5rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${
              scrolled ? 'text-[#bfa06f]' : 'text-white/60'
            }`}
          >
            Law Associates
          </span>
        </div>
      )}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNav = useCallback(
    (link: { href: string; isRoute: boolean }) => {
      setIsOpen(false);
      if (link.isRoute) {
        navigate(link.href);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const scroll = () => {
          const el = document.querySelector(link.href);
          if (!el) return;
          window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
        };
        location.pathname !== '/' ? (navigate('/'), setTimeout(scroll, 100)) : scroll();
      }
    },
    [navigate, location.pathname]
  );

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      {/* ── Bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#e8e0d0] shadow-[0_2px_24px_rgba(0,0,0,0.07)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">

            <Logo scrolled={isScrolled} />

            {/* ── Desktop links ── */}
            <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link)}
                  className={`relative px-2.5 lg:px-3.5 py-2 text-[0.72rem] lg:text-[0.8rem] font-semibold rounded-lg transition-all duration-200 group ${
                    isActive(link.href)
                      ? isScrolled ? 'text-[#bfa06f]' : 'text-[#bfa06f]'
                      : isScrolled
                        ? 'text-[#0d2340]/80 hover:text-[#0d2340]'
                        : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.label}
                  {/* Gold underline */}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-px bg-[#bfa06f] transition-all duration-300 rounded-full ${
                      isActive(link.href) ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <button
                onClick={() => handleNav({ href: '/contact', isRoute: true })}
                className={`text-[0.72rem] lg:text-[0.8rem] font-semibold transition-colors duration-200 px-1 ${
                  isScrolled ? 'text-[#0d2340]/70 hover:text-[#0d2340]' : 'text-white/60 hover:text-white'
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => handleNav({ href: '/contact', isRoute: true })}
                className="flex items-center gap-1.5 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-[0.72rem] lg:text-[0.8rem] font-semibold px-4 lg:px-5 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <span>Book Consultation</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* ── Hamburger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className={`md:hidden relative z-50 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 border ${
                isScrolled
                  ? 'bg-[#f0ece3] border-[#e8e0d0] text-[#0d2340] hover:bg-[#e8e0d0]'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <span className={`absolute transition-all duration-200 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
                <X className="h-4 w-4" />
              </span>
              <span className={`absolute transition-all duration-200 ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
                <Menu className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile backdrop ── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-[#0d2340]/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed top-0 right-0 h-full w-[78vw] max-w-[300px] z-50 md:hidden
          bg-white flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e0d0]">
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black text-[#0d2340] tracking-tight">
              SOK<span className="text-[#bfa06f]">.</span>
            </span>
            <span className="text-[0.5rem] font-semibold tracking-[0.16em] uppercase text-[#bfa06f] mt-0.5">
              Law Associates
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f0ece3] hover:bg-[#e8e0d0] text-[#0d2340] transition-colors duration-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Eyebrow label */}
        <div className="px-5 pt-4 pb-1">
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#bfa06f]">
            Navigation
          </span>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
          {[...navLinks, { href: '/contact', label: 'Contact', isRoute: true }].map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNav(link)}
              style={{ transitionDelay: isOpen ? `${i * 25}ms` : '0ms' }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[0.8rem] font-semibold transition-all duration-200 group ${
                isActive(link.href)
                  ? 'bg-[#bfa06f]/10 text-[#bfa06f]'
                  : 'text-[#0d2340]/80 hover:bg-[#f0ece3] hover:text-[#0d2340]'
              }`}
            >
              <span>{link.label}</span>
              <ArrowRight
                className={`h-3 w-3 transition-all duration-200 ${
                  isActive(link.href)
                    ? 'opacity-100 text-[#bfa06f]'
                    : 'opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0'
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="px-4 py-5 border-t border-[#e8e0d0] bg-[#f9f7f1]">
          <button
            onClick={() => handleNav({ href: '/contact', isRoute: true })}
            className="w-full flex items-center justify-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white font-semibold text-sm py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <p className="text-center text-[0.6rem] text-[#6a6a6a] mt-2.5">
            Confidential · No obligation
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
