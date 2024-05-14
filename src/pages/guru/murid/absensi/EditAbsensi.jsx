// //? lib
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// //? api
import { getAbsensiById, updateAbsensi } from "../../../../api/supabase";

// //? components
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function EditAbsensi({ idEdit, setEdit, getDatas }) {
  const [absensi, setAbsensi] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const absensi = await getAbsensiById(idEdit);
    setAbsensi(absensi);
  }

  async function handleSubmit() {
    setEdit(false);
    try {
      await updateAbsensi(idEdit, absensi);
    } catch (error) {
      console.error("edit absensi: ", error);
    }
    getDatas();
  }

  return (
    <div>
      <Modal.Header>Edit Absensi</Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <Label htmlFor="murid" value="Nama Murid" className="block mb-2" />
          <TextInput id="murid" value={absensi?.murid?.nama} readOnly />
          <Label htmlFor="status" value="Status" className="block mb-2" />
          <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-900 border-slate-300">
            <Dropdown id="status" label={absensi?.status} inline>
              {["Hadir", "Sakit", "Izin", "Alpa"].map((status) => (
                <DropdownItem
                  key={status}
                  onClick={() => {
                    setAbsensi((prev) => {
                      return {
                        ...prev,
                        status: status,
                      };
                    });
                  }}
                >
                  {status}
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {" "}
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
  getDatas: PropTypes.func,
};

export default EditAbsensi;
