// //? lib
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// //? api
import {
  getAbsensiByFilter,
  getKelas,
  hapusAbsensi,
} from "../../../../api/supabase";

// //? components
import {
  Button,
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";

// //? icons
import {
  PiMagnifyingGlassDuotone,
  PiNotePencilDuotone,
  PiTrashDuotone,
} from "react-icons/pi";

// //? modals
import TambahAbsensi from "./TambahAbsensi";
import EditAbsensi from "./EditAbsensi";

function AbsensiPage() {
  const [absensi, setAbsensi] = useState([]);
  const [filter, setFilter] = useState({
    namaKelas: "10 - A",
    idKelas: 1,
    tanggal: "2024-04-01",
  });
  const [tambah, setTambah] = useState(false);
  const [newAbsensi, setNewAbsensi] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    getDatas();
  }, [filter]);

  async function getDatas() {
    setLoading(true);
    const absensi = await getAbsensiByFilter(filter);
    setAbsensi(absensi);
    const kelas = await getKelas();
    setKelas(kelas);
    setLoading(false);
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          await hapusAbsensi(id);
          await getDatas();
          Swal.fire({
            title: "Terhapus!",
            text: "Data telah dihapus.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
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
            icon={PiMagnifyingGlassDuotone}
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
          <Label htmlFor="tanggal" value="Pilih Tanggal:" className="" />
          <TextInput
            id="tanggal"
            type="date"
            value={filter.tanggal}
            onChange={(e) => setFilter({ ...filter, tanggal: e.target.value })}
            pattern="\d{4}-\d{2}-\d{2}"
          />
          <div className="flex items-center gap-4">
            <Label htmlFor="kelas" value="Pilih Kelas:" className="" />
            <div className="flex justify-center h-10 p-3 text-sm border rounded-md border-slate-300 text-slate-700 bg-slate-50">
              <Dropdown
                id="kelas"
                inline
                label={filter.namaKelas}
                className="w-32 overflow-y-auto text-center max-h-64"
              >
                {kelas.map((data, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      className="flex justify-center w-32"
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
        {loading ? (
          <div className="flex justify-center my-20">
            <Spinner size="xl" />
          </div>
        ) : (
          <Table className="mt-4 text-center" key={absensi} striped>
            <TableHead className="text-center">
              <TableHeadCell className="w-16 text-white bg-amber-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500">
                Nama Siswa
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500">
                Status
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500 ">
                Action
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {absensi.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>Tidak ada data</TableCell>
                </TableRow>
              ) : (
                absensi.map((absen, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="text-slate-600 hover:bg-amber-50 hover:font-semibold odd:bg-slate-200 "
                    >
                      <TableCell className="w-16 font-bold">
                        {index + 1}
                      </TableCell>
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
                            <PiNotePencilDuotone className="mr-2 text-sm" />{" "}
                            Edit
                          </Button>
                          <Button
                            size="xs"
                            color="failure"
                            onClick={() => handleHapus(absen.id)}
                          >
                            <PiTrashDuotone className="mr-2 text-sm" /> Hapus
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal show={tambah} onClose={() => setTambah(false)}>
        <TambahAbsensi
          newAbsensi={newAbsensi}
          setNewAbsensi={setNewAbsensi}
          setTambah={setTambah}
          getDatas={getDatas}
          filter={filter.tanggal}
        />
      </Modal>

      <Modal show={edit} size="md" onClose={() => setEdit(false)}>
        <EditAbsensi idEdit={idEdit} setEdit={setEdit} getDatas={getDatas} />
      </Modal>
    </div>
  );
}

export default AbsensiPage;
