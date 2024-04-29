import PropTypes from "prop-types";

import NavbarUI from "../../components/admin/NavbarUI";
import SidebarUI from "../../components/admin/SidebarUI";

function AdminLayout({ children }) {
  return (
    <div className="antialiased bg-gray-50">
      <NavbarUI />
      <SidebarUI />
      <main className="h-auto p-4 pt-20 md:ml-56 bg-slate-200">{children}</main>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
