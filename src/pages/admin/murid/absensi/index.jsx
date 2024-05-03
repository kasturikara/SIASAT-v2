import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { getAbsensiByFilter, hapusAbsensi } from "../../../../api/supabase";
import Swal from "sweetalert2";
import TambahAbsensi from "./TambahAbsensi";
import EditAbsensi from "./EditAbsensi";

function AbsensiPage() {
  const [absensi, setAbsensi] = useState([]);
  const [filter, setFilter] = useState("2024-04-01");
  const [tambah, setTambah] = useState(false);
  const [newAbsensi, setNewAbsensi] = useState({
    tanggal: "",
    id_murid: "",
    status: "",
  });
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  useEffect(() => {
    getDataAbsensi();
  }, [absensi, filter]);

  async function getDataAbsensi() {
    const dataJadwal = await getAbsensiByFilter(filter);
    setAbsensi(dataJadwal);
  }

  const handleHapus = async (id) => {
    if (id === null || id === undefined) {
      console.error("handleHapusAbsensi: id is null or undefined");
      return;
    }
    try {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          hapusAbsensi(id);
          Swal.fire({
            title: "Terhapus!",
            text: "Data telah dihapus.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      getDataAbsensi();
    } catch (error) {
      console.error("handleHapusAbsensi: ", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 mb-8 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Absensi</p>
        <div className="flex justify-between mt-4">
          <TextInput
            id="search"
            placeholder="Search..."
            icon={AiOutlineSearch}
          />
          <button
            className="px-4 my-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-400"
            onClick={() => setTambah(true)}
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="p-8 overflow-x-auto rounded-lg bg-slate-50">
        <div className="flex items-center justify-start gap-6 p-4 mb-4 rounded align-center">
          <p className="text-md">Filter by date: </p>
          <input
            type="date"
            className="w-1/4 h-10 p-4 text-sm font-medium rounded-lg border-slate-300 text-slate-600"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            placeholder="Pilih Tanggal"
            format="yyyy-MM-dd"
          />
        </div>
        <Table className="text-center" striped key={absensi}>
          <TableHead className="text-center">
            <TableHeadCell className="w-16 text-white bg-teal-500">
              No.
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Tanggal
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Nama Siswa
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Status
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500 ">
              Action
            </TableHeadCell>
          </TableHead>
          <TableBody className="text-center divide-y">
            {absensi.map((absen, index) => {
              return (
                <TableRow
                  key={index}
                  className=" text-slate-600 hover:bg-teal-50 odd:bg-slate-200"
                >
                  <TableCell className="w-16">{index + 1}</TableCell>
                  <TableCell>{absen.tanggal}</TableCell>
                  <TableCell>{absen.murid.nama}</TableCell>
                  <TableCell>{absen.status}</TableCell>
                  <TableCell className="w-1/3">
                    <div className="flex justify-center gap-4">
                      <Button
                        size="xs"
                        color="success"
                        onClick={() => {
                          setEdit(true);
                          setIdEdit(absen.id);
                        }}
                      >
                        <AiFillEdit className="mr-2" /> Edit
                      </Button>
                      <Button
                        size="xs"
                        color="failure"
                        onClick={() => handleHapus(absen.id)}
                      >
                        <AiFillDelete className="mr-2" /> Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Modal show={tambah} size="md" onClose={() => setTambah(false)}>
        <TambahAbsensi
          newAbsensi={newAbsensi}
          setNewAbsensi={setNewAbsensi}
          setTambah={setTambah}
          getDataAbsensi={getDataAbsensi}
        />
      </Modal>

      <Modal show={edit} size="md" onClose={() => setEdit(false)}>
        <EditAbsensi
          idEdit={idEdit}
          setEdit={setEdit}
          getDataAbsensi={getDataAbsensi}
        />
      </Modal>
    </div>
  );
}

export default AbsensiPage;
