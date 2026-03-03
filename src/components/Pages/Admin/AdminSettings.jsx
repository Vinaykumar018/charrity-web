import React, { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdLanguage, MdEmail, MdPhone, MdLocationOn, MdSave, MdCheckCircle } from "react-icons/md";
import { FaInstagram, FaFacebook, FaLinkedinIn, FaCloudUploadAlt, FaImage } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { api } from "../../../Api";
import AdminLayout from "./AdminLayout";

const MAX_LOGO_SIZE_MB = 8;

/* ─── ZOD SCHEMA (simplified) ───────────────────────────────── */
const settingsSchema = z.object({
  siteName: z.string().min(1, "NGO name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  address: z.string().min(1, "Address is required"),
  whatsapp: z.string().min(1, "WhatsApp number is required"),
  logo: z.string().optional(),
  socials: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

/* ─── COMPONENT ──────────────────────────────────────────────── */
export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const [settings, setSettings] = useState({
    siteName: "",
    email: "",
    address: "",
    whatsapp: "",
    logo: "",
    socials: { instagram: "", facebook: "", linkedin: "" },
  });

  useEffect(() => {
    api.getSettings().then((res) => {
      if (res) setSettings(res);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
    // clear error on edit
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
    if (errors[`socials.${name}`])
      setErrors((prev) => ({ ...prev, [`socials.${name}`]: undefined }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = ""; // allow re-selecting same file

    // Client-side size guard
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_LOGO_SIZE_MB) {
      toast.error(`File too large. Max allowed size is ${MAX_LOGO_SIZE_MB} MB.`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLogoUploading(true);
    try {
      const res = await api.uploadLogo(formData);
      if (res?.url) {
        setSettings((prev) => ({ ...prev, logo: res.url }));
        toast.success("Logo uploaded successfully!");
      } else {
        // Log the full response so you can debug the actual API shape
        console.error("Unexpected uploadLogo response:", res);
        toast.error("Logo upload failed — unexpected response from server.");
      }
    } catch (err) {
      console.error("uploadLogo error:", err);
      toast.error("Logo upload failed. Please try again.");
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSave = async () => {
    const result = settingsSchema.safeParse(settings);

    if (!result.success) {
      const fieldErrors = {};
      console.log(result);

      result.error.issues.forEach((err) => {
        const key = err.path.join(".");
        fieldErrors[key] = err.message;
      });

      setErrors(fieldErrors);
      toast.error("Please fix the errors before saving.");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await api.updateSettings(settings);
      toast.success("Settings updated successfully!");
    } catch {
      toast.error("Failed to update settings. Please try again.");
    } finally {
      setLoading(false);
    }
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

        .s-root { font-family: 'Plus Jakarta Sans', sans-serif; }

        .s-page-title { font-size: 26px; font-weight: 800; color: #0b1c5d; letter-spacing: -0.02em; }
        .s-page-sub   { font-size: 14px; color: #8a96b0; margin-top: 3px; }
        .s-accent-bar { width: 42px; height: 4px; background: linear-gradient(90deg,#f6c90e,#ffe566); border-radius: 3px; margin-top: 9px; margin-bottom: 28px; }

        .s-card {
          background: #fff; border: 1.5px solid #e4eaf5;
          border-radius: 16px; padding: 28px 32px; margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(11,28,93,0.05);
          transition: box-shadow 0.2s;
        }
        .s-card:hover { box-shadow: 0 5px 20px rgba(11,28,93,0.09); }

        .s-card-header {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 24px; padding-bottom: 16px;
          border-bottom: 1.5px solid #f0f3fb;
        }
        .s-card-icon {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, #0b1c5d, #1e3fa8);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 17px;
        }
        .s-card-title { font-size: 15px; font-weight: 700; color: #0b1c5d; }
        .s-card-sub   { font-size: 12px; color: #9aa4bf; margin-top: 2px; }

        .s-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .s-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; }
        @media (max-width: 768px) { .s-grid-2, .s-grid-3 { grid-template-columns: 1fr; } }

        .s-field  { display: flex; flex-direction: column; gap: 5px; }
        .s-label  {
          font-size: 11.5px; font-weight: 700; color: #4a5578;
          letter-spacing: 0.05em; text-transform: uppercase;
          display: flex; align-items: center; gap: 6px;
        }
        .s-label-icon { color: #0b1c5d; opacity: 0.55; font-size: 13px; display: flex; }
        .s-badge-req  {
          background: #fef9e7; color: #b45309; border: 1px solid #fde68a;
          font-size: 9.5px; font-weight: 700; padding: 1px 6px;
          border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em;
        }

        .s-input {
          width: 100%; border: 1.5px solid #dce3f2; border-radius: 10px;
          padding: 10px 14px; font-size: 14px; font-family: inherit;
          color: #1a2240; background: #f8faff; outline: none; box-sizing: border-box;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }
        .s-input:focus { border-color: #0b1c5d; background: #fff; box-shadow: 0 0 0 3px rgba(11,28,93,0.1); }
        .s-input.err  { border-color: #ef4444 !important; background: #fff8f8; }
        .s-input.err:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }

        .s-err-msg {
          font-size: 11.5px; color: #ef4444; font-weight: 600;
          display: flex; align-items: center; gap: 4px; margin-top: 2px;
        }

        /* LOGO */
        .s-logo-row {
          display: flex; align-items: center; gap: 20px;
          background: #f8faff; border: 1.5px solid #dce3f2;
          border-radius: 12px; padding: 16px 20px; margin-bottom: 16px;
        }
        .s-logo-thumb {
          width: 72px; height: 72px; border-radius: 10px; flex-shrink: 0;
          background: #edf0fa; border: 1.5px solid #dce3f2;
          display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .s-logo-thumb img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }
        .s-logo-placeholder-icon { font-size: 28px; color: #c8d0ea; }
        .s-logo-meta { flex: 1; min-width: 0; }
        .s-logo-meta-title { font-size: 13px; font-weight: 600; color: #0b1c5d; margin-bottom: 3px; }
        .s-logo-meta-url   { font-size: 11.5px; color: #9aa4bf; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .s-logo-status     { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; margin-top: 5px; }
        .s-logo-status.ok  { color: #16a34a; }
        .s-logo-status.busy { color: #d97706; }

        .s-upload-label {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #dce3f2; border-radius: 9px;
          padding: 9px 18px; font-size: 13px; font-weight: 600; color: #0b1c5d;
          cursor: pointer; font-family: inherit; position: relative; overflow: hidden;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
          box-shadow: 0 1px 4px rgba(11,28,93,0.07);
        }
        .s-upload-label:hover { border-color: #0b1c5d; background: #f4f7ff; box-shadow: 0 2px 8px rgba(11,28,93,0.12); }
        .s-upload-label input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
        .s-upload-hint { font-size: 11.5px; color: #9aa4bf; margin-top: 8px; }

        .spin { animation: s-spin 0.7s linear infinite; display: inline-block; }
        @keyframes s-spin { to { transform: rotate(360deg); } }

        .s-save-bar { display: flex; justify-content: flex-end; margin-top: 4px; padding-bottom: 32px; }
        .s-btn-save {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #0b1c5d, #1e3fa8);
          color: #fff; padding: 12px 32px; border-radius: 11px;
          font-size: 14px; font-weight: 700; border: none; cursor: pointer;
          font-family: inherit; box-shadow: 0 4px 16px rgba(11,28,93,0.28);
          transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
        }
        .s-btn-save:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 7px 20px rgba(11,28,93,0.33); }
        .s-btn-save:active:not(:disabled) { transform: translateY(0); }
        .s-btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div className="s-root p-6">
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Header */}
          <div className="s-page-title">Website Settings</div>
          <div className="s-page-sub">Manage your NGO's public-facing information and branding</div>
          <div className="s-accent-bar" />

          {/* ── BASIC INFO ── */}
          <div className="s-card">
            <div className="s-card-header">
              <div className="s-card-icon"><MdLanguage /></div>
              <div>
                <div className="s-card-title">Basic Information</div>
                <div className="s-card-sub">Core details shown across your website</div>
              </div>
            </div>
            <div className="s-grid-2">
              <Field label="NGO Name" icon={<MdLanguage />} error={errors["siteName"]} required>
                <input
                  className={`s-input${errors["siteName"] ? " err" : ""}`}
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                />
              </Field>
              <Field label="Email Address" icon={<MdEmail />} error={errors["email"]} required>
                <input
                  className={`s-input${errors["email"] ? " err" : ""}`}
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleChange}
                />
              </Field>
              <Field label="WhatsApp Number" icon={<MdPhone />} error={errors["whatsapp"]} required>
                <input
                  className={`s-input${errors["whatsapp"] ? " err" : ""}`}
                  name="whatsapp"
                  value={settings.whatsapp}
                  onChange={handleChange}
                />
              </Field>
              <Field label="Address" icon={<MdLocationOn />} error={errors["address"]} required>
                <input
                  className={`s-input${errors["address"] ? " err" : ""}`}
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                />
              </Field>
            </div>
          </div>

          {/* ── LOGO ── */}
          <div className="s-card">
            <div className="s-card-header">
              <div className="s-card-icon"><FaImage /></div>
              <div>
                <div className="s-card-title">Website Logo</div>
                <div className="s-card-sub">Displayed in the header and across pages</div>
              </div>
            </div>

            <div className="s-logo-row">
              <div className="s-logo-thumb">
                {settings.logo
                  ? <img src={settings.logo} alt="Logo preview" />
                  : <FaImage className="s-logo-placeholder-icon" />}
              </div>
              <div className="s-logo-meta">
                <div className="s-logo-meta-title">
                  {settings.logo ? "Current Logo" : "No logo uploaded yet"}
                </div>
                {settings.logo && (
                  <div className="s-logo-meta-url" title={settings.logo}>{settings.logo}</div>
                )}
                {logoUploading && (
                  <div className="s-logo-status busy">
                    <AiOutlineLoading3Quarters className="spin" /> Uploading…
                  </div>
                )}
                {!logoUploading && settings.logo && (
                  <div className="s-logo-status ok">
                    <MdCheckCircle /> Uploaded
                  </div>
                )}
              </div>
            </div>

            <label className="s-upload-label">
              {logoUploading
                ? <AiOutlineLoading3Quarters className="spin" />
                : <FaCloudUploadAlt size={15} />}
              {logoUploading ? "Uploading…" : settings.logo ? "Replace Logo" : "Upload Logo"}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleLogoUpload}
              />
            </label>
            <div className="s-upload-hint">PNG, SVG, or JPG · Max {MAX_LOGO_SIZE_MB} MB</div>
          </div>

          {/* ── SOCIAL LINKS ── */}
          <div className="s-card">
            <div className="s-card-header">
              <div className="s-card-icon"><FaInstagram /></div>
              <div>
                <div className="s-card-title">Social Media Links</div>
                <div className="s-card-sub">Optional — shown in footer and contact sections</div>
              </div>
            </div>
            <div className="s-grid-3">
              <Field label="Instagram" icon={<FaInstagram />} error={errors["socials.instagram"]}>
                <input
                  className={`s-input${errors["socials.instagram"] ? " err" : ""}`}
                  name="instagram"
                  value={settings.socials.instagram}
                  onChange={handleSocialChange}
                />
              </Field>
              <Field label="Facebook" icon={<FaFacebook />} error={errors["socials.facebook"]}>
                <input
                  className={`s-input${errors["socials.facebook"] ? " err" : ""}`}
                  name="facebook"
                  value={settings.socials.facebook}
                  onChange={handleSocialChange}
                />
              </Field>
              <Field label="LinkedIn" icon={<FaLinkedinIn />} error={errors["socials.linkedin"]}>
                <input
                  className={`s-input${errors["socials.linkedin"] ? " err" : ""}`}
                  name="linkedin"
                  value={settings.socials.linkedin}
                  onChange={handleSocialChange}
                />
              </Field>
            </div>
          </div>

          {/* ── SAVE ── */}
          <div className="s-save-bar">
            <button className="s-btn-save" onClick={handleSave} disabled={loading}>
              {loading
                ? <AiOutlineLoading3Quarters className="spin" />
                : <MdSave size={17} />}
              {loading ? "Saving…" : "Save Settings"}
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

/* ─── FIELD WRAPPER ──────────────────────────────────────────── */
function Field({ label, icon, error, required, children }) {
  return (
    <div className="s-field">
      <label className="s-label">
        {icon && <span className="s-label-icon">{icon}</span>}
        {label}
        {required && <span className="s-badge-req">Required</span>}
      </label>
      {children}
      {error && (
        <div className="s-err-msg">
          <svg width="11" height="11" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}