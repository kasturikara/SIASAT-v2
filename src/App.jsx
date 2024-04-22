// react
import { useEffect, useState } from "react";

//layout
import AdminLayout from "./layout/admin";

// routes
import AdminRoutes from "./routes/AdminRoutes";

// pages
import LoginPage from "./pages/auth";
import LoadingPage from "./pages/loading";

// api
import { findUserByEmail, findUserByUsername } from "./api/supabase";

// dependencies
import Swal from "sweetalert2";

function App() {
  const [isLoading, setIsLoading] = useState(!true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const loginData = localStorage.getItem("login");
    if (loginData) {
      const { user } = JSON.parse(loginData);
      handleLogin({ user });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = async ({ user }) => {
    if (!user) {
      console.error("Error handleLogin: user is null");
      setIsLoading(false);
      return;
    }

    try {
      let userData;
      if (user.username) {
        userData = await findUserByUsername({ user });
      } else {
        userData = await findUserByEmail({ user });
      }

      if (userData.password === user.password) {
        setIsLogin(true);
        setUser(userData);
        Swal.fire({
          title: "Sukses",
          text: "Login berhasil",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        // simpan local storage
        localStorage.setItem("login", JSON.stringify({ user: userData }));
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Password yang anda masukkan salah!",
          icon: "error",
          confirmButtonText: "OK",
        });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error("handleLogin: ", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen">
      {isLogin ? (
        (() => {
          switch (user.role) {
            case "admin":
              return (
                <AdminLayout>
                  <AdminRoutes />
                </AdminLayout>
              );
            case "murid":
              return (
                <>
                  <p>Role {user.role}</p>
                </>
              );
            case "guru":
              return (
                <>
                  <p>Role {user.role}</p>
                </>
              );
            case "wali":
              return (
                <>
                  <p>Role {user.role}</p>
                </>
              );
            default:
              return <div>Role tidak terdaftar</div>;
          }
        })()
      ) : (
        <LoginPage handleLogin={handleLogin} user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
