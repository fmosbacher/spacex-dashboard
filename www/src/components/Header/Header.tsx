import type { Launch } from "../../api/types";

interface HeaderProps {
  launch: Launch;
}

export default function Header({ launch }: HeaderProps) {
  return (
    <header className="pt-8 pb-6 border-b border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {launch.name} MISSION
          </h1>
          <p className="text-gray-400 mt-1">
            {launch.rocket.toUpperCase()} • FLIGHT #{launch.flightNumber}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-gray-800 text-white px-4 py-2 text-sm font-medium">
            {launch.status.toUpperCase()}
          </span>
          <span className="hidden sm:inline text-gray-400">|</span>
          <p className="hidden sm:block text-gray-400 text-sm">
            {new Date(launch.dateUTC).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </header>
  );
}
