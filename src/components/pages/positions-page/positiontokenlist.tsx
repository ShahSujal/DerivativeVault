import useGetUserPositions from "@/lib/hooks/useGetUserPositions";
import React from "react";
import { useAccount } from "wagmi";
import PositionCard from "../common/position-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import PositionTokenCard from "../common/positiontoken-card";
import { TPosition } from "@/types/type";
type Props = {
  positions: TPosition[];
  selectedPosition: TPosition | undefined; // Can be a number or undefined
  setSelectedPosition: React.Dispatch<React.SetStateAction<TPosition | undefined>>;
};

const PositionTokenList = ({positions, selectedPosition, setSelectedPosition}: Props) => {

  return (
    <div className=" w-full px-10  flex flex-col ">
      <div>
        <h1 className="text-2xl ml-3 my-4">Position Token List</h1>
      </div>

      <Carousel
        opts={{
          align: "start",
          
        }}
        className="w-full px-4"
      >
        <CarouselContent className="-ml-4">
          {positions?.map((position) => (
            <CarouselItem
              key={position.positionId}
              className="pl-4 md:basis-1/3 lg:basis-1/3"
              style={{ flex: '0 0 auto' }}
            >
              <PositionTokenCard position={position} selectedPosition={selectedPosition} setSelectedPosition={setSelectedPosition}  />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  );
};

export default PositionTokenList;
