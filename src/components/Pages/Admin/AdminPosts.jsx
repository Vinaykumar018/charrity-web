// // src/admin/AdminPosts.jsx
// import React from "react";
// import AdminLayout from "./AdminLayout";
// import { api } from "../../../Api";

// export default function AdminPosts() {
//   const [posts, setPosts] = React.useState([]);
//   const [selected, setSelected] = React.useState(null);
//   const [form, setForm] = React.useState({ title: "", body: "" });
//   const [loading, setLoading] = React.useState(true);
//   const [saving, setSaving] = React.useState(false);
//   const [msg, setMsg] = React.useState("");
//   const [err, setErr] = React.useState("");

//   React.useEffect(() => {
//     (async () => {
//       try {
//         const data = await api.getPosts();
//         setPosts(data || []);
//         if (data?.length) {
//           setSelected(data[0]._id);
//           setForm(data[0]);
//         }
//       } catch (e) {
//         setErr(e.message || "Failed to load posts");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   function pick(id) {
//     setSelected(id);
//     const p = posts.find((x)=>x._id===id);
//     setForm(p ? {...p} : {title:"", body:""});
//     setMsg(""); setErr("");
//   }

//   async function add() {
//     try {
//       setSaving(true); setMsg(""); setErr("");
//       const created = await api.createPost({ title: "New Post", body: "" });
//       setPosts((s)=>[created, ...s]);
//       setSelected(created._id);
//       setForm(created);
//       setMsg("Created");
//     } catch (e) { setErr(e.message || "Create failed"); }
//     finally { setSaving(false); }
//   }

//   async function save() {
//     if(!selected) return;
//     try {
//       setSaving(true); setErr(""); setMsg("");
//       const { _id, ...payload } = form;
//       const updated = await api.updatePost(selected, payload);
//       setPosts((s)=>s.map(p=>p._id===updated._id?updated:p));
//       setForm(updated);
//       setMsg("Saved");
//     } catch(e){ setErr(e.message || "Save failed"); }
//     finally{ setSaving(false); }
//   }

//   async function remove(id) {
//     if(!confirm("Delete post?")) return;
//     try{
//       setSaving(true); setErr(""); setMsg("");
//       await api.deletePost(id);
//       setPosts(s=>s.filter(p=>p._id!==id));
//       setMsg("Deleted");
//       if(posts.length>1){ const next = posts.find(p=>p._id!==id); pick(next._id); }
//       else { setSelected(null); setForm({title:"",body:""}); }
//     }catch(e){ setErr(e.message||"Delete failed"); }
//     finally{ setSaving(false); }
//   }

//   return (
//     <AdminLayout>
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-semibold">Manage Posts</h2>
//           <div className="flex gap-2">
//             <button onClick={add} className="text-xs bg-purple-700 text-white px-3 py-1 rounded">+ Add</button>
//           </div>
//         </div>

//         <div className="flex gap-6">
//           <div className="w-64 border rounded p-3 max-h-[60vh] overflow-auto">
//             {loading && <div className="text-xs text-slate-500">Loading...</div>}
//             <ul className="space-y-2">
//               {posts.map(p=>(
//                 <li key={p._id}>
//                   <button onClick={()=>pick(p._id)} className={`w-full text-left px-3 py-2 rounded ${p._id===selected ? "bg-purple-50 text-purple-800" : "hover:bg-slate-50"}`}>
//                     <div className="text-sm font-medium">{p.title || "(no title)"}</div>
//                     <div className="text-xs text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</div>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex-1">
//             {err && <div className="text-xs text-red-700 mb-2">{err}</div>}
//             {msg && <div className="text-xs text-green-700 mb-2">{msg}</div>}

//             <div>
//               <label className="text-xs">Title</label>
//               <input className="w-full border rounded p-2 text-sm" value={form.title||""} onChange={(e)=>setForm({...form,title:e.target.value})}/>
//             </div>

//             <div className="mt-3">
//               <label className="text-xs">Body</label>
//               <textarea className="w-full border rounded p-2 text-sm" rows={8} value={form.body||""} onChange={(e)=>setForm({...form,body:e.target.value})}/>
//             </div>

//             <div className="mt-4 flex gap-2">
//               <button onClick={save} disabled={saving} className="bg-purple-700 text-white px-4 py-2 rounded text-sm">Save</button>
//               {selected && <button onClick={()=>remove(selected)} disabled={saving} className="bg-red-600 text-white px-4 py-2 rounded text-sm">Delete</button>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }



// NEW ONE ==========================================================





