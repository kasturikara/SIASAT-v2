// //? lib
import { useEffect, useState } from "react";

// //? api
import { getNilaiForRapor } from "../../../api/supabase";

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

function NilaiPage() {
  const user = JSON.parse(localStorage.getItem("murid"));
  const [nilai, setNilai] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDatas();
  }, []);

  async function getDatas() {
    setLoading(true);
    const nilai = await getNilaiForRapor(user.id);
    setNilai(nilai);
    setLoading(false);
  }

  const rows = nilai.map((n) => ({
    id: n.id,
    jenis: n.jenis,
    nilai: n.nilai,
    idMapel: n.id_mapel,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 mb-8 rounded-lg bg-slate-50">
        <p className="text-2xl font-semibold">List Nilai Anda</p>
        <div className="flex mt-4">
          <TextInput
            id="search"
            placeholder="Search..."
            icon={PiMagnifyingGlassDuotone}
          />
        </div>
      </div>

      <div className="p-8 overflow-x-auto rounded-lg bg-slate-50">
        {/* <div className="flex items-center gap-4">
          <p className="text-2xl font-semibold">E-Rapor</p>
        </div> */}
        {loading ? (
          <div className="flex justify-center my-24">
            <Spinner size="xl" />
          </div>
        ) : (
          <Table key={nilai} striped className="mt-4 text-center">
            <TableHead>
              {[
                "MAPEL",
                "TUGAS 1",
                "TUGAS 2",
                "TUGAS 3",
                "PRAK",
                "UTS",
                "UAS",
                "RATA-RATA",
              ].map((title) => (
                <TableHeadCell
                  key={title}
                  className={`text-white bg-teal-500 ${
                    title === "MAPEL" && "max-w-32 text-right"
                  }`}
                >
                  {title}
                </TableHeadCell>
              ))}
            </TableHead>
            <TableBody>
              {Array.from(new Set(nilai.map((data) => data.id_mapel))).map(
                (idMapel) => (
                  <TableRow
                    key={idMapel}
                    className="text-slate-600 hover:bg-teal-50 hover:font-semibold even:bg-slate-200"
                  >
                    <TableCell className="font-semibold text-right uppercase max-w-32">
                      {
                        nilai.find((item) => item.id_mapel === idMapel).mapel
                          .nama
                      }
                    </TableCell>
                    {rows
                      .filter((item) => item.idMapel === idMapel)
                      .map((item) => (
                        <TableCell key={item.id}>{item.nilai}</TableCell>
                      ))}
                    <TableCell className="font-semibold">
                      {(
                        Math.round(
                          (rows
                            .filter((item) => item.idMapel === idMapel)
                            .reduce((a, b) => a + b.nilai, 0) /
                            rows.filter((item) => item.idMapel === idMapel)
                              .length) *
                            100
                        ) / 100
                      ).toFixed(2)}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default NilaiPage;
