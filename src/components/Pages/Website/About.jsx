// src/components/Pages/Website/About.jsx
import React from "react";

export default function About() {
  return (
    <>
      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            About Us
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
            Building a brighter future through education, healthcare, and empowerment
          </p>
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

      {/* Main About Content Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl shadow-xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shri Aryabhatta Charitable Trust
          </h2>
          <p className="text-lg text-indigo-700 font-medium">
            Committed to sustainable change through education, healthcare, and social empowerment
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="text-base italic text-gray-600 border-l-4 border-indigo-600 pl-6 py-2">
            Shri Aryabhatta Charitable Trust is a registered non-profit organisation committed to creating long-term, sustainable change in the lives of underprivileged communities through education, healthcare and social empowerment.
          </p>

          <p>
            Founded with the belief that <strong className="text-indigo-700">education and health are the foundations of a dignified life</strong>, the Trust works closely with children, youth, women and vulnerable families in rural and semi-urban regions. Our initiatives are designed to address both immediate needs and long-term development challenges.
          </p>

          <div className="grid md:grid-cols-3 gap-8 my-12">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Education</h3>
              <p className="text-sm text-gray-600 text-center">
                After-school support, digital literacy, scholarships, and mentorship to bridge learning gaps and unlock potential.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Healthcare</h3>
              <p className="text-sm text-gray-600 text-center">
                Health camps, awareness programs, and preventive care in partnership with medical professionals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Empowerment</h3>
              <p className="text-sm text-gray-600 text-center">
                Promoting self-reliance and inclusive growth through community participation and local partnerships.
              </p>
            </div>
          </div>

          <p>
            Community development and empowerment form the core of our work. By partnering with local leaders, volunteers and supporters, we promote self-reliance, social awareness and inclusive growth. We believe that lasting change happens when communities actively participate in their own development.
          </p>

          <p className="text-lg font-medium text-gray-800 border-t-2 border-indigo-200 pt-6 mt-10">
            Guided by transparency, accountability and compassion, Shri Aryabhatta Charitable Trust is dedicated to creating a positive and measurable impact. Every contribution—whether time, resources or support—helps us move closer to a society where everyone has an equal opportunity to learn, grow and live with dignity.
          </p>
        </div>
      </section>
    </>
  );
}