import CoreCard from "./CoreCard";
import type { Core } from "../../api/types";

interface CoreGridProps {
  cores: Core[];
}

export default function CoreGrid({ cores }: CoreGridProps) {
  if (!cores || cores.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-8">CORES INFORMATION</h2>
        <p className="text-gray-400 text-center">
          No core information available
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">CORES INFORMATION</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cores.map((core) => (
          <CoreCard key={core.id} core={core} />
        ))}
      </div>
    </div>
  );
}
