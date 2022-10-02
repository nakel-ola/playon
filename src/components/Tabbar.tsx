import { useRouter } from "next/router";
import React from "react";
import { ItemProps, items } from "./Sidebar";

const Tabbar = () => {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 z-50 bg-dark w-full md:hidden flex items-center justify-evenly">
      {items.map(({ Icon, name, path }: ItemProps, index) => (
        <button
          key={index}
          className="flex-1 p-3 flex items-center justify-center border-0"
          onClick={() => router.push(path)}
        >
          <Icon
            variant={router.pathname === path ? "Bold" : "Outline"}
            className={` ${
              router.pathname === path ? "text-blue-700" : "text-white"
            } `}
            size={22}
          />
        </button>
      ))}
    </div>
  );
};

export default Tabbar;
