import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getMurid, postNewAbsensi } from "../../../../api/supabase";
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";

function TambahAbsensi({
  newAbsensi,
  setNewAbsensi,
  setTambah,
  getDataAbsensi,
}) {
  const [murid, setMurid] = useState([]);
  const [labelMurid, setLabelMurid] = useState("Pilih Murid");
  const [labelStatus, setLabelStatus] = useState("Pilih Status");

  useEffect(() => {
    getDataMurid();
  }, []);

  async function getDataMurid() {
    const data = await getMurid();
    setMurid(data);
  }

  const handleNewAbsensi = (event) => {
    event.preventDefault();
    setNewAbsensi({
      ...newAbsensi,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit() {
    setTambah(false);
    setNewAbsensi({
      ...newAbsensi,
      id_murid: newAbsensi.id_murid,
      tanggal: newAbsensi.tanggal,
      status: newAbsensi.status,
    });

    try {
      await postNewAbsensi(newAbsensi);
    } catch (error) {
      console.error("handleNewAbsensi: ", error);
    }
    setNewAbsensi({
      ...newAbsensi,
      id_murid: "",
      tanggal: "",
      status: "",
    });
    getDataAbsensi();
  }

  return (
    <div>
      <Modal.Header>
        <p className="text-xl font-semibold">Tambah Absensi Baru</p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <Label htmlFor="tanggal" value="Tanggal" className="block mb-2" />
          <TextInput
            id="tanggal"
            type="date"
            value={newAbsensi.tanggal}
            onChange={handleNewAbsensi}
            autoComplete="off"
            pattern="\d{4}-\d{2}-\d{2}"
          />
          <Label htmlFor="murid" value="Pilih Murid" className="block mb-2" />
          <div className="flex items-center w-full h-10 p-3 text-sm border rounded-md text-slate-500 border-slate-400">
            <Dropdown id="murid" label={labelMurid} inline className="w-3/4">
              {murid.map((data) => {
                return (
                  <DropdownItem
                    key={data.id}
                    onClick={() => {
                      setNewAbsensi({
                        ...newAbsensi,
                        id_murid: data.id,
                      });
                      setLabelMurid(data.nama);
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
            <Dropdown id="status" label={labelStatus} inline className="w-64">
              <DropdownItem
                onClick={() => {
                  setNewAbsensi({
                    ...newAbsensi,
                    status: "Hadir",
                  });
                  setLabelStatus("Hadir");
                }}
              >
                Hadir
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setNewAbsensi({
                    ...newAbsensi,
                    status: "Izin",
                  });
                  setLabelStatus("Izin");
                }}
              >
                Izin
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setNewAbsensi({
                    ...newAbsensi,
                    status: "Sakit",
                  });
                  setLabelStatus("Sakit");
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
            setNewAbsensi({
              ...newAbsensi,
              id_murid: "",
              tanggal: "",
              status: "",
            });
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </div>
  );
}

TambahAbsensi.propTypes = {
  newAbsensi: PropTypes.object,
  setNewAbsensi: PropTypes.func,
  setTambah: PropTypes.func,
  getDataAbsensi: PropTypes.func,
};

export default TambahAbsensi;
