import { CloseCircle, SearchNormal1 } from "iconsax-react";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { InputField } from "../search/Navbar";

const Navbar = () => {
  const [input, setInput] = useState("");

  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      router.push(`/search?q=${input}`);
    }
  };

  return (
    <div className="flex items-center justify-between px-2 sticky top-0 z-50 bg-neutral-900">
      <p className="text-white text-2xl md:text-3xl m-2">Coming Soon</p>


      <button className="bg-white/10 md:hidden flex items-center justify-center w-[35px] h-[35px] rounded-full m-2" onClick={() => router.push("/search")}>
        <SearchNormal1 size={20} className="text-white" />
      </button>

      <InputField />

    </div>
  );
};

export default Navbar;
