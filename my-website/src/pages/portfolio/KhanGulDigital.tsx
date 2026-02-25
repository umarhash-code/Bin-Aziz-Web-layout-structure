import type { FC } from "react";
import binAzizLogo from "../../assets/Bin Aziz.png";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

const KhanGulDigital: FC = () => {
  useRevealOnScroll();

  return (
    <section className="project-detail project-detail-modern">
      <div className="project-banner reveal-on-scroll">
        <img src={binAzizLogo} alt="KhanGul Digital banner" className="project-banner-image" />
        <h1>KhanGul Digital</h1>
        <p>A digital transformation initiative focused on modern web delivery and business growth.</p>
      </div>

      <div className="project-content reveal-on-scroll">
        <h2>Project Description</h2>
        <p className="project-description">
          KhanGul Digital is a business-focused web transformation project designed to improve online
          visibility, performance, and conversion quality.
        </p>

        <div className="project-detail-sections">
          <section className="project-detail-block">
            <h2>Problem</h2>
            <p>Businesses needed stronger digital visibility and better web performance across devices.</p>
          </section>
          <section className="project-detail-block">
            <h2>Solution</h2>
            <p>Delivered a modern web architecture, clear content strategy, and performance-focused implementation.</p>
          </section>
        </div>

        <h2>Technology Stack</h2>
        <div className="project-tech-stack">
          <span>React</span><span>TypeScript</span><span>Vite</span><span>Analytics</span>
        </div>

        <h2>Screenshots</h2>
        <div className="project-screenshots">
          <img src={binAzizLogo} alt="KhanGul screenshot 1" />
          <img src={binAzizLogo} alt="KhanGul screenshot 2" />
          <img src={binAzizLogo} alt="KhanGul screenshot 3" />
        </div>

        <div className="project-actions">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="project-btn primary">Live Demo</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="project-btn secondary">GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default KhanGulDigital;
