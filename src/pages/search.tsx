import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import useSWR, { mutate } from "swr";
import { SearchData, TMDBResponse } from "../../typing";
import Card from "../components/home/Card";
import Navbar from "../components/search/Navbar";
import { keywords } from "../components/seo";
import fetchData from "../utils/fetchData";
import { config } from "../utils/tmdb";

const Search = () => {
  const router = useRouter();
  const { q }: any = router.query;

  const [data, setData] = useState<TMDBResponse<SearchData[]> | null>();
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const getData = useCallback(async () => {
    if (q) {
      setData(null);
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${config.API_KEY}&language=en-US&page=1&include_adult=false&query=${q}`
      ).then((response) => response.json());

      setData(res);
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePageClick = async (event: any) => {
    setData(null);
    setLoading(true);
    const nextPage = event.selected + 1;
    setPageCount(event.selected);

    const res = await fetch(
      `${config.BASE_URL}search/multi?api_key=${config.API_KEY}&language=en-US&page=${nextPage}&include_adult=false&query=${q}`
    ).then((response) => response.json());

    setData(res);
    setLoading(false);
  };

  const newData =
    data?.results.map((d: SearchData) => ({
      ...d,
      type: d.media_type,
    })) ?? [];

  // Are you looking for the latest movies, series, and TV shows? With the help of this website, you can find the best information on streaming videos and series with ease.

  return (
    <>
      <Head>
        <meta name="keywords" content={keywords} />

        <meta name="description" content="Are you looking for the latest movies, series, and TV shows? With the help of this website, you can find the best information on streaming videos and series with ease" />

        <meta name="title" content={`Search - ${q}`} />
        <title> Search - {q} </title>
      </Head>
      <div className="w-full h-full overflow-scroll md:pb-0 pb-12">
        <Navbar query={q} />

        {q ? (
          data && !loading ? (
            data?.results?.length > 0 ? (
              <>
                <div className="flex flex-wrap justify-center">
                  {newData.map((prop: SearchData, index: number) => (
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
              </>
            ) : (
              <div className="w-full grid place-items-center">
                <p className="text-3xl text-white">
                  No Result for &quot;{q}&quot;
                </p>
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
          )
        ) : (
          <div className="w-full flex items-center justify-center my-10">
            <p className="text-3xl text-white text-center">
              Type into the search box to get result
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
