// //? Components
import SlidePengumuman from "../../../components/UI/SlidePengumuman";
import CardUI from "./CardUI";

function DashboardPage() {
  return (
    <div>
      {/* //* Carousel Pengumuman */}
      <div>
        <SlidePengumuman bg="bg-gradient-to-r from-teal-500 to-sky-400" />
      </div>
      {/* //* Card */}
      <CardUI />
    </div>
  );
}

export default DashboardPage;
