// //? components
import { Spinner } from "flowbite-react";

function LoadingPage() {
  return (
    <div className="flex items-center justify-center w-full max-h-screen my-24">
      <Spinner size="xl" />
    </div>
  );
}

export default LoadingPage;
