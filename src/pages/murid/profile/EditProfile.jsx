// //? lib
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// //? api
import { updateMuridProfile } from "../../../api/supabase";

// //? components
import { Label, Modal, TextInput } from "flowbite-react";

function EditProfile({ setEdit, murid, setMurid }) {
  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.id === "tanggal_lahir") {
      const birthDate = new Date(event.target.value);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      const m = now.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
        age = age - 1;
      }
      setMurid({
        ...murid,
        [event.target.id]: event.target.value,
        umur: age,
      });
    } else {
      setMurid({
        ...murid,
        [event.target.id]: event.target.value,
      });
    }
  };

  async function handleSubmit() {
    try {
      localStorage.removeItem("murid");
      await updateMuridProfile(murid);
      localStorage.setItem("murid", JSON.stringify(murid));
      setEdit(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile telah diupdate!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("editProfile: ", error);
    }
  }

  return (
    <div>
      <Modal.Header>
        Edit Profile{" "}
        <button onClick={() => console.log("click: ", murid)}>p</button>
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-y-4">
          <div className="gap-2 md:col-span-2">
            <Label htmlFor="nama" value="Nama" className="block mb-2" />
            <TextInput
              id="nama"
              value={murid?.nama}
              onChange={(event) => handleChange(event)}
              type="text"
            />
          </div>
          <div className="gap-2">
            <Label
              htmlFor="jenis_kelamin"
              value="Jenis Kelamin"
              className="block mb-2"
            />
            <TextInput
              id="jenis_kelamin"
              value={murid?.jenis_kelamin}
              onChange={(event) => handleChange(event)}
              type="text"
            />
          </div>
          <div className="gap-2">
            <Label htmlFor="alamat" value="Alamat" className="block mb-2" />
            <TextInput
              id="alamat"
              value={murid?.alamat}
              onChange={(event) => handleChange(event)}
              type="text"
            />
          </div>
          <div className="gap-2">
            <Label
              htmlFor="tanggal_lahir"
              value="Tanggal Lahir"
              className="block mb-2"
            />
            <TextInput
              id="tanggal_lahir"
              value={murid?.tanggal_lahir}
              onChange={(event) => handleChange(event)}
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </div>
          <div className="gap-2">
            <Label htmlFor="umur" value="Umur" className="block mb-2" />
            <TextInput
              id="umur"
              value={murid?.umur}
              onChange={(event) => handleChange(event)}
              type="number"
              readOnly
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            className="w-16 px-4 py-2 text-sm text-white bg-green-500 rounded md:text-base md:w-28 hover:text-gray-300 hover:bg-green-600"
            onClick={() => handleSubmit()}
          >
            Simpan
          </button>
          <button
            type="button"
            className="w-16 px-4 py-2 text-red-500 border border-red-500 rounded md:w-28 md:text-base text sm hover:text-red-100 hover:bg-red-500"
            onClick={() => {
              setMurid(JSON.parse(localStorage.getItem("murid")));
              setEdit(false);
            }}
          >
            Batal
          </button>
        </div>
      </Modal.Footer>
    </div>
  );
}

EditProfile.propTypes = {
  setEdit: PropTypes.func,
  murid: PropTypes.object,
  setMurid: PropTypes.func,
};

export default EditProfile;
