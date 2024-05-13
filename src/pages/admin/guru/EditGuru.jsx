import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  getGuruById,
  getMapel,
  getUserByRole,
  updateGuru,
} from "../../../api/supabase";
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function EditGuru({ idEdit, setEdit, getDataGuru }) {
  const [guru, setGuru] = useState({});
  const [mapel, setMapel] = useState([]);
  const [labelMapel, setLabelMapel] = useState("");
  const [user, setUser] = useState([]);
  const [labelUser, setLabelUser] = useState("");

  async function getData() {
    try {
      const data = await getGuruById(idEdit);
      if (data) {
        setGuru(data);
      }

      const dataMapel = await getMapel();
      if (dataMapel) {
        setMapel(dataMapel);
      }

      const dataUser = await getUserByRole("guru");
      if (dataUser) {
        setUser(dataUser);
      }
    } catch (error) {
      console.error("getData: ", error);
    }
  }

  async function setLabel() {
    const guru = await getGuruById(idEdit);
    setLabelMapel(guru.mapel.nama);
    setLabelUser(guru.user.username);
  }

  useEffect(() => {
    getData();
    setLabel();
  }, []);

  const handleGuru = (event) => {
    event.preventDefault();
    if (event.target.id === "tanggal_lahir") {
      const birthDate = new Date(event.target.value);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      const m = now.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
        age--;
      }
      setGuru({
        ...guru,
        [event.target.id]: event.target.value,
        umur: age,
      });
    } else {
      setGuru({
        ...guru,
        [event.target.id]: event.target.value,
      });
    }
  };

  async function handleSubmit() {
    try {
      setEdit(false);
      if (guru) {
        setGuru({
          ...guru,
          nama: guru.nama,
          jenis_kelamin: guru.jenis_kelamin,
          tanggal_lahir: guru.tanggal_lahir,
          umur: guru.umur,
          alamat: guru.alamat,
          id_mapel: guru.id_mapel,
          id_user: guru.id_user,
        });
        console.log("Guru: ", guru);
      }

      if (guru && idEdit) {
        await updateGuru(idEdit, guru);
      }

      if (getDataGuru) {
        getDataGuru();
      }
    } catch (error) {
      console.error("handleSubmit: ", error);
    }
  }

  return (
    <div>
      <Modal.Header>Edit Data Guru</Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="nama" value="Nama Guru" className="block mb-2" />
              <TextInput
                id="nama"
                type="text"
                placeholder="nama guru"
                required
                value={guru?.nama}
                onChange={handleGuru}
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
                <Dropdown
                  id="jenis_kelamin"
                  label={guru?.jenis_kelamin}
                  inline
                  className="w-64"
                >
                  <DropdownItem
                    onClick={() => {
                      setGuru({
                        ...guru,
                        jenis_kelamin: "Laki-laki",
                      });
                    }}
                  >
                    Laki-laki
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setGuru({
                        ...guru,
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
                value={guru?.tanggal_lahir}
                onChange={handleGuru}
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
                value={guru?.umur}
                onChange={handleGuru}
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
                value={guru?.alamat}
                onChange={handleGuru}
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
                          setGuru({
                            ...guru,
                            id_mapel: data.id_mapel,
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
              <Label
                htmlFor="user"
                value="Pilih Username"
                className="block mb-2"
              />
              <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
                <Dropdown label={labelUser} inline className="w-64">
                  {user.map((data) => {
                    return (
                      <DropdownItem
                        key={data.id}
                        onClick={() => {
                          setGuru({
                            ...guru,
                            id_user: data.id_user,
                          });
                          setLabelUser(data.username);
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

EditGuru.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDataGuru: PropTypes.func,
};

export default EditGuru;
