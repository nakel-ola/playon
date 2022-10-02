import { CloseCircle, SearchNormal1 } from "iconsax-react";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

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

      <div
        className={`hidden md:flex items-center md:w-fit ${input.length > 0 ? "flex-[0.5]" : ""}`}
      >
        <form className="bg-white/10 md:flex-1 h-[35px] rounded-full flex items-center overflow-hidden" onSubmit={handleSearch}>
          <input
            type="text"
            className="bg-transparent outline-0 border-0 text-white w-[150px] md:w-full md:flex-1 m-2"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {input && (
            <span
              className="h-full flex items-center justify-center"
              onClick={() => setInput("")}
            >
              <CloseCircle variant="Bold" size={18} className="text-white" />
            </span>
          )}

          <span
            className="h-full shrink-0 w-[35px] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
            onClick={() => input && router.push(`/search?q=${input}`)}
          >
            <SearchNormal1 size={20} className="text-white" />
          </span>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
