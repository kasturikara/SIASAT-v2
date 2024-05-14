// //? prop types
import PropTypes from "prop-types";

//  //? lib
import { useEffect, useState } from "react";

// //? api supabase
import { getMapelById, updateMapel } from "../../../../api/supabase";

// //? flowbite
import { Label, Modal, TextInput } from "flowbite-react";

function EditMapel({ idEdit, setEdit, getDataMapel }) {
  const [mapel, setMapel] = useState({});

  async function getData() {
    const data = await getMapelById(idEdit);
    setMapel(data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleSubmit() {
    setEdit(false);
    setMapel({
      ...mapel,
      nama: mapel.nama,
    });

    try {
      await updateMapel(idEdit, mapel);
    } catch (error) {
      console.error("editMapel: ", error);
    }
    getDataMapel();
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-medium">Edit Mata Pelajaran</p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <Label
            htmlFor="nama"
            value="Nama Mata Pelajaran"
            className="block mb-2"
          />
          <TextInput
            id="nama"
            type="text"
            placeholder="Masukkan Nama Mata Pelajaran"
            required
            value={mapel?.nama}
            onChange={(e) => setMapel({ ...mapel, nama: e.target.value })}
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

EditMapel.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDataMapel: PropTypes.func,
};

export default EditMapel;
