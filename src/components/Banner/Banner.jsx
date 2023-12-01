import "./Banner.css";

// eslint-disable-next-line react/prop-types
export const Banner = ({ title, urlImage }) => {
  return (
    <section
      className="is-bold custom-hero-background"
      style={{ backgroundImage: `url(${urlImage})` }}
    >
      <div className="hero-body">
        <div className="cont-title-banner">
          <h1 className="title is-1 has-text-white is-size-1-mobile is-size-2-tablet is-size-1-desktop">
            {title}
          </h1>{" "}
        </div>
      </div>
    </section>
  );
};
