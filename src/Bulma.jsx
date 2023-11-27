import { useState, useEffect } from "react";
import { AlertMessage } from "./components/Alert/Alert";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import "./App.css";

const App = () => {
  const [codigoGenerado, setCodigoGenerado] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [formulario, setFormulario] = useState({
    nombre: "",
    dni: "",
    diaNacimiento: "",
    mesNacimiento: "",
    anoNacimiento: "",
    usuarioInstagram: "",
    seleccionBar: "", // Nueva propiedad para almacenar la selección del bar
  });

  const [ultimoRegistro, setUltimoRegistro] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const storedUltimoRegistro =
      JSON.parse(localStorage.getItem("ultimoRegistro")) || {};
    setUltimoRegistro(storedUltimoRegistro);

    const existingCode = storedUltimoRegistro.codigoGenerado;
    if (existingCode) {
      setCodigoGenerado(existingCode);
    }

    const storedFechaValidez = localStorage.getItem("fechaValidez");
    if (storedFechaValidez) {
      const tiempoRestante = Math.floor(
        (new Date(storedFechaValidez).getTime() - Date.now()) / 1000
      );
      setTiempoRestante(tiempoRestante);
    }
  }, []);

  const showAlertMessage = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleDownload = async () => {
    const target = document.getElementById("cupon");
    const canvas = await html2canvas(target);
    canvas.toBlob((blob) => {
      saveAs(blob, "codigo_generado.jpg");
    });
  };

  const calcularEdad = () => {
    const { diaNacimiento, mesNacimiento, anoNacimiento } = formulario;
    const fechaNacimientoDate = new Date(
      `${anoNacimiento}-${mesNacimiento}-${diaNacimiento}`
    );
    const edadMilisegundos = Date.now() - fechaNacimientoDate.getTime();
    const edad = new Date(edadMilisegundos).getFullYear() - 1970;
    return edad;
  };

  const generarCodigo = () => {
    const edad = calcularEdad();

    if (edad >= 18) {
      const nuevoCodigo = Math.random().toString(36).substring(7);
      const fechaGeneracion = new Date();
      setCodigoGenerado(nuevoCodigo);

      const nuevoRegistro = {
        dni: formulario.dni,
        nombre: formulario.nombre,
        usuarioInstagram: formulario.usuarioInstagram,
        diaNacimiento: formulario.diaNacimiento,
        mesNacimiento: formulario.mesNacimiento,
        anoNacimiento: formulario.anoNacimiento,
        seleccionBar: formulario.seleccionBar, // Guarda la selección del bar
        horaGeneracion: fechaGeneracion.toLocaleTimeString(),
        codigoGenerado: nuevoCodigo,
      };

      setUltimoRegistro(nuevoRegistro);
      localStorage.setItem("ultimoRegistro", JSON.stringify(nuevoRegistro));

      // Calculate expiration date (30 seconds from generation)
      const fechaValidez = new Date(fechaGeneracion);
      fechaValidez.setSeconds(fechaValidez.getSeconds() + 30);
      localStorage.setItem("fechaValidez", fechaValidez.toISOString());

      // Set tiempoRestante al número de segundos que debes esperar
      const tiempoRestante = Math.floor(
        (fechaValidez.getTime() - Date.now()) / 1000
      );
      setTiempoRestante(tiempoRestante);
    } else {
      showAlertMessage(
        "Debes ser mayor de 18 años para generar un código.",
        "danger"
      );
    }
  };

  const eliminarRegistro = () => {
    localStorage.removeItem("fechaValidez");
    localStorage.removeItem("ultimoRegistro");
  };

  useEffect(() => {
    let intervalId;

    if (tiempoRestante > 0) {
      // Inicia un intervalo para decrementar el tiempoRestante cada segundo
      intervalId = setInterval(() => {
        setTiempoRestante((prevTiempo) => prevTiempo - 1);
      }, 1000);
    } else {
      // Cuando tiempoRestante llega a 0, restablece codigoGenerado a null
      setCodigoGenerado("");
      // Limpia localStorage
      eliminarRegistro();
    }

    // Limpia el intervalo cuando el componente se desmonta o cuando tiempoRestante llega a 0
    return () => clearInterval(intervalId);
  }, [tiempoRestante]);

  const calcularFechaValidez = () => {
    const fechaValidezString = localStorage.getItem("fechaValidez");
    if (!fechaValidezString) {
      return "Fecha de validez no disponible";
    }

    const fechaValidez = new Date(fechaValidezString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return fechaValidez.toLocaleDateString("es-ES", options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      nombre,
      dni,
      diaNacimiento,
      mesNacimiento,
      anoNacimiento,
      usuarioInstagram,
      seleccionBar,
    } = formulario;

    if (
      !nombre ||
      !dni ||
      !diaNacimiento ||
      !mesNacimiento ||
      !anoNacimiento ||
      !usuarioInstagram ||
      !seleccionBar
    ) {
      showAlertMessage(
        "Por favor, completa todos los campos del formulario.",
        "danger"
      );
      return;
    }

    if (dni.length < 7 || dni.length > 8) {
      showAlertMessage("El DNI debe tener entre 7 y 8 números.", "danger");
      return;
    }

    const existeRegistro = ultimoRegistro.dni === dni;

    if (existeRegistro) {
      showAlertMessage(
        "No puedes generar otro código con el mismo DNI en menos de 24 horas.",
        "warning"
      );
      return;
    }

    generarCodigo();
    setFormulario({
      nombre: "",
      dni: "",
      diaNacimiento: "",
      mesNacimiento: "",
      anoNacimiento: "",
      usuarioInstagram: "",
      seleccionBar: "", // Reinicia la selección del bar
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  return (
    <div
      className="columns is-centered p-5"
      style={{
        backgroundImage: 'url("bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="column is-half is-flex is-justify-content-center">
        <div className="box has-background-white-bis has-shadow p-5">
          <h1 className="title is-1 has-text-centered is-size-3 mb-4">
            Test Cupón Cervecería
          </h1>
          {showAlert && (
            <AlertMessage message={alertMessage} type={alertType} />
          )}
          {codigoGenerado ? (
            <article className="mt-4 has-text-centered">
              <div id="cupon" className="cupon">
                <p className="title is-4 has-text-info">¡Código Generado!</p>
                <p className="subtitle is-3 has-text-danger">
                  {codigoGenerado}
                </p>
                <p className="subtitle is-5 has-text-info">
                  Bar: {ultimoRegistro.seleccionBar || ""}
                </p>
                <div className="additional-info">
                  <p>
                    <strong>Nombre:</strong> {ultimoRegistro.nombre || ""}
                  </p>
                  <p>
                    <strong>DNI:</strong> {ultimoRegistro.dni || ""}
                  </p>
                  <p>
                    <strong>Instagram:</strong>{" "}
                    {ultimoRegistro.usuarioInstagram || ""}
                  </p>
                  <p>
                    <strong>Fecha de validez:</strong> {calcularFechaValidez()}
                  </p>
                </div>
                <p className="subtitle is-6 has-text-grey">
                  ¡Muéstrale este código al mozo y disfruta de tu cerveza!
                </p>
              </div>
              <button
                className="button is-primary mt-3"
                onClick={handleDownload}
              >
                Descargar como JPG
              </button>
            </article>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="field mb-4">
                <label className="label">Nombre:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
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
                    value={formulario.dni}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field mb-4">
                <label className="label">Usuario de Instagram:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="usuarioInstagram"
                    value={formulario.usuarioInstagram}
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
                      value={formulario.diaNacimiento}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="control input-custom">
                    <input
                      className="input"
                      type="number"
                      name="mesNacimiento"
                      placeholder="Mes (número)"
                      value={formulario.mesNacimiento}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      name="anoNacimiento"
                      placeholder="Año"
                      value={formulario.anoNacimiento}
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
                      value={formulario.seleccionBar}
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
                  <button
                    className="button is-primary is-fullwidth"
                    type="submit"
                  >
                    Generar Código
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export { App };
