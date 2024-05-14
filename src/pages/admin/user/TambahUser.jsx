// //? lib
import PropTypes from "prop-types";
import { useState } from "react";

// //? api
import { postNewUser } from "../../../api/supabase";

// //? component
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

// //? icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function TambahUser({ newUser, setNewUser, setTambah, getDataUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleNewUser = (event) => {
    event.preventDefault();
    setNewUser({
      ...newUser,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setTambah(false);
    setNewUser({
      ...newUser,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    });

    try {
      await postNewUser(newUser);
    } catch (error) {
      console.error("handleNewUser: ", error);
    }
    setNewUser({
      ...newUser,
      username: "",
      email: "",
      password: "",
    });
    getDataUser();
  }

  return (
    <div>
      <Modal.Header>Tambah User Baru</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="username" value="Username" className="block mb-2" />
            <TextInput
              id="username"
              type="text"
              placeholder="Masukkan Username"
              required
              value={newUser.username}
              onChange={handleNewUser}
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email" className="block mb-2" />
            <TextInput
              id="email"
              type="email"
              placeholder="Masukkan Email"
              required
              value={newUser.email}
              onChange={handleNewUser}
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" className="block mb-2" />
            <div className="relative">
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Password"
                required
                value={newUser.password}
                onChange={handleNewUser}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500"
                aria-label="Show password"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="role" value="Role" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown
                label={newUser.role}
                outline
                size="sm"
                className="w-1/3"
                inline
              >
                {["admin", "guru", "murid", "wali"].map((data, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      className="flex items-center justify-center px-1 py-2 bg-slate-50 hover:bg-slate-500"
                      onClick={() => setNewUser({ ...newUser, role: data })}
                    >
                      {data}
                    </DropdownItem>
                  );
                })}
              </Dropdown>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="w-24 px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-800"
          onClick={() => {
            handleSubmit();
          }}
        >
          Simpan
        </button>
        <button
          className="w-24 px-4 py-2 text-sm border rounded border-slate-300 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
          onClick={() => {
            setTambah(false);
            setNewUser({ ...newUser, username: "", email: "", password: "" });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahUser.propTypes = {
  newUser: PropTypes.object,
  setNewUser: PropTypes.func,
  setTambah: PropTypes.func,
  getDataUser: PropTypes.func,
};

export default TambahUser;
