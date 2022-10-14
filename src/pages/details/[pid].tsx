/* eslint-disable @next/next/no-img-element */
import { Clock, Star } from "iconsax-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Movie, TvDetails } from "../../../typing";
import Cast from "../../components/details/Cast";
import Genres from "../../components/details/Genres";
import MediaCard from "../../components/details/MediaCard";
import Navbar from "../../components/details/Navbar";
import RecommendedCard from "../../components/details/RecommendedCard";
import ReviewCard from "../../components/details/ReviewCard";
import Seasons from "../../components/details/Seasons";
import SimilarCard from "../../components/details/SimilarCard";
import { config } from "../../utils/tmdb";
import { appBaseUrl } from "../_app";

const Details = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const movie: Movie = useSelector((state: any) => state.details.details);

  const { data } = useSWR(
    `${config.BASE_URL}${movie?.type}/${movie?.id}?api_key=${config.API_KEY}&language=en-US`
  );

  const rating = movie?.vote_average! / 2;

  useEffect(() => {
    if (!movie?.id) {
      router.back();
    }
  }, [movie?.id, router]);

  return (
    <>
      <Head>
        <title>{movie?.title ?? movie?.name ?? movie?.original_title}</title>
        <link
          rel="icon"
          href={`${
            config.IMAGE_URL + movie?.backdrop_path ?? movie?.poster_path
          }`}
        />

        <meta name="description" content={`Learn more about ${movie?.title}`} />
        <meta property="og:title" content={`${movie?.title} - Play on`} />
        <meta
          property="og:description"
          content={`Learn more about ${movie?.title}`}
        />
        <meta property="og:URL" content={`${appBaseUrl}${router.query.pid}`} />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={movie?.title} />
        <meta
          key="og:image"
          property="og:image"
          content={`${
            config.IMAGE_URL + movie?.backdrop_path ?? movie?.poster_path
          }`}
        />
      </Head>
      <div ref={ref} className="overflow-y-scroll h-full relative mb-10 md:mb-0">
        <Navbar containerRef={ref} />

        <MediaCard
          backdrop_path={movie?.backdrop_path!}
          id={movie?.id!}
          poster_path={movie?.poster_path!}
          type={movie?.type!}
        />

        <div className="w-full p-[15px] bg-neutral-900">
          <span className="flex items-center justify-between">
            <p className="text-3xl text-white font-bold">
              {movie?.title! ?? movie?.name! ?? movie?.original_title!}
            </p>

            {movie?.release_date && (
              <span className="flex text-white items-center">
                <Clock variant="Bold" size={18} className="text-neutral-600" />{" "}
                <p className="pl-1 text-sm text-neutral-600">
                  {movie?.release_date}
                </p>
              </span>
            )}
          </span>

          {rating && (
            <span className="flex text-white items-center">
              <Star variant="Bold" className="text-yellow-500" />{" "}
              <p className="pl-1 text-sm">{rating} Rating</p>
            </span>
          )}
          <p className="text-sm text-white py-2">{movie?.overview!}</p>
          <Genres ids={movie?.genre_ids} />

          <Cast id={movie?.id!} />

          {movie?.type === "tv" && (
            <Seasons
              id={movie?.id!}
              seasons={(data as TvDetails)?.seasons!}
              number_of_seasons={(data as TvDetails)?.number_of_seasons}
            />
          )}

          <ReviewCard id={movie?.id!} type={movie?.type!} />
          <RecommendedCard id={movie?.id!} />
          <SimilarCard id={movie?.id!} />
        </div>
      </div>
    </>
  );
};

export default Details;
