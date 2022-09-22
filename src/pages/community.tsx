/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";

const Community = () => {
  const router = useRouter()
  return <div className="h-screen w-full grid place-items-center">
    <div className="flex flex-col justify-center items-center">
      <img src="/Wavy_Tech-08_Single-04.png" alt="" className="h-[300px] w-[300px]" />
      <p className="text-3xl text-white">This Page is Under Maintanence</p>
      <button className="flex-1 m-2 px-6 py-[5px] bg-blue-600 text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap text-center border-[2px] border-transparent hover:border-blue-500 hover:bg-transparent hover:text-blue-500" onClick={() => router.push('/')}>Go Home</button>
    </div>
  </div>;
};

export default Community;
