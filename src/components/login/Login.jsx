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
        <button className={styles.closeBtn} type="button" onClick={onClose}>
          &times;
        </button>
        <h1>Julemandens Værksted</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Julemandens email"
              required
              style={{
                width: "340px",
                height: "35px",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Julemandens kodeord"
              required
              style={{
                width: "340px",
                height: "35px",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
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
