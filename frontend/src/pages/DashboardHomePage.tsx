import HazardReport from "../components/HazardReport";
import HazardForm from "../components/HazardForm";
import PostHazzardReportUi from "../components/PostHazzardReportUi";

export default function DashboardHomePage() {
  return (
    <>
      <PostHazzardReportUi />
      <HazardReport />
      <HazardForm />
    </>
  );
}
