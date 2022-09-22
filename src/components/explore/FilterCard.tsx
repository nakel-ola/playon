import { TickCircle } from "iconsax-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, addType, selectExplore } from "../../redux/features/exploreSlice";
import { Genre, genres, tvGenres } from "../../utils/tmdb";

const FilterCard = ({ setActive }: { setActive(state: boolean): void }) => {
  const { explore, type } = useSelector(selectExplore);

  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [genre,setGenre] = useState<Genre>(explore);
  const [videoType,setVideoType] = useState<"movie" | "tv">(type);


  const handleClick = () => {
    dispatch(add(genre))
    dispatch(addType(videoType))
    setActive?.(false)
  }


  return (
    <div
      ref={ref}
      className="absolute top-11 right-0 z-50 max-h-[250px] w-[300px] rounded-lg bg-neutral-900 shadow shadow-black overflow-scroll scrollbar-hide"
    >
      <div className="">
        <p className="text-white text-md font-semibold p-2">
          Choose Video type
        </p>
        <div className="flex">
          <div
            className={` hover:bg-white/10 w-fit rounded-full m-2 flex items-center justify-between cursor-pointer ${
              videoType === "movie"
                ? "border-blue-700 pl-1 pr-2 py-1 border-[2px]"
                : "px-2 py-1 border-[1px]"
            }`}
            onClick={() => setVideoType("movie")}
          >
            {videoType === "movie" && (
              <div className="pr-1">
                <TickCircle className="text-blue-700" />
              </div>
            )}
            <p
              className={`${
                videoType === "movie" ? "text-blue-700" : "text-white"
              }`}
            >
              Movie
            </p>
          </div>
          <div
            className={` hover:bg-white/10 w-fit rounded-full m-2 flex items-center justify-between cursor-pointer ${
              videoType === "tv"
                ? "border-blue-700 pl-1 pr-2 py-1 border-[2px]"
                : "px-2 py-1 border-[1px]"
            }`}
            onClick={() => setVideoType("tv")}
          >
            {videoType === "tv" && (
              <div className="pr-1">
                <TickCircle className="text-blue-700" />
              </div>
            )}
            <p
              className={`${
                videoType === "tv" ? "text-blue-700" : "text-white"
              }`}
            >
              Series
            </p>
          </div>

        </div>
      </div>
      <div className="">
        <p className="text-white text-md font-semibold p-2">Choose Genre</p>
        <div className="flex flex-wrap">
          {(videoType === "tv" ? tvGenres : genres).map(
            (prop: Genre, index: number) => {
              return (
                <div
                  key={index}
                  className={` hover:bg-white/10 w-fit rounded-full m-2 flex items-center justify-between cursor-pointer ${
                    genre.id === prop.id
                      ? "border-blue-700 pl-1 pr-2 py-1 border-[2px]"
                      : "px-2 py-1 border-[1px]"
                  }`}
                  onClick={() => setGenre(prop)}
                >
                  {genre.id === prop.id && (
                    <div className="pr-1">
                      <TickCircle className="text-blue-700" />
                    </div>
                  )}
                  <p
                    className={`${
                      genre.id === prop.id ? "text-blue-700" : "text-white"
                    }`}
                  >
                    {prop.name}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="flex">
        <button className="m-2 px-6 py-[5px] bg-white/10 text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/20 whitespace-nowrap text-center border-[2px] border-white/0" onClick={() => setActive?.(false)}>
          Cancel
        </button>

        <button className="flex-1 m-2 px-6 py-[5px] bg-blue-600 text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap text-center border-[2px] border-transparent hover:border-blue-500 hover:bg-transparent hover:text-blue-500" onClick={handleClick}>
          Apply Filter
        </button>
      </div>
    </div>
  );
};

const sortArray = (array: Genre[], value: Genre) => {
  return [...array].sort((a: Genre, b: Genre) => a.id - value.id);
};

export default FilterCard;
