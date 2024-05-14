// //? prop types
import PropTypes from "prop-types";

// //? lib
import { useEffect, useState } from "react";

// //? api supabase
import {
  getAbsensiById,
  getMurid,
  updateAbsensi,
} from "../../../../api/supabase";

// //? flowbite
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function EditAbsensi({ idEdit, setEdit, getDataAbsensi }) {
  const [absensi, setAbsensi] = useState({});
  const [murid, setMurid] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await getAbsensiById(idEdit);
    setAbsensi(data);
    const dataMurid = await getMurid();
    setMurid(dataMurid);
  }

  const handleAbsensi = (event) => {
    event.preventDefault();
    setAbsensi({
      ...absensi,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setEdit(false);
    setAbsensi({
      ...absensi,
      id_murid: absensi.id_murid,
      status: absensi.status,
      tanggal: absensi.tanggal,
    });

    try {
      await updateAbsensi(idEdit, absensi);
    } catch (error) {
      console.error("handleEditAbsensi: ", error);
    }
    getDataAbsensi();
  }

  return (
    <div>
      <Modal.Header>Edit Absensi</Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <Label htmlFor="tanggal" value="Tanggal" className="block mb-2" />
          <TextInput
            id="tanggal"
            type="date"
            value={absensi.tanggal}
            onChange={handleAbsensi}
            autoComplete="off"
            pattern="\d{4}-\d{2}-\d{2}"
          />
          <Label htmlFor="murid" value="Pilih Murid" className="block mb-2" />
          <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
            <Dropdown
              id="murid"
              label={absensi.murid?.nama}
              inline
              className="w-3/4"
            >
              {murid.map((data) => {
                return (
                  <DropdownItem
                    key={data.id}
                    onClick={() => {
                      setAbsensi({
                        ...absensi,
                        id_murid: data.id,
                      });
                    }}
                    className="border-y border-slate-100"
                  >
                    {data.nama}
                  </DropdownItem>
                );
              })}
            </Dropdown>
          </div>
          <Label htmlFor="status" value="Status" className="block mb-2" />
          <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
            <Dropdown
              id="status"
              label={absensi.status}
              inline
              className="w-64"
            >
              <DropdownItem
                onClick={() => {
                  setAbsensi({
                    ...absensi,
                    status: "Hadir",
                  });
                }}
              >
                Hadir
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setAbsensi({
                    ...absensi,
                    status: "Izin",
                  });
                }}
              >
                Izin
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setAbsensi({
                    ...absensi,
                    status: "Sakit",
                  });
                }}
              >
                Sakit
              </DropdownItem>
            </Dropdown>
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

EditAbsensi.propTypes = {
  idEdit: PropTypes.number,
  setEdit: PropTypes.func,
  getDataAbsensi: PropTypes.func,
};

export default EditAbsensi;
