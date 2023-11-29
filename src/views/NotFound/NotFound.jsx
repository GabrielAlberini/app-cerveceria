import { Layout } from "../../components/Layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="columns is-centered">
        <div className="column is-half">
          <section className="hero is-danger">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Not Found</h1>
                <h2 className="subtitle">
                  Sorry, the page you are looking for does not exist.
                </h2>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export { NotFound };
