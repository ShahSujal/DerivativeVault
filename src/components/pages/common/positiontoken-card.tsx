import { Button } from "@/components/ui/button";
import { getRandomGradient } from "@/lib/utils";
import { TPosition } from "@/types/type";
import React from "react";

type Props = {
  position: TPosition;
};

const PositionTokenCard = ({ position }: Props) => {
  const gradient = getRandomGradient();
  return (
    <div className=" w-[180px] h-[200px] border border-gray-50/20 flex justify-center items-center flex-col  rounded-lg">
    
        <div
          className={`w-20 h-20 my-2 rounded-full`}
          style={{ background: gradient }}
        />
        <h1 className="text-sm mt-3 text-center">
          {position.token0Symbol}/{position.token1Symbol}
        </h1>
        <Button className=" w-28 h-7 rounded-full mt-3   bg-blue-950/50 border border-gray-50/20">View</Button>
     
    </div>
  );
};

export default PositionTokenCard;
