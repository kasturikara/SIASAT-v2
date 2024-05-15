import PropTypes from "prop-types";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard, AiOutlineDashboard } from "react-icons/ai";
import {
  FaBell,
  FaBuilding,
  FaCalendarCheck,
  FaChartBar,
  FaFileAlt,
  FaFolderOpen,
  FaIdBadge,
  FaRegBell,
  FaRegBuilding,
  FaRegCalendarCheck,
  FaRegChartBar,
  FaRegFileAlt,
  FaRegFolderOpen,
  FaRegIdBadge,
  FaRegUser,
  FaRegUserCircle,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

function SidebarUI({ isOpen, setIsOpen }) {
  const location = useLocation();

  return isOpen ? (
    <Sidebar className="fixed top-0 left-0 z-40 w-56 h-screen transition-all duration-200 ease-in-out -translate-x-full border-r border-gray-200 md:translate-x-0">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            className="text-gray-900 d hover:text-teal-500 hover:bg-gray-50 hover:cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <PiCaretLeft className="ml-auto text-2xl " />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            to="/"
            icon={
              location.pathname !== "/" ? AiOutlineDashboard : AiFillDashboard
            }
            active={location.pathname === "/"}
            className={`hover:bg-teal-200 hover:text-gray-500 ${
              location.pathname === "/" &&
              "bg-teal-200 text-gray-700 font-medium"
            } `}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiOutlineUserGroup} label="Guru">
            <Sidebar.Item
              as={Link}
              to="/guru"
              icon={location.pathname !== "/guru" ? FaRegIdBadge : FaIdBadge}
              active={location.pathname === "/guru"}
              className={`hover:bg-teal-200 hover:text-gray-500 ${
                location.pathname === "/guru" &&
                "bg-teal-200 text-gray-700 font-medium"
              } `}
            >
              Guru
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/mapel"
              icon={location.pathname !== "/mapel" ? FaRegFileAlt : FaFileAlt}
              active={location.pathname === "/mapel"}
              className={`hover:bg-teal-200 hover:text-gray-500 ${
                location.pathname === "/mapel" &&
                "bg-teal-200 text-gray-700 font-medium"
              } `}
            >
              Mapel
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/materi"
              icon={
                location.pathname !== "/materi" ? FaRegFolderOpen : FaFolderOpen
              }
              active={location.pathname === "/materi"}
              className={`hover:bg-teal-200 hover:text-gray-500 ${
                location.pathname === "/materi" &&
                "bg-teal-200 text-gray-700 font-medium"
              } `}
            >
              Materi
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={HiOutlineUsers}
            label="Murid"
            className="hover:bg-teal-200 hover:text-gray-500"
          >
            <Sidebar.Item
              as={Link}
              to="/murid"
              icon={
                location.pathname !== "/murid" ? FaRegUserCircle : FaUserCircle
              }
              active={location.pathname === "/murid"}
              className={`hover:bg-teal-200 hover:text-gray-500 ${
                location.pathname === "/murid" &&
                "bg-teal-200 text-gray-700 font-medium"
              } `}
            >
              Murid
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/absensi"
              icon={
                location.pathname !== "/absensi"
                  ? FaRegCalendarCheck
                  : FaCalendarCheck
              }
              active={location.pathname === "/absensi"}
              className={`hover:bg-teal-200 hover:text-gray-500 ${
                location.pathname === "/absensi" &&
                "bg-teal-200 text-gray-700 font-medium"
              } `}
            >
              Absensi
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/nilai"
              icon={location.pathname !== "/nilai" ? FaRegChartBar : FaChartBar}
              active={location.pathname === "/nilai"}
              className={`hover:bg-teal-200 hover:text-gray-500 ${
                location.pathname === "/nilai" &&
                "bg-teal-200 text-gray-700 font-medium"
              } `}
            >
              Nilai
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            as={Link}
            to="/jadwal"
            icon={
              location.pathname !== "/jadwal"
                ? FaRegCalendarCheck
                : FaCalendarCheck
            }
            active={location.pathname === "/jadwal"}
            className={`hover:bg-teal-200 hover:text-gray-500 ${
              location.pathname === "/jadwal" &&
              "bg-teal-200 text-gray-700 font-medium"
            } `}
          >
            Jadwal
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/kelas"
            icon={location.pathname !== "/kelas" ? FaRegBuilding : FaBuilding}
            active={location.pathname === "/kelas"}
            className={` hover:bg-teal-200 hover:text-gray-500 ${
              location.pathname === "/kelas" &&
              "bg-teal-200 text-gray-700 font-medium"
            } `}
          >
            Kelas
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/pengumuman"
            icon={location.pathname !== "/pengumuman" ? FaRegBell : FaBell}
            active={location.pathname === "/pengumuman"}
            className={`hover:bg-teal-200 hover:text-gray-500 ${
              location.pathname === "/pengumuman" &&
              "bg-teal-200 text-gray-700 font-medium"
            } `}
          >
            Pengumuman
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/user"
            icon={location.pathname !== "/user" ? FaRegUser : FaUser}
            active={location.pathname === "/user"}
            className={` hover:bg-teal-200 hover:text-gray-500 ${
              location.pathname === "/user" &&
              "bg-teal-200 text-gray-700 font-medium"
            } `}
          >
            User
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  ) : (
    <Sidebar className="fixed top-0 left-0 z-40 w-12 h-screen transition-all duration-200 ease-in-out -translate-x-full border-r border-gray-200 md:translate-x-0">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            className="text-gray-900 d hover:text-teal-500 hover:bg-gray-50 hover:cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <PiCaretRight className="text-2xl" />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

SidebarUI.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default SidebarUI;
