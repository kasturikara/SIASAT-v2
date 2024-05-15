// //? icons
import { Label, TextInput } from "flowbite-react";
import { PiNotePencilBold } from "react-icons/pi";

function ProfilePage() {
  const guru = JSON.parse(localStorage.getItem("guru"));

  return (
    <div className="flex flex-col items-center justify-center w-full p-8 rounded-lg bg-gray-50">
      <div className="flex items-center justify-end w-full">
        <button
          type="button"
          className="flex items-center w-32 gap-2 px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-800"
        >
          <PiNotePencilBold className="text-xl" /> Edit Profil
        </button>
      </div>
      <div>
        <img
          src="hacker.png"
          alt="foto profil"
          className="h-40 p-2 bg-gray-300 rounded w-36"
        />
      </div>
      <div className="grid w-full grid-cols-1 mt-8 md:grid-cols-2 ">
        <div className="flex items-center justify-center gap-24">
          <Label
            htmlFor="nama"
            value="Nama"
            className="block text-lg font-bold"
          />
          <TextInput
            id="nama"
            value={guru?.nama}
            readOnly
            className="w-32 font-semibold md:w-64"
          />
        </div>
        <div className="flex items-center justify-center gap-24">
          <Label
            htmlFor="tanggal_lahir"
            value="Tanggal Lahir"
            className="block text-lg font-bold"
          />
          <TextInput
            id="tanggal_lahir"
            value={guru?.tanggal_lahir}
            readOnly
            className="w-32 font-semibold md:w-64"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
