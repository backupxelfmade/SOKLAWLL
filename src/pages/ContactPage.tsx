import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';

// Form validation rules
const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[0-9\s\-\(\)]{10,}$/,
  required: ['firstName', 'lastName', 'email', 'service', 'message']
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear submit status when user modifies form
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  /**
   * Validate form data before submission
   */
  const validateForm = () => {
    const errors = {};
    
    // Check required fields
    VALIDATION_RULES.required.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'This field is required';
      }
    });
    
    // Validate email format
    if (formData.email && !VALIDATION_RULES.email.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate phone format (optional field)
    if (formData.phone && !VALIDATION_RULES.phone.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus('validation_error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare email content for Gmail
      const emailBody = `
New Contact Form Submission from SOK Law Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEGAL SERVICE REQUESTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.service}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submission Date: ${new Date().toLocaleString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
Source: Website Contact Form

⚠️ Please follow up with this client within 24 hours.
      `.trim();

      const subject = `New Legal Consultation Request - ${formData.firstName} ${formData.lastName}`;
      
      // Create Gmail compose URL
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@soklaw.co.ke&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open Gmail in new tab
      window.open(gmailUrl, '_blank');
      
      setSubmitStatus('success');
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        setValidationErrors({});
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f1] to-white">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a legal matter or question? We're here to help. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">

            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">

              {/* Office Location */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#bfa06f] p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Office Location</h3>
                    <p className="text-gray-600 text-sm">
                      Upperhill Gardens, Block D1, 5th Floor<br />
                      Ragati Road, Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#bfa06f] p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <a href="tel:+254205285048" className="text-[#bfa06f] hover:underline text-sm">
                      +254 20 528 5048
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#bfa06f] p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <a href="mailto:info@soklaw.co.ke" className="text-[#bfa06f] hover:underline text-sm">
                      info@soklaw.co.ke
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#bfa06f] p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {/* Validation Error */}
                {submitStatus === 'validation_error' && (
                  <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-900">Please check your form</h4>
                      <p className="text-sm text-orange-700">All required fields must be completed with valid information.</p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Gmail opened successfully!</h4>
                      <p className="text-sm text-green-700">A new Gmail compose window has opened with all the form details. Please review and click send to complete your inquiry.</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900">Unable to open Gmail</h4>
                      <p className="text-sm text-red-700">Please contact us directly at info@soklaw.co.ke or try again.</p>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange}
                        placeholder="Your first name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bfa06f] focus:border-transparent ${
                          validationErrors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {validationErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange}
                        placeholder="Your last name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bfa06f] focus:border-transparent ${
                          validationErrors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {validationErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bfa06f] focus:border-transparent ${
                          validationErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        placeholder="+254 (0) 20 5285048"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bfa06f] focus:border-transparent ${
                          validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {validationErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Legal Service Required *</label>
                    <select 
                      name="service" 
                      value={formData.service} 
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bfa06f] focus:border-transparent ${
                        validationErrors.service ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a service</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Corporate Law">Corporate Law</option>
                      <option value="Litigation">Litigation & Dispute Resolution</option>
                      <option value="Real Estate">Real Estate & Conveyancing</option>
                      <option value="Employment Law">Employment & Labour Law</option>
                      <option value="Family Law">Family & Succession Law</option>
                      <option value="Criminal Law">Criminal Law</option>
                      <option value="Other">Other</option>
                    </select>
                    {validationErrors.service && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.service}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange}
                      rows={6}
                      placeholder="Please describe your legal matter and how we can help you..."
                      maxLength={1000}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bfa06f] focus:border-transparent resize-none ${
                        validationErrors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    ></textarea>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {formData.message.length}/1000 characters
                    </div>
                    {validationErrors.message && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#bfa06f] hover:bg-[#a08a5f] text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              </div>
            </div>

          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#bfa06f] to-[#a08a5f]">
              <h2 className="text-2xl font-bold text-white">Find Us</h2>
              <p className="text-white/90 mt-1">Visit our office</p>
            </div>

            <div className="relative w-full h-96">
              <iframe
                title="Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.820262983408!2d36.81541707534238!3d-1.2993107356429749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d9103a4f51%3A0xf8f3addf8df84972!2sUpper%20Hill%20Gardens%2C%20Ragati%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage