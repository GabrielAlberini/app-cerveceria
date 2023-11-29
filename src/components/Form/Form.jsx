/* eslint-disable react/prop-types */
const Form = ({ estado, handleChange, handleSubmit }) => {
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
              <option value="Opción 1">Opción 1</option>
              <option value="Opción 2">Opción 2</option>
              <option value="Opción 3">Opción 3</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary is-fullwidth" type="submit">
            Generar Código
          </button>
        </div>
      </div>
    </form>
  );
};

export { Form };
