function Login() {
  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center">
      <section className="container mw-500px border shadow p-3">
        <h3>Login</h3>
        <form>
          <hr />
          <label htmlFor="loginEmail" className="form-label">
            Email:
          </label>
          <input
            type="text"
            id="loginEmail"
            className="form-control"
            required
          />
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="text"
            name="loginPassword"
            className="form-control"
            required
          />
          <button
            type="submit"
            className="btn btn-outline-primary form-control my-3"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
