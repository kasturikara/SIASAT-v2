// //? lib
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// //? api
import { getNilaiById, updateNilai } from "../../../../api/supabase";

// //? components
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function EditNilai({ idEdit, setEdit, getDatas }) {
  const [nilai, setNilai] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await getNilaiById(idEdit);
    setNilai(data);
  }

  const handleNilai = (event) => {
    event.preventDefault();
    setNilai({
      ...nilai,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setEdit(false);
    try {
      await updateNilai(idEdit, nilai);
    } catch (error) {
      console.error("handleNilai: ", error);
    }
    getDatas();
  }

  return (
    <div>
      <Modal.Header>Edit Nilai</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="jenis" value="Jenis Nilai" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-700 border-slate-300 bg-slate-50">
              <Dropdown id="jenis" label={nilai.jenis} inline className="w-64">
                {[
                  { nama: "Tugas 1" },
                  { nama: "Tugas 2" },
                  { nama: "Tugas 3" },
                  { nama: "Praktik" },
                  { nama: "UTS" },
                  { nama: "UAS" },
                ].map((data) => {
                  return (
                    <DropdownItem
                      key={data.nama}
                      onClick={() => {
                        setNilai({
                          ...nilai,
                          jenis: data.nama,
                        });
                      }}
                    >
                      {data.nama}
                    </DropdownItem>
                  );
                })}
              </Dropdown>
            </div>
          </div>
          <div>
            <Label htmlFor="nilai" value="Nilai" className="block mb-2" />
            <TextInput
              id="nilai"
              type="number"
              placeholder="Masukkan nilai"
              required
              value={nilai.nilai}
              onChange={handleNilai}
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="tanggal" value="Tanggal" className="block mb-2" />
            <TextInput
              id="tanggal"
              type="date"
              placeholder="Pilih tanggal"
              required
              value={nilai.tanggal}
              onChange={handleNilai}
              autoComplete="off"
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </div>
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

EditNilai.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDatas: PropTypes.func,
};

export default EditNilai;
