// Importa los módulos necesarios de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const handleFetch = async (nuevoRegistro) => {
  const registro = {
    Nombre: nuevoRegistro.nombre,
    DNI: nuevoRegistro.dni,
    Email: nuevoRegistro.correoElectronico,
    Hora: nuevoRegistro.horaGeneracion,
    "Fecha de nacimiento": `${nuevoRegistro.diaNacimiento}/${nuevoRegistro.mesNacimiento}/${nuevoRegistro.anoNacimiento}`,
    Bar: nuevoRegistro.seleccionBar,
    Cupon: nuevoRegistro.codigoGenerado,
  };

  try {
    // Agregar el documento a la colección "cupones"
    await addDoc(collection(db, "cupones"), registro);
  } catch (error) {
    console.error("Error al guardar el documento:", error);
  }
};

export { handleFetch };
