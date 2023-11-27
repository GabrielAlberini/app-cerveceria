/* eslint-disable react/prop-types */
const CountdownTimer = ({ tiempoRestante }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <p>Tiempo restante para disponibilidad: {formatTime(tiempoRestante)}</p>
  );
};

export { CountdownTimer };
