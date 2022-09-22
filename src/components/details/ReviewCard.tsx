/* eslint-disable @next/next/no-img-element */
import { ArrowDown2, Clock } from "iconsax-react";
import TimeAgo from "react-timeago";
import useSWR from "swr";
import { Review, TMDBResponse } from "../../../typing";
import fetchData from "../../utils/fetchData";
import { config } from "../../utils/tmdb";
import truncate from "../../utils/truncate";
import { Avatar } from "./Cast";

const ReviewCard = ({ id, type }: { id: number; type: string }) => {
  const { data } = useSWR<TMDBResponse<Review[]>>(
    `${config.BASE_URL}${type}/${id}/reviews?api_key=${config.API_KEY}&language=en-US&page=1`,
    async (url) => await fetchData(url)
  );

  return (
    <div className="my-2 lg:w-[70%]">
      <div className="flex items-center justify-between">
        <p className="text-white text-md font-semibold">Reviews</p>

        {data?.results && data?.results?.length > 5 && (
          <span className="w-[35px] h-[35px] flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95 rounded-full">
            <ArrowDown2 size={25} className="text-white" />
          </span>
        )}
      </div>

      {data?.results && data?.results?.length > 0 ? (
        <div className="">
          {data?.results?.slice(0, 5).map((result: Review, index: number) => (
            <Card key={index} {...result} />
          ))}
        </div>
      ) : (
        <div className="text-white ">There aren&apos;t any reviews yet </div>
      )}

    </div>
  );
};

const Card = (props: Review) => {
  const { author_details, updated_at, created_at, content } = props;
  return (
    <div className="flex w-full my-2">
      <Avatar
        src={`${config.IMAGE_URL + author_details?.avatar_path}`}
        className="h-[50px] w-[50px] mt-1"
      />

      <div className="w-full">
        <span className="flex items-center justify-between px-2">
          <p className="text-md text-white font-bold">
            {author_details.username || author_details.name}
          </p>
          <span className="flex text-white items-start justify-start">
            <Clock variant="Bold" size={18} className="text-neutral-600" />{" "}
            <p className="pl-1 text-sm text-neutral-600">
              <TimeAgo date={updated_at ?? created_at} />
            </p>
          </span>
        </span>

        <p className="text-neutral-400 px-2 text-sm">
          {truncate(content, 200)}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
