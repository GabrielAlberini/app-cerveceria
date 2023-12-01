import "./Banner.css";

// eslint-disable-next-line react/prop-types
export const Banner = ({ title, urlImage }) => {
  return (
    <section
      className="is-bold custom-hero-background"
      style={{ backgroundImage: `url(${urlImage})` }}
    >
      <div className="hero-body">
        <div>
          <h1 className="title is-1 has-text-white">{title}</h1>
        </div>
      </div>
    </section>
  );
};
