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
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from "react-icons/ai";
import { getPengumuman, hapusPengumuman } from "../../../api/supabase";
import { useEffect, useState } from "react";
import TambahPengumuman from "./TambahPengumuman";
import EditPengumuman from "./EditPengumuman";

function PengumumanPage() {
  const [pengumuman, setPengumuman] = useState([]);
  const [openTambah, setOpenTambah] = useState(false);
  const [newPengumuman, setNewPengumuman] = useState({
    judul: "",
    isi: "",
    tanggal: "",
  });
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    getDataPengumuman();
  }, []);

  async function getDataPengumuman() {
    const data = await getPengumuman();
    setPengumuman(data);
  }

  const handleHapus = async (id) => {
    if (id === null || id === undefined) {
      console.error("handleHapus: id is null or undefined");
      return;
    }

    try {
      await hapusPengumuman(id);
      getDataPengumuman();
    } catch (error) {
      console.error("handleHapus: hapusPengumuman", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 mb-4 rounded-lg bg-slate-200">
        <p className="text-2xl font-semibold ">List Pengumuman</p>
        <div className="flex justify-between mt-4">
          <TextInput id="search" placeholder="Search" icon={AiOutlineSearch} />
          <button
            className="px-4 my-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-400"
            onClick={() => setOpenTambah(true)}
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="p-8 overflow-x-auto rounded-lg bg-slate-200">
        <Table striped hoverable key={pengumuman}>
          <TableHead className="text-center">
            <TableHeadCell className="bg-teal-200">No.</TableHeadCell>
            <TableHeadCell className="bg-teal-200">Judul</TableHeadCell>
            <TableHeadCell className="bg-teal-200">Isi</TableHeadCell>
            <TableHeadCell className="bg-teal-200">Tanggal</TableHeadCell>
            <TableHeadCell className="bg-teal-200">Action</TableHeadCell>
          </TableHead>
          <TableBody className="text-center divide-y">
            {pengumuman.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    {index + 1}.
                  </TableCell>
                  <TableCell>{data.judul}</TableCell>
                  <TableCell>{data.isi}</TableCell>
                  <TableCell>{data.tanggal}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-4">
                      <Button size="xs" color="success">
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
      </div>

      <Modal show={openTambah} size="lg">
        <TambahPengumuman
          newPengumuman={newPengumuman}
          setNewPengumuman={setNewPengumuman}
          setOpenTambah={setOpenTambah}
          getDataPengumuman={getDataPengumuman}
        />
      </Modal>

      <Modal show={openEdit} size="lg">
        <EditPengumuman
          newPengumuman={newPengumuman}
          setNewPengumuman={setNewPengumuman}
          setOpenTambah={setOpenTambah}
          getDataPengumuman={getDataPengumuman}
        />
      </Modal>
    </div>
  );
}

export default PengumumanPage;
