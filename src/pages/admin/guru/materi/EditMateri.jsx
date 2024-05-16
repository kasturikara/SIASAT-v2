// //? lib
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// //? api
import {
  getGuru,
  getMapel,
  getMateriById,
  updateMateri,
} from "../../../../api/supabase";

// //? components
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function EditMateri({ idEdit, setEdit, getDataMateri }) {
  const [materi, setMateri] = useState({});
  const [guru, setGuru] = useState([]);
  const [labelGuru, setLabelGuru] = useState("Pilih Guru");
  const [mapel, setMapel] = useState([]);
  const [labelMapel, setLabelMapel] = useState("Pilih Mapel");

  async function getData() {
    const data = await getMateriById(idEdit);
    setMateri(data);
    const dataGuru = await getGuru();
    setGuru(dataGuru);
    const dataMapel = await getMapel();
    setMapel(dataMapel);
  }

  useEffect(() => {
    getData();
    setLabel();
  }, []);

  async function setLabel() {
    const materi = await getMateriById(idEdit);
    setLabelGuru(materi.guru.nama);
    setLabelMapel(materi.mapel.nama);
  }

  const handleMateri = (event) => {
    event.preventDefault();
    setMateri({
      ...materi,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setEdit(false);
    setMateri({
      ...materi,
      id_guru: materi.guru,
      id_mapel: materi.mapel,
      deskripsi: materi.deskripsi,
    });

    try {
      await updateMateri(idEdit, materi);
    } catch (error) {
      console.error("handleEditMateri: ", error);
    }
    getDataMateri();
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-semibold">Edit Materi</p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <Label htmlFor="guru" value="Nama Guru" className="block mb-2" />
          <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
            <Dropdown id="guru" label={labelGuru} className="w-64" inline>
              {guru.map((item) => {
                return (
                  <DropdownItem
                    key={item.id}
                    onClick={() => {
                      setMateri({
                        ...materi,
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
                      setMateri({
                        ...materi,
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
            value={materi.deskripsi}
            onChange={handleMateri}
            autoComplete="off"
          />
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

EditMateri.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDataMateri: PropTypes.func,
};

export default EditMateri;
