import { useEffect, useRef, useState, type FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import binAzizLogo from "../assets/Bin Aziz.png";
import { clearSession, getCurrentUser, isAdmin, isLoggedIn } from "../lib/auth";
import "./Navbar.css";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const loggedIn = isLoggedIn();
  const user = getCurrentUser();
  const userInitial = (user?.name?.charAt(0) || "U").toUpperCase();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (profileMenuRef.current && !profileMenuRef.current.contains(targetNode)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const confirmLogout = () => {
    clearSession();
    setIsLogoutModalOpen(false);
    closeMobileMenu();
    navigate("/login");
  };

  return (
    <header className="premium-header-wrap">
      <nav className={`premium-header ${isScrolled ? "is-scrolled" : ""}`}>
        <Link to="/" className="premium-brand-link" onClick={closeMobileMenu}>
          <img src={binAzizLogo} alt="Bin Aziz Technologies logo" className="premium-brand-logo" />
          <span className="premium-brand-name">Bin Aziz Technologies</span>
        </Link>

        <div className={`premium-drawer-shell ${isMenuOpen ? "is-open" : ""}`}>
          <ul className="premium-nav-links">
            <li><NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>About</NavLink></li>
            <li><NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>Services</NavLink></li>
            <li><NavLink to="/courses" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>Courses</NavLink></li>
            <li><NavLink to="/portfolio" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>Portfolio</NavLink></li>
            <li><NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>Blog</NavLink></li>
          </ul>

          <div className="premium-header-actions">
            {!loggedIn ? (
              <>
                <Link to="/login" className="premium-login-btn" onClick={closeMobileMenu}>Login</Link>
                <Link to="/signup" className="premium-login-btn" onClick={closeMobileMenu}>Signup</Link>
                <Link to="/courses" className="premium-start-btn" onClick={closeMobileMenu}>Get Started</Link>
              </>
            ) : (
              <>
                <div className="premium-menu-wrap" ref={profileMenuRef}>
                  <button
                    type="button"
                    className="premium-profile-btn"
                    onClick={() => {
                      setIsProfileOpen((prev) => !prev);
                    }}
                    aria-label="Open profile menu"
                  >
                    <span className="premium-avatar-circle" aria-hidden="true">{userInitial}</span>
                    <span className="premium-profile-name">{user?.name ?? "User"}</span>
                    <FaChevronDown aria-hidden="true" className={isProfileOpen ? "is-rotated" : ""} />
                  </button>

                  {isProfileOpen ? (
                    <div className="premium-dropdown-menu">
                      <Link to="/dashboard" onClick={closeMobileMenu}>Profile</Link>
                      <Link to="/dashboard#settings" onClick={closeMobileMenu}>Settings</Link>
                      {isAdmin() ? <Link to="/admin" onClick={closeMobileMenu}>Admin Panel</Link> : null}
                      <button type="button" className="premium-logout-link" onClick={() => setIsLogoutModalOpen(true)}>Logout</button>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="premium-nav-toggle-btn"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </nav>

      {isMenuOpen ? <button type="button" className="premium-drawer-overlay" aria-label="Close menu" onClick={closeMobileMenu} /> : null}

      {isLogoutModalOpen ? (
        <div className="premium-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="logout-modal-title">
          <div className="premium-modal-card">
            <h3 id="logout-modal-title">Are you sure you want to logout?</h3>
            <div className="premium-modal-actions">
              <button type="button" className="premium-modal-cancel" onClick={() => setIsLogoutModalOpen(false)}>
                Cancel
              </button>
              <button type="button" className="premium-modal-danger" onClick={confirmLogout}>
                Confirm logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
