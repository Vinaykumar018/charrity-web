// src/components/Pages/Website/TermsConditions.jsx
import React from "react";

// Reusable Hero Header Component
const PageHero = ({ title }) => (
  <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-30"></div>
    <div className="relative max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
        {title}
      </h1>
    </div>
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32 text-white">
        <path fill="currentColor" d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
      </svg>
    </div>
  </section>
);

export default function TermsConditions() {
  return (
    <>
      <PageHero title="Terms & Conditions" />

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl prose prose-lg max-w-none">
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions – Shri Aryabhatta Charitable Trust
          </h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: December 30, 2025</p>

          <p className="mb-6">
            By using this website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use this site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Use of the website</h2>
          <ul className="list-disc pl-8 space-y-2 mb-6">
            <li>Use this website only for lawful purposes.</li>
            <li>Do not attempt to disrupt or interfere with its security.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Donations & payments</h2>
          <ul className="list-disc pl-8 space-y-2 mb-6">
            <li>Donations made through this website are voluntary and non-refundable.</li>
            <li>Payments are processed securely by third-party gateways; we do not store card or net-banking details.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Content & intellectual property</h2>
          <p className="mb-6">
            All text, images and logos on this website are owned by or licensed to Shri Aryabhatta Charitable Trust. They may not be copied or reused without permission.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of liability</h2>
          <p className="mb-6">
            While we try to keep information accurate and updated, we make no warranties and will not be liable for any loss arising from use of this website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Changes to these terms</h2>
          <p className="mb-6">
            We may modify these Terms & Conditions at any time. Changes will be effective when posted on this page.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact us</h2>
          <p className="mb-6">
            For queries about these terms, write to{' '}
            <a href="mailto:shriaryabhattacharitabletrust@gmail.com" className="text-indigo-700 underline">
              shriaryabhattacharitabletrust@gmail.com
            </a>.
          </p>

          <p className="text-sm text-gray-500 italic">
            *This document is for general information and should not be treated as legal advice.*
          </p>
        </div>
      </section>
    </>
  );
}