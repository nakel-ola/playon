import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { Movie, TMDBResponse } from "../../typing";
import Banners from "../components/home/Banners";
import Categories from "../components/home/Categories";
import Navbar from "../components/home/Navbar";
import PopularRow from "../components/home/PopularRow";
import fetchData from "../utils/fetchData";
import { config } from "../utils/tmdb";
import { description, keywords } from "./_app";

type Props = {
  popular: TMDBResponse<Movie[]>;
};

export type Data = {
  id: number;
  name: string;
  type: "movie" | "tv";
};

const num = (max: number) => Math.floor(Math.random() * (max - 1)) + 1;

const Home = ({ popular }: Props) => {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useSWR<TMDBResponse<Movie[]>>(
    `${config.BASE_URL}tv/popular?api_key=${config.API_KEY}&language=en-US`
  );

  const newData: TMDBResponse<Movie[]> = {
    page: data?.page!,
    results: data?.results.map((result) => ({
      ...result,
      type: "tv",
    }))!,
    total_pages: data?.total_pages!,
    total_results: data?.total_results!,
  };

  const newPopular = active === 2 ? newData : popular;

  let title = "Playon - Home"

  return (
    <div ref={ref} className="overflow-scroll h-full w-full md:pb-0 pb-14">
      <Head>
        <meta
          key="twitter:title"
          name="twitter:title"
          content={title}
        />
        <meta
          key="og:title"
          property="og:title"
          content={title}
        />

        <meta name="keywords" content={keywords} />

        <meta name="description" content={description} />

        <meta name="title" content={title} />
        <title> {title} </title>
      </Head>

      <Navbar containerRef={ref} setActive={setActive} active={active} />
      <main className="relative">
        <Banners
          data={newPopular?.results![num(newPopular?.results!?.length)]!}
        />

        <div className="mt-[-100px] z-20 relative">
          <PopularRow
            id={1}
            name="Popular"
            type={active === 2 ? "tv" : "movie"}
            data={newPopular!}
          />
          <Categories active={active} />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let url = `${config.BASE_URL}movie/popular?api_key=${config.API_KEY}&language=en-US`;

  const data: TMDBResponse<Movie[]> = await mutate(
    url,
    async () => await fetchData(url)
  );
  const banners: Movie[] = data?.results?.map((result: Movie) => ({
    ...result,
    type: "movie",
  }));

  return {
    props: {
      popular: {
        page: data.page,
        results: banners,
        total_pages: data.total_pages,
        total_results: data.total_results,
      },
    },
  };
};
export default Home;
