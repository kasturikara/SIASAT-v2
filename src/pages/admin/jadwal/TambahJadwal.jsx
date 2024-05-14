// //? prop types
import PropTypes from "prop-types";

// //? lib
import { useEffect, useState } from "react";

// //? api supabase
import { getGuru, getKelas, postNewJadwal } from "../../../api/supabase";

// //? flowbite
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function TambahJadwal({ newJadwal, setNewJadwal, setTambah, getDataJadwal }) {
  const [guru, setGuru] = useState([]);
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    getDatas();
  }, []);

  async function getDatas() {
    const guru = await getGuru();
    setGuru(guru);
    const kelas = await getKelas();
    setKelas(kelas);
  }

  const handleNewJadwal = (event) => {
    event.preventDefault();
    setNewJadwal({
      ...newJadwal,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setTambah(false);
    setNewJadwal({
      ...newJadwal,
      id_guru: newJadwal.id_guru,
      guru: newJadwal.guru,
      id_kelas: newJadwal.id_kelas,
      hari: newJadwal.hari,
      jam_mulai: newJadwal.jam_mulai,
      jam_selesai: newJadwal.jam_selesai,
    });

    try {
      await postNewJadwal(newJadwal);
    } catch (error) {
      console.error("handleNewJadwal: ", error);
    }
    setNewJadwal({
      ...newJadwal,
      id_kelas: newJadwal.id_kelas,
      kelas: "Pilih Kelas",
      id_guru: "",
      guru: "Pilih Guru",
      hari: "Pilih Hari",
      jam_mulai: "",
      jam_selesai: "",
    });
    getDataJadwal();
  }

  return (
    <div>
      <Modal.Header>Tambah Jadwal Baru</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="kelas" value="Kelas" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown label={newJadwal.kelas} inline className="w-64">
                {kelas.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() =>
                        setNewJadwal({
                          ...newJadwal,
                          id_kelas: data.id,
                          kelas: data.kelas,
                        })
                      }
                    >
                      {data.kelas}
                    </DropdownItem>
                  );
                })}
              </Dropdown>
            </div>
          </div>
          <div>
            <Label htmlFor="guru" value="Nama Guru" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown label={newJadwal.guru} inline className="w-64">
                {guru.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNewJadwal({
                          ...newJadwal,
                          id_guru: data.id,
                          guru: data.nama,
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
            <Label
              htmlFor="jam_mulai"
              value="Jam Mulai"
              className="block mb-2"
            />
            <TextInput
              id="jam_mulai"
              type="time"
              placeholder="jam_mulai"
              required
              value={newJadwal.jam_mulai}
              onChange={handleNewJadwal}
              autoComplete="off"
            />
          </div>
          <div>
            <Label
              htmlFor="jam_selesai"
              value="Jam Selesai"
              className="block mb-2"
            />
            <TextInput
              id="jam_selesai"
              type="time"
              placeholder="jam_selesai"
              required
              value={newJadwal.jam_selesai}
              onChange={handleNewJadwal}
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="hari" value="Hari" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown
                label={newJadwal.hari}
                id="hari"
                inline
                className="w-64"
              >
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map(
                  (data, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() =>
                          setNewJadwal({ ...newJadwal, hari: data })
                        }
                      >
                        {data}
                      </DropdownItem>
                    );
                  }
                )}
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
            setNewJadwal({
              ...newJadwal,
              id_guru: newJadwal.id_guru,
              id_kelas: newJadwal.id_kelas,
              hari: newJadwal.hari,
              jam_mulai: newJadwal.jam_mulai,
              jam_selesai: newJadwal.jam_selesai,
            });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahJadwal.propTypes = {
  newJadwal: PropTypes.object,
  setNewJadwal: PropTypes.func,
  setTambah: PropTypes.func,
  getDataJadwal: PropTypes.func,
};

export default TambahJadwal;
