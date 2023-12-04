import { Link } from "react-router-dom";
import "./Layout.css";

/* eslint-disable react/prop-types */
const Layout = ({ children }) => {
  return (
    <>
      <nav
        className="navbar custom-navbar p-4 "
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item has-text-white" to="/">
            <img
              src="./logo.png" // Reemplaza esto con la ruta a tu logotipo
              alt="Mi Logo"
              style={{ maxHeight: "none", height: "3em" }} // Ajusta el tamaño máximo y actual
            />
          </Link>
        </div>

        <div id="navbarMenu" className="navbar-menu">
          <div className="navbar-end ml-auto">
            {" "}
            {/* Añade la clase ml-auto aquí */}
            <Link
              to={"/cupon"}
              className="navbar-item custom-link-header"
              href="/"
            >
              CUPÓN
            </Link>
            <Link
              to={"/bases-y-condiciones"}
              className="navbar-item custom-link-header"
              href="/"
            >
              BASES Y CONDICIONES
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ minHeight: "100vh" }}>{children}</main>
      <footer
        className="footer"
        style={{ color: "white", backgroundColor: "black" }}
      >
        <div className="content has-text-centered">
          <p>
            © Cerveza Santa Fe Beber con moderación. Prohibida su venta a
            menores de 18 años. No comparta este contenido con menores.
          </p>
          <p>
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/gabriel-alberini/"
              target="_blank"
              rel="noreferrer"
              className="custom-link-footer"
            >
              Gabriel Alberini
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export { Layout };
