import { ArrowLeft2, ArrowRight, ArrowRight2 } from "iconsax-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { Movie } from "../../../typing";
import { Data } from "../../pages";
import { add, addType } from "../../redux/features/exploreSlice";
import { config, Genre, genres, getMoviesBycategory } from "../../utils/tmdb";
import Card from "./Card";

let currentPosition = 0;

export interface Show extends Movie {
  open: boolean;
}

export type Category = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const RowCards = ({ id, name, type }: Data) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, error } = useSWR(
    `${config.BASE_URL}discover/${type}?api_key=${config.API_KEY}&with_genres=${id}`,
    async () => getMoviesBycategory(id, type,true)
  );

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

  return !error ? (
    <div ref={containerRef} className="">
      <div className="flex items-center w-full justify-between">
        <p className="text-white text-md font-semibold ml-5">{name}</p>
        <div className="flex w-[60px] justify-between items-center mr-5">
          <div
            className="w-[25px] h-[25px] rounded-full bg-white flex items-center justify-center transition-all duration-300 md:hover:scale-105 active:scale-95"
            onClick={handleBack}
          >
            <ArrowLeft2 size={20} />
          </div>
          <div
            className="w-[25px] h-[25px] rounded-full bg-white flex items-center justify-center transition-all duration-300 md:hover:scale-105 active:scale-95"
            onClick={handleForward}
          >
            <ArrowRight2 size={20} />
          </div>
        </div>
      </div>

      {data ? (
        <div
          ref={scrollRef}
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
  ) : null;
};

export const SeeMore = ({ id, name, type }: Data) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    const genre: Genre = genres.find((genre: Genre) => genre.name === name)!;
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

export default RowCards;
