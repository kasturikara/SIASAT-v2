// //? lib
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// //? api
import {
  getKelas,
  getMuridByKelas,
  postAbsensi,
} from "../../../../api/supabase";

// //? components
import {
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";

function TambahAbsensi({
  newAbsensi,
  setNewAbsensi,
  setTambah,
  getDatas,
  filter: tanggal,
}) {
  const [murid, setMurid] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [filter, setFilter] = useState({
    tanggal: tanggal,
    idKelas: 1,
    namaKelas: "10-1",
  });

  useEffect(() => {
    getData();
  }, [filter]);
  async function getData() {
    const murid = await getMuridByKelas(filter.idKelas);
    setMurid(murid);
    const kelas = await getKelas();
    setKelas(kelas);
    // console.log("murid: ", murid);
  }

  useEffect(() => {
    if (newAbsensi.length > 0) {
      const updateTanggal = newAbsensi.map((data) => {
        return {
          ...data,
          tanggal: filter.tanggal,
        };
      });
      setNewAbsensi(updateTanggal);
    }
  }, [filter.tanggal]);

  const handleStatus = (idMurid, status) => {
    setNewAbsensi((prev) => {
      // hapus status sebelumnya
      const updatedAbsensi = prev.filter(
        (absensi) => absensi.id_murid !== idMurid
      );
      // tambah status baru
      updatedAbsensi.push({
        id_murid: idMurid,
        status: status,
        tanggal: filter.tanggal,
      });
      return updatedAbsensi;
    });
  };

  //handle submit post new absensi
  async function handleSubmit() {
    setTambah(false);
    try {
      await postAbsensi(newAbsensi);
    } catch (error) {
      console.error("post absensi: ", error);
    }
    setNewAbsensi([]);
    getDatas();
  }

  return (
    <>
      <Modal.Header>
        Tambah Absensi Baru
        <button onClick={() => console.table(newAbsensi)}>TES</button>
      </Modal.Header>
      <Modal.Body>
        <div className="flex items-center p-2 mb-2 justify-evenly">
          <div className="flex items-center gap-4">
            <Label htmlFor="tanggal" value="Pilih Tanggal:" className="" />
            <TextInput
              id="tanggal"
              type="date"
              value={filter.tanggal}
              className="w-36"
              onChange={(e) => {
                setFilter({ ...filter, tanggal: e.target.value });
              }}
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="kelas" value="Pilih Kelas:" className="" />
            <div className="flex justify-center p-3 text-sm border rounded-md border-slate-300 text-slate-700 bg-slate-50">
              <Dropdown
                id="kelas"
                inline
                label={filter.namaKelas}
                className="w-24"
              >
                {kelas.map((data, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() =>
                        setFilter({
                          ...filter,
                          idKelas: data.id,
                          namaKelas: data.kelas,
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
        </div>
        <Table className="text-center" striped>
          <TableHead>
            <TableHeadCell className="text-left">Nama Murid</TableHeadCell>
            <TableHeadCell className="">Hadir</TableHeadCell>
            <TableHeadCell className="">Izin</TableHeadCell>
            <TableHeadCell className="">Sakit</TableHeadCell>
            <TableHeadCell className="">Alpa</TableHeadCell>
          </TableHead>
          <TableBody>
            {murid.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="text-left">{data.nama}</TableCell>
                  <TableCell>
                    <Radio
                      id={`Hadir_${data.id}`}
                      name={`status_${data.id}`}
                      onChange={() => handleStatus(data.id, "Hadir")}
                    />
                  </TableCell>
                  <TableCell>
                    <Radio
                      id={`Izin_${data.id}`}
                      name={`status_${data.id}`}
                      onChange={() => handleStatus(data.id, "Izin")}
                    />
                  </TableCell>
                  <TableCell>
                    <Radio
                      id={`Sakit_${data.id}`}
                      name={`status_${data.id}`}
                      onChange={() => handleStatus(data.id, "Sakit")}
                    />
                  </TableCell>
                  <TableCell>
                    <Radio
                      id={`Alpa_${data.id}`}
                      name={`status_${data.id}`}
                      onChange={() => handleStatus(data.id, "Alpa")}
                      // defaultChecked
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
            setNewAbsensi([]);
          }}
        >
          Batal
        </button>
      </Modal.Footer>
    </>
  );
}

TambahAbsensi.propTypes = {
  newAbsensi: PropTypes.array,
  setNewAbsensi: PropTypes.func,
  setTambah: PropTypes.func,
  getDatas: PropTypes.func,
  filter: PropTypes.string,
};

export default TambahAbsensi;
