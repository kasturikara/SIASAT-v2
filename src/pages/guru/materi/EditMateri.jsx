// //? lib
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// //? api
import { getMateriById, updateMateri } from "../../../api/supabase";

// //? components
import { Label, Modal, Textarea } from "flowbite-react";

function EditMateri({ idEdit, setEdit, getDatas }) {
  const [materi, setMateri] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const materi = await getMateriById(idEdit);
    setMateri(materi);
  }

  const handleMateri = (event) => {
    event.preventDefault();
    setMateri({
      ...materi,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setMateri({
      ...materi,
      id_guru: materi.id_guru,
      id_mapel: materi.id_mapel,
      deskripsi: materi.deskripsi,
    });

    try {
      await updateMateri(idEdit, materi);
    } catch (error) {
      console.error("handleEditMateri: ", error);
    }
    getDatas();
    setEdit(false);
  }

  return (
    <div>
      <Modal.Header>Edit Deskripsi Materi</Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <Label
            htmlFor="deskripsi"
            value="Deskripsi Materi"
            className="block mb-2"
          />
          <Textarea
            id="deskripsi"
            value={materi.deskripsi}
            onChange={handleMateri}
            required
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

EditMateri.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDatas: PropTypes.func,
};

export default EditMateri;
