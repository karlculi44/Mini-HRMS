import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
