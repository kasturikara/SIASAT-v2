import {
  Button,
  Dropdown,
  DropdownItem,
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
import { getJadwalByFilter, getKelas } from "../../../api/supabase";

function JadwalPage() {
  const [jadwal, setJadwal] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [filterJadwal, setFilterJadwal] = useState({
    id: 1,
    kelas: "10-1",
  });

  useEffect(() => {
    getDataJadwal();
  }, [filterJadwal]);

  async function getDataJadwal() {
    const dataJadwal = await getJadwalByFilter(filterJadwal.id);
    setJadwal(dataJadwal);
    const dataKelas = await getKelas();
    setKelas(dataKelas);
  }

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
          <button className="px-4 my-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-400">
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
        <Table striped key={jadwal} className="mt-4">
          <TableHead className="text-center">
            <TableHeadCell className="w-16 text-white bg-teal-500">
              No.
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Hari
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Kelas
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Mapel
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Materi
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Jam
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500 ">
              Action
            </TableHeadCell>
          </TableHead>
          <TableBody className="text-center divide-y">
            {jadwal.map((data, index) => {
              return (
                <TableRow
                  key={index}
                  className=" text-slate-600 hover:bg-teal-50 odd:bg-slate-200"
                >
                  <TableCell className="w-16">{index + 1}</TableCell>
                  <TableCell>{data.hari}</TableCell>
                  <TableCell>{data.kelas.nama}</TableCell>
                  <TableCell>{data.mapel.nama}</TableCell>
                  <TableCell>{data.mapel.materi[0].deskripsi}</TableCell>
                  <TableCell>
                    {data.jam_mulai} - {data.jam_selesai}
                  </TableCell>
                  <TableCell className="w-1/3">
                    <div className="flex justify-center gap-4">
                      <Button
                        size="xs"
                        color="success"
                        // onClick={() => {
                        //   setOpenEdit(true);
                        //   setIdEdit(data.id);
                        // }}
                      >
                        <AiFillEdit className="mr-2" /> Edit
                      </Button>
                      <Button
                        size="xs"
                        color="failure"
                        // onClick={() => handleHapus(data.id)}
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
    </div>
  );
}

export default JadwalPage;
