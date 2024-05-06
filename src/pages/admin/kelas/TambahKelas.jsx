import { Label, Modal, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
import { postNewKelas } from "../../../api/supabase";

function TambahKelas({ newKelas, setNewKelas, setTambah, getDataKelas }) {
  const handleNewKelas = async (event) => {
    event.preventDefault();
    setNewKelas({
      ...newKelas,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setTambah(false);
    setNewKelas({
      ...newKelas,
      nama: newKelas.nama,
    });

    try {
      await postNewKelas(newKelas);
    } catch (error) {
      console.error("handleNewKelas: ", error);
    }
    setNewKelas({
      ...newKelas,
      nama: "",
    });
    getDataKelas();
  }

  return (
    <div>
      <Modal.Header>Tambah Kelas Baru</Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <Label htmlFor="nama" value="Nama Kelas" className="block mb-2" />
          <TextInput
            id="nama"
            type="text"
            placeholder="Masukkan Nama Kelas"
            required
            value={newKelas.nama}
            onChange={handleNewKelas}
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
            setNewKelas({
              ...newKelas,
              nama: "",
            });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahKelas.propTypes = {
  newKelas: PropTypes.object,
  setNewKelas: PropTypes.func,
  setTambah: PropTypes.func,
  getDataKelas: PropTypes.func,
};

export default TambahKelas;
