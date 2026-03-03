

// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import { ChevronUp, MessageCircle } from "lucide-react";


import AdminLogin from "./components/Pages/Admin/AdminLogin";
import AdminDashboard from "./components/Pages/Admin/AdminDashboard";
// import AdminPanel from "./components/Pages/Admin/AdminPanel";
import RequireAdmin from "./components/RequireAdmin";
import EditProduct from "./components/Pages/Admin/EditProduct";
import EmptyPage from "./components/Pages/Admin/EmptyPage";
import AdminBlogs from "./components/Pages/Admin/AdminBlogs";
import AdminGallery from "./components/Pages/Admin/AdminGallery";
import AdminPosts from "./components/Pages/Admin/AdminPosts";
import AdminPages from "./components/Pages/Admin/AdminPages";
import AdminSettings from "./components/Pages/Admin/AdminSettings";
import {api} from "./Api";
import logo from "./assets/images/Logo-trans.png";
import logoLight from "./assets/images/Logo-white.png";
// import SocialIcons from "./components/SocialIcons";
// import ScrollToTopButton from "./components/ScrollToTopButton";
// import WhatsAppButton from "./components/WhatsAppButton";
import AdminEvents from "./components/Pages/Admin/AdminEvents";
import Home from "./components/Pages/Website/Home";
import SingleBlogPage from "./components/Pages/Website/SingleBlogPage";
const NGO_NAME = "Shri Aryabhatta Charitable Trust";
const useBlogs = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.getBlogs()
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
};

const useEvents = () => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  return { events, loading };
};



const galleryImages = [
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb",
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998",
];
// ---------- LAYOUT COMPONENTS ----------

// function Navbar() {
//   const linkClass = ({ isActive }) =>
//     `px-3 py-2 rounded-md text-sm font-medium transition ${isActive
//       ? "bg-white/15 text-white"
//       : "text-white/90 hover:bg-white/10 hover:text-white"
//     }`;

//   return (
//     <header className="bg-purple-800 text-white sticky top-0 z-40 shadow">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/" className="flex flex-col leading-tight">
//           <span className="text-lg font-bold">SHRI ARYABHATTA</span>
//           <span className="text-xs font-medium">Charitable Trust</span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-2">
//           <NavLink to="/" end className={linkClass}>
//             Home
//           </NavLink>
//           <NavLink to="/about" className={linkClass}>
//             About Us
//           </NavLink>
//           <NavLink to="/blogs" className={linkClass}>
//             Our Blogs
//           </NavLink>
//           <NavLink to="/events" className={linkClass}>
//             Events
//           </NavLink>
//           <NavLink to="/gallery" className={linkClass}>
//             Gallery
//           </NavLink>
//           <NavLink to="/posts" className={linkClass}>
//             Posts
//           </NavLink>
//           <NavLink to="/contact" className={linkClass}>
//             Contact Us
//           </NavLink>
//         </nav>
//         <MobileMenu />
//       </div>
//     </header>
//   );
// }


// import api from "../../Api";

// function Navbar() {
//   const [settings, setSettings] = React.useState(null);

//   React.useEffect(() => {
//     api.getSettings().then(setSettings);
//   }, []);

//   const NGO_NAME = settings?.siteName || "Shri Aryabhatta Charitable Trust";

//   const linkClass = ({ isActive }) =>
//     `px-3 py-2 rounded-md text-sm font-medium transition ${
//       isActive
//         ? "bg-white/15 text-white"
//         : "text-white/90 hover:bg-white/10 hover:text-white"
//     }`;

//   return (
//     <header className="bg-purple-800 text-white sticky top-0 z-40 shadow">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

//         {/* LOGO DYNAMIC */}
//         <Link to="/" className="flex flex-col leading-tight">
//           <span className="text-lg font-bold">
//             {NGO_NAME.split(" ")[0]?.toUpperCase()}
//           </span>
//           <span className="text-xs font-medium">
//             {NGO_NAME.split(" ").slice(1).join(" ")}
//           </span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-2">
//           <NavLink to="/" end className={linkClass}>Home</NavLink>
//           <NavLink to="/about" className={linkClass}>About Us</NavLink>
//           <NavLink to="/blogs" className={linkClass}>Our Blogs</NavLink>
//           <NavLink to="/events" className={linkClass}>Events</NavLink>
//           <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
//           <NavLink to="/posts" className={linkClass}>Posts</NavLink>
//           <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
//         </nav>

