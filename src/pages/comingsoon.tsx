import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { useCallback, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import { Movie, TMDBResponse } from "../../typing";
import Navbar from "../components/comingsoon/Navbar";
import Card from "../components/home/Card";
import { selectExplore } from "../redux/features/exploreSlice";
import fetchData from "../utils/fetchData";
import { config } from "../utils/tmdb";

const Comingsoon = () => {

  const [data, setData] = useState<TMDBResponse<Movie[]> | null>();
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(data?.page ?? 0);

  const getData = useCallback(async () => {
    setData(null);
    setLoading(true);

    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=1`).then((response) => response.json());

    setData(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePageClick = async (event: any) => {
    setData(null);
    setLoading(true);
    const nextPage = event.selected + 1;
    setPageCount(event.selected);

    let res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=${nextPage}`).then((response) => response.json());
    setData(res);
    setLoading(false);
  };

  return (
    <div className="w-full h-full overflow-scroll md:pb-0 pb-12">
      <Navbar />

      {(data && !loading) ? (
        data?.results?.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center">
              {data?.results.map((prop: Movie, index: number) => (
                <Card key={index} {...prop} />
              ))}
              <div className="grid place-items-center overflow-scroll w-full scrollbar-hide">
                <ReactPaginate
                  breakLabel="•••"
                  nextLabel={<ArrowRight2 size={25} className="text-white" />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={data?.total_pages ?? 1}
                  forcePage={pageCount}
                  previousLabel={
                    <ArrowLeft2 size={25} className="text-white" />
                  }
                  containerClassName="rounded-full flex items-center h-[35px] ml-4 overflow-hidden w-fit my-2 [&_ul]:bg-white/10 bg-rounded-full bg-white/10"
                  previousClassName="p-2 hover:bg-white/10 h-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                  nextClassName="p-2 hover:bg-white/10 h-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                  breakClassName="text-white h-full p-2 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                  pageClassName="px-2 h-full flex items-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-white hover:bg-white/10"
                  activeClassName="bg-white/10 px-2 h-full flex items-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-white "
                />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full grid place-items-center">
            <p className="text-3xl text-white">No Results for Upcoming</p>
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

export default Comingsoon;
