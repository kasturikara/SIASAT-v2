// //? lib
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// //? api
import {
  getMurid,
  getNilaiByMuridAndMapel,
  hapusNilai,
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
import TambahNilai from "./TambahNilai";
import EditNilai from "./EditNilai";

function NilaiPage() {
  const guru = JSON.parse(localStorage.getItem("guru"));
  const [nilai, setNilai] = useState([]);
  const [murid, setMurid] = useState([]);
  const [filter, setFilter] = useState({
    id: 2,
    nama: "Aditya Ramadhan",
  });
  const [tambah, setTambah] = useState(false);
  const [newNilai, setNewNilai] = useState({
    id_murid: filter.id,
    murid: filter.nama,
    id_mapel: guru.id_mapel,
  });
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDatas();
  }, [filter]);

  async function getDatas() {
    setLoading(true);
    const nilai = await getNilaiByMuridAndMapel(filter.id, guru.id_mapel);
    setNilai(nilai);
    const murid = await getMurid();
    setMurid(murid);
    setNewNilai({
      id_murid: filter.id,
      murid: filter.nama,
      id_mapel: guru.id_mapel,
    });
    setLoading(false);
  }

  const handleHapus = async (id) => {
    if (id === null || id === undefined) {
      console.error("handleHapusNilai: id is null or undefined");
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
          await hapusNilai(id);
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
      console.error("handleHapusNilai: hapusNilai", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 mb-8 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Nilai</p>
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
        <div className="flex items-center gap-4">
          <Label htmlFor="murid" value="Pilih Murid: " />
          <div className="px-2 py-1 text-sm border rounded-lg border-slate-300">
            <Dropdown
              label={filter.nama}
              outline
              size="sm"
              className="float-right w-64 overflow-y-auto max-h-64"
              inline
            >
              {murid.map((data) => {
                return (
                  <DropdownItem
                    key={data.id}
                    className="flex items-center justify-center px-1 py-2 bg-slate-50 hover:bg-slate-500"
                    onClick={() =>
                      setFilter({
                        ...filter,
                        id: data.id,
                        nama: data.nama,
                      })
                    }
                  >
                    {data.nama}
                  </DropdownItem>
                );
              })}
            </Dropdown>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center my-20">
            <Spinner />
          </div>
        ) : (
          <Table striped key={nilai} className="mt-4">
            <TableHead className="text-center">
              <TableHeadCell className="w-16 text-white bg-amber-500">
                No.
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500">
                Mapel
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500">
                Jenis
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500">
                Nilai
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500">
                Tanggal
              </TableHeadCell>
              <TableHeadCell className="text-white bg-amber-500 ">
                Action
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-center divide-y">
              {nilai.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>Tidak ada data</TableCell>
                </TableRow>
              ) : (
                nilai.map((item, index) => (
                  <TableRow
                    key={index}
                    className="text-slate-600 hover:bg-amber-50 hover:font-semibold odd:bg-slate-200"
                  >
                    <TableCell className="w-16">{index + 1}</TableCell>
                    <TableCell>{item.mapel.nama}</TableCell>
                    <TableCell>{item.jenis}</TableCell>
                    <TableCell>{item.nilai}</TableCell>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-4">
                        <Button
                          size="xs"
                          color="success"
                          onClick={() => {
                            setEdit(true);
                            setIdEdit(item.id);
                          }}
                        >
                          <PiNotePencilDuotone className="mr-2" /> Edit
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleHapus(item.id)}
                        >
                          <PiTrashDuotone className="mr-2" /> Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal show={tambah} onClose={() => setTambah(false)}>
        <TambahNilai
          newNilai={newNilai}
          setNewNilai={setNewNilai}
          setTambah={setTambah}
          getDatas={getDatas}
        />
      </Modal>

      <Modal show={edit} onClose={() => setEdit(false)}>
        <EditNilai idEdit={idEdit} setEdit={setEdit} getDatas={getDatas} />
      </Modal>
    </div>
  );
}

export default NilaiPage;
