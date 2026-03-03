// src/components/layout/Navbar.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/Logo-trans.png";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative px-4 py-2 text-sm font-semibold transition-all duration-300
     ${isActive ? "text-indigo-700" : "text-gray-700 hover:text-indigo-700"}
     after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full
     after:bg-gradient-to-r after:from-indigo-600 after:to-green-500 after:rounded-full
     after:transition-all after:duration-300 after:scale-x-0 after:origin-left
     ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
    `;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-500 shadow-sm
        ${scrolled ? "h-16 shadow-lg" : "h-20 shadow-md"}
      `}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Shri Aryabhatta Charitable Trust"
            className={`transition-all duration-500 ${
              scrolled ? "h-12" : "h-16 md:h-20"
            }`}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About Us</NavLink>
          <NavLink to="/blogs" className={linkClass}>Blogs</NavLink>
          <NavLink to="/events" className={linkClass}>Events</NavLink>
          <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* Donate Button */}
        <div className="hidden md:block">
          <Link
            to="/donate"
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition transform"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenu scrolled={scrolled} />
      </div>
    </header>
  );
}