import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { getPengumuman } from "../../../api/supabase";
import { useEffect, useState } from "react";

function PengumumanPage() {
  const [pengumuman, setPengumuman] = useState([]);

  useEffect(() => {
    getDataPengumuman();
  }, []);

  async function getDataPengumuman() {
    const data = await getPengumuman();
    setPengumuman(data);
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-8">
        <p className="my-2 text-2xl font-semibold">List Pengumuman</p>
        <button className="px-4 my-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-400">
          + Tambah
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table striped hoverable>
          <TableHead className="text-center">
            <TableHeadCell className="bg-blue-200">No.</TableHeadCell>
            <TableHeadCell className="bg-blue-200">Judul</TableHeadCell>
            <TableHeadCell className="bg-blue-200">Isi</TableHeadCell>
            <TableHeadCell className="bg-blue-200">Tanggal</TableHeadCell>
            <TableHeadCell className="bg-blue-200">Action</TableHeadCell>
          </TableHead>
          <TableBody className="text-center divide-y">
            {/* <TableRow>
              <TableCell>tes</TableCell>
              <TableCell>tes</TableCell>
              <TableCell>tes</TableCell>
              <TableCell>tes</TableCell>
            </TableRow> */}
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
                      <Button size="xs" color="failure">
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

export default PengumumanPage;
