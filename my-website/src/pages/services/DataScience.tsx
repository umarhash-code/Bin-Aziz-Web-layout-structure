import type { FC } from "react";
import { Link } from "react-router-dom";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

const DataScience: FC = () => {
  useRevealOnScroll();

  return (
    <section className="service-detail service-detail-modern">
      <div className="service-detail-hero reveal-on-scroll">
        <h1>Data Science & AI Services</h1>
        <p>
          Transform raw data into smart decisions with analytics, machine learning, and
          AI-powered solutions tailored to your business goals.
        </p>
      </div>

      <div className="service-detail-content reveal-on-scroll">
        <h2>Features</h2>
        <ul className="service-feature-list feature-list-icons">
          <li><span>✅</span> Business analytics and KPI tracking</li>
          <li><span>✅</span> Data visualization dashboards</li>
          <li><span>✅</span> Predictive modeling and forecasting</li>
          <li><span>✅</span> AI assistants and smart automation</li>
        </ul>

        <h2>Technologies Used</h2>
        <div className="service-tech-stack">
          <span className="service-tech-badge">Python</span>
          <span className="service-tech-badge">TensorFlow</span>
          <span className="service-tech-badge">Power BI</span>
          <span className="service-tech-badge">FastAPI</span>
        </div>

        <div className="service-benefits">
          <h2>Benefits</h2>
          <p>Better forecasting, data-driven decision-making, and measurable process improvements with AI.</p>
        </div>

        <div className="service-detail-actions">
          <button className="enroll-btn">Get Free Consultation</button>
          <Link to="/services" className="secondary-light-btn">Back to All Services</Link>
        </div>
      </div>
    </section>
  );
};

export default DataScience;
