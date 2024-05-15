// //? lib
import { Route, Routes } from "react-router-dom";

// //? pages
import DashboardPage from "../pages/admin/dashboard";
import MapelPage from "../pages/admin/guru/mapel";
import MateriPage from "../pages/admin/guru/materi";
import JadwalPage from "../pages/admin/jadwal";
import KelasPage from "../pages/admin/kelas";
import AbsensiPage from "../pages/admin/murid/absensi";
import NilaiPage from "../pages/admin/murid/nilai";
import PengumumanPage from "../pages/admin/pengumuman";
import UserPage from "../pages/admin/user";
import MuridPage from "../pages/admin/murid";
import GuruPage from "../pages/admin/guru";
import ProfilePage from "../pages/admin/profile";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/mapel" element={<MapelPage />} />
      <Route path="/materi" element={<MateriPage />} />
      <Route path="/jadwal" element={<JadwalPage />} />
      <Route path="/kelas" element={<KelasPage />} />
      <Route path="/absensi" element={<AbsensiPage />} />
      <Route path="/nilai" element={<NilaiPage />} />
      <Route path="/pengumuman" element={<PengumumanPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/murid" element={<MuridPage />} />
      <Route path="/guru" element={<GuruPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default AdminRoutes;
