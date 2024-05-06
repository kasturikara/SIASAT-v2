import PropTypes from "prop-types";
import { Carousel } from "flowbite-react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SlidePengumuman = ({ children }) => {
  return (
    <div className="p-4 rounded-lg h-46 sm:h-56 xl:h-64 2xl:h-80 bg-gradient-to-r from-teal-500 to-sky-400">
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
        {children}
      </Carousel>
    </div>
  );
};

SlidePengumuman.propTypes = {
  children: PropTypes.node,
};

export default SlidePengumuman;
