// //? prop types
import PropTypes from "prop-types";

// //? lib
import { useEffect, useState } from "react";

// //? api supabase
import { getKelasById, updateKelas } from "../../../api/supabase";

// //? flowbite
import { Label, Modal, TextInput } from "flowbite-react";

function EditKelas({ idEdit, setEdit, getDataKelas }) {
  const [kelas, setKelas] = useState({});

  async function getData() {
    const data = await getKelasById(idEdit);
    setKelas(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleKelas = async (event) => {
    event.preventDefault();
    setKelas({
      ...kelas,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setEdit(false);
    setKelas({
      ...kelas,
      nama: kelas.nama,
    });

    try {
      await updateKelas(idEdit, kelas);
    } catch (error) {
      console.error("EditKelas: ", error);
    }
    getDataKelas();
  }

  return (
    <div>
      <Modal.Header>Edit Data Kelas</Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <Label htmlFor="nama" value="Nama Kelas" className="block mb-2" />
          <TextInput
            id="nama"
            type="text"
            value={kelas?.nama}
            onChange={handleKelas}
            autoComplete="off"
          />
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

EditKelas.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDataKelas: PropTypes.func,
};

export default EditKelas;
