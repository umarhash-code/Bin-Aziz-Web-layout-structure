import type { FC } from "react";
import { Link } from "react-router-dom";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

const EducationSystems: FC = () => {
  useRevealOnScroll();

  return (
    <section className="service-detail service-detail-modern">
      <div className="service-detail-hero reveal-on-scroll">
        <h1>Education Systems Development</h1>
        <p>
          Digitize learning operations with secure, scalable education platforms for schools,
          colleges, training centers, and institutions.
        </p>
      </div>

      <div className="service-detail-content reveal-on-scroll">
        <h2>Features</h2>
        <ul className="service-feature-list feature-list-icons">
          <li><span>✅</span> Learning Management Systems (LMS)</li>
          <li><span>✅</span> Examination and assessment modules</li>
          <li><span>✅</span> E-learning content delivery</li>
          <li><span>✅</span> Institution-specific workflows</li>
        </ul>

        <h2>Technologies Used</h2>
        <div className="service-tech-stack">
          <span className="service-tech-badge">React</span>
          <span className="service-tech-badge">Node.js</span>
          <span className="service-tech-badge">PostgreSQL</span>
          <span className="service-tech-badge">Cloud Hosting</span>
        </div>

        <div className="service-benefits">
          <h2>Benefits</h2>
          <p>Automated operations, improved student engagement, and reliable academic reporting in one platform.</p>
        </div>

        <div className="service-detail-actions">
          <button className="enroll-btn">Get Free Consultation</button>
          <Link to="/services" className="secondary-light-btn">Back to All Services</Link>
        </div>
      </div>
    </section>
  );
};

export default EducationSystems;
