import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import  {useRef} from "react";
import useSWR from "swr";
import { config } from "../../utils/tmdb";
import { Oval } from "react-loader-spinner";
import { Movie, TMDBResponse } from "../../../typing";
import Card from "./Card";
import { SeeMore } from "./RowCards";


let currentPosition = 0;

const PopularRow = ({ data,name,id,type }: {data: TMDBResponse<Movie[]>, name: string,id: number, type: "movie" | "tv" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);


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



  return (
    <div ref={containerRef} className="mb-3">
      <div className="flex items-center w-full justify-between">
        <p className="text-white text-xl font-semibold ml-2">{name}</p>
        <div className="flex justify-between items-center mr-2">
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
          {data?.results.map((props: Movie, index: number) => (
            <Card key={index} {...props} />
          ))}

          {data?.total_pages! > data?.page! && (
            <SeeMore id={id} name={name} type={type} />
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
  );
};

export default PopularRow;
