import "./Form.css";

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
              <option value="Mitos">Mitos</option>
              <option value="Diva">Diva</option>
              <option value="Republica">Republica</option>
              <option value="Don Marcos">Don Marcos</option>
              <option value="Primos">Primos</option>
              <option value="Agora">Agora</option>
              <option value="Lo de Nestor">Lo de Nestor</option>
              <option value="Bizarro">Bizarro</option>
              <option value="El Paralacio de Doña Rafaela">
                El Paralacio de Doña Rafaela
              </option>
              <option value="El Clásico">El Clásico</option>
              <option value="Bar La Amistad">Bar La Amistad</option>
              <option value="Say Mon">Say Mon</option>
              <option value="Say No More (Club Independiente)">
                Say No More (Club Independiente)
              </option>
              <option value="Say No More (Cortada Falucho)">
                Say No More (Cortada Falucho)
              </option>
              <option value="Dolce Vatita">Dolce Vatita</option>
              <option value="Restaurante España">Restaurante España</option>
              <option value="Almacen Alberdi">Almacen Alberdi</option>
              <option value="Patio Cerveceria">Patio Cerveceria</option>
              <option value="Zulma Ale">Zulma Ale </option>
              <option value="Nacional">Nacional</option>
              <option value="Doña Rafaela">Doña Rafaela</option>
              <option value="Sociedad Alemana 1">Sociedad Alemana 1</option>
              <option value="Sociedad Alemana 2">Sociedad Alemana 2</option>
              <option value="La Parrilla">La Parrilla</option>
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
