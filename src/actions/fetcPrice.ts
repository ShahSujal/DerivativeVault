"use server"
import { TRealTimePriceData } from "@/types/type";
import { env } from "../../env";

export const realTimePrice = async(poolAddress:string)=>{
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": `Bearer ${env.GRAPH_API_KEY}`,
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "query": `{pools(where: {id: \"${poolAddress.toLowerCase()}\"}) { id totalValueLockedETH sqrtPrice totalValueLockedUSDUntracked token0Price token1Price swaps( orderBy: timestamp orderDirection: desc first: 10) {id sqrtPriceX96 amountUSD timestamp sender recipient tick } createdAtTimestamp} }`
       }
       );
       
       let response = await fetch(env.GRAPH_URL, { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });

    //    console.log(response.json());
       
       
       let data:TRealTimePriceData = await response.json();

       console.log(data);
       
    //    return []
       if (data.data) {
        console.log(data);
        return data
       }
}