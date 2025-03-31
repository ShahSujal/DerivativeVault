import { Address } from "viem";



    export function isInExerciseWindow(expiryTime: number): boolean {
      const currentTime = Math.floor(Date.now() / 1000);
      const oneHourInSeconds = 60 * 60;
      
      return currentTime >= (expiryTime - oneHourInSeconds) && currentTime < expiryTime;
    }
    