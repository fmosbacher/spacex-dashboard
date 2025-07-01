import { useFeatureValue } from "@growthbook/growthbook-react";

interface WebcastPlayerProps {
  videoId?: string;
}

export default function WebcastPlayer({ videoId }: WebcastPlayerProps) {
  const hideWebcast = !useFeatureValue("showWebcast", "fallback");

  if (!videoId) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-8">MISSION WEBCAST</h2>
        <div className="bg-gray-900 p-8 rounded-sm">
          <p className="text-gray-400 text-center">
            A webcast stream will be available once the mission goes live
          </p>
        </div>
      </div>
    );
  }

  if (hideWebcast)
    return (
      <div>
        <h2 className="text-2xl font-bold mb-8">MISSION WEBCAST</h2>
        <a
          className="text-blue-700 hover:text-blue-500 pb-8 block"
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube
        </a>
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">MISSION WEBCAST</h2>
      <div
        className={
          "relative w-full bg-gray-900 overflow-hidden h-0 pb-[56.25%]"
        }
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="SpaceX Webcast"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
