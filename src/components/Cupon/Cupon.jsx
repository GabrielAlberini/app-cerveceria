import "./Cupon.css";

/* eslint-disable react/prop-types */
const Coupon = ({
  estado,
  handleDownload,
  handleCodigoValidado,
  tiempoRestante,
}) => {
  return (
    <article className="mt-4 has-text-centered">
      <div id="cupon" className="cupon">
        <p className="title is-1">¡Cupón Generado!</p>
        {!estado.ultimoRegistro.codigoValidado && (
          <p className="has-text-danger mb-4">
            Mostrale el cupón al mozo para que te lo valide...
          </p>
        )}
        <p className="subtitle is-3 mt-5">
          <strong>{estado.codigoGenerado}-LISO</strong>
        </p>
        <div className="additional-info mt-5 mb-5">
          <p className="subtitle is-5">
            <strong>Bar:</strong> {estado.ultimoRegistro.seleccionBar || ""}
          </p>
          <p>
            <strong>Hora de Cupón generado:</strong>{" "}
            {estado.ultimoRegistro.horaGeneracion || ""}
          </p>
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

          {tiempoRestante > 0 && (
            <p className="pt-4">
              <strong>
                Tiempo restante para la disponibilidad del formulario:
              </strong>{" "}
              {tiempoRestante} horas.
            </p>
          )}
        </div>
        {estado.ultimoRegistro.codigoValidado && (
          <p className="subtitle is-6 has-text-danger mb-4">CÓDIGO VALIDADO</p>
        )}
      </div>
      <div className="cont-buttons-cupon">
        {!estado.ultimoRegistro.codigoValidado && (
          <button
            className="button is-success mt-3 custom-buttom-descargar"
            onClick={() => handleCodigoValidado()}
            disabled={estado.ultimoRegistro.codigoValidado}
          >
            Validar Código
          </button>
        )}
        <button
          className="button is-primary mt-3 custom-buttom-descargar"
          onClick={handleDownload}
        >
          Descargar como JPG
        </button>
      </div>
    </article>
  );
};

export { Coupon };
