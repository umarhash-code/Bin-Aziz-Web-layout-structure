import type { FC } from "react";
import seesLogo from "../../assets/Sees logo.jpg";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

const SEESAcademy: FC = () => {
  useRevealOnScroll();

  return (
    <section className="project-detail project-detail-modern">
      <div className="project-banner reveal-on-scroll">
        <img src={seesLogo} alt="SEES Academy banner" className="project-banner-image" />
        <h1>SEES Academy</h1>
        <p>An education-focused digital platform sharing software engineering and IoT knowledge in Urdu.</p>
      </div>

      <div className="project-content reveal-on-scroll">
        <h2>Project Description</h2>
        <p className="project-description">
          SEES Academy delivers structured software and IoT learning resources in Urdu, making technical
          education more accessible to students and early professionals.
        </p>

        <div className="project-detail-sections">
          <section className="project-detail-block">
            <h2>Problem</h2>
            <p>Students lacked accessible, high-quality technical content in local language context.</p>
          </section>
          <section className="project-detail-block">
            <h2>Solution</h2>
            <p>Designed a structured educational content experience with consistent learning pathways and practical demonstrations.</p>
          </section>
        </div>

        <h2>Technology Stack</h2>
        <div className="project-tech-stack">
          <span>YouTube Platform</span><span>Content Systems</span><span>SEO Strategy</span><span>Learning Design</span>
        </div>

        <h2>Screenshots</h2>
        <div className="project-screenshots">
          <img src={seesLogo} alt="SEES screenshot 1" />
          <img src={seesLogo} alt="SEES screenshot 2" />
          <img src={seesLogo} alt="SEES screenshot 3" />
        </div>

        <div className="project-actions">
          <a href="https://www.youtube.com/@SEESAcademy" target="_blank" rel="noopener noreferrer" className="project-btn primary">Live Demo</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="project-btn secondary">GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default SEESAcademy;
