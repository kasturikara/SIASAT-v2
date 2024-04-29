import PropTypes from "prop-types";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { postNewPengumuman } from "../../../api/supabase";

function TambahPengumuman({
  newPengumuman,
  setNewPengumuman,
  setOpenTambah,
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
    setOpenTambah(false);
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
        <p className="text-xl font-medium">Tambah pengumuman baru</p>
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
            />
            <Label htmlFor="isi" value="Isi" className="block mt-4 mb-2" />
            <TextInput
              id="isi"
              type="text"
              placeholder="isi pengumuman"
              required
              value={newPengumuman.isi}
              onChange={handleNewPengumuman}
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
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            handleSubmit();
          }}
        >
          Tambah
        </Button>
        <Button
          className="bg-gray-300 hover:bg-blue-600"
          outline
          onClick={() => {
            setOpenTambah(false);
            setNewPengumuman({
              ...newPengumuman,
              judul: "",
              isi: "",
              tanggal: "",
            });
          }}
        >
          Batal
        </Button>
      </Modal.Footer>
    </div>
  );
}

TambahPengumuman.propTypes = {
  newPengumuman: PropTypes.object,
  setNewPengumuman: PropTypes.func,
  setOpenTambah: PropTypes.func,
  getDataPengumuman: PropTypes.func,
};

export default TambahPengumuman;
