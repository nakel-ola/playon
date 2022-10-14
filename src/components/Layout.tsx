import { Wifi } from "iconsax-react";
import { ReactNode } from "react";
import useOnlineStatus from "../hooks/useOnlineStatus";
import Sidebar from "./Sidebar";
import Tabbar from "./Tabbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const isOnline = useOnlineStatus();

  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <Tabbar />

      {isOnline ? (
        children
      ) : (
        <div className="w-full h-screen">
          <div className="flex items-center justify-center flex-col">
            <Wifi size={50} className="text-white" />
            <p className="text-white text-lg">No Internet Connection</p>
          </div>
        </div>
      )}

      {/* {children} */}
    </div>
  );
};

export default Layout;
