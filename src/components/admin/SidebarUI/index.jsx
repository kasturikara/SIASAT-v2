import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import {
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
  return (
    <Sidebar className="fixed top-0 left-0 z-40 w-56 h-screen -translate-x-full border-r border-gray-200 md:translate-x-0 pt-14">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/" icon={AiOutlineDashboard}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={AiOutlineTeam} label="Guru">
            <Sidebar.Item as={Link} to="/mapel" icon={AiOutlineRead}>
              Mapel
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/materi" icon={AiOutlineSolution}>
              Materi
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={AiOutlineUser} label="Murid">
            <Sidebar.Item as={Link} to="/absensi" icon={AiOutlineClockCircle}>
              Absensi
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/nilai" icon={AiOutlinePercentage}>
              Nilai
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item as={Link} to="/jadwal" icon={AiOutlineSchedule}>
            Jadwal
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/kelas" icon={AiOutlineApartment}>
            Kelas
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/pengumuman" icon={AiOutlineBell}>
            Pengumuman
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/user" icon={AiOutlineProfile}>
            User
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarUI;
