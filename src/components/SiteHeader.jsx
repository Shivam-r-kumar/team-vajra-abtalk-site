import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Brand from "./Brand";
import ThemeButton from "./ThemeButton";
import { studentData } from "../data";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/" && hash !== "#about";
  const isAbout = pathname === "/" && hash === "#about";
  const isDashboard = pathname === "/dashboard";
  const isChallenge = pathname.startsWith("/day/");
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <Brand />
        <nav className="nav-desktop" aria-label="Primary">
          <Link to="/" className={`nav-link${isHome ? " is-active" : ""}`} aria-current={isHome ? "page" : undefined}>Home</Link>
          <Link to="/#about" className={`nav-link${isAbout ? " is-active" : ""}`} aria-current={isAbout ? "page" : undefined}>About</Link>
          <Link to="/dashboard" className={`nav-link${isDashboard ? " is-active" : ""}`} aria-current={isDashboard ? "page" : undefined}>Dashboard</Link>
          <Link to={`/day/${studentData.currentDay}`} className="btn btn-primary btn-sm" aria-current={isChallenge ? "page" : undefined}>{studentData.totalDays} Days Challenge</Link>
        </nav>
        <div className="header-actions">
          <ThemeButton />
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="icon-menu" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            <svg className="icon-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      </div>
      {!menuOpen ? null : (
        <div className="mobile-menu" id="mobileMenu">
          <nav className="container mobile-menu-inner" aria-label="Mobile">
            <Link to="/" className={`mobile-link${isHome ? " is-active" : ""}`} aria-current={isHome ? "page" : undefined} onClick={closeMenu}>Home</Link>
            <Link to="/#about" className={`mobile-link${isAbout ? " is-active" : ""}`} aria-current={isAbout ? "page" : undefined} onClick={closeMenu}>About</Link>
            <Link to="/dashboard" className={`mobile-link${isDashboard ? " is-active" : ""}`} aria-current={isDashboard ? "page" : undefined} onClick={closeMenu}>Dashboard</Link>
            <Link to={`/day/${studentData.currentDay}`} className="btn btn-primary btn-block" aria-current={isChallenge ? "page" : undefined} onClick={closeMenu}>{studentData.totalDays} Days Challenge</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
