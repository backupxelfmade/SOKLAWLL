import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus !== 'idle') setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error('Failed to send message');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } catch (err) {
      console.error('Error sending message:', err);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-[#e8e0d0] focus:border-[#bfa06f] rounded-xl text-sm text-[#1a1a1a] placeholder-[#aaa] bg-white outline-none transition-colors duration-200';

  const labelClass =
    'block text-[0.65rem] sm:text-xs font-semibold uppercase tracking-widest text-[#4a4a4a] mb-1.5';

  const infoItems = [
    {
      icon: MapPin,
      label: 'Office Location',
      content: (
        <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed">
          Upperhill Gardens, Block D11, 3rd Ngong Avenue<br />
          Milimani Area opp Kenya National Library Service
        </p>
      ),
    },
    {
      icon: Phone,
      label: 'Phone',
      content: (
        <a
          href="tel:+254205285048"
          className="text-xs sm:text-sm text-[#4a4a4a] hover:text-[#bfa06f] transition-colors"
        >
          +254 (0) 20 5285048
        </a>
      ),
    },
    {
      icon: Mail,
      label: 'Email',
      content: (
        <a
          href="mailto:info@soklaw.co.ke"
          className="text-xs sm:text-sm text-[#4a4a4a] hover:text-[#bfa06f] transition-colors break-all"
        >
          info@soklaw.co.ke
        </a>
      ),
    },
    {
      icon: Clock,
      label: 'Office Hours',
      content: (
        <div className="space-y-1.5">
          {[
            { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
            { day: 'Saturday',        hours: '9:00 AM – 2:00 PM' },
            { day: 'Sunday',          hours: 'Emergency Only'     },
          ].map(({ day, hours }) => (
            <div key={day} className="flex items-center justify-between gap-4">
              <span className="text-xs sm:text-sm text-[#4a4a4a]">{day}</span>
              <span className="text-xs sm:text-sm font-semibold text-[#1a1a1a] flex-shrink-0">{hours}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">

      {/* ── Dark header band ── */}
      <div className="bg-[#0d2340] pt-24 sm:pt-28 pb-8 sm:pb-12 relative overflow-hidden">
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[38%] opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(-55deg, #bfa06f 0px, #bfa06f 1px, transparent 1px, transparent 28px)' }}
        />
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-10 relative z-10">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="block h-px w-5 sm:w-8 bg-[#bfa06f] flex-shrink-0" />
            <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#bfa06f]">
              Contact Us
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-1 sm:mb-2">
            Get In Touch
          </h1>
          <p className="text-[0.7rem] sm:text-sm text-white/50 max-w-md leading-relaxed">
            Have a legal matter or question? We're here to help. Reach out and
            we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-14 items-start">

          {/* ── Left col — info cards + map ── */}
          <div className="space-y-3 sm:space-y-4">
            {infoItems.map(({ icon: Icon, label, content }) => (
              <div
                key={label}
                className="bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-[#bfa06f]/40 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#bfa06f]/10 flex-shrink-0 mt-0.5">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#bfa06f]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-widest text-[#bfa06f] mb-1.5">
                      {label}
                    </p>
                    {content}
                  </div>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-[#e8e0d0]">
              <iframe
                title="Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.820262983408!2d36.81541707534238!3d-1.2993107356429749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d9103a4f51%3A0xf8f3addf8df84972!2sUpper%20Hill%20Gardens%2C%20Ragati%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── Right col — form ── */}
          <div className="bg-white border border-[#e8e0d0] rounded-xl sm:rounded-2xl p-4 sm:p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="block h-px w-4 bg-[#bfa06f]" />
              <span className="text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                Send a Message
              </span>
            </div>
            <h2 className="text-sm sm:text-lg font-bold text-[#0d2340] mb-4 sm:mb-6">
              We'll Respond Within 24 Hours
            </h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-4">

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} placeholder="Your full name"
                    required autoComplete="name" className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} placeholder="you@example.com"
                    required autoComplete="email" className={inputClass}
                  />
                </div>
              </div>

              {/* Phone + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel" name="phone" value={formData.phone}
                    onChange={handleChange} placeholder="+254 700 000 000"
                    autoComplete="tel" className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Subject *</label>
                  <div className="relative">
                    <select
                      name="subject" value={formData.subject}
                      onChange={handleChange} required
                      className={`${inputClass} appearance-none pr-9 cursor-pointer`}
                    >
                      <option value="">Select a subject…</option>
                      {[
                        'General Inquiry',
                        'Corporate Law',
                        'Litigation & Dispute Resolution',
                        'Real Estate & Conveyancing',
                        'Employment & Labour Law',
                        'Family & Succession Law',
                        'Criminal Law',
                        'Other',
                      ].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="h-3.5 w-3.5 text-[#6a6a6a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>Message *</label>
                <textarea
                  name="message" value={formData.message}
                  onChange={handleChange} rows={5} required
                  placeholder="Please describe your legal matter…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 sm:py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white/40 border-t-white rounded-full" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Status banners */}
            {submitStatus === 'success' && (
              <div className="mt-4 flex items-start gap-3 bg-[#bfa06f]/8 border border-[#bfa06f]/30 rounded-xl px-4 py-3">
                <CheckCircle className="h-4 w-4 text-[#bfa06f] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#0d2340]">Message sent successfully</p>
                  <p className="text-[0.65rem] text-[#4a4a4a] mt-0.5">We'll get back to you as soon as possible.</p>
                </div>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-red-800">Failed to send</p>
                  <p className="text-[0.65rem] text-red-700 mt-0.5">{errorMessage}</p>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="flex-shrink-0 flex items-center gap-1 text-[0.65rem] font-semibold text-red-600 hover:text-red-800 transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
