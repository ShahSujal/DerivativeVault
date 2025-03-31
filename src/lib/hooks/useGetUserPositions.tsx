import { useQuery } from "@tanstack/react-query";
import { getUserPositions } from "../scripts/getUserPosition";
import { Address } from "viem";
import { TPosition } from "@/types/type";

const useGetUserPositions = (walletAddress: Address | undefined) => {
  return useQuery({
    queryKey: ["user-positions", walletAddress],
    queryFn: () => {
      if (!walletAddress) return {
        totalPositions: 0,
        positions: [] as TPosition[]
      };
      return getUserPositions(walletAddress);
    },
    refetchOnWindowFocus: false,
    // Cache for 6 hours (in milliseconds)
    staleTime: 1000 * 60 * 60 * 6,
    // Keep cached data for 6 hours even if unused
    gcTime: 1000 * 60 * 60 * 6,
    // Optional: you might want to add these for better cache control
    refetchOnMount: false,
    refetchOnReconnect: false
  });
};

export default useGetUserPositions;
