import { Spinner } from "flowbite-react";

function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner  />
      <p className="text-3xl">Loading...</p>
    </div>
  );
}

export default LoadingPage;
