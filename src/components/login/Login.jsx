import styles from './login.module.css'

const LoginModal = ({show, onClose}) => {

        const handleLogin = (e) => {
            e.preventDefault()

            const email = e.target.email.value
            const password = e.target.password.value
            console.log("Email:", email, "Password:", password);
            onclose()
        }

        if(!show) return null

    return (
      <section className={styles.container}>
        <h1 className={styles.title}>Julemandens Værksted</h1>

        <button className={styles.closeBtn} type="button" onClick={onClose}>
          &times;
        </button>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"></label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"></label>
            <input
              type="password"
              className="form-control"
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
    );
}

export default LoginModal