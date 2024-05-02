import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getGuru, getMapel, postNewMateri } from "../../../../api/supabase";

function TambahMateri({ newMateri, setNewMateri, setTambah, getDataMateri }) {
  const [guru, setGuru] = useState([]);
  const [labelGuru, setLabelGuru] = useState("Guru");
  const [mapel, setMapel] = useState([]);
  const [labelMapel, setLabelMapel] = useState("Mapel");

  useEffect(() => {
    getDataGuruDanMapel();
  }, []);

  async function getDataGuruDanMapel() {
    const dataGuru = await getGuru();
    setGuru(dataGuru);
    const dataMapel = await getMapel();
    setMapel(dataMapel);
  }

  const handleNewMateri = (event) => {
    event.preventDefault();
    setNewMateri({
      ...newMateri,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setTambah(false);
    setNewMateri({
      ...newMateri,
      id_guru: newMateri.guru,
      id_mapel: newMateri.mapel,
      deskripsi: newMateri.deskripsi,
    });

    try {
      console.log("handleNewMateri: ", newMateri);
      await postNewMateri(newMateri);
    } catch (error) {
      console.error("handleNewMateri: ", error);
    }
    setNewMateri({
      ...newMateri,
      id_guru: "",
      id_mapel: "",
      deskripsi: "",
    });
    getDataMateri();
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-semibold">Tambah Materi Baru</p>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Label htmlFor="guru" value="Nama Guru" className="block mb-2" />
          <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
            <Dropdown id="guru" label={labelGuru} className="w-64" inline>
              {guru.map((item) => {
                return (
                  <DropdownItem
                    key={item.id}
                    onClick={() => {
                      setNewMateri({
                        ...newMateri,
                        id_guru: item.id,
                      });
                      setLabelGuru(item.nama);
                    }}
                  >
                    {item.nama}
                  </DropdownItem>
                );
              })}
            </Dropdown>
          </div>
          <Label
            htmlFor="mapel"
            value="Mata Pelajaran"
            className="block my-2"
          />
          <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
            <Dropdown id="mapel" label={labelMapel} className="w-64" inline>
              {mapel.map((item) => {
                return (
                  <DropdownItem
                    key={item.id}
                    onClick={() => {
                      setNewMateri({
                        ...newMateri,
                        id_mapel: item.id,
                      });
                      setLabelMapel(item.nama);
                    }}
                  >
                    {item.nama}
                  </DropdownItem>
                );
              })}
            </Dropdown>
          </div>
          <Label
            htmlFor="deskripsi"
            value="Deskripsi Materi"
            className="block my-2"
          />
          <TextInput
            id="deskripsi"
            type="text"
            placeholder="deskripsi"
            required
            value={newMateri.deskripsi}
            onChange={handleNewMateri}
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
            setNewMateri({
              ...newMateri,
              id_guru: newMateri.guru,
              id_mapel: newMateri.mapel,
              deskripsi: newMateri.deskripsi,
            });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahMateri.propTypes = {
  newMateri: PropTypes.object,
  setNewMateri: PropTypes.func,
  setTambah: PropTypes.func,
  getDataMateri: PropTypes.func,
};

export default TambahMateri;
