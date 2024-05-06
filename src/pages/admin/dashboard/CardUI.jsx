import { Card, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  PiBookOpenText,
  PiBuildings,
  PiStudent,
  PiUsersThree,
} from "react-icons/pi";
import { useEffect, useState } from "react";
import { getGuru, getKelas, getMapel, getMurid } from "../../../api/supabase";

const CardUI = () => {
  const [jmlMurid, setJmlMurid] = useState(0);
  const [jmlGuru, setJmlGuru] = useState(0);
  const [jmlMapel, setJmlMapel] = useState(0);
  const [jmlKelas, setJmlKelas] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDatas();
  }, []);

  async function getDatas() {
    const dataMurid = await getMurid();
    setJmlMurid(Math.floor(dataMurid.length));
    const dataGuru = await getGuru();
    setJmlGuru(Math.floor(dataGuru.length));
    const dataMapel = await getMapel();
    setJmlMapel(Math.floor(dataMapel.length));
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
          <Link to="/murid">
            <Card
              horizontal
              className="h-32 text-gray-800 transition-all bg-pink-400 hover:bg-pink-500 hover:text-gray-200 hover:scale-105"
            >
              <div className="flex items-center justify-center mx-2">
                <PiStudent className="text-5xl " />
                <div className="flex-col items-center justify-center ml-8 sm:flex">
                  <h5 className="mb-2 font-medium text-center text-md">
                    Jumlah Murid
                  </h5>
                  <h3 className="text-3xl font-bold">{jmlMurid}</h3>
                </div>
              </div>
            </Card>
          </Link>

          {/* //* Guru */}
          <Link to="/guru">
            <Card
              horizontal
              className="h-32 text-gray-800 transition-all bg-yellow-400 hover:bg-yellow-500 hover:text-gray-200 hover:scale-105"
            >
              <div className="flex items-center justify-center mx-2">
                <PiUsersThree className="text-5xl " />
                <div className="flex-col items-center justify-center ml-8 sm:flex">
                  <h5 className="mb-2 font-medium text-center text-md">
                    Jumlah Guru
                  </h5>
                  <h3 className="text-3xl font-bold">{jmlGuru}</h3>
                </div>
              </div>
            </Card>
          </Link>

          {/* //* Mapel */}
          <Link to="/mapel">
            <Card
              horizontal
              className="h-32 text-gray-800 transition-all bg-green-400 hover:bg-green-500 hover:text-gray-200 hover:scale-105"
            >
              <div className="flex items-center justify-center mx-2">
                <PiBookOpenText className="text-5xl" />
                <div className="flex-col items-center justify-center ml-8 sm:flex">
                  <h5 className="mb-2 font-medium text-center text-md">
                    Jumlah Mapel
                  </h5>
                  <h3 className="text-3xl font-bold">{jmlMapel}</h3>
                </div>
              </div>
            </Card>
          </Link>

          {/* //* Kelas */}
          <Link to="/kelas">
            <Card
              horizontal
              className="h-32 text-gray-800 transition-all bg-violet-400 hover:bg-violet-500 hover:text-gray-200 hover:scale-105"
            >
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
          </Link>
        </>
      )}
    </div>
  );
};

export default CardUI;
