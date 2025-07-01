import type { Core } from "../../api/types";

interface CoreCardProps {
  core: Core;
}

export default function CoreCard({ core }: CoreCardProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-center space-x-2 mb-3">
        <span className="bg-gray-800 px-2 py-1 rounded text-sm font-mono">
          {core.id}
        </span>
        <span
          className={`text-sm px-2 py-1 rounded ${
            core.reused
              ? "bg-blue-900 text-blue-200"
              : "bg-green-900 text-green-200"
          }`}
        >
          {core.reused ? `Flight #${core.flight}` : "First Flight"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center space-x-2">
          <span
            className={`w-2 h-2 rounded-full ${
              core.gridfins ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-gray-300">
            Gridfins {core.gridfins ? "Equipped" : "Not equipped"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`w-2 h-2 rounded-full ${
              core.legs ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-gray-300">
            Legs {core.legs ? "Equipped" : "Not equipped"}
          </span>
        </div>
      </div>
    </div>
  );
}
