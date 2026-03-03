// src/components/Pages/Website/PrivacyPolicy.jsx
import React from "react";
import PageHero from "../../layout/PageHero";
export default function PrivacyPolicy() {
  return (
    <>
        <PageHero title="Privacy Policy" />

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl prose prose-lg max-w-none">
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy – Shri Aryabhatta Charitable Trust
          </h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: December 30, 2025</p>

          <p className="mb-6">
            Shri Aryabhatta Charitable Trust (“we”, “our”, “us”) is committed to protecting the privacy of our donors, volunteers, beneficiaries and visitors (“you”). This Privacy Policy explains how we collect, use, store and protect your information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information we collect</h2>
          <ul className="list-disc pl-8 space-y-2 mb-6">
            <li>Basic details such as name, email address, phone number.</li>
            <li>Donation related information (amount, mode of payment, date).</li>
            <li>Messages and enquiries you send through our forms.</li>
            <li>Technical data like IP address and browser type (for analytics).</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. How we use your information</h2>
          <ul className="list-disc pl-8 space-y-2 mb-6">
            <li>To process donations and issue receipts.</li>
            <li>To respond to your queries and requests.</li>
            <li>To share updates about our work, campaigns and events.</li>
            <li>To improve our website and donor experience.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Sharing of information</h2>
          <p className="mb-6">
            We do <strong>not</strong> sell or rent your personal data. Limited information may be shared with payment service providers and legal authorities where required by law.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Data security</h2>
          <p className="mb-6">
            We take reasonable measures to protect your information. However, no method of transmission over the Internet is completely secure.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Your rights</h2>
          <ul className="list-disc pl-8 space-y-2 mb-6">
            <li>Request access to the personal data we hold about you.</li>
            <li>Ask us to correct or update your information.</li>
            <li>Opt-out of receiving communication from us.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact us</h2>
          <p className="mb-6">
            For any questions regarding this Privacy Policy, contact us at{' '}
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