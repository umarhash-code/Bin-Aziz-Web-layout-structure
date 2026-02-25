import type { FC } from "react";
import { Link } from "react-router-dom";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

const WebServices: FC = () => {
  useRevealOnScroll();

  return (
    <section className="service-detail service-detail-modern">
      <div className="service-detail-hero reveal-on-scroll">
        <h1>Web Services</h1>
        <p>
          Launch and scale your online presence with reliable web development,
          hosting, domain, and maintenance services.
        </p>
      </div>

      <div className="service-detail-content reveal-on-scroll">
        <h2>Features</h2>
        <ul className="service-feature-list feature-list-icons">
          <li><span>✅</span> Responsive business website development</li>
          <li><span>✅</span> Secure hosting and infrastructure setup</li>
          <li><span>✅</span> Domain registration and DNS configuration</li>
          <li><span>✅</span> Ongoing maintenance and support</li>
        </ul>

        <h2>Technologies Used</h2>
        <div className="service-tech-stack">
          <span className="service-tech-badge">React</span>
          <span className="service-tech-badge">Vite</span>
          <span className="service-tech-badge">Node.js</span>
          <span className="service-tech-badge">Cloudflare</span>
        </div>

        <div className="service-benefits">
          <h2>Benefits</h2>
          <p>Higher online visibility, faster load performance, and stable web operations for business growth.</p>
        </div>

        <div className="service-detail-actions">
          <button className="enroll-btn">Get Free Consultation</button>
          <Link to="/services" className="secondary-light-btn">Back to All Services</Link>
        </div>
      </div>
    </section>
  );
};

export default WebServices;
