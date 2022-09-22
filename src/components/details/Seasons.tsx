/* eslint-disable @next/next/no-img-element */
import { Clock, Star } from "iconsax-react";
import React, { useMemo, useState } from "react";
import { Oval } from "react-loader-spinner";
import useSWR from "swr";
import { Episode, Season, SeasonTV } from "../../../typing";
import useLoader from "../../hooks/useLoader";
import fetchData from "../../utils/fetchData";
import { config } from "../../utils/tmdb";
import truncate from "../../utils/truncate";
import { colors, num, selectedColors } from "../home/Card";
// import { Card } from "./SimilarCard";

type Props = {
  id: number;
  seasons: Season[];
  number_of_seasons: number;
};

const Seasons = ({ id, seasons, number_of_seasons }: Props) => {
  const [season, setSeason] = useState<number>(0);

  const { data } = useSWR<SeasonTV>(
    `${config.BASE_URL}tv/${id}/season/${season}?api_key=${config.API_KEY}&language=en-US`,
    async (url: any) => await fetchData(url)
  );

  return number_of_seasons > 0 ? (
    <div className="my-2 mb-4 ">
      <div className="flex items-center">
        <p className="text-white text-md font-semibold"> Seasons</p>
        <SeasonTabs
          number_of_seasons={number_of_seasons}
          active={season!}
          onClick={setSeason}
        />
      </div>

      {data ? (
        data.episodes ? (
          <SeasonCard episodes={data?.episodes ?? []} />
        ) : (
          <div className="w-full grid place-items-center">
            <p className="text-3xl text-white">No Result for this Season</p>
          </div>
        )

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
  ): null;
};

const SeasonTabs = ({
  number_of_seasons,
  onClick,
  active,
}: {
  number_of_seasons: number;
  onClick(value: number): void;
  active: number;
}) => {
  return (
    <div className="bg-white/10 rounded-full flex items-center h-[35px] ml-4 overflow-hidden w-fit my-2">
      {Array(number_of_seasons)
        .fill(number_of_seasons)
        .map((_: number, index: number) => (
          <>
            <div
              key={index}
              className={`px-2 h-full grid place-items-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                active === index && "bg-white/10"
              }`}
              onClick={() => onClick(index)}
            >
              <p className="text-white">{index + 1}</p>
            </div>

            {index !== number_of_seasons && (
              <hr className="h-[80%] w-[1px] bg-neutral-900 border-0 " />
            )}
          </>
        ))}
    </div>
  );
};

const SeasonCard = ({ episodes }: { episodes: Episode[] }) => {
  return (
    <div className="flex overflow-scroll scrollbar-hide">
      {episodes ? (
        episodes?.map((episode: Episode, index) => (
          <Card key={index} {...episode} />
        ))
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

const Card = (props: Episode) => {
  const {
    id,
    name,
    still_path,
    overview,
    air_date,
    episode_number,
    vote_average,
    ...others
  } = props;
  const loaded = useLoader({
    src: `${config.IMAGE_URL + still_path}`,
  });

  const getColor = useMemo(() => {
    const findId = selectedColors.findIndex((c) => c.id === id);

    if (findId !== -1) {
      return selectedColors[findId].color;
    } else {
      const color = colors[num()];
      selectedColors.push({ id: id!, color });

      return color;
    }
  }, [id]);

  const color = getColor;
  const rating = vote_average! / 2;

  return (
    <div
      className={`shrink-0 w-[240px] mx-1 ${loaded === "Failed" && "hidden"}`}
    >
      <div className="group rounded-xl overflow-hidden m-2 border-4 transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 border-transparent w-[240px] h-[150px]">
        <img
          src={`https://image.tmdb.org/t/p/original/${still_path}`}
          alt=""
          loading="lazy"
          className={`relative w-full h-full object-cover rounded-lg group-hover:scale-125 ${color}`}
        />
      </div>

      <div className="m-2 pl-2">
        <p className="text-white text-lg font-bold">
          {episode_number}.{truncate(name, 20)}
        </p>

        <span className="flex text-white items-center">
          <Star variant="Bold" className="text-yellow-500" />{" "}
          <p className="pl-1 text-sm">{rating} Rating</p>
        </span>
        <p className="text-neutral-600 whitespace-pre-wrap">
          {truncate(overview!, 50)}
        </p>
        {air_date && (
          <span className="flex text-white items-center">
            <Clock variant="Bold" size={18} className="text-neutral-600" />{" "}
            <p className="pl-1 text-sm text-neutral-600">{air_date}</p>
          </span>
        )}
      </div>
    </div>
  );
};

export default Seasons;
