/* eslint-disable @next/next/no-img-element */
import Tippy from "@tippyjs/react";
import {
  Discover,
  Home2,
  Icon,
  People,
  Play,
  Setting,
  Timer,
} from "iconsax-react";
import { useRouter } from "next/router";
import React from "react";

export type ItemProps = {
  Icon: Icon;
  name: string;
  path: string;
};

export const items: ItemProps[] = [
  {
    Icon: Home2,
    name: "Home",
    path: "/",
  },
  {
    Icon: Discover,
    name: "Explore",
    path: "/explore",
  },
  {
    Icon: Timer,
    name: "Coming soon",
    path: "/comingsoon",
  },
  {
    Icon: People,
    name: "Community",
    path: "/community",
  },
  {
    Icon: Setting,
    name: "Setting",
    path: "/setting",
  },
];


const Sidebar = () => {
  const router = useRouter();

  const match = () => {
    const currentPath = router.pathname;

    if (currentPath === "/") {
      return "0px";
    } else if (currentPath === "/explore") {
      return "60px";
    } else if (currentPath === "/comingsoon") {
      return "120px";
    } else if (currentPath === "/community") {
      return "180px";
    } else if (currentPath === "/setting") {
      return "240px";
    }
  };
  return (
    <div className="md:inline hidden h-screen w-[60px] border-r-[0.8px] border-r-neutral-600">
      <div className="w-full h-[60px] grid place-items-center">
        <div className="h-[40px] w-[40px] bg-blue-700 rounded-full flex items-center justify-center">
          <Play variant="Bold" size={30} className="text-white ml-[1px]" />
        </div>
      </div>

      <div className="flex mt-8 w-[60px]">
        <div className="h-[calc(60px*5)] w-2">
          <div
            className="h-[60px] w-[4px] grid place-items-center transition-all duration-300 ease-in-out"
            style={{
              transform: `translateY(${match()})`,
            }}
          >
            <span className="w-[4px] h-[60%] rounded-lg bg-blue-800" />
          </div>
        </div>
        <div className="flex items-center justify-center flex-col">
          {items.map(({ Icon, name, path }: ItemProps, index: number) => (
            <Tippy key={index} content={name} placement="right">
              <button
                className="h-[60px] w-[40px] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-0"
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
            </Tippy>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
