import { App } from "../../App";
import { Layout } from "../../components/Layout/Layout";
import { Banner } from "../../components/Banner/Banner";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <Layout>
      <Banner
        title="GENERA TU CUPÓN Y DISTRUTA DE NUESTRA TRADICIÓN SANTAFESINA"
        urlImage={"./lata.jpg"}
      />
      <section className="custom-section-home">
        <div className="cont-titles-section-home">
          <h2>1. Valida tus datos.</h2>
          <h2>2. Genera un cupón.</h2>
          <h2>3. Pedile al mozo que te lo valide.</h2>
          <h2>4. Descargalo.</h2>
          <h2>5. Recorda que podes generar uno por día.</h2>
          <h2>6. DISFRUTA.</h2>
        </div>
        <div className="custom-cont-img-home">
          <div className="cont-img-home">
            <img src="./fabrica-2.png" alt="" />
          </div>
          <div className="cont-img-home cont-img-2">
            <p>
              Desde 1912, nos dedicamos a crear la bebida preferida por todos
              los amantes del liso. ¡Descubre nuestra trayectoria en este mes de
              celebración!
            </p>
            <Link to={"/"}>Ver bases y condiciones</Link>
          </div>
        </div>
      </section>

      <section className="custom-section-cupon">
        <App />
      </section>
    </Layout>
  );
};

export { Home };
