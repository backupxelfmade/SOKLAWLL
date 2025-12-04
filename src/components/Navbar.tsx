import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Scale } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home', isRoute: true },
    { href: '#about', label: 'About', isRoute: false },
    { href: '/services', label: 'Legal Services', isRoute: true },
    { href: '/team', label: 'Team', isRoute: true },
    { href: '/careers', label: 'Careers', isRoute: true },
    { href: '/blog', label: 'Blog', isRoute: true },
    { href: '/contact', label: 'Contact', isRoute: true },
  ];

  const handleNavigation = useCallback((link: { href: string; isRoute: boolean }) => {
    setIsOpen(false);

    if (link.isRoute) {
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(link.href);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(link.href);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    }
  }, [navigate, location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#f9f7f1]/90 backdrop-blur-md shadow-lg'
          : 'bg-[#1a1a1a]/30 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo and Firm Name */}
          <div className="flex flex-col space-y-1 py-2 flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-1 sm:space-x-2"
            >
              <Scale className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-600 flex-shrink-0" />
              <img
                src="https://soklaw.co.ke/images/logo.png"
                alt="SOK Law Logo"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </Link>
            <p className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-semibold tracking-wide leading-tight transition-colors duration-300 ${
              isScrolled ? 'text-[#4B3621]' : 'text-white'
            }`}>
              SIMIYU, OPONDO, KIRANGA & COMPANY ADVOCATES
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-4 lg:ml-6 xl:ml-10 flex items-baseline space-x-2 lg:space-x-4 xl:space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link)}
                  className={`px-1 lg:px-2 xl:px-3 py-2 text-xs lg:text-sm xl:text-base font-medium transition-colors duration-200 hover:text-yellow-600 relative group ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex-shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className={`p-2 rounded-md transition-colors duration-200 relative z-50 ${
                isScrolled || isOpen 
                  ? 'text-gray-700 hover:bg-gray-100 bg-white/90' 
                  : 'text-white hover:bg-white/10 bg-black/20'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              style={{ 
                minWidth: '32px',
                minHeight: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-x-0 top-14 sm:top-16 transition-all duration-300 ease-in-out z-40 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="bg-[#f9f7f1]/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
          <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-6 space-y-1 sm:space-y-2 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link)}
                className="block px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-white/50 rounded-lg transition-all duration-200 w-full cursor-pointer active:bg-yellow-100 text-left"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 top-14 sm:top-16"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
