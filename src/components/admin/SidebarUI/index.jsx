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
  FaRegBell,
  FaRegBuilding,
  FaRegCalendarCheck,
  FaRegChartBar,
  FaRegFileAlt,
  FaRegFolderOpen,
  FaRegUser,
  FaUser,
} from "react-icons/fa";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi";

function SidebarUI() {
  const location = useLocation();

  return (
    <Sidebar className="fixed top-0 left-0 z-40 w-56 h-screen -translate-x-full border-r border-gray-200 md:translate-x-0 pt-14">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            to="/"
            icon={
              location.pathname !== "/" ? AiOutlineDashboard : AiFillDashboard
            }
            active={location.pathname === "/"}
            className={`hover:bg-slate-200 hover:text-gray-500 ${
              location.pathname === "/" &&
              "bg-slate-300 text-gray-700 font-medium"
            } `}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiOutlineUserGroup} label="Guru">
            <Sidebar.Item
              as={Link}
              to="/mapel"
              icon={location.pathname !== "/mapel" ? FaRegFileAlt : FaFileAlt}
              active={location.pathname === "/mapel"}
              className={`hover:bg-slate-200 hover:text-gray-500 ${
                location.pathname === "/mapel" &&
                "bg-slate-300 text-gray-700 font-medium"
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
              className={`hover:bg-slate-200 hover:text-gray-500 ${
                location.pathname === "/materi" &&
                "bg-slate-300 text-gray-700 font-medium"
              } `}
            >
              Materi
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={HiOutlineUsers}
            label="Murid"
            className="hover:bg-slate-200 hover:text-gray-500"
          >
            <Sidebar.Item
              as={Link}
              to="/absensi"
              icon={
                location.pathname !== "/absensi"
                  ? FaRegCalendarCheck
                  : FaCalendarCheck
              }
              active={location.pathname === "/absensi"}
              className={`hover:bg-slate-200 hover:text-gray-500 ${
                location.pathname === "/absensi" &&
                "bg-slate-300 text-gray-700 font-medium"
              } `}
            >
              Absensi
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/nilai"
              icon={location.pathname !== "/nilai" ? FaRegChartBar : FaChartBar}
              active={location.pathname === "/nilai"}
              className={`hover:bg-slate-200 hover:text-gray-500 ${
                location.pathname === "/nilai" &&
                "bg-slate-300 text-gray-700 font-medium"
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
            className={`hover:bg-slate-200 hover:text-gray-500 ${
              location.pathname === "/jadwal" &&
              "bg-slate-300 text-gray-700 font-medium"
            } `}
          >
            Jadwal
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/kelas"
            icon={location.pathname !== "/kelas" ? FaRegBuilding : FaBuilding}
            active={location.pathname === "/kelas"}
            className={` hover:bg-slate-200 hover:text-gray-500 ${
              location.pathname === "/kelas" &&
              "bg-slate-300 text-gray-700 font-medium"
            } `}
          >
            Kelas
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/pengumuman"
            icon={location.pathname !== "/pengumuman" ? FaRegBell : FaBell}
            active={location.pathname === "/pengumuman"}
            className={`hover:bg-slate-200 hover:text-gray-500 ${
              location.pathname === "/pengumuman" &&
              "bg-slate-300 text-gray-700 font-medium"
            } `}
          >
            Pengumuman
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/user"
            icon={location.pathname !== "/user" ? FaRegUser : FaUser}
            active={location.pathname === "/user"}
            className={` hover:bg-slate-200 hover:text-gray-500 ${
              location.pathname === "/user" &&
              "bg-slate-300 text-gray-700 font-medium"
            } `}
          >
            User
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="fixed bottom-0">
          <Sidebar.Item className="mx-auto text-sm text-center text-gray-500">
            Created by kelompok 2
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarUI;
