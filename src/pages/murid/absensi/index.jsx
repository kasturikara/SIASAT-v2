// //? lib
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// //? api
import { getAbsensiByMurid } from "../../../api/supabase";

// //? components
import {
  Dropdown,
  DropdownItem,
  Label,
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

function AbsensiPage() {
  const user = JSON.parse(localStorage.getItem("murid"));
  const [absensi, setAbsensi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    idMurid: user?.id,
    angkaBulan: 5,
    namaBulan: "Mei",
  });

  useEffect(() => {
    getDatas();
  }, [filter]);

  async function getDatas() {
    setLoading(true);
    const absensi = await getAbsensiByMurid(filter);
    setAbsensi(absensi);
    setLoading(false);
  }

  const bulan = [
    {
      id: 1,
      name: "Januari",
    },
    {
      id: 2,
      name: "Februari",
    },
    {
      id: 3,
      name: "Maret",
    },
    {
      id: 4,
      name: "April",
    },
    {
      id: 5,
      name: "Mei",
    },
    {
      id: 6,
      name: "Juni",
    },
    {
      id: 7,
      name: "Juli",
    },
    {
      id: 8,
      name: "Agustus",
    },
    {
      id: 9,
      name: "September",
    },
    {
      id: 10,
      name: "Oktober",
    },
    {
      id: 11,
      name: "November",
    },
    {
      id: 12,
      name: "Desember",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="p-4 mb-8 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Absensi</p>
        <div className="flex mt-4">
          <TextInput
            id="search"
            placeholder="Search..."
            icon={PiMagnifyingGlassDuotone}
          />
        </div>
      </div>

      <div className="p-8 overflow-x-auto rounded-lg bg-slate-50">
        <div className="flex items-center gap-4 mb-6">
          <Label htmlFor="bulan" value="Pilih Bulan:" />
          <div className="flex justify-center h-10 p-3 text-sm border rounded-md border-slate-300 text-slate-700 bg-slate-50">
            <Dropdown
              id="bulan"
              inline
              label={filter?.namaBulan}
              className="w-32"
            >
              {bulan.map((item) => {
                return (
                  <DropdownItem
                    key={item.id}
                    onClick={() =>
                      setFilter({
                        ...filter,
                        angkaBulan: item.id,
                        namaBulan: item.name,
                      })
                    }
                  >
                    {item.name}
                  </DropdownItem>
                );
              })}
            </Dropdown>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center my-20">
            <Spinner size="xl" />
          </div>
        ) : (
          <Table className="text-center" key={absensi} striped>
            <TableHead>
              <TableHeadCell className="w-3/12 text-white bg-teal-500">
                Tanggal
              </TableHeadCell>
              <TableHeadCell className="w-2/12 text-white bg-teal-500">
                Hari
              </TableHeadCell>
              <TableHeadCell className="text-white bg-teal-500">
                Status
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {absensi.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>Tidak ada data</TableCell>
                </TableRow>
              ) : (
                absensi.map((absen) => {
                  return (
                    <TableRow
                      key={absen.id}
                      className="text-slate-600 hover:bg-teal-50 hover:font-semibold even:bg-slate-200"
                    >
                      <TableCell className="w-3/12 font-semibold">
                        {format(new Date(absen.tanggal), "dd - MMMM - yyyy", {
                          locale: id,
                        })}
                      </TableCell>
                      <TableCell className="w-2/12 ">
                        {format(new Date(absen.tanggal), "EEEE", {
                          locale: id,
                        })}
                      </TableCell>
                      <TableCell>{absen.status}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default AbsensiPage;
