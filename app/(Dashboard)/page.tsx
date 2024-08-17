import { getAllStatistics } from "../components/dashboard/dashboardAPI";
import DashboardMain from "../components/dashboard/DashboardMain";


export default async function Home() {
  const data = await getAllStatistics()
  return (
    <>
      <DashboardMain data={data} />
    </>
  );
}
