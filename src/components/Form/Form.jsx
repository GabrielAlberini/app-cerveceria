import "./Form.css";

/* eslint-disable react/prop-types */
const Form = ({ estado, handleChange, handleSubmit }) => {
  const bares = [
    "Patio Cerveceria Santa Fe",
    "Don Marcos",
    "La City",
    "Primos",
    "1980",
    "El Palacio De Doña Rafaela",
    "Bizarro",
    "El Nacional",
    "Diva",
    "Lo De Nestor",
    "Mitos",
    "El Clásico",
    "Saymon",
    "Club Independiente",
    "Zulma Ale",
    "El Alberdi, Alma De Bodegón",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="field mb-4">
        <label className="label">Nombre:</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="nombre"
            value={estado.formulario.nombre}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field mb-4">
        <label className="label">DNI:</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="dni"
            value={estado.formulario.dni}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field mb-4">
        <label className="label">Correo Electronico:</label>
        <div className="control">
          <input
            className="input"
            type="email"
            name="correoElectronico"
            value={estado.formulario.correoElectronico}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field mb-4">
        <label className="label">Fecha de Nacimiento:</label>
        <div className="field is-mobile is-flex">
          <div className="control">
            <input
              className="input"
              type="number"
              name="diaNacimiento"
              placeholder="Día"
              value={estado.formulario.diaNacimiento}
              onChange={handleChange}
            />
          </div>
          <div className="control input-custom">
            <input
              className="input"
              type="number"
              name="mesNacimiento"
              placeholder="Mes (número)"
              value={estado.formulario.mesNacimiento}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <input
              className="input"
              type="number"
              name="anoNacimiento"
              placeholder="Año"
              value={estado.formulario.anoNacimiento}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="field mb-4">
        <label className="label">Selecciona el Bar:</label>
        <div className="control">
          <div className="select">
            <select
              name="seleccionBar"
              value={estado.formulario.seleccionBar}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {bares.map((bar) => (
                <option key={bar} value={bar}>
                  {bar}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button
            className="button is-primary is-fullwidth custom-button-submit"
            type="submit"
          >
            Generar Código
          </button>
        </div>
      </div>
    </form>
  );
};

export { Form };
