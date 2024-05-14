// //? lib
import { useEffect, useState } from "react";

// //? api
import { getJadwalByFilter } from "../../../api/supabase";

// //? components
import {
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
import { PiMagnifyingGlassDuotone } from "react-icons/pi";

function JadwalPage() {
  const [jadwal, setJadwal] = useState([]);
  const user = JSON.parse(localStorage.getItem("murid"));
  const filter = {
    idKelas: user?.id_kelas,
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDatas();
  }, [filter]);

  async function getDatas() {
    setLoading(true);
    const jadwal = await getJadwalByFilter(filter.idKelas);
    setJadwal(jadwal);
    setLoading(false);
  }

  return (
    <div className="flex flex-col">
      <div className="p-4 mb-8 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">Jadwal Anda</p>
        <div className="flex mt-4">
          <TextInput
            id="search"
            placeholder="Search..."
            icon={PiMagnifyingGlassDuotone}
          />
        </div>
      </div>

      <div className="p-8 overflow-x-auto rounded-lg bg-slate-50">
        {loading ? (
          <div className="flex justify-center my-24">
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="grid h-full grid-cols-1 gap-4 md:gap-8 sm:grid-cols-2 md:grid-cols-3">
            {/* Selasa */}
            <Table className="text-center">
              <TableHead>
                <TableHeadCell
                  className="text-xl text-white bg-teal-500"
                  colSpan={2}
                >
                  Senin
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {jadwal.map(
                  (item) =>
                    item.hari === "Senin" && (
                      <TableRow key={item.id} className="even:bg-slate-200">
                        <TableCell className="font-semibold ">
                          {item?.guru.mapel.nama}
                        </TableCell>
                        <TableCell className="">
                          {item?.jam_mulai} - {item?.jam_selesai}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>

            {/* Selasa */}
            <Table className="text-center">
              <TableHead>
                <TableHeadCell
                  className="text-xl text-white bg-teal-500"
                  colSpan={2}
                >
                  Selasa
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {jadwal.map(
                  (item) =>
                    item.hari === "Selasa" && (
                      <TableRow key={item.id} className="even:bg-slate-200">
                        <TableCell className="font-semibold ">
                          {item?.guru.mapel.nama}
                        </TableCell>
                        <TableCell className="">
                          {item?.jam_mulai} - {item?.jam_selesai}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>

            {/* Rabu */}
            <Table className="text-center">
              <TableHead>
                <TableHeadCell
                  className="text-xl text-white bg-teal-500"
                  colSpan={2}
                >
                  Rabu
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {jadwal.map(
                  (item) =>
                    item.hari === "Rabu" && (
                      <TableRow key={item.id} className="even:bg-slate-200">
                        <TableCell className="font-semibold ">
                          {item?.guru.mapel.nama}
                        </TableCell>
                        <TableCell className="">
                          {item?.jam_mulai} - {item?.jam_selesai}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>

            {/* Kamis */}
            <Table className="text-center">
              <TableHead>
                <TableHeadCell
                  className="text-xl text-white bg-teal-500"
                  colSpan={2}
                >
                  Kamis
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {jadwal.map(
                  (item) =>
                    item.hari === "Kamis" && (
                      <TableRow key={item.id} className="even:bg-slate-200">
                        <TableCell className="font-semibold ">
                          {item?.guru.mapel.nama}
                        </TableCell>
                        <TableCell className="">
                          {item?.jam_mulai} - {item?.jam_selesai}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>

            {/* Jumat */}
            <Table className="text-center">
              <TableHead>
                <TableHeadCell
                  className="text-xl text-white bg-teal-500"
                  colSpan={2}
                >
                  Jumat
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {jadwal.map(
                  (item) =>
                    item.hari === "Jumat" && (
                      <TableRow key={item.id} className="even:bg-slate-200">
                        <TableCell className="font-semibold ">
                          {item?.guru.mapel.nama}
                        </TableCell>
                        <TableCell className="">
                          {item?.jam_mulai} - {item?.jam_selesai}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default JadwalPage;
