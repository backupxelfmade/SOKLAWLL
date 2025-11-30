import React, { useState, useEffect } from 'react';
import {
  Scale,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Newspaper,
  X,
  ArrowRight,
  Clock
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quickLinks = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'About Us', href: '#about', isRoute: false },
    { label: 'Our Team', href: '/team', isRoute: true },
    { label: 'Legal Services', href: '/services', isRoute: true },
    { label: 'Careers', href: '/careers', isRoute: true },
    { label: 'Contact Us', href: '/contact', isRoute: true },
    { label: 'Blog', href: '#news', isRoute: false }
  ];

  const legalServices = [
    { label: 'Corporate Law', href: '/services', isRoute: true },
    { label: 'Litigation & Dispute Resolution', href: '/services', isRoute: true },
    { label: 'Real Estate & Conveyancing', href: '/services', isRoute: true },
    { label: 'Employment & Labour Law', href: '/services', isRoute: true },
    { label: 'Family & Succession Law', href: '/services', isRoute: true },
    { label: 'Criminal Law', href: '/services', isRoute: true }
  ];

  const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  const socialLinks = [
    { 
      icon: XIcon, 
      href: 'https://twitter.com/soklaw', 
      label: 'X (Twitter)' 
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/company/soklaw', 
      label: 'LinkedIn' 
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/soklaw', 
      label: 'Instagram' 
    }
  ];

  const handleNavigation = (link: { href: string; isRoute: boolean }) => {
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
  };

  return (
    <>
      <footer className="bg-[#f9f7f1] text-[#1e1e1e] font-sans relative">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo & Firm Name */}
          <div>
            <div className="mb-4">
              <img
                src="https://soklaw.co.ke/images/logo.png"
                alt="SOKLAW Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm font-medium text-[#4b4b4b] mb-5 tracking-wide uppercase">
              SIMIYU, OPONDO, KIRANGA & COMPANY ADVOCATES
            </p>
            <p className="text-sm text-[#444] leading-relaxed mb-6">
              A full-service law firm in Nairobi offering strategic, dependable legal solutions with integrity and diligence.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 mt-2">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="p-2 bg-[#eae7df] hover:bg-[#bfa06f] text-[#1e1e1e] hover:text-white rounded-full transition duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#bfa06f]">Quick Links</h3>
            <ul className="space-y-3 text-sm text-[#333]">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNavigation(link)}
                    className="hover:text-[#bfa06f] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#bfa06f]">Legal Services</h3>
            <ul className="space-y-3 text-sm text-[#333]">
              {legalServices.map((service, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNavigation(service)}
                    className="hover:text-[#bfa06f] transition-colors text-left"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#bfa06f]">Nairobi Office</h3>
            <ul className="text-sm text-[#333] space-y-4">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-[#bfa06f]" />
                <span>
                  Upperhill Gardens, Block D11, 3rd Ngong Avenue<br />
                  Milimani Area opp Kenya National Library Service
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#bfa06f]" />
                <a href="tel:+254700123456" className="hover:text-[#bfa06f]">+254 700 123 456</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#bfa06f]" />
                <a href="mailto:info@soklaw.co.ke" className="hover:text-[#bfa06f]">info@soklaw.co.ke</a>
              </li>
            </ul>

            {/* News Button */}
            <div className="mt-6">
              <button
                onClick={() => handleNavigation({ href: '#news', isRoute: false })}
                className="flex items-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <Newspaper className="h-4 w-4" />
                Latest News
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#ddd]">
          <div className="max-w-7xl mx-auto px-6 py-6 pb-20 md:pb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div className="flex items-center gap-6 justify-center md:justify-start order-2 md:order-1">
                <a
                  href="https://kenyalaw.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label="Visit Kenya Law Reports"
                >
                  <img
                    src="https://soklaw.co.ke/images/KLR-logo.jpg"
                    alt="Kenya Law Reports"
                    title="Kenya Law Reports"
                    className="h-12 w-auto rounded transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  />
                  <span className="absolute inset-0 rounded border-2 border-transparent group-hover:border-[#bfa06f] transition-all duration-300"></span>
                </a>
                <a
                  href="https://www.lsk.or.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label="Visit Law Society of Kenya"
                >
                  <img
                    src="https://soklaw.co.ke/images/law-society-of-kenya.jpg"
                    alt="Law Society of Kenya"
                    title="Law Society of Kenya"
                    className="h-12 w-auto rounded transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  />
                  <span className="absolute inset-0 rounded border-2 border-transparent group-hover:border-[#bfa06f] transition-all duration-300"></span>
                </a>
              </div>
              <p className="text-sm text-[#888] text-center order-1 md:order-2 md:flex-1">
                © {new Date().getFullYear()} SOKLAW Advocates. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;