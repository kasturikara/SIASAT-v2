// //? lib
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// //? api supabase
import { getKelas, getMuridByKelas, hapusMurid } from "../../../api/supabase";
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
  Label,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import LoadingPage from "../../loading";

// //? icons
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";

// //? modals
import TambahMurid from "./TambahMurid";
import EditMurid from "./EditMurid";

function MuridPage() {
  const [murid, setMurid] = useState([]);
  const [tambah, setTambah] = useState(false);
  const [newMurid, setNewMurid] = useState({
    nama: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    umur: "",
    alamat: "",
    kelas: "",
    user: "",
  });
  const [filter, setFilter] = useState({
    idKelas: 1,
    namaKelas: "10 - A",
  });
  const [kelas, setKelas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataMurid();
  }, [filter]);

  async function getDataMurid() {
    setLoading(true);
    const murid = await getMuridByKelas(filter.idKelas);
    setMurid(murid);
    const kelas = await getKelas();
    setKelas(kelas);
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
          await hapusMurid(id);
          await getDataMurid();
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
      console.error("handleHapus: hapusMurid", error);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="p-4 mb-4 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Murid</p>
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

      <div className="px-4 py-8 overflow-x-auto rounded-lg bg-slate-50">
        <div className="flex items-center mb-8">
          <Label value="Pilih Kelas:" className="mr-4" />
          <div className="flex items-center h-10 px-2 py-1 text-sm border rounded-lg border-slate-300">
            <Dropdown inline label={filter.namaKelas} outline>
              {kelas.map((item) => (
                <DropdownItem
                  key={item.id}
                  className="flex items-center justify-center w-32 px-1 py-2"
                  onClick={() =>
                    setFilter({
                      ...filter,
                      idKelas: item.id,
                      namaKelas: item.kelas,
                    })
                  }
                >
                  {item.kelas}
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
        </div>
        {loading ? (
          <LoadingPage />
        ) : (
          <Table striped key={murid}>
            <TableHead className="text-center">
              <TableHeadCell className="text-white bg-teal-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Nama
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Jenis Kelamin
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Tanggal Lahir
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500 ">
                Umur
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Alamat
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Username / Email
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Action
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {murid.map((data, index) => {
                return (
                  <TableRow
                    key={index}
                    className="text-slate-600 hover:bg-teal-50 odd:bg-slate-200"
                  >
                    <TableCell className="whitespace-nowrap">
                      {index + 1}
                    </TableCell>
                    <TableCell>{data.nama}</TableCell>
                    <TableCell>{data.jenis_kelamin}</TableCell>
                    <TableCell>{data.tanggal_lahir}</TableCell>
                    <TableCell>{data.umur}</TableCell>
                    <TableCell>{data.alamat}</TableCell>
                    <TableCell>
                      {data.user.username} / {data.user.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
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

      <Modal show={tambah} onClose={() => setTambah(false)}>
        <TambahMurid
          newMurid={newMurid}
          setNewMurid={setNewMurid}
          setTambah={setTambah}
          getDataMurid={getDataMurid}
        />
      </Modal>

      <Modal show={edit} onClose={() => setEdit(false)}>
        <EditMurid
          idEdit={idEdit}
          setEdit={setEdit}
          getDataMurid={getDataMurid}
        />
      </Modal>
    </div>
  );
}

export default MuridPage;
