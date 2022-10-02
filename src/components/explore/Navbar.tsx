import { CloseCircle, Filter, SearchNormal1 } from "iconsax-react";
import { useRouter } from "next/router";
import React, { useState,FormEvent } from "react";
import truncate from "../../utils/truncate";
import FilterCard from "./FilterCard";

const Navbar = ({ title }: { title: string }) => {
  const [input, setInput] = useState("");
  const [active, setActive] = useState(false);

  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?q=${input}`);
  };

  return (
    <div className="flex items-center justify-between px-2 sticky top-0 z-50 bg-neutral-900">
      <p className="text-white text-2xl md:text-3xl m-2 ">{truncate(title,title.length)}</p>


      <button className="bg-white/10 md:hidden flex items-center justify-center w-[35px] h-[35px] rounded-full m-2" onClick={() => router.push("/search")}>
        <SearchNormal1 size={20} className="text-white" />
      </button>

      <div
        className={`hidden md:flex items-center ${input.length > 0 ? "flex-[0.5]" : ""}`}
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
              <span className="h-full flex items-center justify-center" onClick={() => setInput("")}>
                <CloseCircle variant="Bold" size={18} className="text-white" />
              </span>
            )}

            <span className="h-full w-[35px] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10" onClick={() => input && router.push(`/search?q=${input}`)}>
              <SearchNormal1 size={20} className="text-white" />
            </span>
          </div>

        </form>

        <div className="relative">
          <div
            className="relative h-[35px] w-[35px] rounded-full flex items-center justify-center bg-white/10 m-2 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => setActive(!active)}
          >
            <Filter size={20} className="text-white" />
          </div>

          {active && <FilterCard setActive={setActive} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
