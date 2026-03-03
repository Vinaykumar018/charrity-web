// src/admin/AdminEvents.jsx
import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { api } from "../../../Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MdEvent, MdPerson, MdCalendarToday, MdLocationOn, MdTitle,
  MdSave, MdDelete, MdAdd, MdSearch, MdImage, MdDescription,
  MdEdit, MdVisibility, MdClose, MdCheckCircle, MdAccessTime
} from "react-icons/md";
import { FaCloudUploadAlt, FaImage, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const MAX_IMAGE_SIZE_MB = 8;

function extractDayMonth(dateStr) {
  if (!dateStr) return { day: "", month: "" };
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return { day: "", month: "" };
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  return { day, month };
}

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const perPage = 9;
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const empty = {
    title: "",
    description: "",
    image: "",
    date: "",
    day: "",
    month: "",
    time: "",
    location: "",
  };

  const [form, setForm] = useState(empty);

  function validateForm() {
    const newErrors = {};

    if (!form.title?.trim()) {
      newErrors.title = "Title is required";
    }
    if (!form.date) {
      newErrors.date = "Date is required";
    }
    if (!form.day || !form.month) {
      newErrors.date = "Invalid date selected";
    }
    if (!form.location?.trim()) {
      newErrors.location = "Location is required";
    }
    if (!form.description?.trim()) {
      newErrors.description = "Description is required";
    }
    if (form.image && !/^https?:\/\/.+/i.test(form.image)) {
      newErrors.image = "Image must be a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function loadPage(p = 1, q = search) {
    try {
      setLoading(true);
      const res = await api.getEvents(p, perPage, q);
      console.log("API Response:", res);

      if (Array.isArray(res)) {
        setEvents(res);
        setTotalEvents(res.length);
        setTotalPages(Math.ceil(res.length / perPage));

        if (q) {
          const filtered = res.filter(event =>
            event.title?.toLowerCase().includes(q.toLowerCase()) ||
            event.location?.toLowerCase().includes(q.toLowerCase()) ||
            event.description?.toLowerCase().includes(q.toLowerCase())
          );
          setEvents(filtered);
          setTotalEvents(filtered.length);
          setTotalPages(Math.ceil(filtered.length / perPage));
        }
      }
      else if (res?.docs) {
        setEvents(res.docs);
        setPage(res.page || p);
        setTotalPages(res.totalPages || 1);
        setTotalEvents(res.total || 0);
      }
      else {
        setEvents([]);
        setTotalEvents(0);
        setTotalPages(1);
      }

      setPage(p);
    } catch (e) {
      console.error("Load events error:", e);
      toast.error(e.message || "Failed to load events");
      setEvents([]);
      setTotalEvents(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage(1);
  }, []);

  async function handleSearchChange(v) {
    setSearch(v);
    setPage(1);
    await loadPage(1, v);
  }

  function handleNewEvent() {
    setForm(empty);
    setErrors({});
    setSelectedId(null);
    setShowForm(true);
  }

  function handleEditEvent(event) {
    setSelectedId(event._id);
    setForm(event);
    setShowForm(true);
  }

  function handleCancelForm() {
    setShowForm(false);
    setForm(empty);
    setErrors({});
    setSelectedId(null);
  }

  async function createEvent() {
    if (!validateForm()) {
      toast.error("Please fix the errors before creating.");
      return;
    }

    try {
      setSaving(true);
      await api.createEvent(form);
      toast.success("Event created successfully!");
      setShowForm(false);
      await loadPage(1);
    } catch (e) {
      toast.error(e.message || "Create failed");
    } finally {
      setSaving(false);
    }
  }

  async function saveEvent() {
    if (!selectedId) return;
    if (!validateForm()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    try {
      setSaving(true);
      const payload = { ...form };
      delete payload._id;
      await api.updateEvent(selectedId, payload);
      toast.success("Changes saved successfully!");
      setShowForm(false);
      await loadPage(page);
    } catch (e) {
      toast.error(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function removeEvent() {
    if (!eventToDelete) return;

    try {
      setSaving(true);
      await api.deleteEvent(eventToDelete);

      toast.success("Event deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      if (selectedId === eventToDelete) {
        setShowForm(false);
        setForm(empty);
        setSelectedId(null);
      }

      setShowDeleteModal(false);
      setEventToDelete(null);
      await loadPage(page);
    } catch (e) {
      toast.error(e.message || "Failed to delete event. Please try again.");
      console.error("Delete error:", e);
    } finally {
      setSaving(false);
    }
  }

  function handleDeleteClick(id) {
    setEventToDelete(id);
    setShowDeleteModal(true);
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = "";

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_IMAGE_SIZE_MB) {
      toast.error(`File too large. Max allowed size is ${MAX_IMAGE_SIZE_MB} MB.`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setImageUploading(true);

    try {
      const res = await api.uploadFile(formData);
      if (res?.url) {
        setForm((f) => ({ ...f, image: res.url }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed — unexpected response from server.");
      }
    } catch (err) {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const getCurrentPageEvents = () => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return events.slice(startIndex, endIndex);
  };

  // Delete Confirmation Modal
  const DeleteConfirmationModal = () => (
    <div className="b-form-overlay">
      <div className="b-form-modal" style={{ maxWidth: "450px" }}>
        <div className="b-form-header">
          <h2 style={{ color: "#ef4444" }}>
            <MdDelete /> Delete Event
          </h2>
          <button
            className="b-form-close"
            onClick={() => {
              setShowDeleteModal(false);
              setEventToDelete(null);
            }}
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="b-form-body" style={{ textAlign: "center", padding: "32px 24px" }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "#fef2f2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px"
          }}>
            <MdDelete size={40} color="#ef4444" />
          </div>

          <h3 style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#1a2240",
            marginBottom: "12px"
          }}>
            Are you sure?
          </h3>

          <p style={{
            fontSize: "14px",
            color: "#4a5578",
            marginBottom: "24px",
            lineHeight: "1.6"
          }}>
            This action cannot be undone. This will permanently delete the event
            and remove all associated data.
          </p>

          <div style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center"
          }}>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setEventToDelete(null);
              }}
              style={{
                padding: "12px 24px",
                border: "1.5px solid #dce3f2",
                borderRadius: "12px",
                background: "#fff",
                color: "#4a5578",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
                flex: 1
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#f8faff";
                e.target.style.borderColor = "#0b1c5d";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#fff";
                e.target.style.borderColor = "#dce3f2";
              }}
            >
              Cancel
            </button>

            <button
              onClick={removeEvent}
              disabled={saving}
              style={{
                padding: "12px 24px",
                border: "none",
                borderRadius: "12px",
                background: saving ? "#fca5a5" : "#ef4444",
                color: "#fff",
                fontWeight: "600",
                fontSize: "14px",
                cursor: saving ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                flex: 1
              }}
              onMouseOver={(e) => {
                if (!saving) {
                  e.target.style.background = "#dc2626";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(239,68,68,0.3)";
                }
              }}
              onMouseOut={(e) => {
                if (!saving) {
                  e.target.style.background = "#ef4444";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }
              }}
            >
              {saving ? (
                <>
                  <AiOutlineLoading3Quarters className="spin" size={16} />
                  Deleting...
                </>
              ) : (
                <>
                  <MdDelete size={16} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .b-root { font-family: 'Plus Jakarta Sans', sans-serif; }

        .b-page-title { font-size: 26px; font-weight: 800; color: #0b1c5d; letter-spacing: -0.02em; }
        .b-page-sub { font-size: 14px; color: #8a96b0; margin-top: 3px; }
        .b-accent-bar { width: 42px; height: 4px; background: linear-gradient(90deg,#f6c90e,#ffe566); border-radius: 3px; margin-top: 9px; margin-bottom: 28px; }

        /* Header Actions */
        .b-header-actions {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px; flex-wrap: wrap; gap: 16px;
        }
        .b-search-wrapper {
          position: relative; flex: 1; max-width: 350px;
        }
        .b-search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #9aa4bf; font-size: 16px;
        }
        .b-search-input {
          width: 100%; padding: 12px 16px 12px 42px;
          border: 1.5px solid #e4eaf5; border-radius: 40px;
          font-size: 14px; background: #fff;
          transition: all 0.2s;
        }
        .b-search-input:focus { 
          outline: none; border-color: #0b1c5d; 
          box-shadow: 0 0 0 3px rgba(11,28,93,0.1);
        }
        .b-btn-primary {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #0b1c5d, #1e3fa8);
          color: #fff; padding: 12px 24px; border-radius: 40px;
          font-size: 14px; font-weight: 600; border: none; cursor: pointer;
          box-shadow: 0 4px 16px rgba(11,28,93,0.28);
          transition: all 0.2s;
        }
        .b-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(11,28,93,0.35); }
        .b-btn-primary:active { transform: translateY(0); }

        /* Stats Cards */
        .b-stats-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          margin-bottom: 28px;
        }
        .b-stat-card {
          background: #fff; border: 1.5px solid #e4eaf5; border-radius: 16px;
          padding: 20px; display: flex; align-items: center; gap: 16px;
          box-shadow: 0 2px 10px rgba(11,28,93,0.05);
        }
        .b-stat-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: linear-gradient(135deg, #0b1c5d10, #1e3fa810);
          display: flex; align-items: center; justify-content: center;
          color: #0b1c5d; font-size: 24px;
        }
        .b-stat-content h3 { font-size: 28px; font-weight: 800; color: #0b1c5d; line-height: 1.2; }
        .b-stat-content p { font-size: 13px; color: #8a96b0; font-weight: 500; }

        /* Events Grid */
        .b-blogs-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px; margin-bottom: 32px;
        }
        .b-blog-card {
          background: #fff; border: 1.5px solid #e4eaf5; border-radius: 20px;
          overflow: hidden; transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(11,28,93,0.05);
        }
        .b-blog-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 12px 28px rgba(11,28,93,0.12);
          border-color: #cbd5e1;
        }
        .b-blog-image {
          height: 180px; background: #f8faff; position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .b-blog-image img { 
          width: 100%; height: 100%; object-fit: cover; 
        }
        .b-blog-image-placeholder {
          color: #c8d0ea; font-size: 48px; opacity: 0.5;
        }
        .b-blog-date-badge {
          position: absolute; top: 16px; left: 16px;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(4px);
          padding: 8px 12px; border-radius: 30px; font-weight: 700;
          display: flex; align-items: center; gap: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .b-blog-date-badge .day { font-size: 18px; color: #0b1c5d; }
        .b-blog-date-badge .month { font-size: 12px; color: #8a96b0; }
        .b-blog-content {
          padding: 20px; position: relative;
        }
        .b-blog-title {
          font-size: 18px; font-weight: 700; color: #0b1c5d;
          margin-bottom: 8px; line-height: 1.3;
        }
        .b-blog-meta {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 12px; font-size: 12px; color: #8a96b0;
          flex-wrap: wrap;
        }
        .b-blog-meta span { display: flex; align-items: center; gap: 4px; }
        .b-blog-excerpt {
          font-size: 13px; color: #4a5578; line-height: 1.5;
          margin-bottom: 16px; display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .b-blog-actions {
          display: flex; align-items: center; gap: 8px;
          border-top: 1.5px solid #f0f3fb; padding-top: 16px;
        }
        .b-blog-btn {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 6px; padding: 10px; border-radius: 10px;
          font-size: 12px; font-weight: 600; border: 1.5px solid transparent;
          cursor: pointer; transition: all 0.2s;
        }
        .b-blog-btn.edit { 
          background: #f0f3fb; color: #0b1c5d; border-color: #dce3f2;
        }
        .b-blog-btn.edit:hover { background: #e4eaf5; }
        .b-blog-btn.delete { 
          background: #fef2f2; color: #ef4444; border-color: #fee2e2;
        }
        .b-blog-btn.delete:hover { background: #fee2e2; }

        /* Pagination */
        .b-pagination {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border: 1.5px solid #e4eaf5; border-radius: 50px;
          padding: 8px 16px; margin-top: 16px;
        }
        .b-pagination-info { 
          font-size: 14px; color: #4a5578; font-weight: 500;
        }
        .b-pagination-controls { display: flex; gap: 8px; }
        .b-pagination-btn {
          padding: 8px 16px; border: 1.5px solid #dce3f2; border-radius: 30px;
          background: #fff; font-size: 13px; font-weight: 600; color: #0b1c5d;
          cursor: pointer; transition: all 0.2s;
        }
        .b-pagination-btn:hover:not(:disabled) { 
          border-color: #0b1c5d; background: #f4f7ff;
        }
        .b-pagination-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Form Overlay */
        .b-form-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px); z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .b-form-modal {
          background: #fff; border-radius: 24px; width: 100%;
          max-width: 800px; max-height: 90vh; overflow-y: auto;
          box-shadow: 0 25px 50px rgba(11,28,93,0.3);
        }
        .b-form-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px; border-bottom: 1.5px solid #f0f3fb;
        }
        .b-form-header h2 {
          font-size: 20px; font-weight: 700; color: #0b1c5d;
          display: flex; align-items: center; gap: 8px;
        }
        .b-form-close {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: #f8faff; border: 1.5px solid #dce3f2;
          color: #8a96b0; cursor: pointer; transition: all 0.2s;
        }
        .b-form-close:hover { 
          background: #e4eaf5; color: #0b1c5d; 
          transform: rotate(90deg);
        }
        .b-form-body { padding: 24px; }
        .b-form-footer {
          display: flex; align-items: center; justify-content: flex-end;
          gap: 12px; padding: 20px 24px; border-top: 1.5px solid #f0f3fb;
        }

        /* Form Fields */
        .b-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .b-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .b-grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
        @media (max-width: 768px) { 
          .b-grid-2, .b-grid-3, .b-grid-4 { grid-template-columns: 1fr; } 
        }

        .b-field { display: flex; flex-direction: column; gap: 6px; }
        .b-label {
          font-size: 12px; font-weight: 700; color: #4a5578;
          letter-spacing: 0.03em; text-transform: uppercase;
          display: flex; align-items: center; gap: 6px;
        }
        .b-label-icon { color: #0b1c5d; opacity: 0.6; }
        .b-badge-req {
          background: #fef9e7; color: #b45309; border: 1px solid #fde68a;
          font-size: 9px; font-weight: 700; padding: 2px 6px;
          border-radius: 4px; text-transform: uppercase;
        }

        .b-input, .b-textarea {
          width: 100%; border: 1.5px solid #dce3f2; border-radius: 12px;
          padding: 12px 14px; font-size: 14px; font-family: inherit;
          color: #1a2240; background: #f8faff; outline: none;
          transition: all 0.2s;
        }
        .b-textarea { resize: vertical; min-height: 100px; }
        .b-input:focus, .b-textarea:focus { 
          border-color: #0b1c5d; background: #fff; 
          box-shadow: 0 0 0 3px rgba(11,28,93,0.1);
        }
        .b-input.err, .b-textarea.err { border-color: #ef4444 !important; background: #fff8f8; }

        .b-err-msg {
          font-size: 11px; color: #ef4444; font-weight: 600;
          display: flex; align-items: center; gap: 4px;
        }

        /* Image Upload */
        .b-image-upload-area {
          border: 2px dashed #dce3f2; border-radius: 16px;
          padding: 20px; text-align: center; background: #f8faff;
          cursor: pointer; transition: all 0.2s; margin-bottom: 16px;
        }
        .b-image-upload-area:hover { border-color: #0b1c5d; background: #f0f3fb; }
        .b-image-preview {
          width: 100%; max-height: 200px; object-fit: contain;
          border-radius: 12px; margin-top: 12px;
        }
        .b-upload-hint { font-size: 12px; color: #9aa4bf; margin-top: 8px; }

        .spin { animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .b-empty-state {
          text-align: center; padding: 60px 20px;
          background: #f8faff; border-radius: 24px;
          border: 2px dashed #dce3f2;
        }
        .b-empty-state-icon {
          font-size: 64px; color: #c8d0ea; margin-bottom: 16px;
        }
        .b-empty-state h3 {
          font-size: 20px; font-weight: 700; color: #0b1c5d; margin-bottom: 8px;
        }
        .b-empty-state p {
          font-size: 14px; color: #8a96b0; margin-bottom: 24px;
        }
      `}</style>

      <div className="b-root p-6">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          {/* Header */}
          <div className="b-page-title">Event Management</div>
          <div className="b-page-sub">Create, edit, and manage your events</div>
          <div className="b-accent-bar" />

          {/* Stats Cards */}
          <div className="b-stats-grid">
            <div className="b-stat-card">
              <div className="b-stat-icon"><FaCalendarAlt /></div>
              <div className="b-stat-content">
                <h3>{totalEvents}</h3>
                <p>Total Events</p>
              </div>
            </div>
            <div className="b-stat-card">
              <div className="b-stat-icon"><MdLocationOn /></div>
              <div className="b-stat-content">
                <h3>{new Set(events.map(e => e.location)).size}</h3>
                <p>Locations</p>
              </div>
            </div>
            <div className="b-stat-card">
              <div className="b-stat-icon"><MdCalendarToday /></div>
              <div className="b-stat-content">
                <h3>{totalPages}</h3>
                <p>Total Pages</p>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="b-header-actions">
            <div className="b-search-wrapper">
              <MdSearch className="b-search-icon" />
              <input
                placeholder="Search events by title, location, or description..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="b-search-input"
              />
            </div>
            <button className="b-btn-primary" onClick={handleNewEvent}>
              <MdAdd size={18} />
              Create New Event
            </button>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <AiOutlineLoading3Quarters className="spin" size={40} color="#0b1c5d" />
            </div>
          ) : events.length === 0 ? (
            <div className="b-empty-state">
              <FaCalendarAlt className="b-empty-state-icon" />
              <h3>No events found</h3>
              <p>Get started by creating your first event</p>
              <button className="b-btn-primary" onClick={handleNewEvent} style={{ display: "inline-flex" }}>
                <MdAdd size={18} />
                Create First Event
              </button>
            </div>
          ) : (
            <>
              <div className="b-blogs-grid">
                {getCurrentPageEvents().map((event) => (
                  <div key={event._id} className="b-blog-card">
                    <div className="b-blog-image">
                      {event.image ? (
                        <img src={event.image} alt={event.title} />
                      ) : (
                        <FaImage className="b-blog-image-placeholder" />
                      )}
                      {event.day && event.month && (
                        <div className="b-blog-date-badge">
                          <span className="day">{event.day}</span>
                          <span className="month">{event.month}</span>
                        </div>
                      )}
                    </div>
                    <div className="b-blog-content">
                      <h3 className="b-blog-title">{event.title || "Untitled"}</h3>
                      <div className="b-blog-meta">
                        <span><MdLocationOn /> {event.location || "No location"}</span>
                        {event.time && (
                          <span><MdAccessTime /> {event.time}</span>
                        )}
                      </div>
                      <p className="b-blog-excerpt">{event.description || "No description available"}</p>
                      <div className="b-blog-actions">
                        <button
                          className="b-blog-btn edit"
                          onClick={() => handleEditEvent(event)}
                        >
                          <MdEdit /> Edit
                        </button>
                        <button
                          className="b-blog-btn delete"
                          onClick={() => handleDeleteClick(event._id)}
                        >
                          <MdDelete /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="b-pagination">
                  <span className="b-pagination-info">
                    Showing page {page} of {totalPages} · {totalEvents} total events
                  </span>
                  <div className="b-pagination-controls">
                    <button
                      className="b-pagination-btn"
                      disabled={page <= 1}
                      onClick={() => {
                        setPage(page - 1);
                        loadPage(page - 1);
                      }}
                    >
                      Previous
                    </button>
                    <button
                      className="b-pagination-btn"
                      disabled={page >= totalPages}
                      onClick={() => {
                        setPage(page + 1);
                        loadPage(page + 1);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="b-form-overlay">
              <div className="b-form-modal">
                <div className="b-form-header">
                  <h2>
                    {selectedId ? <><MdEdit /> Edit Event</> : <><MdAdd /> Create New Event</>}
                  </h2>
                  <button className="b-form-close" onClick={handleCancelForm}>
                    <MdClose size={20} />
                  </button>
                </div>

                <div className="b-form-body">
                  {/* Title & Location */}
                  <div className="b-grid-2">
                    <div className="b-field">
                      <label className="b-label">
                        <MdTitle className="b-label-icon" />
                        Title <span className="b-badge-req">Required</span>
                      </label>
                      <input
                        className={`b-input${errors.title ? " err" : ""}`}
                        value={form.title || ""}
                        onChange={(e) => {
                          setForm({ ...form, title: e.target.value });
                          setErrors({ ...errors, title: "" });
                        }}
                      />
                      {errors.title && (
                        <div className="b-err-msg">
                          <MdVisibility size={12} /> {errors.title}
                        </div>
                      )}
                    </div>

                    <div className="b-field">
                      <label className="b-label">
                        <MdLocationOn className="b-label-icon" />
                        Location <span className="b-badge-req">Required</span>
                      </label>
                      <input
                        className={`b-input${errors.location ? " err" : ""}`}
                        value={form.location || ""}
                        onChange={(e) => {
                          setForm({ ...form, location: e.target.value });
                          setErrors({ ...errors, location: "" });
                        }}
                      />
                      {errors.location && (
                        <div className="b-err-msg">
                          <MdVisibility size={12} /> {errors.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date, Time, Day, Month */}
                  <div className="b-grid-4" style={{ marginTop: "16px" }}>
                    <div className="b-field">
                      <label className="b-label">
                        <MdCalendarToday className="b-label-icon" />
                        Date <span className="b-badge-req">Required</span>
                      </label>
                      <input
                        type="date"
                        className={`b-input${errors.date ? " err" : ""}`}
                        value={form.date || ""}
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          const { day, month } = extractDayMonth(selectedDate);
                          setForm({
                            ...form,
                            date: selectedDate,
                            day,
                            month,
                          });
                          setErrors({ ...errors, date: "" });
                        }}
                      />
                    </div>

                    <div className="b-field">
                      <label className="b-label">
                        <MdAccessTime className="b-label-icon" />
                        Time
                      </label>
                      <input
                        type="time"
                        className="b-input"
                        value={form.time || ""}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                      />
                    </div>

                    <div className="b-field">
                      <label className="b-label">Day</label>
                      <input
                        className="b-input"
                        value={form.day || ""}
                        readOnly
                        style={{ background: "#f0f3fb", cursor: "not-allowed" }}
                      />
                    </div>

                    <div className="b-field">
                      <label className="b-label">Month</label>
                      <input
                        className="b-input"
                        value={form.month || ""}
                        readOnly
                        style={{ background: "#f0f3fb", cursor: "not-allowed" }}
                      />
                    </div>
                  </div>

                  {errors.date && (
                    <div className="b-err-msg" style={{ marginTop: "8px" }}>
                      <MdVisibility size={12} /> {errors.date}
                    </div>
                  )}

                  {/* Image Upload */}
                  <div style={{ marginTop: "24px" }}>
                    <label className="b-label">
                      <FaImage className="b-label-icon" />
                      Featured Image
                    </label>

                    <div
                      className="b-image-upload-area"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imageUploading ? (
                        <div>
                          <AiOutlineLoading3Quarters className="spin" size={32} color="#0b1c5d" />
                          <p style={{ marginTop: "12px", color: "#0b1c5d" }}>Uploading...</p>
                        </div>
                      ) : form.image ? (
                        <div>
                          <img src={form.image} alt="Preview" className="b-image-preview" />
                          <p style={{ marginTop: "12px", color: "#16a34a" }}>
                            <MdCheckCircle style={{ display: "inline" }} /> Image ready
                          </p>
                        </div>
                      ) : (
                        <div>
                          <FaCloudUploadAlt size={48} color="#c8d0ea" />
                          <p style={{ marginTop: "12px", color: "#0b1c5d", fontWeight: 600 }}>
                            Click to upload image
                          </p>
                          <p className="b-upload-hint">
                            PNG, JPG up to {MAX_IMAGE_SIZE_MB}MB
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </div>

                    {errors.image && (
                      <div className="b-err-msg">
                        <MdVisibility size={12} /> {errors.image}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="b-field" style={{ marginTop: "20px" }}>
                    <label className="b-label">
                      <MdDescription className="b-label-icon" />
                      Description <span className="b-badge-req">Required</span>
                    </label>
                    <textarea
                      className={`b-textarea${errors.description ? " err" : ""}`}
                      rows={6}
                      value={form.description || ""}
                      onChange={(e) => {
                        setForm({ ...form, description: e.target.value });
                        setErrors({ ...errors, description: "" });
                      }}
                      placeholder="Describe your event..."
                    />
                    {errors.description && (
                      <div className="b-err-msg">
                        <MdVisibility size={12} /> {errors.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="b-form-footer">
                  <button
                    className="b-btn-secondary"
                    onClick={handleCancelForm}
                    style={{
                      padding: "10px 20px",
                      border: "1.5px solid #dce3f2",
                      borderRadius: "10px",
                      background: "#fff",
                      color: "#4a5578",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    <MdClose /> Cancel
                  </button>

                  {selectedId ? (
                    <>
                      <button
                        className="b-btn-primary"
                        onClick={saveEvent}
                        disabled={saving}
                        style={{ padding: "10px 24px" }}
                      >
                        {saving ? <AiOutlineLoading3Quarters className="spin" /> : <MdSave />}
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(selectedId)}
                        disabled={saving}
                        style={{
                          padding: "10px 24px",
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10px",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        <MdDelete /> Delete
                      </button>
                    </>
                  ) : (
                    <button
                      className="b-btn-primary"
                      onClick={createEvent}
                      disabled={saving}
                      style={{ padding: "10px 24px" }}
                    >
                      {saving ? <AiOutlineLoading3Quarters className="spin" /> : <MdAdd />}
                      {saving ? "Creating..." : "Create Event"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && <DeleteConfirmationModal />}
    </AdminLayout>
  );
}