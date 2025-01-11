import Stats from "../components/Stats";
import Sidebar from "../components/Sidebar";

function Statistics() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 ml-4">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Statistics</h1>
        <Stats />
      </div>
    </div>
  );
}

export default Statistics;
