import BitcoinInfo from "./coin-info";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex max-w-6xl mx-auto mt-10">
      <BitcoinInfo />
      <Sidebar />
    </div>
  );
}
