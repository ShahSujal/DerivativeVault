import { TPosition } from '@/types/type'
import React, { useCallback, useEffect, useState } from 'react'
import { GlowingEffect } from './glowing-effect'
import { cn } from '@/lib/utils'
import { useAccount } from 'wagmi'
import { config } from '@/lib/providers/wagmi.config'
import { Address } from 'viem'
import { getBalance } from '@wagmi/core'
import { walletAddressShortn } from '@/lib/actions'
import { CopyIcon } from 'lucide-react'
type Props = {
    position: TPosition
}

const PositionCard = ({position}: Props) => {

    const {address} = useAccount()
    const [token1Symbol, setToken1Symbol] = useState('')
    const [token2Symbol, setToken2Symbol] = useState('')


  // Memoize the getTokenDetails function
  const getTokenDetails = useCallback(
    async (tokenAddress: Address) => {
      const { symbol } = await getBalance(config, {
        address: address as Address,
        chainId: 11155111,
        token: tokenAddress as Address,
      });
      return symbol;
    },
    [address]
  );

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const t1 = await getTokenDetails(position.token0);
        const t2 = await getTokenDetails(position.token1);
        setToken1Symbol(t1);
        setToken2Symbol(t2);
      } catch (error) {
        console.error("Error fetching token details:", error);
      }
    };
    fetchTokens();
  }, [position, getTokenDetails]); // Dependencies for useEffect


  return (
    <div
    className={cn(
      "relative border-[#23222264] cursor-pointer duration-1000 border-2 rounded-xl bg-gray-950 p-6 shadow-sm hover:bg-gradient-to-br hover:from-black hover:to-blue-950 transition"
    )}
  >
    <GlowingEffect
      blur={0}
      borderWidth={3}
      spread={80}
      glow={true}
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
    />
    <div className="mb-4 flex items-start justify-between">
     <div className=' flex-row flex justify-center items-center gap-2'>
     <div className="  overflow-hidden rounded-md">
        {token1Symbol}
      </div>
      <h1 className='text-lg font-semibold mx-3'>X</h1>
      <div className="  overflow-hidden rounded-md">
        {token2Symbol}
      </div>
     </div>
   <div>
 
   <div className=" px-3 h-7 rounded-full justify-center items-center flex  bg-blue-950/50 border border-gray-50/20">
      { position.fee / 1e4}% Fee Tier
    </div>
   
   </div>



    </div>
    <h3 className="mb-2 text-xl font-medium  cursor-pointer text-gray-200">
      Total Liquidity {Number(position.liquidity).toFixed(2)}
    </h3>
   <div className=' flex flex-row justify-between mt-4 items-center'>
   <p className="text-sm text-gray-400 flex flex-row justify-center items-center space-x-2">
      {token1Symbol}:  {walletAddressShortn(position.token0 , 8, 6)} <CopyIcon className='w-4 h-4 ml-3' />    
    </p>
    <p className="text-sm text-gray-400 flex flex-row justify-center items-center space-x-2">
        {token2Symbol}:  {walletAddressShortn(position.token1 , 8, 6)} <CopyIcon className='w-4 h-4 ml-3' />
    </p>
   </div>
   <div className='flex flex-row justify-end items-center'>
        <h1><span className='text-gray-400'>Tick Range:</span> {position.tickLower} to {position.tickUpper}</h1>
    </div>
  </div>
  )
}

export default PositionCard