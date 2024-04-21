import { Route, Routes } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Admin</h1>} />
    </Routes>
  );
}

export default AdminRoutes;
