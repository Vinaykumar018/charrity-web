// src/admin/AdminGallery.jsx
import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { api } from "../../../Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MdImage, MdAdd, MdSearch, MdDelete, MdSave, MdEdit,
  MdVisibility, MdClose, MdCheckCircle, MdGridOn, MdLink,
  MdTitle, MdDescription, MdCloudUpload, MdPhotoLibrary
} from "react-icons/md";
import { FaCloudUploadAlt, FaImage, FaImages } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const MAX_IMAGE_SIZE_MB = 8;

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const fileInputRef = useRef(null);
  const urlInputRef = useRef(null);

  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const empty = {
    imageUrl: "",
    caption: "",
    category: "general",
    featured: false
  };

  const [form, setForm] = useState(empty);

  // Stats
  const [totalImages, setTotalImages] = useState(0);
  const [featuredCount, setFeaturedCount] = useState(0);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      setLoading(true);
      const data = await api.getGallery();
      console.log("Gallery data:", data);
      
      if (Array.isArray(data)) {
        setItems(data);
        setTotalImages(data.length);
        setFeaturedCount(data.filter(item => item.featured).length);
      } else {
        setItems([]);
        setTotalImages(0);
        setFeaturedCount(0);
      }
    } catch (e) {
      console.error("Load gallery error:", e);
      toast.error(e.message || "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }

  function validateForm() {
    const newErrors = {};

    if (!form.imageUrl?.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!/^https?:\/\/.+/i.test(form.imageUrl)) {
      newErrors.imageUrl = "Must be a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNewItem() {
    setForm(empty);
    setErrors({});
    setEditingIndex(null);
    setShowForm(true);
  }

  function handleEditItem(index) {
    setEditingIndex(index);
    setForm(items[index]);
    setShowForm(true);
  }

  function handleCancelForm() {
    setShowForm(false);
    setForm(empty);
    setErrors({});
    setEditingIndex(null);
  }

  async function addItem() {
    if (!validateForm()) {
      toast.error("Please fix the errors before adding.");
      return;
    }

    try {
      setSaving(true);
      const created = await api.createGalleryItem(form);
      setItems((s) => [created, ...s]);
      setTotalImages(prev => prev + 1);
      if (form.featured) setFeaturedCount(prev => prev + 1);
      
      toast.success("Image added successfully!");
      setShowForm(false);
      setForm(empty);
    } catch (e) {
      toast.error(e.message || "Failed to add image");
    } finally {
      setSaving(false);
    }
  }

  async function saveItem() {
    if (editingIndex === null) return;
    if (!validateForm()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    const item = items[editingIndex];
    if (!item || !item._id) return;

    try {
      setSaving(true);
      const { _id, ...payload } = form;
      const updated = await api.updateGalleryItem(item._id, payload);
      
      setItems((s) => s.map((g, i) => (i === editingIndex ? updated : g)));
      
      // Update stats
      const wasFeatured = item.featured;
      const isFeatured = form.featured;
      if (wasFeatured !== isFeatured) {
        setFeaturedCount(prev => isFeatured ? prev + 1 : prev - 1);
      }
      
      toast.success("Changes saved successfully!");
      setShowForm(false);
      setEditingIndex(null);
      setForm(empty);
    } catch (e) {
      toast.error(e.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  async function removeItem() {
    if (!itemToDelete) return;

    try {
      setSaving(true);
      await api.deleteGalleryItem(itemToDelete);
      
      const deletedItem = items.find(item => item._id === itemToDelete);
      setItems((s) => s.filter((x) => x._id !== itemToDelete));
      setTotalImages(prev => prev - 1);
      if (deletedItem?.featured) setFeaturedCount(prev => prev - 1);
      
      toast.success("Image deleted successfully!");
      setShowDeleteModal(false);
      setItemToDelete(null);
      
      if (editingIndex !== null) {
        setShowForm(false);
        setEditingIndex(null);
        setForm(empty);
      }
    } catch (e) {
      toast.error(e.message || "Failed to delete image");
    } finally {
      setSaving(false);
    }
  }

  function handleDeleteClick(id) {
    setItemToDelete(id);
    setShowDeleteModal(true);
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
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
      if (res?.secure_url || res?.url) {
        const imageUrl = res.secure_url || res.url;
        setForm({ ...form, imageUrl });
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Upload failed - unexpected response");
      }
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setImageUploading(false);
    }
  }

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.caption?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  // Delete Confirmation Modal
  const DeleteConfirmationModal = () => (
    <div className="b-form-overlay">
      <div className="b-form-modal" style={{ maxWidth: "450px" }}>
        <div className="b-form-header">
          <h2 style={{ color: "#ef4444" }}>
            <MdDelete /> Delete Image
          </h2>
          <button
            className="b-form-close"
            onClick={() => {
              setShowDeleteModal(false);
              setItemToDelete(null);
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
            This action cannot be undone. This will permanently delete this image
            from your gallery.
          </p>

          <div style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center"
          }}>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setItemToDelete(null);
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
              onClick={removeItem}
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

        /* Gallery Grid */
        .b-gallery-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px; margin-bottom: 32px;
        }
        .b-gallery-card {
          background: #fff; border: 1.5px solid #e4eaf5; border-radius: 20px;
          overflow: hidden; transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(11,28,93,0.05);
        }
        .b-gallery-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 12px 28px rgba(11,28,93,0.12);
          border-color: #cbd5e1;
        }
        .b-gallery-image {
          height: 200px; background: #f8faff; position: relative;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .b-gallery-image img { 
          width: 100%; height: 100%; object-fit: cover; 
        }
        .b-gallery-image-placeholder {
          color: #c8d0ea; font-size: 48px; opacity: 0.5;
        }
        .b-gallery-badge {
          position: absolute; top: 12px; right: 12px;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(4px);
          padding: 4px 8px; border-radius: 20px; font-size: 11px;
          font-weight: 600; display: flex; align-items: center; gap: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .b-gallery-badge.featured {
          background: #fef9e7; color: #b45309; border: 1px solid #fde68a;
        }
        .b-gallery-content {
          padding: 16px;
        }
        .b-gallery-caption {
          font-size: 14px; font-weight: 600; color: #0b1c5d;
          margin-bottom: 8px; white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis;
        }
        .b-gallery-category {
          display: inline-block;
          background: #f0f3fb; color: #4a5578;
          padding: 4px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 600; margin-bottom: 12px;
        }
        .b-gallery-actions {
          display: flex; align-items: center; gap: 8px;
          border-top: 1.5px solid #f0f3fb; padding-top: 12px;
        }
        .b-gallery-btn {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 6px; padding: 8px; border-radius: 8px;
          font-size: 12px; font-weight: 600; border: 1.5px solid transparent;
          cursor: pointer; transition: all 0.2s;
        }
        .b-gallery-btn.edit { 
          background: #f0f3fb; color: #0b1c5d; border-color: #dce3f2;
        }
        .b-gallery-btn.edit:hover { background: #e4eaf5; }
        .b-gallery-btn.delete { 
          background: #fef2f2; color: #ef4444; border-color: #fee2e2;
        }
        .b-gallery-btn.delete:hover { background: #fee2e2; }

        /* Form Overlay */
        .b-form-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px); z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .b-form-modal {
          background: #fff; border-radius: 24px; width: 100%;
          max-width: 600px; max-height: 90vh; overflow-y: auto;
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
        .b-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
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
        .b-input:focus, .b-textarea:focus { 
          border-color: #0b1c5d; background: #fff; 
          box-shadow: 0 0 0 3px rgba(11,28,93,0.1);
        }
        .b-input.err, .b-textarea.err { border-color: #ef4444 !important; background: #fff8f8; }

        .b-err-msg {
          font-size: 11px; color: #ef4444; font-weight: 600;
          display: flex; align-items: center; gap: 4px;
          margin-top: 4px;
        }

        /* Checkbox */
        .b-checkbox {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
        }
        .b-checkbox input {
          width: 18px; height: 18px; cursor: pointer;
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
          <div className="b-page-title">Gallery Management</div>
          <div className="b-page-sub">Manage your image gallery</div>
          <div className="b-accent-bar" />

          {/* Stats Cards */}
          <div className="b-stats-grid">
            <div className="b-stat-card">
              <div className="b-stat-icon"><FaImages /></div>
              <div className="b-stat-content">
                <h3>{totalImages}</h3>
                <p>Total Images</p>
              </div>
            </div>
            <div className="b-stat-card">
              <div className="b-stat-icon"><MdPhotoLibrary /></div>
              <div className="b-stat-content">
                <h3>{featuredCount}</h3>
                <p>Featured</p>
              </div>
            </div>
            <div className="b-stat-card">
              <div className="b-stat-icon"><MdGridOn /></div>
              <div className="b-stat-content">
                <h3>{Math.ceil(totalImages / 6)}</h3>
                <p>Grid Pages</p>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="b-header-actions">
            <div className="b-search-wrapper">
              <MdSearch className="b-search-icon" />
              <input
                placeholder="Search by caption or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="b-search-input"
              />
            </div>
            <button className="b-btn-primary" onClick={handleNewItem}>
              <MdAdd size={18} />
              Add New Image
            </button>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <AiOutlineLoading3Quarters className="spin" size={40} color="#0b1c5d" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="b-empty-state">
              <FaImages className="b-empty-state-icon" />
              <h3>No images found</h3>
              <p>Get started by adding your first image to the gallery</p>
              <button className="b-btn-primary" onClick={handleNewItem} style={{ display: "inline-flex" }}>
                <MdAdd size={18} />
                Add First Image
              </button>
            </div>
          ) : (
            <div className="b-gallery-grid">
              {filteredItems.map((item, index) => (
                <div key={item._id || index} className="b-gallery-card">
                  <div 
                    className="b-gallery-image"
                    onClick={() => window.open(item.imageUrl, '_blank')}
                  >
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.caption || "Gallery image"} />
                    ) : (
                      <FaImage className="b-gallery-image-placeholder" />
                    )}
                    {item.featured && (
                      <div className="b-gallery-badge featured">
                        <MdStar /> Featured
                      </div>
                    )}
                  </div>
                  <div className="b-gallery-content">
                    <div className="b-gallery-caption">
                      {item.caption || "Untitled"}
                    </div>
                    {item.category && (
                      <div className="b-gallery-category">
                        {item.category}
                      </div>
                    )}
                    <div className="b-gallery-actions">
                      <button
                        className="b-gallery-btn edit"
                        onClick={() => handleEditItem(index)}
                      >
                        <MdEdit /> Edit
                      </button>
                      <button
                        className="b-gallery-btn delete"
                        onClick={() => handleDeleteClick(item._id)}
                      >
                        <MdDelete /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="b-form-overlay">
              <div className="b-form-modal">
                <div className="b-form-header">
                  <h2>
                    {editingIndex !== null ? <><MdEdit /> Edit Image</> : <><MdAdd /> Add New Image</>}
                  </h2>
                  <button className="b-form-close" onClick={handleCancelForm}>
                    <MdClose size={20} />
                  </button>
                </div>

                <div className="b-form-body">
                  {/* Image URL */}
                  <div className="b-field">
                    <label className="b-label">
                      <MdLink className="b-label-icon" />
                      Image URL <span className="b-badge-req">Required</span>
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        ref={urlInputRef}
                        className={`b-input${errors.imageUrl ? " err" : ""}`}
                        value={form.imageUrl || ""}
                        onChange={(e) => {
                          setForm({ ...form, imageUrl: e.target.value });
                          setErrors({ ...errors, imageUrl: "" });
                        }}
                        placeholder="https://example.com/image.jpg"
                      />
                      <label
                        style={{
                          padding: "0 16px",
                          background: "#f0f3fb",
                          border: "1.5px solid #dce3f2",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#0b1c5d",
                          cursor: "pointer",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {imageUploading ? (
                          <AiOutlineLoading3Quarters className="spin" size={14} />
                        ) : (
                          <MdCloudUpload size={16} />
                        )}
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                    {errors.imageUrl && (
                      <div className="b-err-msg">
                        <MdVisibility size={12} /> {errors.imageUrl}
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div className="b-field">
                    <label className="b-label">
                      <MdTitle className="b-label-icon" />
                      Caption
                    </label>
                    <input
                      className="b-input"
                      value={form.caption || ""}
                      onChange={(e) => setForm({ ...form, caption: e.target.value })}
                      placeholder="Image caption or description"
                    />
                  </div>

                  {/* Category */}
                  <div className="b-field">
                    <label className="b-label">
                      <MdDescription className="b-label-icon" />
                      Category
                    </label>
                    <select
                      className="b-input"
                      value={form.category || "general"}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      style={{ appearance: "auto" }}
                    >
                      <option value="general">General</option>
                      <option value="events">Events</option>
                      <option value="campaigns">Campaigns</option>
                      <option value="volunteers">Volunteers</option>
                      <option value="impact">Impact</option>
                    </select>
                  </div>

                  {/* Featured Checkbox */}
                  <div className="b-field">
                    <label className="b-checkbox">
                      <input
                        type="checkbox"
                        checked={form.featured || false}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      />
                      <span style={{ fontSize: "14px", fontWeight: "500", color: "#0b1c5d" }}>
                        Mark as featured image
                      </span>
                    </label>
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

                  {editingIndex !== null ? (
                    <button
                      className="b-btn-primary"
                      onClick={saveItem}
                      disabled={saving}
                      style={{ padding: "10px 24px" }}
                    >
                      {saving ? <AiOutlineLoading3Quarters className="spin" /> : <MdSave />}
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  ) : (
                    <button
                      className="b-btn-primary"
                      onClick={addItem}
                      disabled={saving}
                      style={{ padding: "10px 24px" }}
                    >
                      {saving ? <AiOutlineLoading3Quarters className="spin" /> : <MdAdd />}
                      {saving ? "Adding..." : "Add Image"}
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