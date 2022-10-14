/* eslint-disable @next/next/no-img-element */
import { PlayCircle } from "iconsax-react";
import React, { MouseEvent, useCallback, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { Trailer } from "../../../typing";
import { remove } from "../../redux/features/detailsSlice";
import fetchData from "../../utils/fetchData";
import { config } from "../../utils/tmdb";

type Props = {
  type: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
};

const MediaCard = ({ type, id, backdrop_path,poster_path }: Props) => {

  const gradientRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);

  const { data: newData } = useSWR<any>(
    `${config.BASE_URL}${type}/${id}/videos?api_key=${config.API_KEY}`,
    async (url: any) => await fetchData(url)
  );

  const trailer: Trailer[] = newData?.results;

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!playing) {
        const width = gradientRef.current?.offsetWidth ?? 0;
        const height = gradientRef.current?.offsetHeight ?? 0;

        let x = Math.round((e.pageX / width) * 100);
        let y = Math.round((e.pageY / height) * 100);

        gradientRef.current!.style.background = `radial-gradient(at ${x}% ${y}%, transparent, rgba(0,0,0,0.6))`;
      }
    },
    [playing]
  );

  const handleClick = () => {
    if (trailer && trailer?.length > 0) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  return (
    <div className="relative max-h-[520px] md:h-[520px] w-full">
      {playing ? (
        <ReactPlayer
          url={`${config.VIDEO_URL}?v=${
            trailer ? trailer![0]?.key : "undefined"
          }`}
          width="100%"
          height="450px"
          style={{
            width: "100%",
            height: "450px",
            objectFit: "cover",
          }}
          playing={playing}
          onEnded={() => setPlaying(false)}
          onError={() => setPlaying(false)}
        />
      ) : (
        <img
          src={`${config.IMAGE_URL + backdrop_path ?? poster_path}`}
          alt=""
          className="relative w-full h-full object-cover"
        />
      )}

      <div
        ref={gradientRef}
        className="absolute top-0 h-full w-full z-10"
        style={{
          background: !playing
            ? "radial-gradient(at center, transparent, rgba(0,0,0,0.6))"
            : "",
        }}
        onClick={() => playing && setPlaying(false)}
        onMouseMove={handleMouseMove}
      >
        {!playing && trailer && trailer.length > 0 && (
          <div
            className="w-full h-full flex items-center justify-center flex-col"
            onClick={handleClick}
          >
            <PlayCircle variant="Bold" size={60} className="text-white" />
            <p className="text-2xl text-white font-bold">Play trailer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCard;
