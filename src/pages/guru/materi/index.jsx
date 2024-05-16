// //? lib
import { useEffect, useState } from "react";

// //? api
import { getMateriByGuru, hapusMateri } from "../../../api/supabase";

// //? components
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
import LoadingPage from "../../loading";

// //? icons
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import TambahMateri from "./TambahMateri";
import EditMateri from "./EditMateri";

function MateriPage() {
  const guru = JSON.parse(localStorage.getItem("guru"));
  const [materi, setMateri] = useState([]);
  const [tambah, setTambah] = useState(false);
  const [newMateri, setNewMateri] = useState({
    id_guru: guru?.id,
    id_mapel: guru?.id_mapel,
    deskripsi: "",
  });
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDatas();
  }, []);

  async function getDatas() {
    setLoading(true);
    const materi = await getMateriByGuru(guru?.id);
    setMateri(materi);
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
      console.error("handleHapus: ", error);
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
          <LoadingPage />
        ) : (
          <Table key={materi} striped>
            <TableHead className="text-center">
              <TableHeadCell className="w-1/12 text-white bg-amber-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500">
                Deskripsi Materi
              </TableHeadCell>
              <TableHeadCell className="w-3/12 text-white bg-amber-500">
                Action
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {materi.map((materi, index) => (
                <TableRow
                  key={index}
                  className="text-slate-600 hover:bg-amber-50 even:bg-slate-200"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{materi.deskripsi}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-4">
                      <Button
                        size="xs"
                        color="success"
                        onClick={() => {
                          setEdit(true);
                          setIdEdit(materi.id);
                        }}
                      >
                        <AiFillEdit className="mr-2" /> Edit
                      </Button>
                      <Button
                        size="xs"
                        color="failure"
                        onClick={() => handleHapus(materi.id)}
                      >
                        <AiFillDelete className="mr-2" /> Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal show={tambah} onClose={() => setTambah(false)} size="md">
        <TambahMateri
          newMateri={newMateri}
          setNewMateri={setNewMateri}
          setTambah={setTambah}
          getDatas={getDatas}
        />
      </Modal>

      <Modal show={edit} onClose={() => setEdit(false)} size="md">
        <EditMateri idEdit={idEdit} setEdit={setEdit} getDatas={getDatas} />
      </Modal>
    </div>
  );
}

export default MateriPage;
