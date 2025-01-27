import { FormApp } from "../../FormApp";
import { Layout } from "../../components/Layout/Layout";
import { Banner } from "../../components/Banner/Banner";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <Layout>
      <Banner urlImage={"./banner.png"} />
      <section className="custom-section-home">
        <div className="cont-titles-section-home">
          <ul>
            <li>1. COMPLETÁ TUS DATOS.</li>
            <li>2. GENERÁ UN CÓDIGO.</li>
            <li>3. PEDILE AL MOZO QUE LO VALIDE.</li>
            <li>4. DESCARGALO.</li>
            <li>5. DISFRUTÁ.</li>
          </ul>

          <div id="cont-text-cupon-diario">
            <span>[</span>
            <p>
              PODÉS GENERAR UN
              <br /> CUPÓN POR DÍA
            </p>
            <span>]</span>
          </div>
        </div>
        <div className="custom-cont-img-home">
          <div className="cont-img-home">
            <img src="./lisos.jpg" alt="" />
          </div>
          <div className="cont-img-home cont-img-2">
            <Link to={"/bases-y-condiciones"}>BASES Y CONDICIONES</Link>
          </div>
        </div>
      </section>

      <section
        className="custom-section-cupon"
        style={{ backgroundImage: `url(${"./textura.jpg"})` }}
      >
        <FormApp />
      </section>
    </Layout>
  );
};

export { Home };
