import {
  Button,
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
import { getGuru } from "../../../api/supabase";

function GuruPage() {
  const [guru, setGuru] = useState([]);

  useEffect(() => {
    getDataGuru();
  }, []);

  async function getDataGuru() {
    const data = await getGuru();
    setGuru(data);
  }

  return (
    <div className="flex flex-col">
      <div className="p-4 mb-4 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Guru</p>
        <div className="flex justify-between mt-4">
          <TextInput
            id="search"
            placeholder="Search..."
            icon={AiOutlineSearch}
          />
          <button
            className="px-4 my-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-400"
            // onClick={() => setOpenTambah(true)}
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="p-8 overflow-x-auto rounded-lg bg-slate-50">
        <Table striped>
          <TableHead className="text-center">
            <TableHeadCell className="text-white bg-teal-500 ">
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
              Mapel
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Action
            </TableHeadCell>
          </TableHead>
          <TableBody className="text-center divide-y">
            {guru.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  className="text-slate-600 hover:bg-teal-50 odd:bg-slate-200"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.jenis_kelamin}</TableCell>
                  <TableCell>{item.tanggal_lahir}</TableCell>
                  <TableCell>{item.umur}</TableCell>
                  <TableCell>{item.alamat}</TableCell>
                  <TableCell>{item.mapel.nama}</TableCell>
                  <TableCell>
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

export default GuruPage;
