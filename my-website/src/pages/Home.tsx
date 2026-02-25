
import type { FC } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import ServiceCard from "../components/ServiceCard";
import binAzizLogo from "../assets/Bin Aziz.png";
import peshwarLogo from "../assets/peshwar logo.jpg";
import seesLogo from "../assets/Sees logo.jpg";

const Home: FC = () => (
  <section className="home-section">
    <div className="hero hero-modern">
      <div className="hero-content">
        <img src={binAzizLogo} alt="Bin Aziz Technologies logo" className="hero-logo" />
        <h1>Building Smart Digital Solutions for Modern Businesses</h1>
        <p>
          Bin Aziz Technologies delivers scalable software, web, mobile, and data-driven
          systems that help organizations grow with confidence.
        </p>
        <div className="hero-actions">
          <button className="cta-btn">Book Free Consultation</button>
          <Link to="/portfolio" className="secondary-btn">View Our Work</Link>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-glow"></div>
        <div className="hero-shape hero-shape-main"></div>
        <div className="hero-shape hero-shape-small"></div>
      </div>
    </div>

    <div className="project-logos">
      <h2>Featured Brands</h2>
      <div className="project-logos-strip">
        <img src={peshwarLogo} alt="Janeay Peshawar logo" className="project-logo-item" />
        <img src={seesLogo} alt="SEES Academy logo" className="project-logo-item" />
        <img src={binAzizLogo} alt="Bin Aziz logo" className="project-logo-item" />
      </div>
    </div>

    <div className="overview home-services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {/* Service Cards */}
        <ServiceCard
          title="App Development"
          description="Android, iOS, cross-platform, UI/UX, support."
          icon={<HiOutlineDevicePhoneMobile aria-hidden="true" />}
          link="/services/app-development"
        />
        <ServiceCard
          title="Education Systems"
          description="LMS, exams, e-learning, custom school software."
          icon={<HiOutlineAcademicCap aria-hidden="true" />}
          link="/services/education-systems"
        />
        <ServiceCard
          title="IT Courses & Training"
          description="Courses, outlines, online training, certification."
          icon={<HiOutlinePresentationChartLine aria-hidden="true" />}
          link="/services/it-courses"
        />
        <ServiceCard
          title="Data Science & AI"
          description="Analytics, visualization, modeling, AI, SEO."
          icon={<HiOutlineCpuChip aria-hidden="true" />}
          link="/services/data-science"
        />
        <ServiceCard
          title="Web Services"
          description="Websites, hosting, domains, support."
          icon={<HiOutlineGlobeAlt aria-hidden="true" />}
          link="/services/web-services"
        />
      </div>
    </div>

    <div className="testimonials testimonials-modern">
      <h2>Testimonials</h2>
      <div className="testimonials-track">
        <article className="testimonial-card">
          <p>
            “Very professional team with clear communication and strong delivery speed.
            Our platform quality improved significantly.”
          </p>
          <h4>Client Team, Education Sector</h4>
        </article>
        <article className="testimonial-card">
          <p>
            “Excellent UI/UX and technical execution. They understood our business goals
            and built a reliable system.”
          </p>
          <h4>Operations Lead, Digital Business</h4>
        </article>
        <article className="testimonial-card">
          <p>
            “Great support, quick updates, and practical solutions. We would definitely
            work again with Bin Aziz Technologies.”
          </p>
          <h4>Project Manager, SME</h4>
        </article>
      </div>
    </div>
  </section>
);

export default Home;
