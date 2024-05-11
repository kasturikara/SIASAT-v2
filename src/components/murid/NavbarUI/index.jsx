import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggle,
} from "flowbite-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavbarUI = ({ isOpen }) => {
  const user = JSON.parse(localStorage.getItem("login"));

  return (
    <Navbar
      key={isOpen}
      className={`fixed top-0 transition-all duration-200 ease-in-out right-0 z-50 bg-teal-500 ${
        isOpen ? "left-56" : "left-12"
      }`}
    >
      <NavbarBrand as={Link} to="/">
        <img
          src="logo_siasat.png"
          alt="logo"
          className="w-12 h-12 p-1 rounded-full bg-gray-50"
        />
        <span className="self-center ml-3 text-xl font-semibold text-white whitespace-nowrap">
          SIASAT
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <>
              <p className="mr-2 text-white">{user?.user.role}</p>
              <Avatar alt="avatar user" img="hacker.png" rounded />
            </>
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user?.user.username}</span>
            <span className="block text-sm font-medium truncate">
              {user?.user.email}
            </span>
          </DropdownHeader>
          <DropdownItem as={Link} to="/profile">
            Profile
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Sign Out
          </DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
    </Navbar>
  );
};

NavbarUI.propTypes = {
  isOpen: PropTypes.bool,
};

export default NavbarUI;
