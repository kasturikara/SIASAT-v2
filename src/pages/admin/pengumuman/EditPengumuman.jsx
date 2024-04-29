import PropTypes from "prop-types";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { getPengumumanById, updatePengumuman } from "../../../api/supabase";
import { useEffect, useState } from "react";

function EditPengumuman({ idEdit, setOpenEdit, getDataPengumuman }) {
  const [pengumuman, setPengumuman] = useState({});

  async function getData() {
    const data = await getPengumumanById(idEdit);
    setPengumuman(data);
    return data;
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
    setOpenEdit(false);
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
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => handleSubmit()}
        >
          Simpan
        </Button>
        <Button
          className="bg-gray-300 hover:bg-blue-600"
          outline
          onClick={() => {
            setOpenEdit(false);
          }}
        >
          Batal
        </Button>
      </Modal.Footer>
    </div>
  );
}

EditPengumuman.propTypes = {
  idEdit: PropTypes.number,
  setOpenEdit: PropTypes.func,
  getDataPengumuman: PropTypes.func,
};

export default EditPengumuman;
