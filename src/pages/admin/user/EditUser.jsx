import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../../api/supabase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function EditUser({ idEdit, setEdit, getDataUser }) {
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await getUserById(idEdit);
    setUser(data);
  }

  const handleUser = async (event) => {
    event.preventDefault();
    setUser({
      ...user,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setEdit(false);
    setUser({
      ...user,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });

    try {
      await updateUser(idEdit, user);
    } catch (error) {
      console.error("handleEditUser: ", error);
    }
    getDataUser();
  }

  return (
    <div>
      <Modal.Header>Edit Data User</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="username" value="Username" className="block mb-2" />
            <TextInput
              id="username"
              type="text"
              placeholder="Masukkan Username"
              required
              value={user.username}
              onChange={handleUser}
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
              value={user.email}
              onChange={handleUser}
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
                value={user.password}
                onChange={handleUser}
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
                label={user.role}
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
                      onClick={() => setUser({ ...user, role: data })}
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
          className="w-24 px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-800"
          onClick={() => {
            handleSubmit();
          }}
        >
          Update
        </button>
        <button
          className="w-24 px-4 py-2 text-sm border rounded border-slate-300 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
          onClick={() => setEdit(false)}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

EditUser.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDataUser: PropTypes.func,
};

export default EditUser;
