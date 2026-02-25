import type { FC } from "react";
import peshwarLogo from "../../assets/peshwar logo.jpg";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";

const JaneayPeshawar: FC = () => {
  useRevealOnScroll();

  return (
    <section className="project-detail project-detail-modern">
      <div className="project-banner reveal-on-scroll">
        <img src={peshwarLogo} alt="Janeay Peshawar banner" className="project-banner-image" />
        <h1>Janeay Peshawar</h1>
        <p>A community-first mobile platform focused on local discovery and digital engagement.</p>
      </div>

      <div className="project-content reveal-on-scroll">
        <h2>Project Description</h2>
        <p className="project-description">
          Janeay Peshawar is a mobile-first community platform designed to connect users with trusted
          local services through a clean and accessible experience.
        </p>

        <div className="project-detail-sections">
          <section className="project-detail-block">
            <h2>Problem</h2>
            <p>Local users lacked a centralized digital channel for trusted service discovery.</p>
          </section>
          <section className="project-detail-block">
            <h2>Solution</h2>
            <p>Built a user-friendly app experience with scalable architecture and curated service modules.</p>
          </section>
        </div>

        <h2>Technology Stack</h2>
        <div className="project-tech-stack">
          <span>React Native</span><span>TypeScript</span><span>REST API</span><span>Firebase</span>
        </div>

        <h2>Screenshots</h2>
        <div className="project-screenshots">
          <img src={peshwarLogo} alt="Janeay screenshot 1" />
          <img src={peshwarLogo} alt="Janeay screenshot 2" />
          <img src={peshwarLogo} alt="Janeay screenshot 3" />
        </div>

        <div className="project-actions">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="project-btn primary">Live Demo</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="project-btn secondary">GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default JaneayPeshawar;
