// //? lib
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// //? api supabase
import {
  getJadwalByFilter,
  getKelas,
  hapusJadwal,
} from "../../../api/supabase";

// //? flowbite
import {
  Button,
  Dropdown,
  DropdownItem,
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
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";

// //? modals
import EditJadwal from "./EditJadwal";
import TambahJadwal from "./TambahJadwal";

function JadwalPage() {
  const [jadwal, setJadwal] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [filterJadwal, setFilterJadwal] = useState({
    id: 1,
    kelas: "10-A",
  });
  const [tambah, setTambah] = useState(false);
  const [newJadwal, setNewJadwal] = useState({
    id_kelas: filterJadwal.id,
    kelas: filterJadwal.kelas,
    id_guru: "",
    guru: "Pilih Guru",
    hari: "Pilih Hari",
    jam_mulai: "",
    jam_selesai: "",
  });
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataJadwal();
  }, [filterJadwal.id]);

  async function getDataJadwal() {
    const dataJadwal = await getJadwalByFilter(filterJadwal.id);
    setJadwal(dataJadwal);
    const dataKelas = await getKelas();
    setKelas(dataKelas);
    setLoading(false);
  }

  const handleHapus = async (id) => {
    if (id === null || id === undefined) {
      console.error("handleHapus: id is null or undefined");
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
          await hapusJadwal(id);
          await getDataJadwal();
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
      console.error("handleHapus: hapusJadwal", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 mb-8 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Jadwal per Kelas</p>
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
        <Dropdown
          label={filterJadwal.kelas}
          outline
          size="sm"
          className="mb-4 text-center bg-slate-50"
        >
          {kelas.map((data) => {
            return (
              <DropdownItem
                key={data.id}
                className="flex items-center justify-center px-1 py-2 bg-slate-50 hover:bg-slate-500"
                onClick={() =>
                  setFilterJadwal({
                    ...filterJadwal,
                    id: data.id,
                    kelas: data.kelas,
                  })
                }
              >
                {data.kelas}
              </DropdownItem>
            );
          })}
        </Dropdown>
        {loading ? (
          <div className="flex justify-center my-20">
            <Spinner />
          </div>
        ) : (
          <Table striped key={jadwal} className="mt-4">
            <TableHead className="text-center">
              <TableHeadCell className="w-16 text-white bg-sky-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-sky-500">
                Hari
              </TableHeadCell>
              <TableHeadCell className="text-white bg-sky-500">
                Nama Guru
              </TableHeadCell>
              <TableHeadCell className="text-white bg-sky-500">
                Mapel
              </TableHeadCell>
              <TableHeadCell className="text-white bg-sky-500">
                Jam
              </TableHeadCell>
              <TableHeadCell className="text-white bg-sky-500 ">
                Action
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {jadwal.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>Tidak ada data</TableCell>
                </TableRow>
              ) : (
                jadwal.map((data, index) => {
                  return (
                    <TableRow
                      key={index}
                      className=" text-slate-600 hover:bg-sky-50 odd:bg-slate-200"
                    >
                      <TableCell className="w-16">{index + 1}</TableCell>
                      <TableCell>{data.hari}</TableCell>
                      <TableCell>{data.guru?.nama}</TableCell>
                      <TableCell>{data.guru?.mapel.nama}</TableCell>
                      <TableCell>
                        {data.jam_mulai} - {data.jam_selesai}
                      </TableCell>
                      <TableCell className="w-1/3">
                        <div className="flex justify-center gap-4">
                          <Button
                            size="xs"
                            color="success"
                            onClick={() => {
                              setEdit(true);
                              setIdEdit(data.id);
                            }}
                          >
                            <AiFillEdit className="mr-2" /> Edit
                          </Button>
                          <Button
                            size="xs"
                            color="failure"
                            onClick={() => handleHapus(data.id)}
                          >
                            <AiFillDelete className="mr-2" /> Hapus
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
        <TambahJadwal
          newJadwal={newJadwal}
          setNewJadwal={setNewJadwal}
          setTambah={setTambah}
          getDataJadwal={getDataJadwal}
        />
      </Modal>

      <Modal show={edit} onClose={() => setEdit(false)}>
        <EditJadwal
          idEdit={idEdit}
          setEdit={setEdit}
          getDataJadwal={getDataJadwal}
        />
      </Modal>
    </div>
  );
}

export default JadwalPage;
