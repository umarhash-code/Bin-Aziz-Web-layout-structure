import { useEffect, useRef, useState, type FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaChevronDown, FaTimes, FaUserCircle } from "react-icons/fa";
import binAzizLogo from "../assets/Bin Aziz.png";
import "./Navbar.css";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const notificationMenuRef = useRef<HTMLDivElement | null>(null);
  const isLoggedIn = localStorage.getItem("binazizLoggedIn") === "true";

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
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(targetNode)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsNotificationOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("binazizLoggedIn");
    closeMobileMenu();
    navigate("/");
  };

  const notificationItems = [
    "Payment completed successfully",
    "Your Python course starts tomorrow",
    "Certificate is now available",
  ];

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
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="premium-login-btn" onClick={closeMobileMenu}>Login</Link>
                <Link to="/courses" className="premium-start-btn" onClick={closeMobileMenu}>Get Started</Link>
              </>
            ) : (
              <>
                <div className="premium-menu-wrap" ref={notificationMenuRef}>
                  <button
                    type="button"
                    className="premium-icon-btn"
                    onClick={() => {
                      setIsNotificationOpen((prev) => !prev);
                      setIsProfileOpen(false);
                    }}
                    aria-label="Open notifications"
                  >
                    <FaBell aria-hidden="true" />
                    <span className="premium-notification-dot" />
                  </button>
                  {isNotificationOpen ? (
                    <div className="premium-dropdown-menu premium-notification-menu">
                      {notificationItems.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="premium-menu-wrap" ref={profileMenuRef}>
                  <button
                    type="button"
                    className="premium-profile-btn"
                    onClick={() => {
                      setIsProfileOpen((prev) => !prev);
                      setIsNotificationOpen(false);
                    }}
                    aria-label="Open profile menu"
                  >
                    <FaUserCircle aria-hidden="true" />
                    <span>Umar</span>
                    <FaChevronDown aria-hidden="true" className={isProfileOpen ? "is-rotated" : ""} />
                  </button>

                  {isProfileOpen ? (
                    <div className="premium-dropdown-menu">
                      <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
                      <Link to="/courses" onClick={closeMobileMenu}>My Courses</Link>
                      <Link to="/dashboard#certificates" onClick={closeMobileMenu}>Certificates</Link>
                      <button type="button" onClick={handleLogout}>Logout</button>
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
    </header>
  );
};

export default Navbar;
