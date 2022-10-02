import {
  ArrowLeft,
  ArrowLeft2,
  CloseCircle,
  SearchNormal1,
} from "iconsax-react";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import useScroll from "../../hooks/useScroll";
import { InputField } from "../search/Navbar";

const Navbar = ({ containerRef }: { containerRef: any }) => {
  const show = useScroll(containerRef);

  const [input, setInput] = useState("");

  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      router.push(`/search?q=${input}`);
    }
  };
  return (
    <div
      className={`fixed top-0 w-full md:w-[calc(100%-60px)] flex items-center justify-between z-50 ${
        show ? "bg-neutral-900" : ""
      }`}
    >
      <button
        className="bg-white/10 flex items-center justify-center w-[35px] h-[35px] rounded-full m-2"
        onClick={() => router.back()}
      >
        <ArrowLeft size={20} className="text-white" />
      </button>

      <button
        className="bg-white/10 md:hidden flex items-center justify-center w-[35px] h-[35px] rounded-full m-2"
        onClick={() => router.push("/search")}
      >
        <SearchNormal1 size={20} className="text-white" />
      </button>

      <InputField />
    </div>
  );
};

export default Navbar;
