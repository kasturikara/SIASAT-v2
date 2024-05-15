// //? components
import { Label, Modal } from "flowbite-react";
import { useState } from "react";

// //? icons
import { PiNotePencilBold } from "react-icons/pi";
import EditProfile from "./EditProfile";

function ProfilePage() {
  const [murid, setMurid] = useState(JSON.parse(localStorage.getItem("murid")));
  const [edit, setEdit] = useState(false);

  return (
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
      <div className="grid w-full grid-cols-1 gap-8 mt-8 md:grid-cols-2 md:mb-20">
        <div className="flex items-center justify-between gap-24 px-4">
          <Label
            htmlFor="nama"
            value="Nama"
            className="block text-lg font-bold"
          />
          <input
            type="text"
            id="nama"
            value={murid?.nama}
            className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
            disabled
            autoComplete="false"
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
            value={murid?.jenis_kelamin}
            className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
            disabled
            autoComplete="false"
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
            value={murid?.tanggal_lahir}
            className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
            disabled
            autoComplete="false"
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
            value={murid?.umur}
            className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
            disabled
            autoComplete="false"
          />
        </div>
        <div className="flex items-center justify-between gap-24 px-4">
          <Label
            htmlFor="kelas"
            value="Kelas"
            className="block text-lg font-bold"
          />
          <input
            type="text"
            id="kelas"
            value={murid?.kelas?.nama}
            className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
            disabled
            autoComplete="false"
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
            value={murid?.alamat}
            className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
            disabled
            autoComplete="false"
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
            value={murid?.user?.email}
            className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
            disabled
            autoComplete="false"
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
            value={murid?.user?.username}
            className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
            disabled
            autoComplete="false"
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
            value={murid?.user?.password}
            className="w-32 text-sm font-semibold text-gray-900 border rounded-lg md:w-56 bg-slate-100 border-slate-400"
            disabled
            autoComplete="false"
          />
        </div>
      </div>

      <Modal show={edit} onClose={() => setEdit(false)} size={"lg"}>
        <EditProfile setEdit={setEdit} murid={murid} setMurid={setMurid} />
      </Modal>
    </div>
  );
}

export default ProfilePage;
