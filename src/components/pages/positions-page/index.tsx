import React, { useState } from "react";
import PositionTokenList from "./positiontokenlist";
import PriceChart from "./graphChart";
import { useAccount } from "wagmi";
import useGetUserPositions from "@/lib/hooks/useGetUserPositions";
import { TPosition } from "@/types/type";
import Image from "next/image";

type Props = {};

const PositionPage = (props: Props) => {
  const { address } = useAccount();
  const { data: positions } = useGetUserPositions(address);
  const [selectedPosition, setSelectedPosition] = useState<TPosition>();
  return (
        <div
      className="min-h-screen px-4 w-full flex flex-col"
      style={{
        backgroundImage: "url('/assets/siworld.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {positions ? (
        <div>
          <PositionTokenList
            positions={positions.positions}
            setSelectedPosition={setSelectedPosition}
            selectedPosition={selectedPosition}
          />
          {selectedPosition ? (
            <PriceChart
              position={selectedPosition}
            />
          ) : (
            <div className="text-2xl text-bold w-full flex flex-col justify-center backdrop-blur-sm items-center  h-[300px] font-serif">
                    
                <Image
                  src={"/assets/eth.webp"}
                  alt=""
                  className="opacity-60 transition animate-bounce-slow mix-blend-hard-light"
                  width={200}
                  height={150}
                />
           
              Select Position to continue</div>
          )}
        </div>
      ) : (
        <div className="w-full h-screen justify-center items-center flex">Loading</div>
      )}
    </div>
  );
};

export default PositionPage;
