import { CountdownTimer } from "../CountdownTimer/CountdownTimer";

/* eslint-disable react/prop-types */
const Coupon = ({
  estado,
  handleDownload,
  handleCodigoValidado,
  calcularFechaValidez,
}) => {
  return (
    <article className="mt-4 has-text-centered">
      <div id="cupon" className="cupon">
        <p className="title is-4 has-text-info">¡Código Generado!</p>
        <p className="subtitle is-3 has-text-danger">{estado.codigoGenerado}</p>
        <p className="subtitle is-5 has-text-info">
          Bar: {estado.ultimoRegistro.seleccionBar || ""}
        </p>
        <div className="additional-info">
          <p>
            <strong>Nombre:</strong> {estado.ultimoRegistro.nombre || ""}
          </p>
          <p>
            <strong>DNI:</strong> {estado.ultimoRegistro.dni || ""}
          </p>
          <p>
            <strong>Correo Electronico:</strong>{" "}
            {estado.ultimoRegistro.correoElectronico || ""}
          </p>
          <p>
            <strong>Fecha de validez:</strong> {calcularFechaValidez()}
          </p>
          {estado.tiempoRestante > 0 && (
            <CountdownTimer tiempoRestante={estado.tiempoRestante} />
          )}
        </div>
        {estado.ultimoRegistro.codigoValidado ? (
          <p className="subtitle is-6 has-text-success">CÓDIGO VALIDADO</p>
        ) : (
          <button
            className="button is-success mt-3"
            onClick={() => handleCodigoValidado()}
            disabled={estado.ultimoRegistro.codigoValidado}
          >
            Validar Código
          </button>
        )}
        <p className="subtitle is-6 has-text-grey">
          ¡Muéstrale este código al mozo y disfruta de tu cerveza!
        </p>
      </div>
      <button className="button is-primary mt-3" onClick={handleDownload}>
        Descargar como JPG
      </button>
    </article>
  );
};

export { Coupon };
