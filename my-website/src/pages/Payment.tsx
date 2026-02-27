import { useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { isLoggedIn } from "../lib/auth";

type PaymentState = {
  selectedCourse?: string;
  selectedCourseId?: string;
  selectedService?: string;
};

const Payment: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as PaymentState | null) ?? null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loggedIn = isLoggedIn();

  const handlePayment = async () => {
    setError("");
    setLoading(true);

    try {
      if (state?.selectedCourseId) {
        await api.buyCourse(state.selectedCourseId);
      } else if (state?.selectedService) {
        setError("Service ordering is not available yet. Please contact support to place a service order.");
        setLoading(false);
        return;
      }

      navigate("/dashboard", { state: { enrolledCourse: state?.selectedCourse ?? state?.selectedService ?? "Selected Item" } });
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Payment failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    navigate("/login", { state: { redirectTo: "/payment", selectedCourse: state?.selectedCourse } });
    return null;
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Payment</h1>
        <p>Item: {state?.selectedCourse ?? state?.selectedService ?? "Selected Item"}</p>
        {error ? <p className="auth-error">{error}</p> : null}
        <button type="button" className="enroll-btn" onClick={() => void handlePayment()} disabled={loading}>
          {loading ? "Processing..." : "Pay & Continue"}
        </button>
      </div>
    </section>
  );
};

export default Payment;
