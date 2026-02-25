import type { FC } from "react";
import { Link } from "react-router-dom";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

const ITCourses: FC = () => {
  useRevealOnScroll();

  return (
    <section className="service-detail service-detail-modern">
      <div className="service-detail-hero reveal-on-scroll">
        <h1>IT Courses & Training</h1>
        <p>
          Develop practical technical skills through structured IT training programs designed
          for students, professionals, and teams.
        </p>
      </div>

      <div className="service-detail-content reveal-on-scroll">
        <h2>Features</h2>
        <ul className="service-feature-list feature-list-icons">
          <li><span>✅</span> Industry-focused learning tracks</li>
          <li><span>✅</span> Structured outlines and practical assignments</li>
          <li><span>✅</span> Online and instructor-led sessions</li>
          <li><span>✅</span> Certification-oriented preparation</li>
        </ul>

        <h2>Technologies Used</h2>
        <div className="service-tech-stack">
          <span className="service-tech-badge">Web Dev</span>
          <span className="service-tech-badge">Python</span>
          <span className="service-tech-badge">Data Tools</span>
          <span className="service-tech-badge">Cloud Basics</span>
        </div>

        <div className="service-benefits">
          <h2>Benefits</h2>
          <p>Career-ready skills, practical project exposure, and guided training for faster professional growth.</p>
        </div>

        <div className="service-detail-actions">
          <button className="enroll-btn">Get Free Consultation</button>
          <Link to="/services" className="secondary-light-btn">Back to All Services</Link>
        </div>
      </div>
    </section>
  );
};

export default ITCourses;
