// //?  lib
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// //? api supabase
import { getMateri, hapusMateri } from "../../../../api/supabase";

// //? flowbite
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
  Spinner,
} from "flowbite-react";

// //? icons
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";

// //? modal
import TambahMateri from "./TambahMateri";
import EditMateri from "./EditMateri";

function MateriPage() {
  const [materi, setMateri] = useState([]);
  const [tambah, setTambah] = useState(false);
  const [newMateri, setNewMateri] = useState({
    guru: "",
    mapel: "",
    deskripsi: "",
  });
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataMateri();
  }, []);

  async function getDataMateri() {
    setLoading(true);
    const dataMateri = await getMateri();
    setMateri(dataMateri);
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
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await hapusMateri(id);
          await getDataMateri();
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
      console.error("handleHapus: hapusMateri", error);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="p-4 mb-4 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Materi</p>
        <div className="flex justify-between mt-4">
          <TextInput
            id="search"
            placeholder="Search..."
            icon={AiOutlineSearch}
          />
          <button
            className="px-4 my-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-400"
            onClick={() => setTambah(true)}
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="p-8 overflow-x-auto rounded-lg bg-slate-50">
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <Table key={materi} striped>
            <TableHead className="text-center">
              <TableHeadCell className="text-white bg-sky-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-sky-500">
                Guru
              </TableHeadCell>
              <TableHeadCell className="text-white bg-sky-500">
                Mapel
              </TableHeadCell>
              <TableHeadCell className="text-white bg-sky-500">
                Materi
              </TableHeadCell>
              <TableHeadCell className="text-white bg-sky-500">
                Action
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {materi.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>Tidak ada data</TableCell>
                </TableRow>
              ) : (
                materi.map((data, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="text-slate-600 hover:bg-sky-50 odd:bg-slate-200"
                    >
                      <TableCell className="whitespace-nowrap">
                        {index + 1}
                      </TableCell>
                      <TableCell>{data.guru.nama}</TableCell>
                      <TableCell>{data.mapel.nama}</TableCell>
                      <TableCell>{data.deskripsi}</TableCell>
                      <TableCell>
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

      <Modal show={tambah} onClose={() => setTambah(false)} size="md">
        <TambahMateri
          newMateri={newMateri}
          setNewMateri={setNewMateri}
          setTambah={setTambah}
          getDataMateri={getDataMateri}
        />
      </Modal>

      <Modal show={edit} onClose={() => setEdit(false)} size="md">
        <EditMateri
          idEdit={idEdit}
          setEdit={setEdit}
          getDataMateri={getDataMateri}
        />
      </Modal>
    </div>
  );
}

export default MateriPage;
