import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getMuridByUser } from "../../api/supabase";
import NavbarUI from "../../components/murid/NavbarUI";
import SidebarUI from "../../components/murid/SidebarUI";
import { Spinner } from "flowbite-react";

function MuridLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    getDataMurid();
  }, []);

  async function getDataMurid() {
    setLoading(true);
    try {
      const data = await getMuridByUser(user?.user);
      localStorage.setItem("murid", JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="antialiased bg-slate-200">
      <NavbarUI isOpen={isOpen} />
      <SidebarUI isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={`transition-all duration-200 ease-in-out min-h-screen p-4 pt-20 ${
          isOpen ? "md:ml-56" : "ml-12"
        } bg-slate-200`}
      >
        {loading ? (
          <div className="flex items-center justify-center my-24">
            <Spinner />
          </div>
        ) : (
          children
        )}
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

MuridLayout.propTypes = {
  children: PropTypes.node,
};

export default MuridLayout;
