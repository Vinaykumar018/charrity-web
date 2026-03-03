// // src/admin/AdminTopbar.jsx
// import React from "react";

// export default function AdminTopbar() {
//   return (
//     <header className="bg-gradient-to-r from-purple-700 to-purple-600 text-white flex items-center justify-between px-6 h-16 shadow-sm">
//       <div className="flex items-center gap-4">
//         <button className="md:hidden p-2 rounded bg-white/10">☰</button>
//         <div className="text-sm font-semibold">Admin Panel</div>
//         {/* <div className="hidden md:block text-slate-200 text-xs ml-6">
//           Manage site content & pages
//         </div> */}
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="hidden sm:flex items-center bg-white/10 rounded px-3 py-1 text-xs">
//           🔍 <input placeholder="Search..." className="ml-2 bg-transparent outline-none text-xs" />
//         </div>

//         <button className="p-2 rounded hover:bg-white/10">
//           🌐
//         </button>
//         <button className="p-2 rounded hover:bg-white/10">🔔</button>

//         <div className="flex items-center gap-2">
//           <div className="text-sm text-white/90">Admin</div>
//           <img
//             src={`https://ui-avatars.com/api/?name=Admin&background=6B21A8&color=fff`}
//             alt="avatar"
//             className="w-8 h-8 rounded-full"
//           />
//         </div>
//       </div>
//     </header>
//   );
// }



// src/admin/AdminTopbar.jsx
import React from "react";
import { Bell, Search, Globe } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 text-white shadow-lg h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        {/* Mobile menu button (visible on small screens) */}
        <button className="lg:hidden p-2 rounded-lg hover:bg-indigo-700/50 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="hidden md:block text-indigo-200 text-xs mt-0.5">
            Manage content, events, and settings
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-sm w-64">
          <Search className="w-4 h-4 text-indigo-200" />
          <input
            type="text"
            placeholder="Search blogs, events..."
            className="ml-3 bg-transparent outline-none text-white placeholder-indigo-300 w-full"
          />
        </div>

        {/* Icons */}
        <button className="p-2 rounded-lg hover:bg-white/10 transition" aria-label="Language">
          <Globe className="w-5 h-5" />
        </button>

        <button className="relative p-2 rounded-lg hover:bg-white/10 transition" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-indigo-200">admin@trust.org</p>
          </div>
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=fbbf24&color=4c1d95&bold=true"
            alt="Admin avatar"
            className="w-10 h-10 rounded-full ring-2 ring-yellow-400"
          />
        </div>
      </div>
    </header>
  );
}