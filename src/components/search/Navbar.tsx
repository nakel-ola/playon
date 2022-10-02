import { ArrowLeft, CloseCircle, SearchNormal1 } from "iconsax-react";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";

const Navbar = ({ query }: { query: string }) => {
  const router = useRouter();


  return (
    <div className="flex items-center justify-between px-2 sticky top-0 z-50 bg-neutral-900">
      <button
        className="md:hidden bg-white/10 flex items-center justify-center w-[35px] h-[35px] rounded-full m-2"
        onClick={() => router.back()}
      >
        <ArrowLeft size={20} className="text-white" />
      </button>
      <div className="hidden md:flex items-center">
        <button
          className="bg-white/10 flex items-center justify-center w-[35px] h-[35px] rounded-full m-2"
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <p className="text-white text-2xl md:text-3xl m-2">
          Result for &quot;{query}&quot;
        </p>
      </div>

      <InputField hidden={false} />
    </div>
  );
};

export const InputField = ({ hidden = true }: { hidden?: boolean }) => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${input}`);
  };
  return (
    <div
      className={`${hidden ? "hidden md:flex" : "flex"} m-2 items-center ${input.length > 0 ? "flex-[0.5]" : ""}`}
    >
      <form
        className="bg-white/10 flex-1 h-[35px] rounded-full flex items-center overflow-hidden"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="bg-transparent outline-0 border-0 text-white w-[150px] md:flex-1 m-2"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex h-full">
          {input && (
            <span
              className="h-full flex items-center justify-center"
              onClick={() => setInput("")}
            >
              <CloseCircle variant="Bold" size={18} className="text-white" />
            </span>
          )}

          <span
            className="h-full w-[35px] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
            onClick={() => router.push(`/search?q=${input}`)}
          >
            <SearchNormal1 size={20} className="text-white" />
          </span>
        </div>
      </form>
    </div>
  );
};

export default Navbar;
