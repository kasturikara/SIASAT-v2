// react-router-dom
import { Route, Routes } from "react-router-dom";

// pages
import DashboardPage from "../pages/guru/dashboard";
import AbsensiPage from "../pages/guru/absensi";
import MapelPage from "../pages/admin/guru/mapel";
import NilaiPage from "../pages/guru/nilai";
import ProfilePage from "../pages/guru/profile";

function GuruRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/absensi" element={<AbsensiPage />} />
      <Route path="/mapel" element={<MapelPage />} />
      <Route path="/nilai" element={<NilaiPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default GuruRoutes;
