// src/admin/AdminPages.jsx
import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { api } from "../../../Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MdDescription, MdSave, MdVisibility, MdWarning,
  MdCheckCircle, MdPrivacyTip, MdGavel, MdInfo,
  MdClose, MdArticle
} from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function PageSection({ title, value, onChange, error, warning, icon: Icon }) {
  const id = title.toLowerCase().replace(/\s+&?\s*/g, "-");

  return (
    <div className="b-field" style={{ marginBottom: "24px" }}>
      <label htmlFor={id} className="b-label">
        {Icon && <span className="b-label-icon"><Icon /></span>}
        {title} <span className="b-badge-req">Required</span>
      </label>
      <textarea
        id={id}
        className={`b-textarea ${error ? "err" : ""} ${warning && !error ? "border-yellow-500" : ""}`}
        rows={12}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter detailed content for ${title} (minimum 200 characters recommended)...`}
        style={{ minHeight: "250px", resize: "vertical" }}
      />
      {error && (
        <div className="b-err-msg">
          <MdVisibility size={12} /> {error}
        </div>
      )}
      {warning && !error && (
        <div className="b-err-msg" style={{ color: "#b45309" }}>
          <MdWarning size={12} /> {warning}
        </div>
      )}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginTop: "4px"
      }}>
        <span className="b-upload-hint">
          {value.length.toLocaleString()} characters
        </span>
        {value.length < 200 && value.length > 0 && (
          <span style={{ color: "#ef4444", fontSize: "11px", fontWeight: "500" }}>
            {200 - value.length} more characters needed
          </span>
        )}
        {value.length >= 200 && value.length <= 10000 && (
          <span style={{ color: "#16a34a", fontSize: "11px", fontWeight: "500" }}>
            <MdCheckCircle style={{ display: "inline", marginRight: "2px" }} />
            Good length
          </span>
        )}
        {value.length > 10000 && (
          <span style={{ color: "#ef4444", fontSize: "11px", fontWeight: "500" }}>
            Exceeds 10,000 characters
          </span>
        )}
      </div>
    </div>
  );
}

export default function AdminPages() {
  const [pages, setPages] = useState({
    privacy: "",
    terms: "",
    about: "",
  });

  const [errors, setErrors] = useState({
    privacy: "",
    terms: "",
    about: "",
  });

  const [warnings, setWarnings] = useState({
    privacy: "",
    terms: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setInitialLoading(true);
      const data = await api.getPage();
      setPages(data || {
        privacy: "",
        terms: "",
        about: "",
      });
    } catch (error) {
      console.error("Load pages error:", error);
      toast.error("Failed to load pages content");
    } finally {
      setInitialLoading(false);
    }
  };

  // Advanced validation logic
  const validateField = (key, value) => {
    const trimmed = value.trim();
    const title = getFieldTitle(key);

    // Reset
    let error = "";
    let warning = "";

    // 1. Required
    if (!trimmed) {
      error = `${title} is required.`;
      return { error, warning };
    }

    // 2. Minimum length
    if (trimmed.length < 200) {
      error = `${title} is too short. Minimum 200 characters required (current: ${trimmed.length}).`;
    }

    // 3. Maximum length
    if (trimmed.length > 10000) {
      error = `${title} is too long. Maximum 10,000 characters allowed.`;
    }

    // 4. Placeholder / boilerplate detection
    const lowercase = trimmed.toLowerCase();
    const placeholders = [
      "lorem ipsum",
      "write here",
      "your content here",
      "insert text",
      "coming soon",
      "under construction",
      "[insert",
    ];
    if (placeholders.some((p) => lowercase.includes(p))) {
      error = `Please replace placeholder text (e.g., "Lorem ipsum") with real ${title.toLowerCase()} content.`;
    }

    // 5. Raw HTML detection (warning)
    const htmlTags = /<\/?(div|p|span|script|iframe|html|body|head|style)[ >]/i;
    if (htmlTags.test(trimmed)) {
      warning = "Detected HTML tags. Use Markdown formatting if supported, or plain text.";
    }

    // 6. Excessive whitespace
    if (trimmed.length > 500 && trimmed.split(/\s+/).length < 50) {
      warning = "Content appears to have excessive spacing or repetition. Consider improving readability.";
    }

    return { error, warning };
  };

  const getFieldTitle = (key) => {
    return {
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      about: "About Us",
    }[key];
  };

  const updatePage = (key) => (value) => {
    setPages((prev) => ({ ...prev, [key]: value }));
    const { error, warning } = validateField(key, value);
    setErrors((prev) => ({ ...prev, [key]: error }));
    setWarnings((prev) => ({ ...prev, [key]: warning }));
  };

  const validateForm = () => {
    const newErrors = {};
    const newWarnings = {};
    let hasError = false;

    Object.keys(pages).forEach((key) => {
      const { error, warning } = validateField(key, pages[key]);
      newErrors[key] = error;
      newWarnings[key] = warning;
      if (error) hasError = true;
    });

    setErrors(newErrors);
    setWarnings(newWarnings);
    return !hasError;
  };

  async function handleSave() {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    // Check for warnings
    const hasWarnings = Object.values(warnings).some((w) => w);
    if (hasWarnings) {
      const confirmSave = window.confirm(
        "There are warnings in the content. Do you still want to save?"
      );
      if (!confirmSave) return;
    }

    setLoading(true);
    setSaveSuccess(false);
    
    try {
      await api.upsertPage(pages);
      toast.success("All pages saved successfully!");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      toast.error(err.message || "Failed to save changes.");
    } finally {
      setLoading(false);
    }
  }

  const hasErrors = Object.values(errors).some((e) => e);
  const hasWarnings = Object.values(warnings).some((w) => w);
  const isFormValid = !hasErrors && Object.values(pages).every((v) => v.trim() !== "");

  // Calculate completion percentage
  const calculateCompletion = () => {
    const totalFields = 3;
    const completedFields = Object.values(pages).filter(v => v.trim().length >= 200).length;
    return Math.round((completedFields / totalFields) * 100);
  };

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
        .b-stat-card:hover { box-shadow: 0 5px 20px rgba(11,28,93,0.09); }
        .b-stat-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: linear-gradient(135deg, #0b1c5d10, #1e3fa810);
          display: flex; align-items: center; justify-content: center;
          color: #0b1c5d; font-size: 24px;
        }
        .b-stat-content h3 { font-size: 28px; font-weight: 800; color: #0b1c5d; line-height: 1.2; }
        .b-stat-content p { font-size: 13px; color: #8a96b0; font-weight: 500; }

        /* Progress Bar */
        .b-progress-container {
          background: #fff; border: 1.5px solid #e4eaf5; border-radius: 50px;
          padding: 4px; margin-bottom: 28px;
        }
        .b-progress-bar {
          height: 8px; border-radius: 50px;
          background: linear-gradient(90deg, #0b1c5d, #1e3fa8);
          transition: width 0.3s ease;
        }

        /* Main Card */
        .b-card {
          background: #fff; border: 1.5px solid #e4eaf5; border-radius: 24px;
          padding: 32px; box-shadow: 0 4px 20px rgba(11,28,93,0.08);
        }

        /* Section Card */
        .b-section-card {
          background: #f8faff; border: 1.5px solid #e4eaf5;
          border-radius: 20px; padding: 24px; margin-bottom: 24px;
        }
        .b-section-header {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px; padding-bottom: 12px;
          border-bottom: 1.5px solid #dce3f2;
        }
        .b-section-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #0b1c5d, #1e3fa8);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 16px;
        }

        /* Form Fields */
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

        .b-textarea {
          width: 100%; border: 1.5px solid #dce3f2; border-radius: 16px;
          padding: 16px; font-size: 14px; font-family: inherit;
          color: #1a2240; background: #fff; outline: none;
          transition: all 0.2s; line-height: 1.6;
        }
        .b-textarea:focus { 
          border-color: #0b1c5d; 
          box-shadow: 0 0 0 3px rgba(11,28,93,0.1);
        }
        .b-textarea.err { border-color: #ef4444 !important; background: #fff8f8; }
        .b-textarea.border-yellow-500 { border-color: #b45309 !important; background: #fffbeb; }

        .b-err-msg {
          font-size: 11px; color: #ef4444; font-weight: 600;
          display: flex; align-items: center; gap: 4px;
        }

        .b-upload-hint { font-size: 11px; color: #9aa4bf; }

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
      `}</style>

      <div className="b-root p-6">
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Header */}
          <div className="b-page-title">Pages Management</div>
          <div className="b-page-sub">Manage your website's static pages content</div>
          <div className="b-accent-bar" />

          {/* Stats Cards */}
          <div className="b-stats-grid">
            <div className="b-stat-card">
              <div className="b-stat-icon"><FaFileAlt /></div>
              <div className="b-stat-content">
                <h3>3</h3>
                <p>Total Pages</p>
              </div>
            </div>
            <div className="b-stat-card">
              <div className="b-stat-icon"><MdCheckCircle /></div>
              <div className="b-stat-content">
                <h3>{Object.values(pages).filter(v => v.trim().length >= 200).length}/3</h3>
                <p>Completed</p>
              </div>
            </div>
            <div className="b-stat-card">
              <div className="b-stat-icon"><MdArticle /></div>
              <div className="b-stat-content">
                <h3>{Object.values(pages).reduce((acc, curr) => acc + curr.length, 0).toLocaleString()}</h3>
                <p>Total Words</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="b-progress-container">
            <div 
              className="b-progress-bar" 
              style={{ width: `${calculateCompletion()}%` }}
            />
          </div>

          {/* Main Content Card */}
          <div className="b-card">
            {initialLoading ? (
              <div style={{ textAlign: "center", padding: "60px" }}>
                <AiOutlineLoading3Quarters className="spin" size={40} color="#0b1c5d" />
              </div>
            ) : (
              <>
                {/* Privacy Policy Section */}
                <div className="b-section-card">
                  <div className="b-section-header">
                    <div className="b-section-icon"><MdPrivacyTip /></div>
                    <div>
                      <div className="b-card-title" style={{ fontSize: "16px", fontWeight: "700", color: "#0b1c5d" }}>
                        Privacy Policy
                      </div>
                      <div className="b-card-sub" style={{ fontSize: "12px", color: "#9aa4bf" }}>
                        Legal document explaining how user data is collected and handled
                      </div>
                    </div>
                  </div>
                  
                  <PageSection
                    title="Privacy Policy"
                    value={pages.privacy}
                    onChange={updatePage("privacy")}
                    error={errors.privacy}
                    warning={warnings.privacy}
                    icon={MdPrivacyTip}
                  />
                </div>

                {/* Terms & Conditions Section */}
                <div className="b-section-card">
                  <div className="b-section-header">
                    <div className="b-section-icon"><MdGavel /></div>
                    <div>
                      <div className="b-card-title" style={{ fontSize: "16px", fontWeight: "700", color: "#0b1c5d" }}>
                        Terms & Conditions
                      </div>
                      <div className="b-card-sub" style={{ fontSize: "12px", color: "#9aa4bf" }}>
                        Rules and guidelines for using your website
                      </div>
                    </div>
                  </div>
                  
                  <PageSection
                    title="Terms & Conditions"
                    value={pages.terms}
                    onChange={updatePage("terms")}
                    error={errors.terms}
                    warning={warnings.terms}
                    icon={MdGavel}
                  />
                </div>

                {/* About Us Section */}
                <div className="b-section-card">
                  <div className="b-section-header">
                    <div className="b-section-icon"><MdInfo /></div>
                    <div>
                      <div className="b-card-title" style={{ fontSize: "16px", fontWeight: "700", color: "#0b1c5d" }}>
                        About Us
                      </div>
                      <div className="b-card-sub" style={{ fontSize: "12px", color: "#9aa4bf" }}>
                        Your organization's story, mission, and values
                      </div>
                    </div>
                  </div>
                  
                  <PageSection
                    title="About Us"
                    value={pages.about}
                    onChange={updatePage("about")}
                    error={errors.about}
                    warning={warnings.about}
                    icon={MdInfo}
                  />
                </div>

                {/* Action Footer */}
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "32px",
                  paddingTop: "24px",
                  borderTop: "1.5px solid #f0f3fb"
                }}>
                  <div>
                    {hasErrors && (
                      <div className="b-err-msg" style={{ fontSize: "13px" }}>
                        <MdWarning size={14} /> Please fix errors before saving
                      </div>
                    )}
                    {hasWarnings && !hasErrors && (
                      <div style={{ color: "#b45309", fontSize: "13px", fontWeight: "500" }}>
                        <MdWarning style={{ display: "inline", marginRight: "4px" }} />
                        Some pages have warnings
                      </div>
                    )}
                    {saveSuccess && (
                      <div style={{ color: "#16a34a", fontSize: "13px", fontWeight: "500" }}>
                        <MdCheckCircle style={{ display: "inline", marginRight: "4px" }} />
                        Changes saved successfully!
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={loading || !isFormValid}
                    className="b-btn-primary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "14px 32px",
                      opacity: loading || !isFormValid ? 0.6 : 1,
                      cursor: loading || !isFormValid ? "not-allowed" : "pointer"
                    }}
                  >
                    {loading ? (
                      <AiOutlineLoading3Quarters className="spin" size={16} />
                    ) : (
                      <MdSave size={16} />
                    )}
                    {loading ? "Saving..." : "Save All Changes"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}