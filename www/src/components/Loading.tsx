export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="inline-block animate-spin h-12 w-12 border-2 border-blue-500 rounded-full border-r-transparent mb-4"></div>
        <h2 className="text-white text-xl font-semibold">
          Loading launch data...
        </h2>
        <p className="text-gray-400 mt-2">
          Please wait while we fetch the latest information
        </p>
      </div>
    </div>
  );
}
