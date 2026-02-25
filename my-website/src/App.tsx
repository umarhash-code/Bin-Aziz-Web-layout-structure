import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import AppDevelopment from "./pages/services/AppDevelopment";
import EducationSystems from "./pages/services/EducationSystems";
import ITCourses from "./pages/services/ITCourses";
import DataScience from "./pages/services/DataScience";
import WebServices from "./pages/services/WebServices";
import SEESAcademy from "./pages/portfolio/SEESAcademy";
import JaneayPeshawar from "./pages/portfolio/JaneayPeshawar";
import KhanGulDigital from "./pages/portfolio/KhanGulDigital";

function AppLayout() {
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard";

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/app-development" element={<AppDevelopment />} />
          <Route path="/services/education-systems" element={<EducationSystems />} />
          <Route path="/services/it-courses" element={<ITCourses />} />
          <Route path="/services/data-science" element={<DataScience />} />
          <Route path="/services/web-services" element={<WebServices />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/portfolio/sees-academy" element={<SEESAcademy />} />
          <Route path="/portfolio/janeay-peshawar" element={<JaneayPeshawar />} />
          <Route path="/portfolio/khangul-digital" element={<KhanGulDigital />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isDashboardRoute ? <Footer /> : null}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
