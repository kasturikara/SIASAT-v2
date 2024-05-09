import SlidePengumuman from "../../../components/UI/SlidePengumuman";
import CardUI from "./CardUI";

function DashboardPage() {
  return (
    <div>
      {/* * Carousel Pengumuman */}
      <SlidePengumuman bg="bg-gradient-to-r from-amber-200 to-amber-600" />
      {/* Card */}
      <CardUI />
    </div>
  );
}

export default DashboardPage;
