import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";

function SidebarUI() {
  return (
    <Sidebar className="fixed top-0 left-0 z-40 w-56 h-screen -translate-x-full border-r border-gray-200 md:translate-x-0 pt-14">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/" icon={BiSolidDashboard}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={BiSolidDashboard} label="Guru">
            <Sidebar.Item as={Link} to="/mapel" icon={BiSolidDashboard}>
              Mata Pelajaran
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/materi" icon={BiSolidDashboard}>
              Materi
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={BiSolidDashboard} label="Murid">
            <Sidebar.Item as={Link} to="/absensi" icon={BiSolidDashboard}>
              Absensi
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/nilai" icon={BiSolidDashboard}>
              Nilai
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item as={Link} to="/jadwal" icon={BiSolidDashboard}>
            Jadwal
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/kelas" icon={BiSolidDashboard}>
            Kelas
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/pengumuman" icon={BiSolidDashboard}>
            Pengumuman
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/user" icon={BiSolidDashboard}>
            User
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarUI;
