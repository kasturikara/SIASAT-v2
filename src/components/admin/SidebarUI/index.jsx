import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";

function SidebarUI() {
  return (
    <Sidebar className="fixed top-0 left-0 z-40 h-screen -translate-x-full border-r border-gray-200 md:translate-x-0 pt-14">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/" icon={BiSolidDashboard}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={BiSolidDashboard} label="Dashboard">
            <Sidebar.Item as={Link} to="/" icon={BiSolidDashboard}>
              Dashboard
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarUI;
