import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { mutate } from "swr";
import { Movie, TMDBResponse } from "../../typing";
import Navbar from "../components/explore/Navbar";
import Card from "../components/home/Card";
import exploreSlice, { selectExplore } from "../redux/features/exploreSlice";
import fetchData from "../utils/fetchData";
import {
  config,
  fetchVideo,
  getMoviesBycategory,
  getTrending,
} from "../utils/tmdb";

const Discover = () => {
  const [data, setData] = useState<TMDBResponse<Movie[]> | null>();
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const { explore, type } = useSelector(selectExplore);

  const handleData = useCallback(
    async (page: number = 1) => {
      if (explore.name === "Trending") {
        return await mutate<TMDBResponse<Movie[]>>(
          `${config.BASE_URL}trending/all/${type}?api_key=${config.API_KEY}page=${page}`,
          async () => await getTrending(type)
        );
      } else if (explore.name === "Now Playing Movies") {
        let url = `${config.BASE_URL}movie/now_playing?api_key=${config.API_KEY}&language=en-US&page=${page}`;
        return await mutate<TMDBResponse<Movie[]>>(
          url,
          async () => await fetchVideo<Movie>(url, type)
        );
      } else if (
        explore.name === "Top Rated Movie" ||
        explore.name === "Top Rated Series"
      ) {
        let url = `${config.BASE_URL}${type}/top_rated?api_key=${config.API_KEY}&language=en-US&page=${page}`;
        return await mutate<TMDBResponse<Movie[]>>(
          url,
          async () => await fetchVideo<Movie>(url, type)
        );
      } else if (explore.name === "Series on Air") {
        let url = `${config.BASE_URL}tv/on_the_air?api_key=${config.API_KEY}&language=en-US&page=${page}`;
        return await mutate<TMDBResponse<Movie[]>>(
          url,
          async () => await fetchVideo<Movie>(url, type)
        );
      } else {
        console.log(page);
        return await mutate<TMDBResponse<Movie[]>>(
          `${config.BASE_URL}discover/${type}?api_key=${config.API_KEY}&with_genres=${explore.id}&page=${page}`,
          async () => await getMoviesBycategory(explore.id, type, false, page)
        );
      }
    },
    [explore.id, explore.name, type]
  );

  const getData = useCallback(async () => {
    setData(null);
    setLoading(true);
    let res = await handleData();
    setData(res);
    setLoading(false);
  }, [handleData]);

  useEffect(() => {
    getData();
  }, [getData, explore]);

  const handlePageClick = async (event: any) => {
    setData(null);
    setLoading(true);
    const nextPage = event.selected + 1;
    setPageCount(event.selected);
    let res = await handleData(nextPage);
    setData(res);
    setLoading(false);
  };

  return (
    <div className="w-full h-full overflow-scroll md:pb-0 pb-12">
      <Navbar title={explore.name} />

      {data && !loading ? (
        data?.results?.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center">
              {data?.results.map((prop: Movie, index: number) => (
                <Card key={index} {...prop} />
              ))}
            </div>
            <div className="grid place-items-center">
              <ReactPaginate
                breakLabel="•••"
                nextLabel={<ArrowRight2 size={25} className="text-white" />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={data?.total_pages ?? 1}
                forcePage={pageCount}
                previousLabel={<ArrowLeft2 size={25} className="text-white" />}
                containerClassName="rounded-full flex items-center h-[35px] ml-4 overflow-hidden w-fit my-2 [&_ul]:bg-white/10 bg-rounded-full bg-white/10"
                previousClassName="p-2 hover:bg-white/10 h-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                nextClassName="p-2 hover:bg-white/10 h-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                breakClassName="text-white h-full p-2 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                pageClassName="px-2 h-full flex items-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-white hover:bg-white/10"
                activeClassName="bg-white/10 px-2 h-full flex items-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-white "
              />
            </div>
          </>
        ) : (
          <div className="w-full grid place-items-center">
            <p className="text-3xl text-white">No data for {explore.name}</p>
          </div>
        )
      ) : (
        <div className="h-[70vh] w-full flex items-center justify-center flex-col">
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

export default Discover;
