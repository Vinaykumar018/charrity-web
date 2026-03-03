// src/components/Pages/Website/ContactPage.jsx
import React, { useState } from "react";

// Reusable Hero Header Component
const PageHero = ({ title, subtitle }) => (
  <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-30"></div>
    <div className="relative max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
          {subtitle}
        </p>
      )}
      <div className="mt-8 flex justify-center gap-4">
        <div className="w-20 h-1 bg-yellow-400 rounded"></div>
        <div className="w-8 h-1 bg-yellow-400 rounded opacity-70"></div>
        <div className="w-20 h-1 bg-yellow-400 rounded"></div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32 text-white">
        <path fill="currentColor" d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
      </svg>
    </div>
  </section>
);

export default function ContactPage() {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Contact form:", state);
    alert("Thank you! Your message has been sent.");
    setState({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <PageHero 
        title="Contact Us" 
        subtitle="We'd love to hear from you – get in touch today" 
      />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Reach Out to Us
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Have questions, want to volunteer, partner with us, or support a specific program? We're here to help.
            </p>

            <div className="space-y-5 text-gray-700">
              <div className="flex items-start gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>shriaryabhattacharitabletrust@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold">Address</p>
                  <p>
                    WARD NO. 24, DUMARWANA,<br />
                    BAIRGANIA, SITAMARHI,<br />
                    BIHAR - 843313
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={state.subject}
                onChange={(e) => setState({ ...state, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
              <textarea
                required
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={state.message}
                onChange={(e) => setState({ ...state, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-700 text-white font-bold py-3 rounded-lg hover:bg-indigo-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}