/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { User } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import useLoader from "../../hooks/useLoader";
import { config, getCast } from "../../utils/tmdb";
import truncate from "../../utils/truncate";

type Cast = {
  adult: boolean;
  cast_id: number;
  character: string;
  cedit_id: string;
  gender: number;
  id: number;
  name: string;
  known_for_department: string;
  orignal_name: string;
  popularity: number;
  profile_path: string;
};

const Cast = ({ id }: { id: number }) => {
  const [casts, setCasts] = useState<Cast[]>([]);

  const fetchData = useCallback(async () => {
    const res = await getCast(id ?? 0);
    setCasts(res.cast);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return casts?.length > 0 ? (
    <div className="w-full my-2 overflow-hidden">
      <p className="text-white text-lg font-bold">Cast</p>

      <div className="flex overflow-scroll scrollbar-hide">
        {casts?.map((cast: Cast, index: number) => (
          <Card key={index} {...cast} />
        ))}
      </div>
    </div>
  ) : null;
};

const Card = ({ profile_path, orignal_name, name, character }: Cast) => {
  const loaded = useLoader({
    src: `${config.IMAGE_URL}${profile_path}`,
  });
  return (
    <div className="flex items-center flex-col justify-center shrink-0 m-2 h-[150px] overflow-hidden">
      <Avatar src={`${config.IMAGE_URL}${profile_path}`} />
      
      <p className="text-white text-md whitespace-nowrap">
        {truncate(name ?? orignal_name, 12)}
      </p>
      <p className="text-neutral-600 text-sm mb-auto">
        {truncate(character, 12)}
      </p>
    </div>
  );
};
export const Avatar = ({ src,className,...others }: { src: string,className?: string; [key: string]: any }) => {
  const loaded = useLoader({src});
  return (
    <div
      className={clsx(`w-[100px] h-[100px] rounded-full overflow-hidden grid place-items-center shrink-0 ${
        (!loaded || loaded === "Failed") && " bg-white/10"
      }`,className)}
      {...others}
    >
      {!loaded || loaded === "Failed" ? (
        <User className="text-white h-[60%] w-[60%]" />
      ) : (
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      )}
    </div>
  );
};

export default Cast;
