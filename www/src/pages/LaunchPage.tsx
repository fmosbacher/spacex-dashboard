import type { Launch } from "../api/types";
import {
  Header,
  MissionInfo,
  CoreGrid,
  WebcastPlayer,
  Loading,
} from "../components";

interface LaunchPageProps {
  launch: Launch;
  loading?: boolean;
}

export default function LaunchPage({
  launch,
  loading = false,
}: LaunchPageProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-black text-white pb-12 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header launch={launch} />
        <div className="space-y-8 py-8">
          <MissionInfo launch={launch} />
          <div className="space-y-8">
            <WebcastPlayer videoId={launch.webcastId} />
            <div className="border-t border-gray-800 pt-8">
              <CoreGrid cores={launch.cores} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
