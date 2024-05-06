import { useEffect, useState } from "react";
import SlidePengumuman from "../../../components/UI/SlidePengumuman";
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
                <p className="text-3xl font-bold uppercase ">{data.judul}</p>
                <p className="text-xl ">{data.isi}</p>
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
