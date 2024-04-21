import PropTypes from "prop-types";

function AdminLayout({ children }) {
  return (
    <>
      <div>AdminLayout</div>
      <div>{children}</div>
    </>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
