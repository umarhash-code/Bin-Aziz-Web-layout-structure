
import { useEffect } from "react";
import type { FC } from "react";
import {
  HiOutlineEye,
  HiOutlineLightBulb,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
  HiOutlineStar,
  HiOutlineUserCircle,
  HiOutlineUsers,
} from "react-icons/hi2";

const About: FC = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".about-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section">
      <div className="about-panel about-hero-panel about-reveal">
        <div className="about-header">
          <h1>About Bin Aziz Technologies</h1>
          <p>
            We are dedicated to strengthening Pakistan&apos;s position in software innovation
            and delivering impactful digital solutions.
          </p>
        </div>
      </div>

      <div className="about-panel about-light-panel about-reveal">
        <div className="about-cards">
          <div className="about-card vision-card">
            <div className="card-icon" aria-hidden="true"><HiOutlineEye /></div>
            <h2>Vision</h2>
            <p>
              Bin Aziz Technologies is envisioned to strengthen the country&apos;s position in
              software-intensive products by delivering state-of-the-art research and
              practical digital services.
            </p>
          </div>

          <div className="about-card mission-card">
            <div className="card-icon" aria-hidden="true"><HiOutlineRocketLaunch /></div>
            <h2>Mission</h2>
            <p>
              Our mission is to be a premier center of excellence recognized for
              cutting-edge research and development of software-based and embedded systems.
            </p>
          </div>
        </div>
      </div>

      <div className="about-panel about-light-panel about-reveal">
        <div className="core-values">
          <h2>Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <span className="value-icon" aria-hidden="true"><HiOutlineLightBulb /></span>
              <h3>Innovation</h3>
              <p>Constantly pushing boundaries and exploring new technologies.</p>
            </div>
            <div className="value-item">
              <span className="value-icon" aria-hidden="true"><HiOutlineShieldCheck /></span>
              <h3>Integrity</h3>
              <p>Maintaining honesty and strong moral principles.</p>
            </div>
            <div className="value-item">
              <span className="value-icon" aria-hidden="true"><HiOutlineStar /></span>
              <h3>Excellence</h3>
              <p>Striving for the highest quality in all endeavors.</p>
            </div>
            <div className="value-item">
              <span className="value-icon" aria-hidden="true"><HiOutlineUsers /></span>
              <h3>Collaboration</h3>
              <p>Working together toward shared goals and measurable success.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-panel founder-premium-section about-reveal">
        <div className="founder-layout">
          <div className="founder-image-wrap">
            <div className="founder-image" aria-hidden="true"><HiOutlineUserCircle /></div>
          </div>
          <div className="founder-content">
            <h2>Professor Dr. Aziz</h2>
            <h3>Founder & Lead Mentor — Software Engineering and IoT</h3>
            <p>
              Professor Dr. Aziz leads Bin Aziz Technologies with a strong focus on
              software quality, innovation, and practical technology adoption.
            </p>
            <p>
              Through SEES Academy, he has guided thousands of learners with lectures on
              software engineering, embedded systems, and real-world digital execution.
            </p>
            <a
              className="founder-linkedin-btn"
              href="https://www.linkedin.com/company/bin-aziz-technologies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
