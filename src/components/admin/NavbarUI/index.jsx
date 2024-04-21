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

import { Link } from "react-router-dom";

function index() {
  const user = JSON.parse(localStorage.getItem("login"));

  return (
    <Navbar className="fixed top-0 left-0 right-0 z-50 bg-blue-500 ">
      <NavbarBrand as={Link} to="/">
        <img
          src="logo_siasat.png"
          alt="logo"
          className="w-12 h-12 p-1 rounded-full bg-gray-50 "
        />
        <span className="self-center ml-3 text-xl font-semibold text-white whitespace-nowrap">
          SIASAT
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="avatar user" img="hacker.png" rounded />}
        >
          <DropdownHeader>
            <span className="block text-sm">{user.user.username}</span>
            <span className="block text-sm font-medium truncate">
              {user.user.email}
            </span>
          </DropdownHeader>
          <DropdownItem>Setting</DropdownItem>
          <DropdownDivider />
          <DropdownItem
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Sign Out
          </DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
    </Navbar>
  );
}

export default index;
