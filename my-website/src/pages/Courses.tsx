import { useMemo, useState, type FC, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineArrowTrendingUp,
  HiOutlineChartBar,
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineDocumentCheck,
  HiOutlineGlobeAlt,
  HiOutlineMap,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

type CourseCategory =
  | "All"
  | "Web Development"
  | "Data Science"
  | "App Development"
  | "Digital Marketing"
  | "AI";

type Course = {
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: string;
  category: Exclude<CourseCategory, "All">;
  icon: ReactNode;
};

const categories: CourseCategory[] = [
  "All",
  "Web Development",
  "Data Science",
  "App Development",
  "Digital Marketing",
  "AI",
];

const courses: Course[] = [
  {
    title: "Full-Stack Web Development",
    description: "Build production-ready web apps with React, APIs, databases, and deployment workflows.",
    duration: "8 Weeks",
    level: "Beginner",
    price: "PKR 24,999",
    category: "Web Development",
    icon: <HiOutlineGlobeAlt />,
  },
  {
    title: "Data Science Bootcamp",
    description: "Learn Python, data analysis, visualization, and machine learning through practical projects.",
    duration: "10 Weeks",
    level: "Intermediate",
    price: "PKR 34,999",
    category: "Data Science",
    icon: <HiOutlineChartBar />,
  },
  {
    title: "Mobile App Engineering",
    description: "Create Android and cross-platform applications with modern architecture and clean UI.",
    duration: "9 Weeks",
    level: "Intermediate",
    price: "PKR 29,999",
    category: "App Development",
    icon: <HiOutlineDevicePhoneMobile />,
  },
  {
    title: "Performance Marketing Pro",
    description: "Master paid campaigns, analytics, funnels, and growth strategies for digital brands.",
    duration: "6 Weeks",
    level: "Beginner",
    price: "PKR 21,999",
    category: "Digital Marketing",
    icon: <HiOutlineArrowTrendingUp />,
  },
  {
    title: "AI Product Implementation",
    description: "Apply modern AI tools and workflows to automate business processes and improve outcomes.",
    duration: "7 Weeks",
    level: "Advanced",
    price: "PKR 39,999",
    category: "AI",
    icon: <HiOutlineCpuChip />,
  },
  {
    title: "Frontend with React & TypeScript",
    description: "Develop scalable user interfaces with component architecture, hooks, and reusable patterns.",
    duration: "7 Weeks",
    level: "Beginner",
    price: "PKR 23,999",
    category: "Web Development",
    icon: <HiOutlineCodeBracket />,
  },
];

const Courses: FC = () => {
  useRevealOnScroll();

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CourseCategory>("All");

  const filteredCourses = useMemo(() => {
    if (activeCategory === "All") {
      return courses;
    }

    return courses.filter((course) => course.category === activeCategory);
  }, [activeCategory]);

  const onEnrollNow = (courseTitle: string) => {
    const isLoggedIn = localStorage.getItem("binazizLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login", { state: { redirectTo: "/courses", selectedCourse: courseTitle } });
      return;
    }

    navigate("/payment", { state: { selectedCourse: courseTitle } });
  };

  return (
    <section className="courses-page">
      <div className="courses-hero reveal-on-scroll">
        <h1>Upgrade Your Skills with Our Professional Courses</h1>
        <p>
          Learn industry-ready technologies from experts and advance your career with
          practical training.
        </p>
      </div>

      <div className="courses-categories reveal-on-scroll" role="group" aria-label="Course categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`course-filter-btn ${activeCategory === category ? "is-active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="courses-grid reveal-on-scroll">
        {filteredCourses.map((course) => (
          <article key={course.title} className="course-card">
            <div className="course-card-image" aria-hidden="true">
              <span className="course-card-icon">{course.icon}</span>
            </div>

            <div className="course-card-content">
              <h2>{course.title}</h2>
              <p>{course.description}</p>

              <div className="course-meta">
                <span>Duration: {course.duration}</span>
                <span>Level: {course.level}</span>
              </div>

              <strong className="course-price">{course.price}</strong>
            </div>

            <button type="button" className="course-enroll-btn" onClick={() => onEnrollNow(course.title)}>
              Enroll Now
            </button>
          </article>
        ))}
      </div>

      <div className="featured-course reveal-on-scroll">
        <div className="featured-image" aria-hidden="true">
          <div className="featured-image-icon"><HiOutlineSparkles /></div>
        </div>
        <div className="featured-content">
          <span className="featured-badge">Featured Course</span>
          <h2>AI for Business & Automation</h2>
          <p>
            A premium hands-on program designed for professionals and founders who want
            to implement practical AI workflows in real business operations.
          </p>
          <ul>
            <li>Real-world projects with deployment guidance</li>
            <li>Mentor feedback and implementation roadmap</li>
            <li>Career-focused capstone and completion certificate</li>
          </ul>
          <button type="button" className="course-enroll-btn" onClick={() => onEnrollNow("AI for Business & Automation")}> 
            Enroll Now
          </button>
        </div>
      </div>

      <div className="courses-why reveal-on-scroll">
        <h2>Why Choose Our Courses</h2>
        <div className="courses-why-grid">
          <article className="value-card">
            <div className="value-icon" aria-hidden="true"><HiOutlineAcademicCap /></div>
            <h3>Expert Trainers</h3>
            <p>Train with industry professionals focused on practical skill growth.</p>
          </article>
          <article className="value-card">
            <div className="value-icon" aria-hidden="true"><HiOutlineSquares2X2 /></div>
            <h3>Practical Projects</h3>
            <p>Build portfolio-ready projects that reflect real business requirements.</p>
          </article>
          <article className="value-card">
            <div className="value-icon" aria-hidden="true"><HiOutlineDocumentCheck /></div>
            <h3>Certification</h3>
            <p>Receive a professional certificate after successful course completion.</p>
          </article>
          <article className="value-card">
            <div className="value-icon" aria-hidden="true"><HiOutlineMap /></div>
            <h3>Career Guidance</h3>
            <p>Get guidance for interviews, CV improvement, and growth planning.</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Courses;
