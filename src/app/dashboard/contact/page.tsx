"use client";
import { useState } from "react";

// ============================================
// 🎨 CUSTOMIZATION SETTINGS - EDIT THESE!
// ============================================

const SETTINGS = {
  // Company Information
  company: {
    name: "Flower Blossom",
    tagline: "We'd Love to Hear From You",
  },

  // Contact Details
  contact: {
    address: {
      street: "123 Flower Street",
      city: "Blossom City",
      state: "BC",
      zip: "12345",
      country: "United States"
    },
    phone: {
      main: "+1 (555) 123-4567",
      whatsapp: "+1 (555) 765-4321"
    },
    email: {
      info: "info@flowerblossom.com",
      support: "support@flowerblossom.com"
    },
    hours: {
      weekday: "9:00 AM - 7:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    }
  },

  // Social Media Links
  social: {
    facebook: "https://facebook.com/yourpage",
    instagram: "https://instagram.com/yourpage",
    twitter: "https://twitter.com/yourpage",
    pinterest: "https://pinterest.com/yourpage"
  },

  // Colors (Light Pink Theme)
  colors: {
    primary: "pink-300",        // Light pink
    primaryHover: "pink-400",   // Medium pink on hover
    secondary: "rose-200",      // Light rose
    accent: "pink-50",          // Very light pink background
    text: "gray-800",           // Dark gray text
    lightBg: "pink-50",         // Light background
  }
};

// ============================================
// 📋 CONTACT PAGE COMPONENT
// ============================================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setSubmitted(true);
    setLoading(false);
    
    // Reset form after 4 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-8 md:py-12">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          {/* Contact Form - Centered at Top */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 md:p-8">
              <h2 className={`text-2xl md:text-3xl font-bold text-${SETTINGS.colors.text} mb-3`}>
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Have a question or special request? We'll get back to you within 24 hours.
              </p>

              {submitted && (
                <div className="bg-green-50 border-l-4 border-green-400 text-green-800 px-5 py-4 rounded-lg mb-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm">We'll respond to you shortly.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-semibold text-${SETTINGS.colors.text} mb-2`}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-${SETTINGS.colors.primary} focus:outline-none transition bg-white`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={`block text-sm font-semibold text-${SETTINGS.colors.text} mb-2`}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-${SETTINGS.colors.primary} focus:outline-none transition bg-white`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className={`block text-sm font-semibold text-${SETTINGS.colors.text} mb-2`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-${SETTINGS.colors.primary} focus:outline-none transition bg-white`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className={`block text-sm font-semibold text-${SETTINGS.colors.text} mb-2`}>
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-${SETTINGS.colors.primary} focus:outline-none transition bg-white`}
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Question</option>
                      <option value="custom">Custom Arrangement</option>
                      <option value="wedding">Wedding Flowers</option>
                      <option value="corporate">Corporate Events</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={`block text-sm font-semibold text-${SETTINGS.colors.text} mb-2`}>
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-${SETTINGS.colors.primary} focus:outline-none transition resize-none bg-white`}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-${SETTINGS.colors.primary} hover:bg-${SETTINGS.colors.primaryHover} text-white font-semibold py-4 px-6 rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Cards - Grid Below Form */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Quick Contact Card */}
            <div className={`bg-gradient-to-br from-${SETTINGS.colors.primary} to-${SETTINGS.colors.secondary} rounded-2xl p-6 text-white shadow-md`}>
              <h3 className="text-2xl font-bold mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Main Line</p>
                    <p className="font-semibold">{SETTINGS.contact.phone.main}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Email Us</p>
                    <p className="font-semibold">{SETTINGS.contact.email.info}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Us Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className={`bg-${SETTINGS.colors.accent} p-3 rounded-lg`}>
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-bold text-${SETTINGS.colors.text} text-lg mb-2`}>Visit Our Shop</h3>
                  <p className="text-gray-600">{SETTINGS.contact.address.street}</p>
                  <p className="text-gray-600">
                    {SETTINGS.contact.address.city}, {SETTINGS.contact.address.state} {SETTINGS.contact.address.zip}
                  </p>
                  <p className="text-gray-600">{SETTINGS.contact.address.country}</p>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className={`bg-${SETTINGS.colors.accent} p-3 rounded-lg`}>
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-${SETTINGS.colors.text} text-lg mb-3`}>Business Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className={`font-semibold text-${SETTINGS.colors.text}`}>
                        {SETTINGS.contact.hours.weekday}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className={`font-semibold text-${SETTINGS.colors.text}`}>
                        {SETTINGS.contact.hours.saturday}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className={`font-semibold text-${SETTINGS.colors.text}`}>
                        {SETTINGS.contact.hours.sunday}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
              <h3 className={`font-bold text-${SETTINGS.colors.text} text-lg mb-4`}>Follow Us</h3>
              <div className="grid grid-cols-4 gap-3">
                <a
                  href={SETTINGS.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-${SETTINGS.colors.accent} hover:bg-${SETTINGS.colors.primary} p-3 rounded-xl transition flex items-center justify-center group`}
                  title="Facebook"
                >
                  <svg className="w-6 h-6 text-pink-500 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={SETTINGS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-${SETTINGS.colors.accent} hover:bg-${SETTINGS.colors.primary} p-3 rounded-xl transition flex items-center justify-center group`}
                  title="Instagram"
                >
                  <svg className="w-6 h-6 text-pink-500 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href={SETTINGS.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-${SETTINGS.colors.accent} hover:bg-${SETTINGS.colors.primary} p-3 rounded-xl transition flex items-center justify-center group`}
                  title="Twitter"
                >
                  <svg className="w-6 h-6 text-pink-500 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href={SETTINGS.social.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-${SETTINGS.colors.accent} hover:bg-${SETTINGS.colors.primary} p-3 rounded-xl transition flex items-center justify-center group`}
                  title="Pinterest"
                >
                  <svg className="w-6 h-6 text-pink-500 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}