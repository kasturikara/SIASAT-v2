import PropTypes from "prop-types";
import { Carousel } from "flowbite-react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SlidePengumuman = ({ children }) => {
  return (
    <div className="p-4 rounded-lg h-46 sm:h-56 xl:h-64 2xl:h-80 bg-slate-50">
      <Carousel
        pauseOnHover
        leftControl={<FaAngleLeft />}
        rightControl={<FaAngleRight />}
        indicators={false}
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
