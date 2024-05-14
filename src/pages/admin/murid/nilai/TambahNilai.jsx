// //? prop types
import PropTypes from "prop-types";

// //? lib
import { useEffect, useState } from "react";

// //? api supabase
import { getMapel, getMurid, postNewNilai } from "../../../../api/supabase";

// //? flowbite
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function TambahNilai({ newNilai, setNewNilai, setTambah, getData }) {
  const [murid, setMurid] = useState([]);
  const [labelMurid, setLabelMurid] = useState("Pilih Murid");
  const [mapel, setMapel] = useState([]);
  const [labelMapel, setLabelMapel] = useState("Pilih Mapel");
  const [labelJenis, setLabelJenis] = useState("Pilih Jenis Nilai");

  useEffect(() => {
    getDataMuridDanMapel();
  }, []);

  async function getDataMuridDanMapel() {
    const murid = await getMurid();
    setMurid(murid);
    const mapel = await getMapel();
    setMapel(mapel);
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
      console.error("handleNewNilai: ", error);
    }
    setNewNilai({
      ...newNilai,
      id_murid: "",
      id_mapel: "",
      jenis: "",
      nilai: "",
      tanggal: "",
    });
    getData();
  }

  return (
    <div>
      <Modal.Header>Tambah Murid Baru</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="murid" value="Nama Murid" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown id="murid" label={labelMurid} inline className="w-64">
                {murid.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNewNilai({
                          ...newNilai,
                          id_murid: data.id,
                        });
                        setLabelMurid(data.nama);
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
            <Label htmlFor="mapel" value="Nama Mapel" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown id="mapel" label={labelMapel} inline className="w-64">
                {mapel.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNewNilai({
                          ...newNilai,
                          id_mapel: data.id,
                        });
                        setLabelMapel(data.nama);
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
              <Dropdown id="jenis" label={labelJenis} inline className="w-64">
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
                        setLabelJenis(data.nama);
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
            setNewNilai({
              ...newNilai,
              nilai: "",
              tanggal: "",
              jenis: "",
              id_murid: "",
            });
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
  getData: PropTypes.func,
};

export default TambahNilai;
