export default function SocialIcons() {
  const iconClass =
    "w-5 h-5 fill-current text-white hover:text-[#3dbb3d] transition";

  return (
    <div className="flex gap-4 mt-4">
      {/* Instagram */}
      <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram">
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5zm0 7.4A2.9 2.9 0 1114.9 12 2.9 2.9 0 0112 14.9zM17.5 6a1 1 0 11-1 1 1 1 0 011-1z" />
        </svg>
      </a>

      {/* Facebook */}
      <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook">
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-2.9h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM2 8.98h6V22H2zM9.5 8.98h5.7v1.8h.1a6.2 6.2 0 015.6-3c6 0 7.1 3.9 7.1 9V22h-6v-7.9c0-1.9 0-4.3-2.6-4.3s-3 2-3 4.2V22h-6z" />
        </svg>
      </a>
    </div>
  );
}
