import PropTypes from "prop-types";
import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getPengumuman } from "../../../api/supabase";

const SlidePengumuman = ({ bg }) => {
  const [pengumuman, setPengumuman] = useState([]);

  async function getDatas() {
    const dataPengumuman = await getPengumuman();
    setPengumuman(dataPengumuman);
  }

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div className={`p-4 rounded-lg h-46 sm:h-56 xl:h-64 2xl:h-80 ${bg}`}>
      <Carousel
        pauseOnHover
        leftControl={
          <FaAngleLeft className="text-3xl text-white hover:scale-150 hover:text-gray-200" />
        }
        rightControl={
          <FaAngleRight className="text-3xl text-white hover:scale-150 hover:text-gray-200" />
        }
        slideInterval={4000}
      >
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
      </Carousel>
    </div>
  );
};

SlidePengumuman.propTypes = {
  bg: PropTypes.string,
};

export default SlidePengumuman;
