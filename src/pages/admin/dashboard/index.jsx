// //? Components
import SlidePengumuman from "../../../components/UI/SlidePengumuman";
import CardUI from "./CardUI";

function DashboardPage() {
  return (
    <div>
      {/* //* Carousel Pengumuman */}
      <div>
        <SlidePengumuman />
      </div>
      {/* //* Card */}
      <CardUI />
    </div>
  );
}

export default DashboardPage;
