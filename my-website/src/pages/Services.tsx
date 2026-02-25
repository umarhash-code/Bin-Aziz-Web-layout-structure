import type { FC } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

const Services: FC = () => {
  useRevealOnScroll();

  return (
    <section className="services-section">
      <div className="services-panel services-hero-panel reveal-on-scroll">
        <h1>Our Services</h1>
        <p>
          End-to-end digital services engineered to build, launch, and scale modern
          software products with business impact.
        </p>
      </div>

      <div className="services-panel services-light-panel reveal-on-scroll">
        <div className="services-list-grid services-list-grid-premium">
          <article className="services-list-card">
            <div className="services-list-icon" aria-hidden="true"><HiOutlineDevicePhoneMobile /></div>
            <h3>App Development</h3>
            <p>Android, iOS, and cross-platform apps with long-term support.</p>
            <Link to="/services/app-development">Learn More</Link>
          </article>

          <article className="services-list-card">
            <div className="services-list-icon" aria-hidden="true"><HiOutlineAcademicCap /></div>
            <h3>Education Systems Development</h3>
            <p>LMS, exam systems, and scalable e-learning platforms.</p>
            <Link to="/services/education-systems">Learn More</Link>
          </article>

          <article className="services-list-card">
            <div className="services-list-icon" aria-hidden="true"><HiOutlinePresentationChartLine /></div>
            <h3>IT Courses & Training</h3>
            <p>Practical training programs, outlines, and certifications.</p>
            <Link to="/services/it-courses">Learn More</Link>
          </article>

          <article className="services-list-card">
            <div className="services-list-icon" aria-hidden="true"><HiOutlineCpuChip /></div>
            <h3>Data Science & AI Services</h3>
            <p>Analytics, machine learning, and AI-powered decision systems.</p>
            <Link to="/services/data-science">Learn More</Link>
          </article>

          <article className="services-list-card">
            <div className="services-list-icon" aria-hidden="true"><HiOutlineGlobeAlt /></div>
            <h3>Web Services</h3>
            <p>Web development, hosting, domain management, and maintenance.</p>
            <Link to="/services/web-services">Learn More</Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Services;
