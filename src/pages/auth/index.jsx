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
    <div className="flex h-screen">
      {/* Bagian Background */}
      <div className="flex items-center justify-end w-1/3 bg-teal-500">
        <div className="flex flex-col items-center justify-center w-2/3 text-white bg-teal-500 rounded-tl-lg rounded-bl-lg shadow-2xl h-5/6">
          {/* Bagian Logo */}
          <img src="logo_siasat.png" alt="logo" className="w-32 h-32" />
          {/* Bagian Judul */}
          <p className="mt-2 text-2xl font-bold">SIASAT</p>
          {/* Bagian Deskripsi */}
          <p className="text-sm font-light text-center">
            Sistem Informasi Akademik Sekolah Terpadu
          </p>
        </div>
      </div>
      {/* Bagian Form */}
      <div className="flex items-center justify-start w-2/3">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-2/3 px-24 py-8 rounded-tl-lg rounded-bl-lg shadow-2xl h-5/6"
        >
          {/* Bagian Judul */}
          <p className="mb-8 text-2xl font-bold text-center">
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
