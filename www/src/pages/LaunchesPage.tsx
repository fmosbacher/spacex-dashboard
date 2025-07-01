import type { Launch } from "../api/types";
import { LaunchPage } from ".";
import { Loading } from "../components";

interface LaunchesPageProps {
  launches: Launch[];
  loading: boolean;
}

export default function LaunchesPage({ launches, loading }: LaunchesPageProps) {
  return (
    <div className="space-y-12">
      {launches.map((launch) => (
        <LaunchPage key={launch.id} launch={launch} />
      ))}

      {loading && <Loading />}

      {!loading && launches.length === 0 && (
        <p className="text-center text-gray-400 py-8">No launches found</p>
      )}
    </div>
  );
}
