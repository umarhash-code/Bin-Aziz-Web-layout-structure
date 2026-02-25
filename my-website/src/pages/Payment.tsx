import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type PaymentState = {
  selectedCourse?: string;
};

const Payment: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as PaymentState | null) ?? null;

  const isLoggedIn = localStorage.getItem("binazizLoggedIn") === "true";

  const handlePayment = () => {
    navigate("/dashboard", { state: { enrolledCourse: state?.selectedCourse ?? "Selected Course" } });
  };

  if (!isLoggedIn) {
    navigate("/login", { state: { redirectTo: "/payment", selectedCourse: state?.selectedCourse } });
    return null;
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Payment</h1>
        <p>Course: {state?.selectedCourse ?? "Selected Course"}</p>
        <button type="button" className="enroll-btn" onClick={handlePayment}>
          Pay & Continue
        </button>
      </div>
    </section>
  );
};

export default Payment;
