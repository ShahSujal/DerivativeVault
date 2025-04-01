import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { getUserExercise } from "../scripts/getUserExercise";
import { TExerciseData } from "@/types/type";

const useGetUserExercise = (walletAddress: Address | undefined) => {
  return useQuery({
    queryKey: ["user-exercise", walletAddress],
    queryFn: () => {
      if (!walletAddress) return [] as TExerciseData[];
      return getUserExercise(walletAddress);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
};

export default useGetUserExercise;
