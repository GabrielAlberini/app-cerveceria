/* eslint-disable react/prop-types */
const Layout = ({ children }) => {
  return (
    <>
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            Mi Logo
          </a>
        </div>
      </nav>
      <main style={{ minHeight: "100vh" }}>{children}</main>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Mi Sitio</strong> by Tu Nombre.
          </p>
        </div>
      </footer>
    </>
  );
};

export { Layout };
