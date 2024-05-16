// //? lib
import { useEffect, useState } from "react";

// //? components
import {
  Label,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import LoadingPage from "../../loading";

// //? icons
import { PiNotePencilBold } from "react-icons/pi";
import { getMateriByGuru } from "../../../api/supabase";
import EditProfile from "./EditProfile";

function ProfilePage() {
  const [guru, setGuru] = useState(JSON.parse(localStorage.getItem("guru")));
  const [materi, setMateri] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDatas();
  }, []);

  async function getDatas() {
    setLoading(true);
    const materi = await getMateriByGuru(guru?.id);
    setMateri(materi);
    setLoading(false);
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full p-8 rounded-lg bg-gray-50">
        <div className="flex items-center justify-end w-full">
          <button
            type="button"
            className="flex items-center w-32 gap-2 px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-800"
            onClick={() => setEdit(true)}
          >
            <PiNotePencilBold className="text-xl" /> Edit Profil
          </button>
        </div>
        <div className="flex items-center justify-center w-full">
          <img
            src="hacker.png"
            alt="foto profil"
            className="h-40 p-2 bg-gray-300 rounded w-36"
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-8 mt-8 md:grid-cols-2 ">
          <div className="flex items-center justify-between gap-24 px-4">
            <Label
              htmlFor="nama"
              value="Nama"
              className="block text-lg font-bold"
            />
            <input
              type="text"
              id="nama"
              value={guru?.nama}
              className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
              disabled
            />
          </div>
          <div className="flex items-center justify-between gap-24 px-4">
            <Label
              htmlFor="jenis_kelamin"
              value="Jenis Kelamin"
              className="block text-lg font-bold"
            />
            <input
              type="text"
              id="jenis_kelamin"
              value={guru?.jenis_kelamin}
              className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
              disabled
            />
          </div>
          <div className="flex items-center justify-between gap-24 px-4">
            <Label
              htmlFor="tanggal_lahir"
              value="Tanggal Lahir"
              className="block text-lg font-bold"
            />
            <input
              type="text"
              id="tanggal_lahir"
              value={guru?.tanggal_lahir}
              className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
              disabled
            />
          </div>
          <div className="flex items-center justify-between gap-24 px-4">
            <Label
              htmlFor="umur"
              value="Umur"
              className="block text-lg font-bold"
            />
            <input
              type="text"
              id="umur"
              value={guru?.umur}
              className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
              disabled
            />
          </div>
          <div className="flex items-center justify-between gap-24 px-4">
            <Label
              htmlFor="alamat"
              value="Alamat"
              className="block text-lg font-bold"
            />
            <input
              type="text"
              id="alamat"
              value={guru?.alamat}
              className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
              disabled
            />
          </div>
          <div className="flex items-center justify-between gap-24 px-4">
            <Label
              htmlFor="email"
              value="Email"
              className="block text-lg font-bold"
            />
            <input
              type="text"
              id="email"
              value={guru?.user.email}
              className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
              disabled
            />
          </div>
          <div className="flex items-center justify-between gap-24 px-4">
            <Label
              htmlFor="username"
              value="Username"
              className="block text-lg font-bold"
            />
            <input
              type="text"
              id="username"
              value={guru?.user.username}
              className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
              disabled
            />
          </div>
          <div className="flex items-center justify-between gap-24 px-4">
            <Label
              htmlFor="password"
              value="Password"
              className="block text-lg font-bold"
            />
            <input
              type="text"
              id="password"
              value={guru?.user.password}
              className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="p-8 mt-8 overflow-x-auto rounded-lg bg-slate-50">
        <p className="mb-6 text-lg font-semibold text-center">
          Mata Pelajaran {guru?.mapel?.nama}
        </p>
        {loading ? (
          <LoadingPage />
        ) : (
          <Table key={materi} striped>
            <TableHead className="text-center">
              <TableHeadCell className="w-1/6 text-white bg-amber-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500">
                Deskripsi Materi
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {materi.map((m, i) => (
                <TableRow
                  key={i}
                  className="text-slate-600 hover:bg-amber-50 even:bg-slate-200"
                >
                  <TableCell className="font-bold">{i + 1}</TableCell>
                  <TableCell>{m.deskripsi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal show={edit} onClose={() => setEdit(false)} size="lg">
        <EditProfile setEdit={setEdit} guru={guru} setGuru={setGuru} />
      </Modal>
    </div>
  );
}

export default ProfilePage;
