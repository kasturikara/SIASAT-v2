// //? lib
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// //? api
import { getPengumumanById, updatePengumuman } from "../../../api/supabase";

// //? component
import { Label, Modal, TextInput } from "flowbite-react";

function EditPengumuman({ idEdit, setEdit, getDataPengumuman }) {
  const [pengumuman, setPengumuman] = useState({});

  async function getData() {
    const data = await getPengumumanById(idEdit);
    setPengumuman(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const handlePengumuman = async (event) => {
    event.preventDefault();
    setPengumuman({
      ...pengumuman,
      [event.target.id]: event.target.value,
    });
    // console.log("handlePengumuman", pengumuman);
  };

  async function handleSubmit() {
    setEdit(false);
    setPengumuman({
      ...pengumuman,
      judul: pengumuman.judul,
      isi: pengumuman.isi,
      tanggal: pengumuman.tanggal,
    });

    try {
      await updatePengumuman(idEdit, pengumuman);
    } catch (error) {
      console.error("handleSubmit: ", error);
    }
    getDataPengumuman();
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-medium">Edit pengumuman</p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <div>
            <Label htmlFor="judul" value="Judul" className="block mb-2" />
            <TextInput
              id="judul"
              type="text"
              placeholder="judul pengumuman"
              value={pengumuman.judul}
              onChange={handlePengumuman}
              autoComplete="off"
            />
            <Label htmlFor="isi" value="Isi" className="block mt-4 mb-2" />
            <TextInput
              id="isi"
              type="text"
              placeholder="isi pengumuman"
              value={pengumuman.isi}
              onChange={handlePengumuman}
              autoComplete="off"
            />
            <Label
              htmlFor="tanggal"
              value="Tanggal"
              className="block mt-4 mb-2"
            />
            <TextInput
              id="tanggal"
              type="date"
              placeholder="tanggal pengumuman"
              value={pengumuman.tanggal}
              onChange={handlePengumuman}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="w-24 px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-800"
          onClick={() => handleSubmit()}
        >
          Update
        </button>
        <button
          className="w-24 px-4 py-2 text-sm border rounded border-slate-300 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
          onClick={() => {
            setEdit(false);
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

EditPengumuman.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDataPengumuman: PropTypes.func,
};

export default EditPengumuman;
