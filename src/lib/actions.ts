import { Address } from "viem";



    export function isInExerciseWindow(expiryTime: number): boolean {
      const currentTime = Math.floor(Date.now() / 1000);
      const oneHourInSeconds = 60 * 60;
      
      return currentTime >= (expiryTime - oneHourInSeconds) && currentTime < expiryTime;
    }
    

    export function walletAddressShortn(
      address: string,
      start?: number,
      end?: number,
    ) {
      const startLength = start || 4;
      const endLength = end || 4;
      const shortAddress =
        address.slice(0, startLength) + "..." + address.slice(endLength * -1);
      return shortAddress;
    }
    