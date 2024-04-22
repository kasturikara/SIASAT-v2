import PropTypes from "prop-types";

function GuruLayout({ children }) {
  return (
    <div>
      <p>GuruLayout</p>
      <div>{children}</div>
    </div>
  );
}

GuruLayout.propTypes = {
  children: PropTypes.node,
};

export default GuruLayout;
