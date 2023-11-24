/* eslint-disable react/prop-types */
const AlertMessage = ({ message, type }) => {
  return (
    <div className={`notification is-${type}`}>
      <button className="delete" />
      {message}
    </div>
  );
};

export { AlertMessage };
