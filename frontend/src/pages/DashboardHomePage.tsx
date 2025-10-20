import { useEffect, useState } from "react";
import PostHazzardReportUi from "../components/PostHazzardReportUi";
import RecentPostCard from "../components/RecentPostCard";
import TrendingPostCard from "../components/TrendingPostCard";
import { HazardReport } from "../types/hazardreport";
import { apiGetAllHazardReports } from "../services/api";

// Define the expected API response
interface HazardResponse {
  hazardReports: HazardReport[];
}

export default function DashboardHomePage() {
  const [hazards, setHazards] = useState<HazardReport[]>([]);

  const fetchHazards = async () => {
    try {
      const response = (await apiGetAllHazardReports()) as unknown as {
        data: HazardResponse;
      };

      console.log("Fetched hazards:", response.data.hazardReports);
      setHazards(response.data.hazardReports);
    } catch (err) {
      console.error("Render error:", err);
    }
  };

  // fetch on mount
  useEffect(() => {
    fetchHazards();
  }, []);

  return (
    <>
      <div className="container space-y-10">
        <div className="w-[95%] mx-auto">
        <div className="flex gap-x-3 my-4 md:my-6">
          <div className=" bg-white rounded-md md:w-2/3 w-full shadow-sm">
            <PostHazzardReportUi onSuccess={fetchHazards} />
          </div>
        </div>
        <section className="mb-8 hidden md:block">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Trending Hazard Post ⚡
            </h2>
            <a href="#!" className="text-blue-600 font-medium hover:underline">
              View all
            </a>
          </div>
          <div className="w-[calc(100vw-255px)] overflow-x-scroll flex gap-6">
            {hazards.length > 0 &&
              hazards.map((hazard) => (
                <TrendingPostCard key={hazard._id} hazard={hazard} />
              ))}
          </div>
        </section>
        {/* <HazardReport /> */}
        <div className="flex gap-6">
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Post</h2>
              <a
                href="#!"
                className="text-blue-600 font-medium hover:underline"
              >
                View all
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {hazards.length > 0 &&
                hazards
                .slice()
                .reverse()
                .map((hazard) => (
                  <RecentPostCard key={hazard._id} hazard={hazard} />
                ))}
            </div>
          </section>

          {/* <Announcement /> */}
        </div>
        </div>
      </div>
    </>
  );
}
