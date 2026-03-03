// // src/api.js
// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// const getToken = () => localStorage.getItem("adminToken");

// async function request(path, { method = "GET", body, auth = false } = {}) {
//   const headers = { "Content-Type": "application/json" };
//   if (auth) {
//     const token = getToken();
//     if (token) headers["Authorization"] = `Bearer ${token}`;
//   }

//   const res = await fetch(`${API_BASE_URL}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   let data = null;
//   try {
//     data = await res.json();
//   } catch (e) {
//     // ignore
//   }

//   if (!res.ok) {
//     const msg = data?.message || res.statusText || "Request failed";
//     throw new Error(msg);
//   }
//   return data;
// }

// export const api = {
//   // auth
//   login: (email, password) =>
//     request("/api/auth/login", {
//       method: "POST",
//       body: { email, password },
//     }),

//   // settings
//   getSettings: () => request("/api/settings"),
//   updateSettings: (payload) =>
//     request("/api/settings", { method: "PUT", body: payload, auth: true }),

//   // blogs
//   getBlogs: () => request("/api/blogs"),
//   createBlog: (payload) =>
//     request("/api/blogs", { method: "POST", body: payload, auth: true }),
//   updateBlog: (id, payload) =>
//     request(`/api/blogs/${id}`, { method: "PUT", body: payload, auth: true }),
//   deleteBlog: (id) =>
//     request(`/api/blogs/${id}`, { method: "DELETE", auth: true }),

//   // posts
//   getPosts: () => request("/api/posts"),
//   createPost: (payload) =>
//     request("/api/posts", { method: "POST", body: payload, auth: true }),
//   updatePost: (id, payload) =>
//     request(`/api/posts/${id}`, { method: "PUT", body: payload, auth: true }),
//   deletePost: (id) =>
//     request(`/api/posts/${id}`, { method: "DELETE", auth: true }),

//   // gallery
//   getGallery: () => request("/api/gallery"),
//   createGalleryItem: (payload) =>
//     request("/api/gallery", { method: "POST", body: payload, auth: true }),
//   updateGalleryItem: (id, payload) =>
//     request(`/api/gallery/${id}`, {
//       method: "PUT",
//       body: payload,
//       auth: true,
//     }),
//   deleteGalleryItem: (id) =>
//     request(`/api/gallery/${id}`, { method: "DELETE", auth: true }),

//   // pages (privacy / terms)
//   getPage: (slug) => request(`/api/pages/${slug}`),
//   upsertPage: (slug, payload) =>
//     request(`/api/pages/${slug}`, {
//       method: "PUT",
//       body: payload,
//       auth: true,
//     }),
// };


// NEW ONE ======================================================================


// src/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://sact.org.in";
//"http://localhost:5000"
const getToken = () => localStorage.getItem("adminToken");

async function request(path, { method = "GET", body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // ignore
  }

  if (!res.ok) {
    const msg = data?.message || res.statusText || "Request failed";
    throw new Error(msg);
  }
  return data;
}

export const api = {
  // auth
  login: (email, password) =>
    request("/api/auth/login", { method: "POST", body: { email, password } }),

  // upload (multipart FormData), auth optional - set auth:true if upload route is protected
  uploadFile: (formData) =>
    request("/api/uploads", { method: "POST", body: formData, auth: true, isForm: true }),

  // settings
  getSettings: () => request("/api/settings"),
  updateSettings: (payload) => request("/api/settings", { method: "PUT", body: payload, auth: true }),
 uploadLogo: (formData) =>
  request("/api/upload-logo", {
    method: "POST",
    body: formData,
    auth: true,
  }),

  // blogs (server-side pagination)
  getBlogs: (page = 1, limit = 10, search = "") =>
    request(`/api/blogs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`),
  getSingleBlog: (id) => request(`/api/blogs/${id}`),
  createBlog: (payload) => request("/api/blogs", { method: "POST", body: payload, auth: true }),
  updateBlog: (id, payload) => request(`/api/blogs/${id}`, { method: "PUT", body: payload, auth: true }),
  deleteBlog: (id) => request(`/api/blogs/${id}`, { method: "DELETE", auth: true }),

  // posts (server-side pagination)
  getPosts: (page = 1, limit = 10, search = "") =>
    request(`/api/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`),
  createPost: (payload) => request("/api/posts", { method: "POST", body: payload, auth: true }),
  updatePost: (id, payload) => request(`/api/posts/${id}`, { method: "PUT", body: payload, auth: true }),
  deletePost: (id) => request(`/api/posts/${id}`, { method: "DELETE", auth: true }),


   // EVENTS (server-side pagination)
  getEvents: (page = 1, limit = 10, search = "") =>
    request(`/api/events?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`),
  createEvent: (payload) => request("/api/events", { method: "POST", body: payload, auth: true }),
  updateEvent: (id, payload) => request(`/api/events/${id}`, { method: "PUT", body: payload, auth: true }),
  deleteEvent: (id) => request(`/api/events/${id}`, { method: "DELETE", auth: true }),
  // gallery
  getGallery: () => request("/api/gallery"),
  createGalleryItem: (payload) => request("/api/gallery", { method: "POST", body: payload, auth: true }),
  updateGalleryItem: (id, payload) => request(`/api/gallery/${id}`, { method: "PUT", body: payload, auth: true }),
  deleteGalleryItem: (id) => request(`/api/gallery/${id}`, { method: "DELETE", auth: true }),

  // pages
  getPage: (slug) => request(`/api/pages/${slug}`),
  upsertPage: (slug, payload) => request(`/api/pages/${slug}`, { method: "PUT", body: payload, auth: true }),

  // admin stats
  getAdminStats: () => request("/api/auth/stats", { auth: true }),
  getMonthlyStats: () => request("/api/auth/stats/monthly", { auth: true }),

};
