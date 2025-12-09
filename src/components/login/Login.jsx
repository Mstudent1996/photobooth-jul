import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const dummyAdmin = {
  email: "admin@admin.com",
  password: "1234",
  role: "admin",
};

const LoginModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === dummyAdmin.email && password === dummyAdmin.password) {
      localStorage.setItem("role", dummyAdmin.role);
      navigate("/admin");

      if (onClose) onClose();
    } else {
      alert("Forkert login");
    }
  };
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <section className={styles.container}>
        <h1>Julemandens Værksted</h1>

        <button className={styles.closeBtn} type="button" onClick={onClose}>
          &times;
        </button>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginModal;
