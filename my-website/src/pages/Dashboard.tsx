import { useEffect, useState, type CSSProperties, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaCertificate,
  FaCog,
  FaCreditCard,
  FaHome,
  FaPlayCircle,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import "./Dashboard.css";

type DashboardState = {
  enrolledCourse?: string;
};

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as DashboardState | null) ?? null;
  const [isLoading, setIsLoading] = useState(true);

  useRevealOnScroll(".dashboard-reveal");

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => setIsLoading(false), 1200);
    return () => window.clearTimeout(loaderTimer);
  }, []);

  const enrolledCourse = state?.enrolledCourse ?? "Selected Course";
  const stats = [
    { label: "Enrolled Courses", value: 6 },
    { label: "Completed Courses", value: 3 },
    { label: "Pending Payments", value: 1 },
  ];

  const courses = [
    {
      title: enrolledCourse,
      description: "Build and deploy complete projects with hands-on mentorship.",
      progress: 72,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Data Analytics Pro",
      description: "Learn analysis pipelines and dashboard reporting best practices.",
      progress: 54,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "UI Engineering Essentials",
      description: "Create modern interfaces with scalable design systems.",
      progress: 86,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const activityItems = [
    "Payment completed for App Development",
    "Started the Data Analytics module",
    "Certificate downloaded for UI Engineering",
  ];

  const handleLogout = () => {
    localStorage.removeItem("binazizLoggedIn");
    navigate("/courses");
  };

  return (
    <section className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-logo">
          <FaHome aria-hidden="true" />
          <span>Bin Aziz Dashboard</span>
        </div>

        <nav className="dashboard-sidebar-nav" aria-label="Dashboard menu">
          <button type="button" className="active"><FaHome aria-hidden="true" /> Dashboard</button>
          <button type="button" onClick={() => navigate("/courses")}><FaBook aria-hidden="true" /> My Courses</button>
          <button type="button" onClick={() => navigate("/dashboard#certificates")}><FaCertificate aria-hidden="true" /> Certificates</button>
          <button type="button" onClick={() => navigate("/payment")}><FaCreditCard aria-hidden="true" /> Payments</button>
          <button type="button"><FaCog aria-hidden="true" /> Settings</button>
          <button type="button" onClick={handleLogout}><FaSignOutAlt aria-hidden="true" /> Logout</button>
        </nav>

        <div className="dashboard-user-mini">
          <FaUserCircle aria-hidden="true" />
          <div>
            <strong>Umar</strong>
            <p>Premium Student</p>
          </div>
        </div>
      </aside>

      <div className="dashboard-main">
        <div className="dashboard-welcome-card dashboard-reveal reveal-on-scroll">
          <div>
            <h1>Welcome back, Umar</h1>
            <p>Continue learning and track your progress.</p>
          </div>
          <div className="dashboard-progress-circle" style={{ "--progress": 72 } as CSSProperties}>
            <span>72%</span>
          </div>
        </div>

        <div className="dashboard-stats-grid dashboard-reveal reveal-on-scroll">
          {isLoading
            ? stats.map((item) => (
                <article className="dashboard-stat-card dashboard-skeleton" key={item.label} aria-hidden="true">
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </article>
              ))
            : stats.map((item) => (
                <article className="dashboard-stat-card" key={item.label}>
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </article>
              ))}
        </div>

        <section className="dashboard-section dashboard-reveal reveal-on-scroll">
          <header className="dashboard-section-head">
            <h2>My Courses</h2>
          </header>

          <div className="dashboard-courses-grid">
            {isLoading
              ? courses.map((item) => (
                  <article className="dashboard-course-card dashboard-skeleton" key={item.title} aria-hidden="true">
                    <div className="skeleton-image" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                  </article>
                ))
              : courses.map((course) => (
                  <article className="dashboard-course-card" key={course.title}>
                    <img src={course.image} alt={course.title} loading="lazy" />
                    <div className="dashboard-course-content">
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className="dashboard-progress-bar-wrap">
                        <span style={{ width: `${course.progress}%` }} />
                      </div>
                      <button type="button"><FaPlayCircle aria-hidden="true" /> Continue</button>
                    </div>
                  </article>
                ))}
          </div>
        </section>

        <section className="dashboard-section dashboard-reveal reveal-on-scroll" id="certificates">
          <header className="dashboard-section-head">
            <h2>Recent Activity</h2>
          </header>

          <ul className="dashboard-activity-list">
            {isLoading
              ? activityItems.map((item) => (
                  <li className="dashboard-skeleton" key={item} aria-hidden="true">
                    <span className="skeleton-dot" />
                    <span className="skeleton-line" />
                  </li>
                ))
              : activityItems.map((item) => (
                  <li key={item}>
                    <span className="activity-dot" />
                    <p>{item}</p>
                  </li>
                ))}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