//         <MobileMenu />
//       </div>
//     </header>
//   );
// }

// function Navbar() {
//   const [scrolled, setScrolled] = React.useState(false);

//   React.useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const linkClass = ({ isActive }) =>
//     `relative px-3 py-2 text-sm font-semibold transition-colors duration-300
//      ${
//        isActive
//          ? "text-[#0b1c5d]"
//          : "text-slate-600 hover:text-[#3dbb3d]"
//      }
//      after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:rounded-full
//      after:bg-[#3dbb3d] after:transition-all after:duration-300
//      ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
//     `;

//   return (
//     <header
//       className={`sticky top-0 z-50 bg-white transition-all duration-300
//         ${scrolled ? "shadow-md h-14" : "shadow-sm h-20"}
//       `}
//     >
//       <div
//         className={`max-w-7xl mx-auto px-6 flex items-center justify-between
//           ${scrolled ? "h-14" : "h-20"}
//           transition-all duration-300
//         `}
//       >
//         {/* LOGO */}
//         <Link to="/" className="flex items-center">
//           <img
//             src={logo}
//             alt="Shri Aryabhatta Charitable Trust"
//             className={`w-auto transition-all duration-300
//               ${scrolled ? "h-10" : "h-18 md:h-20"}
//             `}
//           />
//         </Link>

//         {/* MENU */}
//         <nav className="hidden md:flex items-center gap-6">
//           <NavLink to="/" end className={linkClass}>Home</NavLink>
//           <NavLink to="/about" className={linkClass}>About Us</NavLink>
//           <NavLink to="/blogs" className={linkClass}>Blogs</NavLink>
//           <NavLink to="/events" className={linkClass}>Events</NavLink>
//           <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
//           <NavLink to="/posts" className={linkClass}>Updates</NavLink>
//           <NavLink to="/contact" className={linkClass}>Contact</NavLink>
//         </nav>

//         {/* DONATE */}
//         <div className="hidden md:block">
//           <Link
//             to="/donate"
//             className="bg-[#e53935] text-white px-6 py-2 rounded-md text-sm font-semibold
//                        hover:bg-red-600 transition shadow"
//           >
//             Donate
//           </Link>
//         </div>

//         <MobileMenu />
//       </div>
//     </header>
//   );
// }



// function MobileMenu() {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <div className="md:hidden">
//       <button
//         onClick={() => setOpen(!open)}
//         className="text-[#0b1c5d] text-3xl font-bold"
//       >
//         ☰
//       </button>

//       {open && (
//         <div className="absolute left-0 right-0 top-full bg-white shadow-lg border-t">
//           <nav className="flex flex-col px-6 py-4 gap-4">
//             {[
//               ["Home", "/"],
//               ["About Us", "/about"],
//               ["Blogs", "/blogs"],
//               ["Events", "/events"],
//               ["Gallery", "/gallery"],
//               ["Updates", "/posts"],
//               ["Contact", "/contact"],
//             ].map(([label, path]) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 className="text-slate-700 font-semibold hover:text-[#3dbb3d]"
//                 onClick={() => setOpen(false)}
//               >
//                 {label}
//               </NavLink>
//             ))}

//             <Link
//               to="/donate"
//               className="mt-3 bg-[#e53935] text-white text-center py-2 rounded-md font-semibold"
//             >
//               Donate
//             </Link>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }


// function Footer() {
//   return (
//     <footer className="bg-[#0b1c5d] text-white mt-20">
//       <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">

//         {/* ABOUT + LOGO */}
//         <div>
//           <img
//             src={logo}
//             alt="Shri Aryabhatta Charitable Trust"
//             className="h-24 bg-white p-2 rounded-md mb-4"
//           />

//           <p className="text-sm text-white/80 max-w-xs">
//             Shri Aryabhatta Charitable Trust works to uplift communities through
//             education, healthcare, women empowerment and sustainable development.
//           </p>

//           <div className="mt-4 text-sm text-white/80 space-y-1">
//             <p>📍  WARD NO. 24, DUMARWANA, BAIRGANIA, SITAMARHI, BIHAR - 843313</p>
//             <p>✉ shriaryabhattacharitabletrust@gmail.com</p>
//           </div>

//           {/* SOCIAL ICONS */}
//           <SocialIcons />
//         </div>

