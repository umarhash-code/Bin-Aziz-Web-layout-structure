import type { FC } from "react";
import { Link } from "react-router-dom";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

const AppDevelopment: FC = () => {
  useRevealOnScroll();

  return (
    <section className="service-detail service-detail-modern">
      <div className="service-detail-hero reveal-on-scroll">
        <h1>App Development</h1>
        <p>
          Build high-performance mobile apps that deliver smooth user experiences across
          Android, iOS, and cross-platform ecosystems.
        </p>
      </div>

      <div className="service-detail-content reveal-on-scroll">
        <h2>Features</h2>
        <ul className="service-feature-list feature-list-icons">
          <li><span>✅</span> Android & iOS native apps</li>
          <li><span>✅</span> Cross-platform development</li>
          <li><span>✅</span> UI/UX design and prototyping</li>
          <li><span>✅</span> Maintenance and support</li>
        </ul>

        <h2>Technologies Used</h2>
        <div className="service-tech-stack">
          <span className="service-tech-badge">React Native</span>
          <span className="service-tech-badge">Flutter</span>
          <span className="service-tech-badge">TypeScript</span>
          <span className="service-tech-badge">Firebase</span>
        </div>

        <div className="service-benefits">
          <h2>Benefits</h2>
          <p>Faster launch cycles, scalable architecture, and better user retention through polished app experiences.</p>
        </div>

        <div className="service-detail-actions">
          <button className="enroll-btn">Get Free Consultation</button>
          <Link to="/services" className="secondary-light-btn">Back to All Services</Link>
        </div>
      </div>
    </section>
  );
};

export default AppDevelopment;
