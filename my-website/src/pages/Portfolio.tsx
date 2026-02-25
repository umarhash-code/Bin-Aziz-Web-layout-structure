
import { useMemo, useState } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import peshwarLogo from "../assets/peshwar logo.jpg";
import seesLogo from "../assets/Sees logo.jpg";
import binAzizLogo from "../assets/Bin Aziz.png";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

type ProjectCategory = "All" | "Web" | "Mobile" | "AI" | "Education";

const projects = [
  {
    title: "Janeay Peshawar",
    category: "Mobile" as const,
    image: peshwarLogo,
    description: "A local community-focused digital platform for service accessibility.",
    tech: ["React", "TypeScript", "API Integration"],
    link: "/portfolio/janeay-peshawar",
  },
  {
    title: "SEES Academy",
    category: "Education" as const,
    image: seesLogo,
    description: "An educational ecosystem for software and IoT learning in Urdu.",
    tech: ["LMS", "Video Content", "SEO"],
    link: "/portfolio/sees-academy",
  },
  {
    title: "KhanGul Digital",
    category: "Web" as const,
    image: binAzizLogo,
    description: "Digital transformation services and high-performance web delivery.",
    tech: ["Web Platform", "Analytics", "Optimization"],
    link: "/portfolio/khangul-digital",
  },
];

const categories: ProjectCategory[] = ["All", "Web", "Mobile", "AI", "Education"];

const Portfolio: FC = () => {
  useRevealOnScroll();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="portfolio-section">
      <div className="portfolio-panel portfolio-hero-panel reveal-on-scroll">
        <div className="portfolio-header">
          <h1>Our Portfolio</h1>
          <p className="portfolio-hero-subtitle">Showcase of successful projects delivered across web, mobile, AI, and education domains.</p>
        </div>
      </div>

      <div className="portfolio-panel portfolio-light-panel reveal-on-scroll">
        <div className="portfolio-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`portfolio-filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="portfolio-grid portfolio-grid-premium">
          {filteredProjects.map((project) => (
            <article className="portfolio-card" key={project.title}>
              <div className="portfolio-image-wrap">
                <img src={project.image} alt={`${project.title} project`} className="portfolio-logo" />
              </div>
              <span className="portfolio-category-badge">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="portfolio-tech-stack">
                {project.tech.map((techItem) => (
                  <span key={techItem} className="portfolio-tech-badge">{techItem}</span>
                ))}
              </div>
              <Link to={project.link} className="portfolio-link">View Project</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
