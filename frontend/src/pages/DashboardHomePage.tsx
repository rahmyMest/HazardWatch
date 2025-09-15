import HazardReport from "../components/HazardReport";
import PostHazzardReportUi from "../components/PostHazzardReportUi";

export default function DashboardHomePage() {
  return (
    <>
    <div className="flex gap-x-3">
      <div className=" bg-white rounded-md w-2/3">
      <PostHazzardReportUi />
      </div>
      
    </div>
      <HazardReport />
    </>
  );
}
