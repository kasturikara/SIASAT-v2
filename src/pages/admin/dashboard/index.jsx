import SlidePengumuman from "../../../components/UI/SlidePengumuman";
import { useEffect, useState } from "react";
import { getPengumuman } from "../../../api/supabase";
import CardUI from "./CardUI";

function DashboardPage() {
  const [pengumuman, setPengumuman] = useState([]);

  async function getDatas() {
    const dataPengumuman = await getPengumuman();
    setPengumuman(dataPengumuman);
  }

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div>
      {/* //* Carousel Pengumuman */}
      <div>
        <SlidePengumuman>
          {pengumuman.map((data) => {
            return (
              <div
                key={data.id}
                className="flex flex-col items-center justify-center h-full space-y-4"
              >
                <h1 className="text-3xl font-bold uppercase ">{data.judul}</h1>
                <h6 className="text-lg text-gray-800">{data.isi}</h6>
              </div>
            );
          })}
        </SlidePengumuman>
      </div>
      {/* //* Card */}
      <CardUI />
    </div>
  );
}

export default DashboardPage;
