import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const THEME_KEY = 'p7-theme';
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'dark');

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) toggleSidebar(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, toggleSidebar]);

  const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <aside id="app-sidebar" className={`sidebar ${isOpen ? "open" : ""}`} aria-hidden={!isOpen} aria-label="Site navigation">
      <div className="logo">MD • FSD</div>
      <nav className="nav" role="navigation">
        <NavLink to="/" className={linkClass} onClick={toggleSidebar}>Home</NavLink>
        <NavLink to="/about" className={linkClass} onClick={toggleSidebar}>About</NavLink>
        <NavLink to="/contact" className={linkClass} onClick={toggleSidebar}>Contact</NavLink>
      </nav>
      <div className="sidebar-footer">
        <button className="theme-btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div className="byline">Mittal Domadiya (D24CS122)</div>
      </div>
    </aside>
  );
}
