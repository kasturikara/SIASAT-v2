import PropTypes from "prop-types";

import NavbarUI from "../../components/admin/NavbarUI";
import SidebarUI from "../../components/admin/SidebarUI";
import { useState } from "react";

function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="antialiased bg-gray-50">
      <NavbarUI isOpen={isOpen} />
      <SidebarUI isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={`transition-all duration-200 ease-in-out min-h-screen p-4 pt-20 ${
          isOpen ? "md:ml-56" : "ml-12"
        } bg-slate-200`}
      >
        {children}
      </main>
      <footer className="shadow bg-slate-200">
        <div className="w-full max-w-screen-xl p-4 mx-auto">
          <hr className="mb-2 border-gray-300 sm:mx-auto" />
          <span className="block text-sm text-gray-500 sm:text-center">
            Created by kelompok 2
          </span>
        </div>
      </footer>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
