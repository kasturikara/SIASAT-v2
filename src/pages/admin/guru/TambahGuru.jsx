import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { getMapel, postNewGuru } from "../../../api/supabase";

function TambahGuru({ newGuru, setNewGuru, setTambah, getDataGuru }) {
  const [mapel, setMapel] = useState([]);
  const [labelMapel, setLabelMapel] = useState("Pilih Mapel");
  const [labelJK, setLabelJK] = useState("Pilih Jenis Kelamin");

  useEffect(() => {
    getDataMapel();
  }, []);

  async function getDataMapel() {
    const data = await getMapel();
    setMapel(data);
  }

  const handleNewGuru = async (event) => {
    event.preventDefault();
    setNewGuru({
      ...newGuru,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setTambah(false);
    setNewGuru({
      ...newGuru,
      nama: newGuru.nama,
      jenis_kelamin: newGuru.jenis_kelamin,
      tanggal_lahir: newGuru.tanggal_lahir,
      umur: newGuru.umur,
      alamat: newGuru.alamat,
      mapel: newGuru.mapel,
    });

    try {
      await postNewGuru(newGuru);
    } catch (error) {
      console.error("handleNewGuru: ", error);
    }
    setNewGuru({
      ...newGuru,
      nama: "",
      jenis_kelamin: "",
      tanggal_lahir: "",
      umur: "",
      alamat: "",
      mapel: "",
    });
    getDataGuru();
    // console.log("handleNewGuru: ", newGuru);
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-semibold">Tambah Guru Baru</p>
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="nama" value="Nama Guru" className="block mb-2" />
            <TextInput
              id="nama"
              type="text"
              placeholder="nama guru"
              required
              value={newGuru.nama}
              onChange={handleNewGuru}
              autoComplete="off"
            />
          </div>
          <div>
            <Label
              htmlFor="jenis_kelamin"
              value="Jenis Kelamin"
              className="block mb-2"
            />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown label={labelJK} inline className="w-64">
                <DropdownItem
                  onClick={() => {
                    setNewGuru({
                      ...newGuru,
                      jenis_kelamin: "Laki-laki",
                    });
                    setLabelJK("Laki-laki");
                  }}
                >
                  Laki-laki
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setNewGuru({
                      ...newGuru,
                      jenis_kelamin: "Perempuan",
                    });
                    setLabelJK("Perempuan");
                  }}
                >
                  Perempuan
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
          <div>
            <Label
              htmlFor="tanggal_lahir"
              value="Tanggal Lahir"
              className="block mb-2"
            />
            <TextInput
              id="tanggal_lahir"
              type="date"
              placeholder="tanggal lahir"
              required
              value={newGuru.tanggal_lahir}
              onChange={handleNewGuru}
              autoComplete="off"
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </div>
          <div>
            <Label htmlFor="umur" value="Umur" className="block mb-2" />
            <TextInput
              id="umur"
              type="text"
              placeholder="umur"
              required
              value={newGuru.umur}
              onChange={handleNewGuru}
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="alamat" value="Alamat" className="block mb-2" />
            <TextInput
              id="alamat"
              type="text"
              placeholder="alamat"
              required
              value={newGuru.alamat}
              onChange={handleNewGuru}
              autoComplete="off"
            />
          </div>
          <div>
            <Label
              htmlFor="mapel"
              value="Mata Pelajaran"
              className="block mb-2"
            />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown label={labelMapel} inline className="w-64">
                {mapel.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNewGuru({
                          ...newGuru,
                          mapel: data.id,
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
            setNewGuru({
              ...newGuru,
              nama: "",
              jenis_kelamin: "",
              tanggal_lahir: "",
              umur: "",
              alamat: "",
              mapel: "",
            });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahGuru.propTypes = {
  newGuru: PropTypes.object,
  setNewGuru: PropTypes.func,
  setTambah: PropTypes.func,
  getDataGuru: PropTypes.func,
};

export default TambahGuru;
