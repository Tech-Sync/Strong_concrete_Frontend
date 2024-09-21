import { getAllStatistics } from "./_components/dashboardAPI";
import DashboardMain from "./_components/DashboardMain";


export default async function Home() {
  const data = await getAllStatistics()
  return (
    <>
      <DashboardMain data={data} />
    </>
  );
}
