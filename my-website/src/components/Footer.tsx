
import type { FC } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
const Footer: FC = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-logo">
        <h3>Bin Aziz Technologies</h3>
        <p>Strengthening Pakistan's position in software solutions.</p>
      </div>

      <div className="footer-quick-links" aria-label="Legal and support links">
        <h4>Quick Access</h4>
        <ul>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-conditions">Terms &amp; Conditions</Link></li>
        </ul>
      </div>

      <div className="footer-socials">
        <a href="https://www.linkedin.com/company/bin-aziz-technologies/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon">
          <FaLinkedinIn aria-hidden="true" />
        </a>
        <a href="https://www.youtube.com/@SEESAcademy" target="_blank" rel="noopener noreferrer" title="YouTube" className="social-icon">
          <FaYoutube aria-hidden="true" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-icon">
          <FaInstagram aria-hidden="true" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="social-icon">
          <FaFacebookF aria-hidden="true" />
        </a>
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="social-icon">
          <FaWhatsapp aria-hidden="true" />
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Bin Aziz Technologies. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
