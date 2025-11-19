import { useEffect, useState } from "react";
import PostHazzardReportUi from "../components/PostHazzardReportUi";
import RecentPostCard from "../components/RecentPostCard";
import TrendingPostCard from "../components/TrendingPostCard";
import { HazardReport } from "../types/hazardreport";
import { apiGetAllHazardReports, apiGetTrendingHazardReports } from "../services/api";
import { announcement } from "..";
import ProfileImage from "../assets/images/ladyprofile.png";
import AirQuality from "../components/AirQuality";

// Define the expected API response
interface HazardResponse {
  hazardReports: HazardReport[];
}

export default function DashboardHomePage() {
  const [hazards, setHazards] = useState<HazardReport[]>([]);
  const [trendinghazards, setTrendingHazards] = useState<HazardReport[]>([]);

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

  // Get Hazards with Highest Upvotes
    const getTrendingHazards = async () => {
    try {
      const response = (await apiGetTrendingHazardReports()) as unknown as {
        data: HazardResponse;
      };

      console.log("Fetched hazards:", response.data.hazardReports);
      setTrendingHazards(response.data.hazardReports);
    } catch (err) {
      console.error("Render error:", err);
    }
  };
  

  // fetch on mount
  useEffect(() => {
    fetchHazards();
  }, []);
  // Trending fetch on mount
  useEffect(() => {
    getTrendingHazards();
  }, []);

  return (
    <>
      <div className="container space-y-10">
        <div className="w-[95%] mx-auto">
          <div className="flex gap-x-4 my-4 md:my-6 ">
            <div className=" bg-white rounded-md md:w-2/3 w-full shadow-sm">
              <PostHazzardReportUi onSuccess={fetchHazards} />
            </div>
            <div className="hidden md:block bg-white md:w-1/3 w-full rounded-md shadow-sm ">
              <AirQuality/>
            </div>
            
          </div>
          <section className="mb-8 hidden md:block">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Trending Hazard Post ⚡
              </h2>
              <a
                href="#!"
                className="text-blue-600 font-medium hover:underline"
              >
                View all
              </a>
            </div>
            <div className="w-[calc(100vw-255px)] overflow-x-scroll flex gap-6">
              {trendinghazards.length > 0 &&
                trendinghazards.map((hazard) => (
                  <TrendingPostCard key={hazard._id} hazard={hazard} />
                ))}
            </div>
          </section>
          {/* <HazardReport /> */}

          <div className="flex gap-6">
            {/* Recent Post Section */}
            <section className="mb-8 w-full md:w-2/3">
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
                    .map((hazard) => (
                      <RecentPostCard key={hazard._id} hazard={hazard} />
                    ))}
              </div>
            </section>

            {/* Announcement Section */}
            <section className=" w-1/3 hidden md:block sticky top-20 h-[80vh]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Announcement
                </h2>
              </div>
              <div className="sticky top-20 h-[80vh] bg-white overflow-y-auto scrollbar-thick scrollbar-thumb-gray-100 scrollbar-track-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
                <div className=" rounded-lg">
                  {announcement.map((post) => (
                    <div
                      key={post.id}
                      className="w-[95%] mx-auto rounded-lg flex gap-2 mb-3  justify-center items-center"
                    >
                      <div className="bg-red-400 w-40 h-20 m-2 rounded-lg">
                        <img
                          // src={post.profileImage}
                          src={ProfileImage}
                          alt={post.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 leading-5">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500">{post.date}</p>
                        <p className="text-sm text-gray-700 leading-4">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
