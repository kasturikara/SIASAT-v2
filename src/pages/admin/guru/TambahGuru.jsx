// //? prop types
import PropTypes from "prop-types";

// //? lib
import { useEffect, useState } from "react";

// //? api supabase
import { getMapel, getUserByRole, postNewGuru } from "../../../api/supabase";

// //? flowbite
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function TambahGuru({ newGuru, setNewGuru, setTambah, getDataGuru }) {
  const [mapel, setMapel] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getDatas();
  }, []);

  async function getDatas() {
    const dataMapel = await getMapel();
    setMapel(dataMapel);
    const dataUser = await getUserByRole("guru");
    setUser(dataUser);
  }

  const handleNewGuru = async (event) => {
    event.preventDefault();
    if (event.target.id === "tanggal_lahir") {
      const birthDate = new Date(event.target.value);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      const m = now.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
        age++;
      }
      setNewGuru({
        ...newGuru,
        [event.target.id]: event.target.value,
        umur: age,
      });
    } else {
      setNewGuru({
        ...newGuru,
        [event.target.id]: event.target.value,
      });
    }
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
      id_mapel: newGuru.id_mapel,
      mapel: newGuru.mapel,
      id_user: newGuru.id_user,
      username: newGuru.username,
    });

    try {
      await postNewGuru(newGuru);
    } catch (error) {
      console.error("handleNewGuru: ", error);
    }
    setNewGuru({
      ...newGuru,
      nama: "",
      jenis_kelamin: "Pilih Jenis Kelamin",
      tanggal_lahir: "",
      umur: "",
      alamat: "",
      id_mapel: "",
      mapel: "Pilih Mapel",
      username: "",
    });
    getDataGuru();
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
              <Dropdown label={newGuru.jenis_kelamin} inline className="w-64">
                <DropdownItem
                  onClick={() => {
                    setNewGuru({
                      ...newGuru,
                      jenis_kelamin: "Laki-laki",
                    });
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
              readOnly
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
              <Dropdown
                label={newGuru.mapel}
                inline
                className="w-64 overflow-y-scroll max-h-64"
              >
                {mapel.map((data) => {
                  return (
                    <DropdownItem
                      className="text-left"
                      key={data.id}
                      onClick={() => {
                        setNewGuru({
                          ...newGuru,
                          id_mapel: data.id,
                          mapel: data.nama,
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
            <Label htmlFor="user" value="Username" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown label={newGuru.username} inline className="w-64">
                {user.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNewGuru({
                          ...newGuru,
                          id_user: data.id,
                          username: data.username,
                        });
                      }}
                    >
                      {data.username}
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
              jenis_kelamin: "Pilih Jenis Kelamin",
              tanggal_lahir: "",
              umur: "",
              alamat: "",
              id_mapel: "",
              mapel: "Pilih Mapel",
              id_user: "",
              username: "Pilih Username",
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
