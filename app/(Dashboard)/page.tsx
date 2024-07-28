import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardMain from "./components/DashboardMain";


export default async function Home() {

  // const dashboardStatistics = await fetch()

  return (
    <>
      <DashboardStats />
      <DashboardMain />
    </>
  );
}
