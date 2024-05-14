// //? lib
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// //? api
import { getUserByRole, hapusUser } from "../../../api/supabase";

// //? component
import {
  Button,
  Dropdown,
  DropdownItem,
  Modal,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";

// //? icons
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineSearch,
} from "react-icons/ai";

// //? modals
import TambahUser from "./TambahUser";
import EditUser from "./EditUser";

function UserPage() {
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState("admin");
  const [tambah, setTambah] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: filter,
  });
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataUser();
  }, [filter]);

  async function getDataUser() {
    setLoading(true);
    const data = await getUserByRole(filter);
    setUser(data);
    setLoading(false);
  }

  const handleHapus = async (id) => {
    if (id === null || id === undefined) {
      console.error("handleHapus: id is null or undefined");
      return;
    }
    try {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await hapusUser(id);
          await getDataUser();
          Swal.fire({
            title: "Terhapus!",
            text: "Data telah dihapus.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.error("handleHapus: hapusUser", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 mb-4 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List User</p>
        <div className="flex justify-between mt-4">
          <TextInput
            id="search"
            placeholder="Search..."
            icon={AiOutlineSearch}
          />
          <button
            className="px-4 my-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-400"
            onClick={() => setTambah(true)}
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="p-8 overflow-x-auto rounded-lg bg-slate-50">
        <Dropdown label={filter} outline size="sm" className="float-right">
          {["admin", "guru", "murid", "wali"].map((data, index) => {
            return (
              <DropdownItem
                key={index}
                className="flex items-center justify-center px-1 py-2 bg-slate-50 hover:bg-slate-500"
                onClick={() => setFilter(data)}
              >
                {data}
              </DropdownItem>
            );
          })}
        </Dropdown>
        {loading ? (
          <div className="flex justify-center my-20">
            <Spinner />
          </div>
        ) : (
          <Table striped key={user} className="mt-4">
            <TableHead className="text-center">
              <TableHeadCell className="w-16 text-white bg-teal-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Username
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Email
              </TableHeadCell>
              <TableHeadCell className="relative text-white bg-teal-500">
                Password
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 px-4 py-2 text-sm font-medium text-white hover:text-teal-300"
                >
                  {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Action
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {user.map((data, index) => {
                return (
                  <TableRow
                    key={index}
                    className="text-slate-600 hover:bg-teal-50 odd:bg-slate-200"
                  >
                    <TableCell className="whitespace-nowrap">
                      {index + 1}
                    </TableCell>
                    <TableCell>{data.username}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>
                      {showPass ? data.password : "**********"}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-4">
                        <Button
                          size="xs"
                          color="success"
                          onClick={() => {
                            setEdit(true);
                            setIdEdit(data.id);
                          }}
                        >
                          <AiFillEdit className="mr-2" /> Edit
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleHapus(data.id)}
                        >
                          <AiFillDelete className="mr-2" /> Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal show={tambah} onClose={() => setTambah(false)}>
        <TambahUser
          newUser={newUser}
          setNewUser={setNewUser}
          setTambah={setTambah}
          getDataUser={getDataUser}
        />
      </Modal>

      <Modal show={edit} onClose={() => setEdit(false)}>
        <EditUser idEdit={idEdit} setEdit={setEdit} getDataUser={getDataUser} />
      </Modal>
    </div>
  );
}

export default UserPage;
