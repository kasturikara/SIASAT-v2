// //? lib
import { useEffect, useState } from "react";

// //? api
import { getKelas, getMurid } from "../../../api/supabase";

// //? components
import { Card, Spinner } from "flowbite-react";

// //? icons
import { PiBuildings, PiStudent } from "react-icons/pi";

const CardUI = () => {
  const [jmlMurid, setJmlMurid] = useState(0);
  const [jmlKelas, setJmlKelas] = useState(0);
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
        </>
      )}
    </div>
  );
};

export default CardUI;
