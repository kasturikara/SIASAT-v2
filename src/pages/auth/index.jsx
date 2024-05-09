import { Button, Label, TextInput } from "flowbite-react";
import PropTypes from "prop-types";

/**
 * Komponen LoginPage untuk login ke sistem
 */
function LoginPage({ user, setUser, handleLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({ user });
  };

  return (
    <div className="flex flex-col h-screen md:flex-row">
      {/* Bagian Background */}
      <div className="flex items-center justify-center bg-teal-500 md:justify-end md:w-1/3 ">
        <div className="flex flex-row items-center justify-center w-2/3 gap-4 p-4 text-white bg-teal-500 rounded-tl-lg rounded-bl-lg shadow-none md:gap-0 md:flex-col md:shadow-2xl md:p-0 md:h-5/6">
          {/* Bagian Logo */}
          <img
            src="logo_siasat.png"
            alt="logo"
            className="w-16 h-16 md:w-32 md:h-32"
          />
          {/* Bagian Judul */}
          <p className="mt-2 text-2xl font-bold">SIASAT</p>
          {/* Bagian Deskripsi */}
          <p className="hidden text-sm font-light text-center md:block">
            Sistem Informasi Akademik Sekolah Terpadu
          </p>
        </div>
      </div>
      {/* Bagian Form */}
      <div className="flex items-center justify-center mt-12 md:justify-start md:mt-0 md:w-2/3">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center px-24 py-8 rounded-tl-lg rounded-bl-lg shadow-none md:shadow-2xl md:w-2/3 h-5/6"
        >
          {/* Bagian Judul */}
          <p className="mb-8 text-xl font-bold text-center md:text-2xl">
            Masuk ke akun anda
          </p>
          {/* Bagian Username / Email */}
          <Label htmlFor="username" className="mb-4" value="Username / Email" />
          <TextInput
            type="text"
            id="username"
            placeholder="username / email@sekolah.id"
            className="mb-4"
            sizing="sm"
            required
            // value={user.username || user.email}
            onChange={(e) => {
              if (e.target.value.includes("@")) {
                setUser({ ...user, email: e.target.value, username: "" });
              } else {
                setUser({ ...user, username: e.target.value });
              }
            }}
          />
          {/* Bagian Password */}
          <Label htmlFor="password" className="mb-4" value="Password" />
          <TextInput
            type="password"
            id="password"
            placeholder="****"
            className="mb-12"
            sizing="sm"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {/* Bagian Tombol Masuk */}
          <Button
            className="bg-teal-500 hover:bg-teal-600"
            fullSized
            pill
            type="submit"
          >
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  handleLogin: PropTypes.func,
};

export default LoginPage;
