// //? lib
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// //? api supabase
import { getKelas, hapusKelas } from "../../../api/supabase";

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
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";

// //? modals
import TambahKelas from "./TambahKelas";
import EditKelas from "./EditKelas";

function KelasPage() {
  const [kelas, setKelas] = useState([]);
  const [tambah, setTambah] = useState(false);
  const [newKelas, setNewKelas] = useState({
    nama: "",
  });
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataKelas();
  }, []);

  async function getDataKelas() {
    setLoading(true);
    const data = await getKelas();
    setKelas(data);
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
      }).then((result) => {
        if (result.isConfirmed) {
          hapusKelas(id);
          Swal.fire({
            title: "Terhapus!",
            text: "Data telah dihapus.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      getDataKelas();
    } catch (error) {
      console.error("handleHapus: hapusKelas", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 mb-8 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Kelas</p>
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
        {loading ? (
          <div className="flex justify-center my-20">
            <Spinner />
          </div>
        ) : (
          <Table striped key={kelas}>
            <TableHead className="text-center">
              <TableHeadCell className="w-16 text-white bg-teal-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Nama Kelas
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Jumlah Murid
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500 ">
                Action
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {kelas.map((data, index) => {
                return (
                  <TableRow
                    key={index}
                    className=" text-slate-600 hover:bg-teal-50 odd:bg-slate-200"
                  >
                    <TableCell className="w-16">{index + 1}</TableCell>
                    <TableCell>{data.kelas}</TableCell>
                    <TableCell>{data.jml_murid}</TableCell>
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
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal show={tambah} size="sm" onClose={() => setTambah(false)}>
        <TambahKelas
          newKelas={newKelas}
          setNewKelas={setNewKelas}
          setTambah={setTambah}
          getDataKelas={getDataKelas}
        />
      </Modal>

      <Modal show={edit} size="sm" onClose={() => setEdit(false)}>
        <EditKelas
          idEdit={idEdit}
          setEdit={setEdit}
          getDataKelas={getDataKelas}
        />
      </Modal>
    </div>
  );
}

export default KelasPage;
