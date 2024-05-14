// //? lib
import { Route, Routes } from "react-router-dom";

// //? pages
import DashboardPage from "../pages/murid/dashboard";
import AbsensiPage from "../pages/murid/absensi";
import JadwalPage from "../pages/murid/jadwal";
import NilaiPage from "../pages/murid/nilai";
import ProfilePage from "../pages/murid/profile";

function MuridRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/absensi" element={<AbsensiPage />} />
      <Route path="/jadwal" element={<JadwalPage />} />
      <Route path="/nilai" element={<NilaiPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default MuridRoutes;
