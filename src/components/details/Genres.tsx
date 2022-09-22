import React from "react";
import { genres } from "../../utils/tmdb";

const Genres = ({ ids }: { ids?: number[] }) => {
  return ids && ids?.length > 0 ?(
    <div className="flex items-center my-2">
      {/* <p className="text-white text-lg font-bold">Genres:</p> */}

      <div className="flex items-center justify-between overflow-scroll scrollbar-hide">
        {ids
          .map((id: number, index: number) => {
            const name = genres.find((genre) => genre.id === id)?.name;
            return name ? (
              <button key={index} className="m-2 px-6 py-[5px] bg-white/10 text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/20 whitespace-nowrap text-center">
                {name}
              </button>
            ) : (
              false
            );
          })
          .filter(Boolean)}
      </div>
    </div>
  ): null;
};

export default Genres;