// src/admin/AdminPosts.jsx
import React from "react";
import AdminLayout from "./AdminLayout";
import { api } from "../../../Api";

export default function AdminPosts() {
  const [posts, setPosts] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [form, setForm] = React.useState({ title: "", body: "" });
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [err, setErr] = React.useState("");

  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const perPage = 8;
  const [search, setSearch] = React.useState("");

  async function loadPage(p = 1, q = search) {
    try {
      setLoading(true); setErr(""); setMsg("");
      const res = await api.getPosts(p, perPage, q);
      setPosts(res.docs || []);
      setPage(res.page || p);
      setTotalPages(res.totalPages || 1);
      if (res.docs?.length) {
        setSelected(res.docs[0]._id);
        setForm(res.docs[0]);
      } else {
        setSelected(null);
        setForm({ title: "", body: "" });
      }
    } catch (e) {
      setErr(e.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => { loadPage(1); }, []);

  async function handleSearchChange(v) {
    setSearch(v);
    setPage(1);
    await loadPage(1, v);
  }

  function pick(id) {
    setSelected(id);
    const p = posts.find(x => x._id === id);
    setForm(p ? { ...p } : { title: "", body: "" });
    setMsg(""); setErr("");
  }

  async function add() {
    try {
      setSaving(true); setMsg(""); setErr("");
      const created = await api.createPost({ title: "New Post", body: "" });
      setMsg("Created");
      await loadPage(1);
    } catch (e) { setErr(e.message || "Create failed"); }
    finally { setSaving(false); }
  }

  async function save() {
    if (!selected) return;
    try {
      setSaving(true); setErr(""); setMsg("");
      const payload = { ...form };
      delete payload._id;
      const updated = await api.updatePost(selected, payload);
      setMsg("Saved");
      await loadPage(page);
    } catch (e) { setErr(e.message || "Save failed"); }
    finally { setSaving(false); }
  }

  async function remove(id) {
    if (!confirm("Delete post?")) return;
    try {
      setSaving(true); setErr(""); setMsg("");
      await api.deletePost(id);
      setMsg("Deleted");
      await loadPage(page);
    } catch (e) { setErr(e.message || "Delete failed"); }
    finally { setSaving(false); }
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Manage Posts</h2>
          <div className="flex items-center gap-2">
            <input placeholder="Search title/body..." value={search} onChange={(e)=>handleSearchChange(e.target.value)} className="text-sm border rounded px-3 py-2" />
            <button onClick={add} className="text-xs bg-purple-700 text-white px-3 py-1 rounded">+ Add</button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-64 border rounded p-3 max-h-[60vh] overflow-auto">
            {loading && <div className="text-xs text-slate-500">Loading...</div>}
            <ul className="space-y-2">
              {posts.map(p => (
                <li key={p._id}>
                  <button onClick={()=>pick(p._id)} className={`w-full text-left px-3 py-2 rounded ${p._id===selected ? "bg-purple-50 text-purple-800" : "hover:bg-slate-50"}`}>
                    <div className="text-sm font-medium">{p.title || "(no title)"}</div>
                    <div className="text-xs text-slate-500">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""}</div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex justify-between items-center text-xs text-slate-600">
              <div>Page {page} / {totalPages}</div>
              <div className="flex gap-1">
                <button disabled={page <= 1} onClick={() => { setPage(p=>Math.max(1,p-1)); loadPage(page-1); }} className="px-2 py-1 border rounded">Prev</button>
                <button disabled={page >= totalPages} onClick={() => { setPage(p=>Math.min(totalPages,p+1)); loadPage(page+1); }} className="px-2 py-1 border rounded">Next</button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {err && <div className="text-xs text-red-700 mb-2">{err}</div>}
            {msg && <div className="text-xs text-green-700 mb-2">{msg}</div>}

            <div>
              <label className="text-xs">Title</label>
              <input className="w-full border rounded p-2 text-sm" value={form.title||""} onChange={(e)=>setForm({...form,title:e.target.value})}/>
            </div>

            <div className="mt-3">
              <label className="text-xs">Body</label>
              <textarea className="w-full border rounded p-2 text-sm" rows={8} value={form.body||""} onChange={(e)=>setForm({...form,body:e.target.value})}/>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={save} disabled={saving} className="bg-purple-700 text-white px-4 py-2 rounded text-sm">Save</button>
              {selected && <button onClick={()=>remove(selected)} disabled={saving} className="bg-red-600 text-white px-4 py-2 rounded text-sm">Delete</button>}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
