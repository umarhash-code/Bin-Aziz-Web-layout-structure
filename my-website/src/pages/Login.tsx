import { useEffect, useState, type FC, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { api } from "../lib/api";
import { saveSession } from "../lib/auth";

type LoginState = {
  redirectTo?: string;
  selectedCourse?: string;
};

const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LoginState | null) ?? null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("binazizRememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.login({ email, password });
      if (rememberMe) {
        localStorage.setItem("binazizRememberedEmail", email);
      } else {
        localStorage.removeItem("binazizRememberedEmail");
      }
      saveSession(response.token, response.user);
      navigate(state?.redirectTo ?? "/courses", {
        state: { selectedCourse: state?.selectedCourse },
      });
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page login-page">
      <form className="auth-card auth-form login-card" onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <p>Sign in to access your dashboard and continue your work.</p>
        {error ? <p className="auth-error">{error}</p> : null}

        <label className="login-field">
          <span>Email</span>
          <div className="login-input-wrap">
            <FaEnvelope aria-hidden="true" />
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
          </div>
        </label>

        <label className="login-field">
          <span>Password</span>
          <div className="login-input-wrap">
            <FaLock aria-hidden="true" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="login-toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
            </button>
          </div>
        </label>

        <div className="login-options-row">
          <label className="login-remember">
            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
            <span>Remember me</span>
          </label>
          <Link to="/faq" className="login-forgot-link">Forgot password?</Link>
        </div>

        <button type="submit" className="enroll-btn login-submit-btn" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>

        <button type="button" className="auth-link-btn login-create-btn" onClick={() => navigate("/signup")}>Create Account</button>
      </form>
    </section>
  );
};

export default Login;
