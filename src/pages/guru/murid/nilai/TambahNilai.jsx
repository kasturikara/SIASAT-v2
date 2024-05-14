// //? lib
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// //? api
import { getMurid, postNewNilai } from "../../../../api/supabase";

// //? components
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function TambahNilai({ newNilai, setNewNilai, setTambah, getDatas }) {
  const [murid, setMurid] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const murid = await getMurid();
    setMurid(murid);
  }

  const handleNewNilai = (event) => {
    event.preventDefault();
    setNewNilai({
      ...newNilai,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setTambah(false);
    setNewNilai({
      ...newNilai,
      id_murid: newNilai.id_murid,
      id_mapel: newNilai.id_mapel,
      jenis: newNilai.jenis,
      nilai: newNilai.nilai,
      tanggal: newNilai.tanggal,
    });
    try {
      await postNewNilai(newNilai);
    } catch (error) {
      console.error("new nilai: ", error);
    }
    setNewNilai({});
    getDatas();
  }

  return (
    <div>
      <Modal.Header>Tambah Nilai Baru</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="murid" value="Nama Murid" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown
                id="murid"
                label={newNilai.murid}
                inline
                className="w-64"
              >
                {murid.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNewNilai({
                          ...newNilai,
                          id_murid: data.id,
                          murid: data.nama,
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
            <Label htmlFor="jenis" value="Jenis Nilai" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown
                id="jenis"
                label={newNilai.jenis || "Pilih Jenis Nilai"}
                inline
                className="w-64"
              >
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
                        setNewNilai({
                          ...newNilai,
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
              value={newNilai.nilai}
              onChange={handleNewNilai}
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
              value={newNilai.tanggal}
              onChange={handleNewNilai}
              autoComplete="off"
              pattern="\d{4}-\d{2}-\d{2}"
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
            setNewNilai({});
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahNilai.propTypes = {
  newNilai: PropTypes.object,
  setNewNilai: PropTypes.func,
  setTambah: PropTypes.func,
  getDatas: PropTypes.func,
};

export default TambahNilai;
