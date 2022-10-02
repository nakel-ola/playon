/* eslint-disable @next/next/no-img-element */
import { CloseCircle, SearchNormal1 } from "iconsax-react";
import { useRouter } from "next/router";
import { FormEvent, forwardRef, useRef, useState } from "react";
import useEvent from "../../hooks/useEvent";
import useScroll from "../../hooks/useScroll";
import { InputField } from "../search/Navbar";

const items = ["Home", "Movies", "Series"];

const Navbar = ({
  setActive,
  active,
  containerRef,
}: {
  setActive(value: number): void;
  active: number;
  containerRef: any;
}) => {
  const show = useScroll(containerRef);

  const router = useRouter();

  return (
    <div
      className={`fixed top-0 w-full md:w-[calc(100%-60px)] flex items-center justify-between z-50 ${
        show ? "bg-neutral-900" : ""
      }`}
    >
      <div className="flex text-white font-medium cursor-pointer pl-2">
        {items.map((item: string, index: number) => (
          <div
            key={index}
            className={` px-3 h-[30px] flex items-center justify-center rounded-full ${
              index === active ? "bg-white" : ""
            }`}
            onClick={() => setActive(index)}
          >
            <p className={`${index === active ? "text-black" : "text-white"}`}>
              {item}
            </p>
          </div>
        ))}
      </div>

      <button className="bg-white/10 md:hidden flex items-center justify-center w-[35px] h-[35px] rounded-full m-2" onClick={() => router.push("/search")}>
        <SearchNormal1 size={20} className="text-white" />
      </button>
      <InputField />
    </div>
  );
};

export default Navbar;
