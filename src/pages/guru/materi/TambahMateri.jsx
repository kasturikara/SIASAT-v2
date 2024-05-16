// //? lib
import PropTypes from "prop-types";

// //? api
import { postNewMateri } from "../../../api/supabase";

// //? components
import { Label, Modal, Textarea } from "flowbite-react";

function TambahMateri({ newMateri, setNewMateri, setTambah, getDatas }) {
  const handleNewMateri = (event) => {
    event.preventDefault();
    setNewMateri({
      ...newMateri,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setNewMateri({
      ...newMateri,
      id_guru: newMateri.id_guru,
      id_mapel: newMateri.id_mapel,
      deskripsi: newMateri.deskripsi,
    });

    try {
      // console.log(newMateri);
      await postNewMateri(newMateri);
    } catch (error) {
      console.error("submit materi: ", error);
    }
    setNewMateri({
      ...newMateri,
      deskripsi: "",
    });
    async function getMateriBaru() {
      await getDatas();
    }
    getMateriBaru();
    setTambah(false);
  }

  return (
    <div>
      <Modal.Header>Tambah Materi Baru</Modal.Header>
      <Modal.Body>
        <div>
          <Label
            htmlFor="deskripsi"
            value="Deskripsi Materi"
            className="block mb-4"
          />
          <Textarea
            id="deskripsi"
            value={newMateri?.deskripsi}
            onChange={handleNewMateri}
            required
            placeholder="Deskripsi Materi Baru..."
            autoComplete="off"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="w-24 px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-800"
          onClick={() => {
            handleSubmit();
          }}
        >
          Simpan
        </button>
        <button
          className="w-24 px-4 py-2 text-sm border rounded border-slate-300 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
          onClick={() => {
            setTambah(false);
            setNewMateri({
              ...newMateri,
              deskripsi: newMateri.deskripsi,
            });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahMateri.propTypes = {
  newMateri: PropTypes.object,
  setNewMateri: PropTypes.func,
  setTambah: PropTypes.func,
  getDatas: PropTypes.func,
};

export default TambahMateri;
