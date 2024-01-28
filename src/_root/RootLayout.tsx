import Bottombar from "@/components/shared/Bottombar";
import LeftSideBar from "@/components/shared/Leftsidebar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return <div className="w-full md:flex">
    <Topbar />
    <LeftSideBar />

    <section>
      <Outlet />
    </section>

    <Bottombar />
  </div>;
};

export default RootLayout;
