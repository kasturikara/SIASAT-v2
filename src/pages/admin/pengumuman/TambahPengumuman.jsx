// //? prop types
import PropTypes from "prop-types";

// //? api supabase
import { postNewPengumuman } from "../../../api/supabase";

// //? flowbite
import { Label, Modal, TextInput } from "flowbite-react";

function TambahPengumuman({
  newPengumuman,
  setNewPengumuman,
  setTambah,
  getDataPengumuman,
}) {
  const handleNewPengumuman = async (event) => {
    event.preventDefault();
    setNewPengumuman({
      ...newPengumuman,
      [event.target.id]: event.target.value,
    });

    // console.log("handleNewPengumuman", newPengumuman);
  };

  async function handleSubmit() {
    setTambah(false);
    setNewPengumuman({
      ...newPengumuman,
      judul: newPengumuman.judul,
      isi: newPengumuman.isi,
      tanggal: newPengumuman.tanggal,
    });

    try {
      await postNewPengumuman(newPengumuman);
    } catch (error) {
      console.error("handleNewPengumuman: ", error);
    }
    setNewPengumuman({
      ...newPengumuman,
      judul: "",
      isi: "",
      tanggal: "",
    });
    getDataPengumuman();
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-medium">Tambah Pengumuman Baru</p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <div>
            <Label htmlFor="judul" value="Judul" className="block mb-2" />
            <TextInput
              id="judul"
              type="text"
              placeholder="judul pengumuman"
              required
              value={newPengumuman.judul}
              onChange={handleNewPengumuman}
              autoComplete="off"
            />
            <Label htmlFor="isi" value="Isi" className="block mt-4 mb-2" />
            <TextInput
              id="isi"
              type="text"
              placeholder="isi pengumuman"
              required
              value={newPengumuman.isi}
              onChange={handleNewPengumuman}
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
              required
              value={newPengumuman.tanggal}
              onChange={handleNewPengumuman}
            />
          </div>
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
            setNewPengumuman({
              ...newPengumuman,
              judul: "",
              isi: "",
              tanggal: "",
            });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahPengumuman.propTypes = {
  newPengumuman: PropTypes.object,
  setNewPengumuman: PropTypes.func,
  setTambah: PropTypes.func,
  getDataPengumuman: PropTypes.func,
};

export default TambahPengumuman;
