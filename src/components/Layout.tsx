import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Tabbar from "./Tabbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <Tabbar />

      {children}
    </div>
  );
};

export default Layout;
