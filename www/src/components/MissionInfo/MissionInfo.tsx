import type { Launch } from "../../api/types";

interface MissionInfoProps {
  launch: Launch;
}

export default function MissionInfo({ launch }: MissionInfoProps) {
  return (
    <div className="py-6 border-b border-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">MISSION OVERVIEW</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-gray-400 uppercase text-sm mb-1">
                LAUNCH SITE
              </h3>
              <p className="text-lg">{launch.launchSite}</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-gray-400 uppercase text-sm mb-1">PAYLOAD</h3>
              <p className="text-lg">{launch.payload}</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-gray-400 uppercase text-sm mb-1">
                DATE (UTC)
              </h3>
              <p className="font-mono">
                {new Date(launch.dateUTC)
                  .toISOString()
                  .replace("T", " ")
                  .slice(0, 16)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
