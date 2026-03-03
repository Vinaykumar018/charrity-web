// // src/admin/AdminLayout.jsx
// import React from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminTopbar from "./AdminTopbar";

// export default function AdminLayout({ children }) {
//     const [sidebarOpen, setSidebarOpen] = React.useState(true);
//   return (
//     <div className="min-h-screen flex bg-gray-50">
// <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       <div className="flex-1 flex flex-col">
//         <AdminTopbar />
//         <main className="p-6 flex-1 overflow-auto">
//           {/** page header spacing similar to screenshots */}
//           <div className="bg-gradient-to-r from-transparent to-transparent rounded-md">
//             {children}
//           </div>
//         </main>

//         <footer className="text-center text-xs text-slate-500 py-4 bg-white/50 border-t">
//           © {new Date().getFullYear()} Shri Aryabhatta · Built with ❤️
//         </footer>
//       </div>
//     </div>
//   );
// }


// src/admin/AdminLayout.jsx
import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

// src/admin/AdminLayout.jsx

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="h-screen overflow-hidden flex bg-gray-100">
  <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

  <div className="flex-1 flex flex-col overflow-hidden">
    <AdminTopbar />

    <main className="flex-1 overflow-auto">
      <div className={`p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all duration-300 ${
        sidebarOpen ? "ml-0" : "lg:ml-20"
      }`}>
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10">
          {children}
        </div>
      </div>
    </main>

    <footer className="bg-white border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} Shri Aryabhatta Charitable Trust · Built with ❤️ for impact
    </footer>
  </div>
</div>
  );
}