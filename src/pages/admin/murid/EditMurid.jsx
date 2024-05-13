import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  getKelas,
  getMuridById,
  getUserByRole,
  updateMurid,
} from "../../../api/supabase";
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function EditMurid({ idEdit, setEdit, getDataMurid }) {
  const [murid, setMurid] = useState({});
  const [kelas, setKelas] = useState([]);
  const [labelKelas, setLabelKelas] = useState("Pilih Kelas");
  const [user, setUser] = useState([]);
  const [labelUser, setLabelUser] = useState([]);

  async function getData() {
    const data = await getMuridById(idEdit);
    setMurid(data);
    const dataKelas = await getKelas();
    setKelas(dataKelas);
    const dataUser = await getUserByRole("murid");
    setUser(dataUser);
  }

  useEffect(() => {
    getData();
    setLabel();
  }, []);

  async function setLabel() {
    const murid = await getMuridById(idEdit);
    setLabelKelas(murid.kelas.nama);
    setLabelUser(murid.user.username);
  }

  const handleMurid = (event) => {
    event.preventDefault();
    if (event.target.id === "tanggal_lahir") {
      const birthDate = new Date(event.target.value);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      const m = now.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
        age--;
      }
      setMurid({
        ...murid,
        [event.target.id]: event.target.value,
        umur: age,
      });
    } else {
      setMurid({
        ...murid,
        [event.target.id]: event.target.value,
      });
    }
  };

  async function handleSubmit() {
    setEdit(false);
    setMurid({
      ...murid,
      id_kelas: murid.id_kelas,
      id_user: murid.id_user,
      nama: murid.nama,
      jenis_kelamin: murid.jenis_kelamin,
      tanggal_lahir: murid.tanggal_lahir,
      umur: murid.umur,
      alamat: murid.alamat,
    });

    try {
      await updateMurid(idEdit, murid);
    } catch (error) {
      console.error("handleSubmit: ", error);
    }
    getDataMurid();
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-semibold">Edit Murid</p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="nama" value="Nama Murid" className="block mb-2" />
              <TextInput
                id="nama"
                type="text"
                placeholder="Masukkan nama murid"
                required
                value={murid.nama}
                onChange={handleMurid}
                autoComplete="off"
              />
            </div>
            <div>
              <Label
                htmlFor="jk"
                value="Jenis Kelamin"
                className="block mb-2"
              />
              <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
                <Dropdown
                  id="jk"
                  label={murid.jenis_kelamin}
                  inline
                  className="w-64"
                >
                  <DropdownItem
                    onClick={() => {
                      setMurid({
                        ...murid,
                        jenis_kelamin: "Laki-laki",
                      });
                    }}
                  >
                    Laki-laki
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setMurid({
                        ...murid,
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
                placeholder="Pilih tanggal lahir"
                required
                value={murid.tanggal_lahir}
                onChange={handleMurid}
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
                value={murid.umur}
                onChange={handleMurid}
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
                value={murid.alamat}
                onChange={handleMurid}
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
                          setMurid({
                            ...murid,
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
                          setMurid({
                            ...murid,
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

EditMurid.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDataMurid: PropTypes.func,
};

export default EditMurid;
