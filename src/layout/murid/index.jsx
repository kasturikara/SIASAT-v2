import PropTypes from "prop-types";

function MuridLayout({ children }) {
  return (
    <div>
      <p>MuridLayout</p>
      <div>{children}</div>
    </div>
  );
}

MuridLayout.propTypes = {
  children: PropTypes.node,
};

export default MuridLayout;
