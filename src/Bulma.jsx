import { useState, useEffect } from "react";
import { AlertMessage } from "./components/Alert/Alert";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import "./App.css";
import { CountdownTimer } from "./components/CountdownTimer/CountdownTimer";

const App = () => {
  const getInitialState = () => {
    const storedUltimoRegistro =
      JSON.parse(localStorage.getItem("ultimoRegistro")) || {};
    const storedFechaValidez = localStorage.getItem("fechaValidez") || null;

    const tiempoRestante = storedFechaValidez
      ? Math.floor((new Date(storedFechaValidez).getTime() - Date.now()) / 1000)
      : 0;

    return {
      ultimoRegistro: storedUltimoRegistro,
      tiempoRestante,
      codigoGenerado: storedUltimoRegistro.codigoGenerado || "",
      formulario: {
        nombre: "",
        dni: "",
        diaNacimiento: "",
        mesNacimiento: "",
        anoNacimiento: "",
        usuarioInstagram: "",
        seleccionBar: "",
      },
    };
  };

  const [estado, setEstado] = useState(getInitialState());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    let intervalId;

    if (estado.tiempoRestante > 0) {
      intervalId = setInterval(() => {
        setEstado((prevEstado) => ({
          ...prevEstado,
          tiempoRestante: prevEstado.tiempoRestante - 1,
        }));
      }, 1000);
    } else {
      // Si el tiempoRestante llega a 0, ejecutar eliminarRegistro
      eliminarRegistro();
    }

    return () => clearInterval(intervalId);
  }, [estado.tiempoRestante]);

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
    const { diaNacimiento, mesNacimiento, anoNacimiento } = estado.formulario;
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

      const nuevoRegistro = {
        dni: estado.formulario.dni,
        nombre: estado.formulario.nombre,
        usuarioInstagram: estado.formulario.usuarioInstagram,
        diaNacimiento: estado.formulario.diaNacimiento,
        mesNacimiento: estado.formulario.mesNacimiento,
        anoNacimiento: estado.formulario.anoNacimiento,
        seleccionBar: estado.formulario.seleccionBar,
        horaGeneracion: fechaGeneracion.toLocaleTimeString(),
        codigoGenerado: nuevoCodigo,
      };

      setEstado((prevEstado) => ({
        ...prevEstado,
        codigoGenerado: nuevoCodigo,
        ultimoRegistro: nuevoRegistro,
      }));

      localStorage.setItem("ultimoRegistro", JSON.stringify(nuevoRegistro));

      const fechaValidez = new Date(fechaGeneracion);
      fechaValidez.setSeconds(fechaValidez.getSeconds() + 30);
      localStorage.setItem("fechaValidez", fechaValidez.toISOString());

      const tiempoRestante = Math.floor(
        (fechaValidez.getTime() - Date.now()) / 1000
      );

      setEstado((prevEstado) => ({
        ...prevEstado,
        tiempoRestante,
      }));
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

    setEstado((prevEstado) => ({
      ...prevEstado,
      codigoGenerado: "",
      tiempoRestante: 0,
      ultimoRegistro: {},
    }));
  };

  useEffect(() => {
    const storedUltimoRegistro =
      JSON.parse(localStorage.getItem("ultimoRegistro")) || {};
    setEstado((prevEstado) => ({
      ...prevEstado,
      ultimoRegistro: storedUltimoRegistro,
    }));

    const existingCode = storedUltimoRegistro.codigoGenerado;
    if (existingCode) {
      setEstado((prevEstado) => ({
        ...prevEstado,
        codigoGenerado: existingCode,
      }));
    }

    const storedFechaValidez = localStorage.getItem("fechaValidez");
    if (storedFechaValidez) {
      const tiempoRestante = Math.floor(
        (new Date(storedFechaValidez).getTime() - Date.now()) / 1000
      );
      setEstado((prevEstado) => ({
        ...prevEstado,
        tiempoRestante,
      }));
    }
  }, []);

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
    } = estado.formulario;

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

    const existeRegistro = estado.ultimoRegistro.dni === dni;

    if (existeRegistro) {
      showAlertMessage(
        "No puedes generar otro código con el mismo DNI en menos de 24 horas.",
        "warning"
      );
      return;
    }

    generarCodigo();
    setEstado((prevEstado) => ({
      ...prevEstado,
      formulario: {
        nombre: "",
        dni: "",
        diaNacimiento: "",
        mesNacimiento: "",
        anoNacimiento: "",
        usuarioInstagram: "",
        seleccionBar: "",
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstado((prevEstado) => ({
      ...prevEstado,
      formulario: {
        ...prevEstado.formulario,
        [name]: value,
      },
    }));
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
          {estado.codigoGenerado ? (
            <article className="mt-4 has-text-centered">
              <div id="cupon" className="cupon">
                <p className="title is-4 has-text-info">¡Código Generado!</p>
                <p className="subtitle is-3 has-text-danger">
                  {estado.codigoGenerado}
                </p>
                <p className="subtitle is-5 has-text-info">
                  Bar: {estado.ultimoRegistro.seleccionBar || ""}
                </p>
                <div className="additional-info">
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {estado.ultimoRegistro.nombre || ""}
                  </p>
                  <p>
                    <strong>DNI:</strong> {estado.ultimoRegistro.dni || ""}
                  </p>
                  <p>
                    <strong>Instagram:</strong>{" "}
                    {estado.ultimoRegistro.usuarioInstagram || ""}
                  </p>
                  <p>
                    <strong>Fecha de validez:</strong> {calcularFechaValidez()}
                  </p>
                  {estado.tiempoRestante > 0 && (
                    <CountdownTimer tiempoRestante={estado.tiempoRestante} />
                  )}
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
                <label className="label">Usuario de Instagram:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="usuarioInstagram"
                    value={estado.formulario.usuarioInstagram}
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
