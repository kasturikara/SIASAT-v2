// //? prop types
import PropTypes from "prop-types";

// //? api supabase
import { postNewMapel } from "../../../../api/supabase";

// //? flowbite
import { Label, Modal, TextInput } from "flowbite-react";

function TambahMapel({ newMapel, setNewMapel, setTambah, getDataMapel }) {
  async function handleSubmit() {
    setTambah(false);
    setNewMapel({
      ...newMapel,
      nama: newMapel.nama,
    });

    try {
      await postNewMapel(newMapel);
    } catch (error) {
      console.error("handleNewMapel: ", error);
    }
    setNewMapel({ ...newMapel, nama: "" });
    getDataMapel();
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-medium">Tambah Mapel Baru</p>
      </Modal.Header>
      <Modal.Body>
        <div className="">
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
            value={newMapel.nama}
            onChange={(e) => setNewMapel({ ...newMapel, nama: e.target.value })}
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
            setNewMapel({
              ...newMapel,
              nama: newMapel.nama,
            });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahMapel.propTypes = {
  newMapel: PropTypes.object,
  setNewMapel: PropTypes.func,
  setTambah: PropTypes.func,
  getDataMapel: PropTypes.func,
};

export default TambahMapel;
