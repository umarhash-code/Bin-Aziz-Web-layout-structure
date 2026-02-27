import { useState, type FC, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { api } from "../lib/api";
import { saveSession } from "../lib/auth";

const Signup: FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const hasConfirmValue = confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword;
  const canSubmit = !loading && (!hasConfirmValue || passwordsMatch);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password and confirm password must match");
      return;
    }

    setLoading(true);

    try {
      await api.signup({ name, email, password });
      const loginResponse = await api.login({ email, password });
      saveSession(loginResponse.token, loginResponse.user);
      navigate("/courses");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Signup failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page login-page">
      <form className="auth-card auth-form login-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Register to access courses, services, and your personalized dashboard.</p>
        {error ? <p className="auth-error">{error}</p> : null}

        <label className="login-field">
          <span>Full Name</span>
          <div className="login-input-wrap">
            <FaUser aria-hidden="true" />
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" required />
          </div>
        </label>

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
              minLength={8}
              placeholder="At least 8 characters"
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

        <label className="login-field">
          <span>Confirm Password</span>
          <div className="login-input-wrap">
            <FaLock aria-hidden="true" />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              placeholder="Re-enter your password"
              required
            />
          </div>
        </label>

        {hasConfirmValue && !passwordsMatch ? <p className="auth-error">Password and confirm password must match</p> : null}

        <button type="submit" className="enroll-btn login-submit-btn" disabled={!canSubmit}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <Link to="/login" className="auth-link-btn login-create-btn">Already have an account? Login</Link>
      </form>
    </section>
  );
};

export default Signup;
