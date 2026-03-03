// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo-trans.png";
import SocialIcons from "./SocialIcons";
import ScrollToTopButton from "./ScrollToTopButton";
import WhatsAppButton from "./WhatsAppButton";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-indigo-900 to-indigo-950 text-white mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        {/* About + Logo */}
        <div className="space-y-6">
          <img
            src={logo}
            alt="Shri Aryabhatta Charitable Trust"
            className="h-28 bg-white p-3 rounded-xl shadow-lg"
          />

          <p className="text-sm leading-relaxed text-indigo-100 max-w-sm">
            Shri Aryabhatta Charitable Trust is committed to creating sustainable change through education, healthcare, women empowerment, and community development in rural India.
          </p>

          <div className="space-y-2 text-sm text-indigo-200">
            <p className="flex items-start gap-2">
              <span className="text-lg">📍</span>
              <span>
                Ward No. 24, Dumarwana,<br />
                Bairgania, Sitamarhi,<br />
                Bihar - 843313
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-lg">✉️</span>
              shriaryabhattacharitabletrust@gmail.com
            </p>
          </div>

          <SocialIcons />
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-yellow-400">Quick Links</h4>
          <ul className="space-y-3">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Blogs", "/blogs"],
              ["Events", "/events"],
              ["Gallery", "/gallery"],
              ["Contact", "/contact"],
            ].map(([label, path]) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-indigo-200 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                >
                  → {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-yellow-400">Legal</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/privacy" className="text-indigo-200 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                → Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-indigo-200 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                → Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-yellow-400">Stay Updated</h4>
          <p className="text-sm text-indigo-200 mb-5">
            Subscribe to receive news about our programs, events, and impact stories.
          </p>

          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-5 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-indigo-900 font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-indigo-300">
        © {new Date().getFullYear()} Shri Aryabhatta Charitable Trust. All rights reserved. Made with ❤️ for social good.
      </div>

      <ScrollToTopButton />
      <WhatsAppButton />
    </footer>
  );
}