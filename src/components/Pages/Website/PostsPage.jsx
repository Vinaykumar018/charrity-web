// src/components/Pages/Website/PostsPage.jsx
import React from "react";

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

export default function PostsPage({ postsData }) {
  return (
    <>
      <PageHero 
        title="Posts & Updates" 
        subtitle="Latest news and quick updates from our initiatives" 
      />

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
        <div className="space-y-8">
          {postsData.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {p.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}