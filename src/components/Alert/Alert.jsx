/* eslint-disable react/prop-types */
const AlertMessage = ({ message, type }) => {
  return <div className={`notification is-${type}`}>{message}</div>;
};

export { AlertMessage };
