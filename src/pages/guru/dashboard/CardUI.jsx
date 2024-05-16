// //? lib
import { useEffect, useState } from "react";

// //? api
import { getKelas, getMateriByGuru, getMurid } from "../../../api/supabase";

// //? components
import { Card, Spinner } from "flowbite-react";

// //? icons
import { PiBookOpenText, PiBuildings, PiStudent } from "react-icons/pi";

const CardUI = () => {
  const guru = JSON.parse(localStorage.getItem("guru"));
  const [jmlMurid, setJmlMurid] = useState(0);
  const [jmlKelas, setJmlKelas] = useState(0);
  const [jmlMateri, setJmlMateri] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDatas();
  }, []);

  async function getDatas() {
    setLoading(true);
    const dataMurid = await getMurid();
    setJmlMurid(Math.floor(dataMurid.length));
    const dataKelas = await getKelas();
    setJmlKelas(Math.floor(dataKelas.length));
    const dataMateri = await getMateriByGuru(guru?.id);
    setJmlMateri(Math.floor(dataMateri.length));
    setLoading(false);
  }

  return (
    <div className="grid h-full grid-cols-1 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <div className="flex items-center justify-center my-24 col-span-full">
          <Spinner />
        </div>
      ) : (
        <>
          {/* //* Murid */}
          <Card className="h-32 text-gray-800 transition-all bg-rose-400 hover:bg-rose-600 hover:text-gray-200 hover:cursor-pointer hover:scale-105">
            <div className="flex items-center justify-center mx-2">
              <PiStudent className="text-5xl" />
              <div className="flex-col items-center justify-center ml-8 sm:flex">
                <h5 className="mb-2 font-medium text-center text-md">
                  Jumlah Murid
                </h5>
                <h3 className="text-3xl font-bold">{jmlMurid}</h3>
              </div>
            </div>
          </Card>

          {/* //* Kelas */}
          <Card className="h-32 text-gray-800 transition-all bg-sky-400 hover:bg-sky-600 hover:text-gray-200 hover:cursor-pointer hover:scale-105">
            <div className="flex items-center justify-center mx-2">
              <PiBuildings className="text-5xl" />
              <div className="flex-col items-center justify-center ml-8 sm:flex">
                <h5 className="mb-2 font-medium text-center text-md">
                  Jumlah Kelas
                </h5>
                <h3 className="text-3xl font-bold">{jmlKelas}</h3>
              </div>
            </div>
          </Card>

          {/* //* Materi */}
          <Card className="h-32 text-gray-800 transition-all bg-emerald-400 hover:bg-emerald-600 hover:text-gray-200 hover:cursor-pointer hover:scale-105">
            <div className="flex items-center justify-center mx-2">
              <PiBookOpenText className="text-5xl" />
              <div className="flex-col items-center justify-center ml-6 sm:flex">
                <h5 className="mb-2 font-medium text-center text-md">
                  Jumlah Materi
                </h5>
                <h3 className="text-3xl font-bold">{jmlMateri}</h3>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default CardUI;
