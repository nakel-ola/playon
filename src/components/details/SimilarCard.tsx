/* eslint-disable @next/next/no-img-element */
import { Clock, Star } from "iconsax-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Movie } from "../../../typing";
import useLoader from "../../hooks/useLoader";
import { add } from "../../redux/features/detailsSlice";
import { config, getSimilarMovies } from "../../utils/tmdb";
import truncate from "../../utils/truncate";
import { colors, num, selectedColors } from "../home/Card";

const SimilarCard = ({ id }: { id: number }) => {
  const [similar, setSimilar] = useState<Movie[]>([]);

  const getData = useCallback(async () => {
    const similarRes = await getSimilarMovies(id ?? 0);
    setSimilar(similarRes);
  }, [id]);

  useEffect(() => {
    setSimilar([]);
    getData();
  }, [getData,id]);
  

  return similar?.length > 0 ? (
    <div className="my-2">
      <div className="flex items-center justify-between">
        <p className="text-white text-md font-semibold">
          {" "}
          Similar Movies
        </p>
      </div>

      <div className="flex overflow-scroll scrollbar-hide">
        {similar?.slice(0, 10).map((props: Movie, i: number) => (
          <Card key={i} {...props} />
        ))}
      </div>
    </div>
  ): null;
};

export const Card = (props: Movie) => {
  const {
    id,
    title,
    backdrop_path,
    poster_path,
    overview,
    original_title,
    name,
    vote_average,
    release_date,
    ...others
  } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const loaded = useLoader({
    src: `${config.IMAGE_URL + backdrop_path ?? poster_path}`,
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
      onClick={() => {
        dispatch(
          add({
            id,
            title,
            backdrop_path,
            poster_path,
            overview,
            original_title,
            name,
            vote_average,
            release_date,
            ...others,
          })
        )
        router.push(`/details/${title! ?? name! ?? original_title!}`)
      }}
    >
      <div className="group rounded-xl overflow-hidden m-2 border-4 transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 border-transparent w-[240px] h-[150px]">
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
          {truncate(title! ?? name! ?? original_title!, 20)}
        </p>

        <span className="flex text-white items-center">
          <Star variant="Bold" className="text-yellow-500" />{" "}
          <p className="pl-1 text-sm">{rating} Rating</p>
        </span>
        <p className="text-neutral-600 whitespace-pre-wrap">
          {truncate(overview!, 50)}
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

export default SimilarCard;
