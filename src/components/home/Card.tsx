/* eslint-disable @next/next/no-img-element */
import { Clock, Star } from "iconsax-react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Movie } from "../../../typing";
import useLoader from "../../hooks/useLoader";
import { add } from "../../redux/features/detailsSlice";
import { config } from "../../utils/tmdb";
import truncate from "../../utils/truncate";

export const num = () => Math.floor(Math.random() * colors.length);

interface Color {
  id: number;
  color: string;
}

export const colors = [
  "bg-red-600",
  "bg-pink-600",
  "bg-indigo-600",
  "bg-purple-600",
  "bg-blue-600",
  "bg-teal-600",
  "bg-green-600",
  "bg-yellow-600",
  "bg-cyan-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-gray-600",
];

export let selectedColors: Color[] = [];

interface Props extends Movie {}

const Card = ({
  id,
  backdrop_path,
  title,
  name,
  original_title,
  poster_path,
  overview,
  release_date,
  vote_average,
  ...others
}: Props) => {
  const loaded = useLoader({
    src: `${config.IMAGE_URL + backdrop_path ?? poster_path}`,
  });
  const rating = vote_average! / 2;

  const router = useRouter();
  const dispatch = useDispatch();

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

  const handleClick = () => {
    dispatch(
      add({
        id,
        backdrop_path,
        title,
        name,
        original_title,
        poster_path,
        overview,
        release_date,
        vote_average,
        ...others,
      })
    );
    router.push(`/details/${title ?? name ?? original_title}`);
  };

  return (
    <div
      className={`shrink-0 w-[260px] mx-1 ${loaded === "Failed" && "hidden"}`}
      onClick={handleClick}
    >
      <div className="group rounded-xl overflow-hidden m-2 border-4 transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 border-transparent w-[260px] h-[150px]">
        <img
          src={`${config.IMAGE_URL}${
            backdrop_path ?? poster_path
          }`}
          alt=""
          loading="lazy"
          className={`relative w-full h-full object-cover rounded-lg group-hover:scale-125 ${color}`}
        />
      </div>

      <div className="m-2 pl-2">
        <p className="text-white text-lg font-bold">
          {truncate(title! ?? name! ?? original_title!, 25)}
        </p>

        {rating && (
          <span className="flex text-white items-center">
            <Star variant="Bold" className="text-yellow-500" />{" "}
            <p className="pl-1 text-sm">{rating} Rating</p>
          </span>
        )}

        <p className="text-neutral-600 whitespace-pre-wrap">
          {truncate(overview! ?? "", 50)}
        </p>
        {release_date && (
          <span className="flex text-white items-center">
            <Clock variant="Bold" size={18} className="text-neutral-600" />{" "}
            <p className="pl-1 text-sm text-neutral-600">{release_date}</p>
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
