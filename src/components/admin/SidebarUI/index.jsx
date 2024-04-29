import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {
  AiFillBell,
  AiOutlineApartment,
  AiOutlineBell,
  AiOutlineClockCircle,
  AiOutlineDashboard,
  AiOutlinePercentage,
  AiOutlineProfile,
  AiOutlineRead,
  AiOutlineSchedule,
  AiOutlineSolution,
  AiOutlineTeam,
  AiOutlineUser,
} from "react-icons/ai";

function SidebarUI() {
  const location = useLocation();

  return (
    <Sidebar className="fixed top-0 left-0 z-40 w-56 h-screen -translate-x-full border-r border-gray-200 md:translate-x-0 pt-14">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            to="/"
            icon={AiOutlineDashboard}
            active={location.pathname === "/"}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={AiOutlineTeam} label="Guru">
            <Sidebar.Item
              as={Link}
              to="/mapel"
              icon={AiOutlineRead}
              active={location.pathname === "/mapel"}
            >
              Mapel
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/materi"
              icon={AiOutlineSolution}
              active={location.pathname === "/materi"}
            >
              Materi
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={AiOutlineUser} label="Murid">
            <Sidebar.Item
              as={Link}
              to="/absensi"
              icon={AiOutlineClockCircle}
              active={location.pathname === "/absensi"}
            >
              Absensi
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/nilai"
              icon={AiOutlinePercentage}
              active={location.pathname === "/nilai"}
            >
              Nilai
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            as={Link}
            to="/jadwal"
            icon={AiOutlineSchedule}
            active={location.pathname === "/jadwal"}
          >
            Jadwal
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/kelas"
            icon={AiOutlineApartment}
            active={location.pathname === "/kelas"}
          >
            Kelas
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/pengumuman"
            icon={
              location.pathname !== "/pengumuman" ? AiOutlineBell : AiFillBell
            }
            active={location.pathname === "/pengumuman"}
            className={` hover:bg-teal-400 hover:text-gray-400 ${
              location.pathname === "/pengumuman" &&
              "bg-teal-300 text-gray-700 font-medium"
            } `}
          >
            Pengumuman
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/user"
            icon={AiOutlineProfile}
            active={location.pathname === "/user"}
          >
            User
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarUI;
