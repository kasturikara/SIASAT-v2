// //? lib
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// //? api supabase
import { getPengumuman, hapusPengumuman } from "../../../api/supabase";

// //? flowbite
import {
  Button,
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
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from "react-icons/ai";

// //? modals
import TambahPengumuman from "./TambahPengumuman";
import EditPengumuman from "./EditPengumuman";

function PengumumanPage() {
  const [pengumuman, setPengumuman] = useState([]);
  const [tambah, setTambah] = useState(false);
  const [newPengumuman, setNewPengumuman] = useState({
    judul: "",
    isi: "",
    tanggal: "",
  });
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataPengumuman();
  }, []);

  async function getDataPengumuman() {
    setLoading(true);
    const data = await getPengumuman();
    setPengumuman(data);
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
          await hapusPengumuman(id);
          await getDataPengumuman();
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
      console.error("handleHapus: hapusPengumuman", error);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="p-4 mb-4 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold ">List Pengumuman</p>
        <div className="flex justify-between mt-4">
          <TextInput id="search" placeholder="Search" icon={AiOutlineSearch} />
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
          <div className="flex justify-center my-20">
            <Spinner />
          </div>
        ) : (
          <Table striped key={pengumuman}>
            <TableHead className="text-center">
              <TableHeadCell className="text-white bg-teal-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Judul
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Isi
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Tanggal
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Action
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {pengumuman.map((data, index) => {
                return (
                  <TableRow
                    key={index}
                    className="text-slate-600 hover:bg-teal-50 odd:bg-slate-200"
                  >
                    <TableCell className=" whitespace-nowrap">
                      {index + 1}.
                    </TableCell>
                    <TableCell>{data.judul}</TableCell>
                    <TableCell>{data.isi}</TableCell>
                    <TableCell>{data.tanggal}</TableCell>
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
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal show={tambah} size="lg" onClose={() => setTambah(false)}>
        <TambahPengumuman
          newPengumuman={newPengumuman}
          setNewPengumuman={setNewPengumuman}
          setTambah={setTambah}
          getDataPengumuman={getDataPengumuman}
        />
      </Modal>

      <Modal show={edit} size="lg" onClose={() => setEdit(false)}>
        <EditPengumuman
          idEdit={idEdit}
          setEdit={setEdit}
          getDataPengumuman={getDataPengumuman}
        />
      </Modal>
    </div>
  );
}

export default PengumumanPage;
