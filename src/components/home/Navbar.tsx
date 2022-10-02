/* eslint-disable @next/next/no-img-element */
import { CloseCircle, SearchNormal1 } from "iconsax-react";
import { useRouter } from "next/router";
import { FormEvent, forwardRef, useRef, useState } from "react";
import useEvent from "../../hooks/useEvent";
import useScroll from "../../hooks/useScroll";

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
      <div
        className={`hidden md:flex items-center m-2 ml-auto mr-3 ${
          input.length > 0 ? "flex-[0.5]" : ""
        }`}
      >
        <form
          className="bg-white/10 md:flex-1 w-fit h-[35px] rounded-full flex items-center overflow-hidden"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="bg-transparent outline-0 border-0 text-white w-[150px] md:flex-1 m-2"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex h-full shrink-0">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
