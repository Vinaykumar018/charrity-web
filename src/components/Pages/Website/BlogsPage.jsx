// src/components/Pages/Website/BlogsPage.jsx
import React from "react";
import { Link } from "react-router-dom";

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

export default function BlogsPage({ blogs, loading }) {
  return (
    <>
      <PageHero 
        title="Our Blogs" 
        subtitle="Stories, insights and updates from our work on the ground" 
      />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No blogs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((b) => (
              <article
                key={b._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-6 right-6 bg-indigo-700 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-xl">
                    <div className="text-2xl font-bold">{b.day}</div>
                    <div className="text-xs uppercase tracking-wider">{b.month}</div>
                  </div>
                </div>

                <div className="p-8 pt-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-gray-600 mb-5 line-clamp-3">
                    {b.excerpt}
                  </p>
                  <Link
                    to={`/blog/${b._id}`}
                    className="text-indigo-700 font-semibold text-sm hover:text-indigo-800 flex items-center gap-2"
                  >
                    Read More <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}