//         {/* QUICK LINKS */}
//         <div>
//           <h4 className="font-semibold mb-4">Quick Links</h4>
//           <ul className="space-y-2 text-sm text-white/80">
//             <li><Link to="/" className="hover:text-[#3dbb3d]">Home</Link></li>
//             <li><Link to="/about" className="hover:text-[#3dbb3d]">About Us</Link></li>
//             <li><Link to="/blogs" className="hover:text-[#3dbb3d]">Blogs</Link></li>
//             <li><Link to="/events" className="hover:text-[#3dbb3d]">Events</Link></li>
//             <li><Link to="/contact" className="hover:text-[#3dbb3d]">Contact</Link></li>
//           </ul>
//         </div>

//         {/* LEGAL */}
//         <div>
//           <h4 className="font-semibold mb-4">Legal</h4>
//           <ul className="space-y-2 text-sm text-white/80">
//             <li>
//               <Link to="/privacy" className="hover:text-[#3dbb3d]">
//                 Privacy Policy
//               </Link>
//             </li>
//             <li>
//               <Link to="/terms" className="hover:text-[#3dbb3d]">
//                 Terms & Conditions
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* NEWSLETTER */}
//         <div>
//           <h4 className="font-semibold mb-4">Newsletter</h4>
//           <p className="text-sm text-white/80 mb-3">
//             Subscribe to receive updates about our initiatives and events.
//           </p>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full p-2 bg-[#fafafa] rounded text-sm text-slate-800 mb-3"
//           />
//           <button className="w-full bg-[#e53935] hover:bg-red-600 py-2 rounded-md text-sm font-semibold transition">
//             Subscribe
//           </button>
//         </div>
//       </div>

//       {/* COPYRIGHT */}
//       <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
//         © {new Date().getFullYear()} Shri Aryabhatta Charitable Trust. All rights reserved.
//       </div>
//       <ScrollToTopButton />
//       <WhatsAppButton />
//     </footer>
    
//   );
// }

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useBlogs } from './hooks/useBlogs'; // assuming your hook



// ---------- OTHER PAGES ----------

// import React from "react";
// import { NavLink, Link } from "react-router-dom";

