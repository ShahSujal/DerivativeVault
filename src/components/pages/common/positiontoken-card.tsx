import { Button } from "@/components/ui/button";
import { getRandomGradient } from "@/lib/utils";
import { TPosition } from "@/types/type";
import React from "react";

type Props = {
  position: TPosition;
  selectedPosition:TPosition|undefined;
  setSelectedPosition: React.Dispatch<React.SetStateAction<TPosition | undefined>>;
};

const PositionTokenCard = ({ position, setSelectedPosition, selectedPosition }: Props) => {
  const gradient = getRandomGradient();
  return (
    <div className={` w-[180px] backdrop-blur-3xl h-[200px] border ${selectedPosition && position.positionId == selectedPosition.positionId ? "border-white": "border-gray-50/20"} flex justify-center items-center flex-col  rounded-lg`}>
    
        <div
          className={`w-20 h-20 my-2 rounded-full`}
          style={{ background: gradient }}
        />
        <h1 className="text-sm mt-3 text-center">
          {position.token0Symbol}/{position.token1Symbol}
        </h1>
        <Button className={` w-28 h-7 rounded-full mt-3  ${selectedPosition && selectedPosition.positionId == position.positionId? " bg-gray-950/90":" bg-blue-950/50"} border border-gray-50/20`}
        onClick={()=>setSelectedPosition(position)}
        disabled={selectedPosition && selectedPosition.positionId == position.positionId}
        >View</Button>
     
    </div>
  );
};

export default PositionTokenCard;
