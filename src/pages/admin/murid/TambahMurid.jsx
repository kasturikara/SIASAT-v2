// //? prop types
import PropTypes from "prop-types";

// //? lib
import { useEffect, useState } from "react";

// //? api supabase
import { getKelas, getUserByRole, postMurid } from "../../../api/supabase";

// //? flowbite
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function TambahMurid({ newMurid, setNewMurid, setTambah, getDataMurid }) {
  const [kelas, setKelas] = useState([]);
  const [labelKelas, setLabelKelas] = useState("Pilih Kelas");
  const [labelJK, setLabelJK] = useState("Pilih Jenis Kelamin");
  const [user, setUser] = useState([]);
  const [labelUser, setLabelUser] = useState("Pilih Username");

  useEffect(() => {
    getDataKelasDanUser();
  }, []);

  async function getDataKelasDanUser() {
    const data = await getKelas();
    setKelas(data);
    const dataUser = await getUserByRole("murid");
    setUser(dataUser);
  }

  const handleNewMurid = (event) => {
    event.preventDefault();
    if (event.target.id === "tanggal_lahir") {
      const birthDate = new Date(event.target.value);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      const m = now.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
        age--;
      }
      setNewMurid({
        ...newMurid,
        tanggal_lahir: event.target.value,
        umur: age,
      });
    } else {
      setNewMurid({
        ...newMurid,
        [event.target.id]: event.target.value,
      });
    }
  };

  async function handleSubmit() {
    setTambah(false);
    setNewMurid({
      ...newMurid,
      nama: newMurid.nama,
      jenis_kelamin: newMurid.jenis_kelamin,
      tanggal_lahir: newMurid.tanggal_lahir,
      umur: newMurid.umur,
      alamat: newMurid.alamat,
      id_kelas: newMurid.id_kelas,
    });

    try {
      await postMurid(newMurid);
    } catch (error) {
      console.error("handleNewMurid: ", error);
    }
    setNewMurid({
      ...newMurid,
      nama: "",
      jenis_kelamin: "",
      tanggal_lahir: "",
      umur: "",
      alamat: "",
      id_kelas: "",
    });
    getDataMurid();
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-semibold">Tambah Murid Baru</p>
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="nama" value="Nama Murid" className="block mb-2" />
            <TextInput
              id="nama"
              type="text"
              placeholder="Masukkan nama murid"
              required
              value={newMurid.nama}
              onChange={handleNewMurid}
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="jk" value="Jenis Kelamin" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown id="jk" label={labelJK} inline className="w-64">
                <DropdownItem
                  onClick={() => {
                    setNewMurid({
                      ...newMurid,
                      jenis_kelamin: "Laki-laki",
                    });
                    setLabelJK("Laki-laki");
                  }}
                >
                  Laki-laki
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setNewMurid({
                      ...newMurid,
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
              placeholder="Pilih tanggal lahir"
              required
              value={newMurid.tanggal_lahir}
              onChange={handleNewMurid}
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
              value={newMurid.umur}
              onChange={handleNewMurid}
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
              value={newMurid.alamat}
              onChange={handleNewMurid}
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="kelas" value="Kelas" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown id="kelas" label={labelKelas} inline className="w-64">
                {kelas.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNewMurid({
                          ...newMurid,
                          id_kelas: data.id,
                        });
                        setLabelKelas(data.kelas);
                      }}
                      className="border-y border-slate-100"
                    >
                      {data.kelas}
                    </DropdownItem>
                  );
                })}
              </Dropdown>
            </div>
          </div>
          <div>
            <Label htmlFor="user" value="Username" className="block mb-2" />
            <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
              <Dropdown id="user" label={labelUser} inline className="w-64">
                {user.map((data) => {
                  return (
                    <DropdownItem
                      key={data.id}
                      onClick={() => {
                        setNewMurid({
                          ...newMurid,
                          id_user: data.id,
                        });
                        setLabelUser(data.username);
                      }}
                      className="border-y border-slate-100"
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
            setNewMurid({
              ...newMurid,
              nama: "",
              jenis_kelamin: "",
              tanggal_lahir: "",
              umur: "",
              alamat: "",
              id_kelas: "",
            });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahMurid.propTypes = {
  newMurid: PropTypes.object,
  setNewMurid: PropTypes.func,
  setTambah: PropTypes.func,
  getDataMurid: PropTypes.func,
};

export default TambahMurid;
