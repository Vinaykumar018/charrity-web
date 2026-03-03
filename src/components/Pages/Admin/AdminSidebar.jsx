import React, { useState } from "react"; // Added useState
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Image,
  FileStack,
  Settings,
  LogOut,
  AlertCircle, // Added for the modal icon
} from "lucide-react";
import { toast } from "react-toastify";

const menu = [
  { title: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { title: "Blogs", to: "/admin/blogs", icon: FileText },
  { title: "Events", to: "/admin/events", icon: Calendar },
  { title: "Gallery", to: "/admin/gallery", icon: Image },
  { title: "Pages", to: "/admin/pages", icon: FileStack },
  { title: "Settings", to: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal state

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    toast.success("Logged out successfully!");
    navigate("/admin/login");
  };

  return (
    <>
      <aside
        className={`flex-shrink-0 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white shadow-2xl transition-all duration-300 ease-in-out ${
          open ? "w-64" : "w-20"
        } relative h-full`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`absolute top-9 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 transition-all duration-300 ${
            open ? "right-[-18px]" : "right-[-18px] rotate-180"
          }`}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? "◀" : "▶"}
        </button>

        <div className="flex h-full flex-col">
          {/* Header / Logo */}
          <div className="flex items-center justify-center border-b border-indigo-700/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-indigo-900 text-2xl font-bold shadow-lg">
                SA
              </div>
              {open && (
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold tracking-tight">ADMIN</h1>
                  <p className="text-xs text-indigo-200">Shri Aryabhatta Trust</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:hidden">
            <ul className="space-y-2">
              {menu.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/admin"}
                      className={({ isActive }) =>
                        `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-yellow-400 text-indigo-900 shadow-md"
                            : "text-indigo-100 hover:bg-indigo-700/50 hover:text-white"
                        }`
                      }
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-indigo-700/50 px-4 py-3">
            <div className="mb-4 flex items-center gap-3 rounded-lg bg-indigo-800/50 px-3 py-3">
              <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center text-indigo-900 font-bold text-sm">
                AD
              </div>
              {open && (
                <div className="flex flex-col overflow-hidden">
                  <p className="text-sm font-semibold truncate">Admin User</p>
                  <p className="text-xs text-indigo-200 truncate">admin@trust.org</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowLogoutModal(true)} // Open modal instead of logging out
              className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-indigo-200 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {open && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div 
            className="w-full max-w-sm scale-in-center rounded-2xl bg-white p-6 shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertCircle size={32} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Confirm Logout</h3>
              <p className="mb-6 text-gray-500">
                Are you sure you want to log out? You will need to login again to access the dashboard.
              </p>
              
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition shadow-lg shadow-red-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}