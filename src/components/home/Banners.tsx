/* eslint-disable @next/next/no-img-element */
import {
  InfoCircle,
  Play,
} from "iconsax-react";
import {
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { Movie, Trailer } from "../../../typing";
import { add } from "../../redux/features/detailsSlice";
import fetchData from "../../utils/fetchData";
import { config, genres } from "../../utils/tmdb";




const Banners = ({ data }: { data: Movie }) => {
  const dispatch = useDispatch();
  const gradientRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const { data: newData } = useSWR<any>(`${config.BASE_URL}${data?.type}/${data?.id}/videos?api_key=${config.API_KEY}`, async (url: any) => await fetchData(url));

  const trailer: Trailer[] = newData?.results;

  const newGenre =
    data?.genre_ids &&
    data?.genre_ids?.length > 0 &&
    data?.genre_ids
      .slice(0, 3)
      .map((ids) => genres.find((genre) => genre.id === ids)?.name ?? false)
      .filter(Boolean);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const width = gradientRef.current?.offsetWidth ?? 0;
    const height = gradientRef.current?.offsetHeight ?? 0;

    let x = Math.round((e.pageX / width) * 100);
    let y = Math.round((e.pageY / height) * 100);

    gradientRef.current!.style.background = `radial-gradient(at ${x}% ${y}%, transparent, rgba(0,0,0,0.6))`;
  }, []);

  const handleClick = () => {
    if (trailer && trailer?.length > 0) {
      setPlaying(!playing);
    } else {
      setPlaying(false);
    }
  };

  return (
    <div className="w-full h-[520px] relative">
      <div className="relative h-[520px]">
        {playing ? (
          <ReactPlayer
            url={`${config.VIDEO_URL}?v=${
              trailer ? trailer![0]?.key : "undefined"
            }`}
            width="100%"
            height="100%"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            playing={playing}
            onEnded={() => setPlaying(false)}
            onError={() => setPlaying(false)}
          />
        ) : (
          <img
            src={`${config.IMAGE_URL}${data?.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover relative"
          />
        )}
      </div>
      <div
        ref={gradientRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "radial-gradient(at center, transparent, rgba(0,0,0,0.6))",
        }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      ></div>

      {!playing && (
        <div className="absolute top-[50%] translate-y-[-50%] px-2">
          <div className="p-2 z-10">
            <p className="text-white font-bold text-5xl w-[90vw] md:w-[40vw]">
              {data?.title || data?.name || data?.original_title}
            </p>
            <p className="text-sm text-white">{data?.release_date}</p>
            <div className="flex">
              {newGenre &&
                newGenre.map((genre: string | false, index: number) => (
                  <p key={index} className="text-sm text-white font-medium">
                    {" "}
                    {genre}{" "}
                    {index !== newGenre.length - 1 && (
                      <small className="px-2">• </small>
                    )}{" "}
                  </p>
                ))}
            </div>
            <div className="flex">
              {trailer && trailer?.length > 0 && (
                <button
                  className="my-2 mr-2 z-10 bg-white shadow w-[150px] h-[40px] text-black font-medium rounded-full flex items-center text-center transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={handleClick}
                >
                  <Play variant="Bold" size={25} className="mx-2 " />
                  Watch trailer
                </button>
              )}

              <button className={`group my-2 mr-2 z-10 h-[40px] font-medium rounded-full flex items-center text-center transition-all duration-300 hover:scale-105 active:scale-95 ${(trailer && trailer.length > 0) ? "hover:bg-white hover:shadow hover:w-[150px]" : "bg-white w-[150px] scale-105"}`} onClick={() => dispatch(add(data))}>
                <InfoCircle
                  variant="Outline"
                  className={`rotate-180 mx-2 ${(trailer && trailer.length > 0) ? "text-white group-hover:text-black group-hover:h-[25px] group-hover:w-[25px] h-[35px] w-[35px]" : "h-[25px] w-[25px]"}`}
                />

                <p className={`${(trailer && trailer.length > 0) ? "hidden group-hover:inline-flex" : "inline-flex"}`}>See details</p>
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface CardProps extends Movie {
  index: number;
  selectedIndex: number;
  playing: boolean;
  elements: Movie[];
  item: Movie;
  setItem: (item: Movie) => void;
}

export default Banners;
