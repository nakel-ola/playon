import { ArrowLeft2, ArrowRight, ArrowRight2 } from "iconsax-react";
import { useRouter } from "next/router";
import { useRef } from "react";
import useSWR, { SWRResponse } from "swr";
import fetchData from "../../utils/fetchData";
import { Oval } from "react-loader-spinner";
import { Genre, genres, Recommendation, tvGenres } from "../../utils/tmdb";
import { Data } from "../../pages";
import { Category } from "./RowCards";
import { Movie } from "../../../typing";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { add,addType } from "../../redux/features/exploreSlice";


let currentPosition = 0;

const HomeRows = ({ url, name }: Recommendation) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, error } = useSWR<Category,any>(url, async () => await fetchData(url));

  const handleBack = () => {
    const containerWidth = scrollRef.current!.scrollWidth;

    if (currentPosition <= containerWidth && currentPosition > 0) {
      currentPosition = currentPosition - 500;

      scrollRef.current!.scrollTo({
        left: currentPosition,
        behavior: "smooth",
      });
    }
  };

  const handleForward = () => {
    const containerWidth = scrollRef.current!.scrollWidth;

    if (currentPosition < containerWidth) {
      currentPosition =
        currentPosition + 500 > containerWidth
          ? currentPosition + (containerWidth - currentPosition)
          : currentPosition + 500;
      scrollRef.current!.scrollTo({
        left: currentPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    currentPosition = scrollRef.current!.scrollLeft;
  }

  
  return !error ? (
    <div ref={containerRef} className="" >
      <div className="flex items-center w-full justify-between">
        <p className="text-white text-xl font-semibold ml-5">{name}</p>
        <div className="flex justify-between items-center mr-5">
          <div
            className="w-[35px] h-[35px] mx-1 rounded-full bg-white flex items-center justify-center transition-all duration-300 md:hover:scale-105 active:scale-95"
            onClick={handleBack}
          >
            <ArrowLeft2 size={25} />
          </div>
          <div
            className="w-[35px] h-[35px] mx-1 rounded-full bg-white flex items-center justify-center transition-all duration-300 md:hover:scale-105 active:scale-95"
            onClick={handleForward}
          >
            <ArrowRight2 size={25} />
          </div>
        </div>
      </div>

      {data ? (
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative flex overflow-x-scroll overflow-y-hidden scrollbar-hide"
        >
          {data?.results?.map((props: Movie, index: number) => (
            <Card key={index} {...props} />
          ))}

          {data?.total_pages! > data?.page! && (
            <SeeMore name={name} url={url} />
          )}
        </div>
      ) : (
        <div className="h-[200px] w-full flex items-center justify-center flex-col">

          <Oval
            height={50}
            width={50}
            color="#fff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#fff"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </div>
  ) : null;
};

const SeeMore = ({name, url}: Recommendation) => {
    const router = useRouter();

    const dispatch = useDispatch();

  const handleClick = () => {
    const type = (name === "Series on Air" || name === "Top Rated Series") ? "tv" : "movie" ;
    const genre: Genre = type === "movie" ? genres.find((genre: Genre) => genre.name === name)! : tvGenres.find((genre: Genre) => genre.name === name)!;
    dispatch(add(genre));
    dispatch(addType(type))
    router.push('explore')
  }
  
    return (
      <div
        className="flex items-center justify-center flex-col shrink-0 w-[200px]"
        onClick={handleClick}
      >
        <div className="flex items-center justify-center flex-col transition-all duration-300 hover:scale-105 active:scale-95">
          <div className="w-[40px] h-[40px] rounded-full bg-white/10 flex items-center justify-center ">
            <ArrowRight size={30} className="text-white" />
          </div>
          <p className="text-lg text-white ">See more</p>
        </div>
      </div>
    );
  };
  

export default HomeRows;