function Navbar() {
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
          {/* <NavLink to="/posts" className={linkClass}>Updates</NavLink> */}
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

function MobileMenu({ scrolled }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lg:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-indigo-700 text-3xl font-bold focus:outline-none"
        aria-label="Toggle menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 origin-top-right ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col py-4">
          {[
            ["Home", "/"],
            ["About Us", "/about"],
            ["Blogs", "/blogs"],
            ["Events", "/events"],
            ["Gallery", "/gallery"],
            // ["Updates", "/posts"],
            ["Contact", "/contact"],
          ].map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className="px-6 py-3 text-gray-800 font-medium hover:bg-indigo-50 hover:text-indigo-700 transition"
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <div className="border-t border-gray-100 mt-2 pt-4 px-6">
            <Link
              to="/donate"
              className="block w-full text-center bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-full font-bold shadow hover:shadow-lg transition"
              onClick={() => setOpen(false)}
            >
              Donate Now
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

// Scroll to Top Button
function ScrollToTopButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 z-40 p-3 bg-indigo-700 text-white rounded-full shadow-2xl hover:bg-indigo-800 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}

// WhatsApp Floating Button
function WhatsAppButton() {
  const phone = "+91999999999"; // Replace with actual number
  const message = "Hello! I'd like to know more about Shri Aryabhatta Charitable Trust.";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}

// Social Icons Component
function SocialIcons() {
  return (
    <div className="flex gap-4 mt-6">
      {["facebook", "twitter", "instagram", "youtube", "linkedin"].map((platform) => (
        <a
          key={platform}
          href="#"
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-indigo-600 transition"
          aria-label={platform}
        >
          <span className="text-lg">{platform[0].toUpperCase()}</span>
        </a>
      ))}
    </div>
  );
}

function Footer() {
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
              // ["Updates", "/posts"],
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

 function About() {
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



// function BlogsPage() {
//   const { blogs, loading } = useBlogs();

//   return (
//     <section className="max-w-7xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold mb-8">Our Blogs</h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading blogs...</p>
//       ) : blogs.length === 0 ? (
//         <p className="text-center text-gray-400">No blogs found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((b) => (
//             <article
//               key={b._id}
//               className="bg-white shadow-md rounded-lg overflow-hidden"
//             >
//               <div className="relative">
//                 <img
//                   src={b.image}
//                   alt={b.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute -bottom-6 right-4 bg-secondary text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg">
//                   <div className="text-lg font-bold">{b.day}</div>
//                   <div className="text-xs">{b.month}</div>
//                 </div>
//               </div>

//               <div className="p-6 pt-10">
//                 <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
//                 <p className="text-sm text-slate-600 mb-4">
//                   {b.excerpt}
//                 </p>
//                 <Link
//                   to={`/blog/${b._id}`}
//                   className="text-secondary text-sm font-semibold"
//                 >
//                   Read More →
//                 </Link>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


// function EventsPage() {
//   const { events, loading } = useEvents();

//   return (
//     <section className="max-w-7xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold mb-8">Events</h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading events...</p>
//       ) : events.length === 0 ? (
//         <p className="text-center text-gray-400">No events found</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-8">
//           {events.map((e) => (
//             <div
//               key={e._id}
//               className="bg-white rounded-lg shadow overflow-hidden"
//             >
//               <div className="relative">
//                 <img
//                   src={e.image}
//                   className="w-full h-48 object-cover"
//                   alt={e.title}
//                 />
//                 <div className="absolute -bottom-6 right-4 bg-secondary text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg">
//                   <span className="text-lg font-bold">
//                     {new Date(e.date).getDate()}
//                   </span>
//                   <span className="text-xs">
//                     {new Date(e.date).toLocaleString("en-US", { month: "short" })}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-6 pt-10 text-sm">
//                 <div className="flex items-center gap-4 text-slate-500 mb-3">
//                   <span>🕒 {e.time}</span>
//                   <span>📍 {e.location}</span>
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2">{e.title}</h3>
//                 <p className="text-slate-600 mb-3">
//                   {e.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


// function GalleryPage() {
//   return (
//     <section className="max-w-7xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold mb-8">Gallery</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {galleryImages.map((src, i) => (
//           <div
//             key={i}
//             className="aspect-[4/3] bg-gray-100 rounded overflow-hidden"
//           >
//             <img
//               src={src}
//               alt={`gallery-${i}`}
//               className="w-full h-full object-cover hover:scale-105 transition"
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// function PostsPage() {
//   return (
//     <section className="max-w-5xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold mb-6">Posts & Updates</h2>
//       <div className="space-y-4">
//         {postsData.map((p) => (
//           <article
//             key={p.id}
//             className="bg-white border rounded-md p-4 shadow-sm"
//           >
//             <h3 className="font-semibold mb-1">{p.title}</h3>
//             <p className="text-sm text-slate-600">{p.body}</p>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// function ContactPage() {
//   const [state, setState] = React.useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log("Contact form:", state);
//     alert("Form submitted (sact only). Check console for data.");
//     setState({ name: "", email: "", subject: "", message: "" });
//   }

//   return (
//     <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
//       <div>
//         <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
//         <p className="text-sm text-slate-600 mb-4">
//           Have questions, want to volunteer or support a program? Reach out to
//           us.
//         </p>
//         <p className="text-sm">
//           {/* <span className="font-semibold">Phone:</span> +91-12345 67890 */}
//           <br />
//           <span className="font-semibold">Email:</span>{" "}
//           shriaryabhattacharitabletrust@gmail.com
//           <br />
//           <span className="font-semibold">Address:</span>  WARD NO. 24, DUMARWANA, BAIRGANIA, SITAMARHI, BIHAR - 843313
//         </p>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <input
//             className="w-full border rounded p-2 text-sm"
//             value={state.name}
//             onChange={(e) => setState({ ...state, name: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             className="w-full border rounded p-2 text-sm"
//             value={state.email}
//             onChange={(e) => setState({ ...state, email: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Subject</label>
//           <input
//             className="w-full border rounded p-2 text-sm"
//             value={state.subject}
//             onChange={(e) => setState({ ...state, subject: e.target.value })}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Message</label>
//           <textarea
//             className="w-full border rounded p-2 text-sm"
//             rows={4}
//             value={state.message}
//             onChange={(e) => setState({ ...state, message: e.target.value })}
//             required
//           />
//         </div>
//         <button className="bg-purple-800 text-white px-5 py-2 rounded text-sm font-semibold">
//           Send Message
//         </button>
//       </form>
//     </section>
//   );
// }

// // ---------- LEGAL PAGES ----------

// function PrivacyPolicy() {
//   return (
//     <section className="max-w-5xl mx-auto px-6 py-12 text-sm text-slate-700 leading-relaxed">
//       <h1 className="text-3xl font-bold mb-4">
//         Privacy Policy – {NGO_NAME}
//       </h1>
//       <p className="text-xs text-slate-500 mb-6">Last updated: 01 Jan 2025</p>
//       <p className="mb-4">
//         {NGO_NAME} (“we”, “our”, “us”) is committed to protecting the privacy of
//         our donors, volunteers, beneficiaries and visitors (“you”). This Privacy
//         Policy explains how we collect, use, store and protect your information.
//       </p>
//       <h2 className="font-semibold mb-2 text-base">1. Information we collect</h2>
//       <ul className="list-disc ml-6 mb-4 space-y-1">
//         <li>Basic details such as name, email address, phone number.</li>
//         <li>Donation related information (amount, mode of payment, date).</li>
//         <li>Messages and enquiries you send through our forms.</li>
//         <li>Technical data like IP address and browser type (for analytics).</li>
//       </ul>
//       <h2 className="font-semibold mb-2 text-base">2. How we use your information</h2>
//       <ul className="list-disc ml-6 mb-4 space-y-1">
//         <li>To process donations and issue receipts.</li>
//         <li>To respond to your queries and requests.</li>
//         <li>To share updates about our work, campaigns and events.</li>
//         <li>To improve our website and donor experience.</li>
//       </ul>
//       <h2 className="font-semibold mb-2 text-base">3. Sharing of information</h2>
//       <p className="mb-4">
//         We do <span className="font-semibold">not</span> sell or rent your
//         personal data. Limited information may be shared with payment service
//         providers and legal authorities where required by law.
//       </p>
//       <h2 className="font-semibold mb-2 text-base">4. Data security</h2>
//       <p className="mb-4">
//         We take reasonable measures to protect your information. However, no
//         method of transmission over the Internet is completely secure.
//       </p>
//       <h2 className="font-semibold mb-2 text-base">5. Your rights</h2>
//       <ul className="list-disc ml-6 mb-4 space-y-1">
//         <li>Request access to the personal data we hold about you.</li>
//         <li>Ask us to correct or update your information.</li>
//         <li>Opt-out of receiving communication from us.</li>
//       </ul>
//       <h2 className="font-semibold mb-2 text-base">6. Contact us</h2>
//       <p>
//         For any questions regarding this Privacy Policy, contact us at
//         shriaryabhattacharitabletrust@gmail.com.
//       </p>
//       <p className="text-xs text-slate-500 mt-4">
//         *This template is for general information and should not be treated as
//         legal advice.*
//       </p>
//     </section>
//   );
// }

// function TermsConditions() {
//   return (
//     <section className="max-w-5xl mx-auto px-6 py-12 text-sm text-slate-700 leading-relaxed">
//       <h1 className="text-3xl font-bold mb-4">
//         Terms &amp; Conditions – {NGO_NAME}
//       </h1>
//       <p className="text-xs text-slate-500 mb-6">Last updated: 01 Jan 2025</p>
//       <p className="mb-4">
//         By using this website, you agree to be bound by these Terms &
//         Conditions. If you do not agree with any part of these terms, please do
//         not use this site.
//       </p>
//       <h2 className="font-semibold mb-2 text-base">1. Use of the website</h2>
//       <ul className="list-disc ml-6 mb-4 space-y-1">
//         <li>Use this website only for lawful purposes.</li>
//         <li>Do not attempt to disrupt or interfere with its security.</li>
//       </ul>
//       <h2 className="font-semibold mb-2 text-base">2. Donations & payments</h2>
//       <ul className="list-disc ml-6 mb-4 space-y-1">
//         <li>Donations made through this website are voluntary and non-refundable.</li>
//         <li>
//           Payments are processed securely by third-party gateways; we do not
//           store card or net-banking details.
//         </li>
//       </ul>
//       <h2 className="font-semibold mb-2 text-base">
//         3. Content & intellectual property
//       </h2>
//       <p className="mb-4">
//         All text, images and logos on this website are owned by or licensed to{" "}
//         {NGO_NAME}. They may not be copied or reused without permission.
//       </p>
//       <h2 className="font-semibold mb-2 text-base">4. Limitation of liability</h2>
//       <p className="mb-4">
//         While we try to keep information accurate and updated, we make no
//         warranties and will not be liable for any loss arising from use of this
//         website.
//       </p>
//       <h2 className="font-semibold mb-2 text-base">5. Changes to these terms</h2>
//       <p className="mb-4">
//         We may modify these Terms & Conditions at any time. Changes will be
//         effective when posted on this page.
//       </p>
//       <h2 className="font-semibold mb-2 text-base">6. Contact us</h2>
//       <p>
//         For queries about these terms, write to shriaryabhattacharitabletrust@gmail.com.
//       </p>
//       <p className="text-xs text-slate-500 mt-4">
//         *This template is for general information and should not be treated as
//         legal advice.*
//       </p>
//     </section>
//   );
// }

// ---------- ROOT APP ----------

// export default function App() {

//    const location = useLocation();

//   // Check if current page is admin-related
//   const isAdminRoute = location.pathname.startsWith("/admin");


//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col bg-white">
//         <Navbar />
//         <div className="flex-1">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/blogs" element={<BlogsPage />} />
//             <Route path="/events" element={<EventsPage />} />
//             <Route path="/gallery" element={<GalleryPage />} />
//             <Route path="/posts" element={<PostsPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/privacy" element={<PrivacyPolicy />} />
//             <Route path="/terms" element={<TermsConditions />} />
//             <Route path="*" element={<Home />} />
//               <Route path="/admin/login" element={<AdminLogin />} />
//   <Route
//     path="/admin"
//     element={
//       <RequireAdmin>
//         <AdminPanel />
//       </RequireAdmin>
//     }
//   />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }


// We wrap routes in an inner component so we can call useLocation hook



// Reusable Hero Header Component (consistent across pages)
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

// ==================== BLOGS PAGE ====================
 function BlogsPage() {
  const { blogs, loading } = useBlogs();

  return (
    <>
      <PageHero title="Our Blogs" subtitle="Stories, insights and updates from our work on the ground" />

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

// ==================== EVENTS PAGE ====================
 function EventsPage() {
  const { events, loading } = useEvents();

  return (
    <>
      <PageHero title="Events" subtitle="Join us in making a difference – upcoming activities and programs" />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No upcoming events at this time.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {events.map((e) => (
              <div
                key={e._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-64">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-6 right-6 bg-indigo-700 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-xl">
                    <span className="text-2xl font-bold">
                      {new Date(e.date).getDate()}
                    </span>
                    <span className="text-xs uppercase tracking-wider">
                      {new Date(e.date).toLocaleString("en-US", { month: "short" })}
                    </span>
                  </div>
                </div>

                <div className="p-8 pt-12">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-2">🕒 {e.time}</span>
                    <span className="flex items-center gap-2">📍 {e.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {e.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {e.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

// ==================== GALLERY PAGE ====================
 function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" subtitle="Moments that capture our impact and the lives we touch" />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="mb-6 break-inside-avoid overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ==================== POSTS & UPDATES PAGE ====================
 function PostsPage() {
  return (
    <>
      <PageHero title="Posts & Updates" subtitle="Latest news and quick updates from our initiatives" />

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

// ==================== CONTACT PAGE ====================
 function ContactPage() {
  const [state, setState] = React.useState({
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
      <PageHero title="Contact Us" subtitle="We’d love to hear from you – get in touch today" />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Reach Out to Us
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Have questions, want to volunteer, partner with us, or support a specific program? We’re here to help.
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

// ==================== PRIVACY POLICY ====================
 function PrivacyPolicy() {
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

// ==================== TERMS & CONDITIONS ====================
 function TermsConditions() {
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




function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show navbar only on non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <div className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<SingleBlogPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />

          {/* Admin routes (no navbar/footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPanel />

              </RequireAdmin>
            }
          /> */}
          <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
          <Route path="/admin/edit-product" element={<RequireAdmin><EditProduct /></RequireAdmin>} />
          <Route path="/admin/empty" element={<RequireAdmin><EmptyPage /></RequireAdmin>} />
          <Route path="/admin/blogs" element={<RequireAdmin><AdminBlogs /></RequireAdmin>} />
          <Route path="/admin/posts" element={<RequireAdmin><AdminPosts /></RequireAdmin>} />
          <Route path="/admin/gallery" element={<RequireAdmin><AdminGallery /></RequireAdmin>} />
          <Route path="/admin/events" element={<RequireAdmin><AdminEvents /></RequireAdmin>} />
          {/* <Route path="/admin/donations" element={<RequireAdmin><AdminDonations /></RequireAdmin>} /> */}
          <Route path="/admin/pages" element={<RequireAdmin><AdminPages /></RequireAdmin>} />
          <Route path="/admin/settings" element={<RequireAdmin><AdminSettings /></RequireAdmin>} />

          {/* fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* Show footer only on non-admin routes */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <AppRoutes />
      </div>
    </Router>
  );
}
