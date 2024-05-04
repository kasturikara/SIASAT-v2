import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  getMapel,
  getMurid,
  getNilaiById,
  updateNilai,
} from "../../../../api/supabase";
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function EditNilai({ idEdit, setEdit, getData }) {
  const [murid, setMurid] = useState([]);
  const [mapel, setMapel] = useState([]);
  const [nilai, setNilai] = useState([]);

  async function getDatas() {
    const nilai = await getNilaiById(idEdit);
    console.log("nilaiiiii, ", nilai);
    setNilai(nilai);
    const murid = await getMurid();
    setMurid(murid);
    const mapel = await getMapel();
    setMapel(mapel);
  }

  useEffect(() => {
    getDatas();
  }, []);

  const handleNilai = (event) => {
    event.preventDefault();
    setNilai({
      ...nilai,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setEdit(false);
    setNilai({
      ...nilai,
      id_murid: nilai.id_murid,
      id_mapel: nilai.id_mapel,
      jenis: nilai.jenis,
      nilai: nilai.nilai,
      tanggal: nilai.tanggal,
    });

    try {
      await updateNilai(idEdit, nilai);
    } catch (error) {
      console.error("handleNilai: ", error);
    }
    getData();
  }

  return (
    <div>
      <Modal.Header>Edit Nilai</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="murid" value="Nama Murid" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown
                id="murid"
                label={nilai.murid?.nama}
                inline
                className="w-64"
              >
                {murid.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNilai({
                          ...nilai,
                          id_murid: data.id,
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
            <Label htmlFor="mapel" value="Nama Mapel" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown
                id="mapel"
                label={nilai.mapel?.nama}
                inline
                className="w-64"
              >
                {mapel.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNilai({
                          ...nilai,
                          id_mapel: data.id,
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
  getData: PropTypes.func,
};

export default EditNilai;
