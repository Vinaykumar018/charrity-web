// // src/pages/AdminLogin.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../Api";

// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const [form, setForm] = React.useState({ email: "", password: "" });
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const data = await api.login(form.email, form.password);
//       localStorage.setItem("adminToken", data.token);
//       localStorage.setItem("adminInfo", JSON.stringify(data.admin || {}));
//       navigate("/admin", { replace: true });
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-2 text-center">
//           Admin Login
//         </h1>
//         <p className="text-xs text-slate-500 mb-6 text-center">
//           Shri Aryabhatta Charitable Trust – Admin Panel
//         </p>

//         {error && (
//           <div className="mb-4 text-xs bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4 text-sm">
//           <div>
//             <label className="block text-xs font-medium mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full border rounded px-3 py-2 text-sm"
//               value={form.email}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, email: e.target.value }))
//               }
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full border rounded px-3 py-2 text-sm"
//               value={form.password}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, password: e.target.value }))
//               }
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-purple-800 text-white py-2 rounded text-sm font-semibold disabled:opacity-60"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="mt-4 text-[11px] text-slate-500 text-center">
//           Note: First admin user ko backend ke <code>/api/auth/seed-admin</code>{" "}
//           endpoint se create karna hoga.
//         </p>
//       </div>
//     </div>
//   );
// }




// NEW PAGE WITH IMPROVED STYLING
// src/pages/AdminLogin.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../Api"; // adjust if your api.js is elsewhere

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(form.email, form.password);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin || {}));
      navigate("/admin/blogs", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left promotional panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#2b3ed6] to-[#1a2bb8] items-center justify-center text-white p-16">
        <div className="max-w-lg">
          {/* optional small logo / mark */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">✶</div>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">Hello<br/>Shri Aryabhatta! 👋</h1>

          <p className="text-slate-100/90 text-lg">
            Manage your NGO content, donors and updates quickly. Use the admin
            panel to add blogs, posts, events and update legal pages.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-1">Admin Login</h2>
          <p className="text-xs text-slate-500 text-center mb-6">Shri Aryabhatta Charitable Trust — Admin Panel</p>

          {error && (
            <div className="mb-4 text-sm bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-2 rounded-md font-semibold hover:brightness-95 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login Now"}
            </button>
          </form>

          <div className="my-4 flex items-center">
            <div className="flex-1 h-px bg-slate-200" />
            <div className="px-3 text-xs text-slate-400">or</div>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            onClick={() => alert("Google OAuth not wired in this demo.")}
            className="w-full border border-slate-200 rounded-md py-2 inline-flex items-center justify-center gap-3 text-sm hover:bg-slate-50"
          >
            <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" className="inline-block">
              <path fill="#4285f4" d="M533.5 278.4c0-17.5-1.5-35-4.7-51.8H272v98.1h146.9c-6.4 34.7-25.5 64-54.2 83.6v69.3h87.6c51.3-47.2 80.2-116.6 80.2-199.2z"/>
              <path fill="#34a853" d="M272 544.3c73.6 0 135.4-24.3 180.6-66.1l-87.6-69.3c-24.3 16.3-55.6 25.9-93 25.9-71.4 0-132-48.1-153.7-112.7H30.1v70.8C75.9 486 168.3 544.3 272 544.3z"/>
              <path fill="#fbbc04" d="M118.3 324.9c-11.6-34.7-11.6-71.8 0-106.5V148.9H30.1c-38.5 74.5-38.5 162.8 0 237.3l88.2-61.3z"/>
              <path fill="#ea4335" d="M272 107.7c39.9 0 75.8 13.7 104.1 40.7l78.1-78.1C403.9 25.3 342.1 0 272 0 168.3 0 75.9 58.3 30.1 148.9l88.2 69.3C140 155.8 200.6 107.7 272 107.7z"/>
            </svg>
            Login with Google
          </button>

          <div className="mt-4 text-center text-xs text-slate-500">
            <a href="/forgot" className="underline">Forgot password? Click here</a>
          </div>

          {/* <p className="mt-6 text-[11px] text-slate-400 text-center">
            Note: Create the first admin user using the backend <code className="bg-slate-100 px-1.5 py-0.5 rounded">/api/auth/seed-admin</code> endpoint.
          </p> */}
        </div>
      </div>

      {/* Mobile: show a smaller version of left panel above or below if desired */}
      <style>{/* optional small CSS overrides if you want rounded shadow similar to example */}</style>
    </div>
  );
}

