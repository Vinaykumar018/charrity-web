// src/components/layout/MobileMenu.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function MobileMenu({ scrolled }) {
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