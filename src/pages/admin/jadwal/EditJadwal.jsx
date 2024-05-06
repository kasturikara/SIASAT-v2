import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import PropTypes from "prop-types";
import {
  getGuru,
  getJadwalById,
  getKelas,
  updateJadwal,
} from "../../../api/supabase";
import { useEffect, useState } from "react";

function EditJadwal({ idEdit, setEdit, getDataJadwal }) {
  const [jadwal, setJadwal] = useState({});
  const [guru, setGuru] = useState([]);
  const [kelas, setKelas] = useState([]);

  async function getDatas() {
    const dataJadwal = await getJadwalById(idEdit);
    setJadwal(dataJadwal);
    const dataGuru = await getGuru();
    setGuru(dataGuru);
    const dataKelas = await getKelas();
    setKelas(dataKelas);
  }

  useEffect(() => {
    getDatas();
  }, []);

  const handleJadwal = async (event) => {
    event.preventDefault();
    setJadwal({
      ...jadwal,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setEdit(false);
    setJadwal({
      ...jadwal,
      id_guru: jadwal.id_guru,
      guru: jadwal.guru,
      id_kelas: jadwal.id_kelas,
      kelas: jadwal.kelas,
      hari: jadwal.hari,
      jam_mulai: jadwal.jam_mulai,
      jam_selesai: jadwal.jam_selesai,
    });

    try {
      await updateJadwal(idEdit, jadwal);
    } catch (error) {
      console.error("handleEditJadwal: ", error);
    }
    getDataJadwal();
  }

  return (
    <div>
      <Modal.Header>
        Edit Data Jadwal
        <button onClick={() => console.log("jadwal: ", jadwal.hari)}>
          Test
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="kelas" value="Kelas" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown label={jadwal.kelas?.nama} inline className="w-64">
                {kelas.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() =>
                        setJadwal({
                          ...jadwal,
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
            <Label htmlFor="hari" value="Hari" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown label={jadwal.hari} id="hari" inline className="w-64">
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map(
                  (data, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => setJadwal({ ...jadwal, hari: data })}
                      >
                        {data}
                      </DropdownItem>
                    );
                  }
                )}
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
              value={jadwal.jam_mulai}
              onChange={handleJadwal}
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
              value={jadwal.jam_selesai}
              onChange={handleJadwal}
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="guru" value="Nama Guru" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown label={jadwal.guru?.nama} inline className="w-64">
                {guru.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setJadwal({
                          ...jadwal,
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
            <Label htmlFor="mapel" value="Mapel" className="block mb-2" />
            <TextInput id="mapel" value={jadwal.guru?.mapel.nama} readOnly />
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

EditJadwal.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDataJadwal: PropTypes.func,
};

export default EditJadwal;
