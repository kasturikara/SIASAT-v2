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
import { getMurid, getNilaiByMurid } from "../../../../api/supabase";

function NilaiPage() {
  const [nilai, setNilai] = useState([]);
  const [murid, setMurid] = useState([]);
  const [filterNilai, setFilterNilai] = useState({
    id: 2201,
    nama: "Aditya Ramadhan",
  });

  useEffect(() => {
    getDataNilai();
  }, [filterNilai]);

  async function getDataNilai() {
    const dataNilai = await getNilaiByMurid(filterNilai.id);
    setNilai(dataNilai);
    const dataMurid = await getMurid();
    setMurid(dataMurid);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 mb-8 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Nilai</p>
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
          label={filterNilai.nama}
          outline
          size="sm"
          className="float-right"
        >
          {murid.map((data) => {
            return (
              <DropdownItem
                key={data.id}
                className="flex items-center justify-center px-1 py-2 bg-slate-50 hover:bg-slate-500"
                onClick={() =>
                  setFilterNilai({
                    ...filterNilai,
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
        <Table striped key={nilai} className="mt-4">
          <TableHead className="text-center">
            <TableHeadCell className="w-16 text-white bg-teal-500">
              No.
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Nama Murid
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Mapel
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Jenis
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Nilai
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500">
              Tanggal
            </TableHeadCell>
            <TableHeadCell className="text-white bg-teal-500 ">
              Action
            </TableHeadCell>
          </TableHead>
          <TableBody className="text-center divide-y">
            {nilai.map((item, index) => (
              <TableRow
                key={index}
                className="text-slate-600 hover:bg-teal-50 odd:bg-slate-200"
              >
                <TableCell className="w-16">{index + 1}</TableCell>
                <TableCell>{item.murid.nama}</TableCell>
                <TableCell>{item.mapel.nama}</TableCell>
                <TableCell>{item.jenis}</TableCell>
                <TableCell>{item.nilai}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default NilaiPage;
