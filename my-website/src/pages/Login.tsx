import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type LoginState = {
  redirectTo?: string;
  selectedCourse?: string;
};

const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LoginState | null) ?? null;

  const handleLogin = () => {
    localStorage.setItem("binazizLoggedIn", "true");
    navigate(state?.redirectTo ?? "/courses", {
      state: { selectedCourse: state?.selectedCourse },
    });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Login Required</h1>
        <p>Please login first to continue your enrollment process.</p>
        <button type="button" className="enroll-btn" onClick={handleLogin}>
          Continue as Logged In User
        </button>
      </div>
    </section>
  );
};

export default Login;
