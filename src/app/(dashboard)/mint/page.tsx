"use client"

import MintTokenForm from '@/components/pages/mint-page/mintTokenForm';
import React from 'react'
import {motion} from "framer-motion"
import useGetUserPositions from '@/lib/hooks/useGetUserPositions';
import { useAccount } from 'wagmi';
type Props = {}

const Page = (props: Props) => {

  const {address} = useAccount()
  const {data:userPositions} = useGetUserPositions(address)

  return (
   <div className=" w-full min-h-screen relative bg-[#0b0f18] justify-center flex items-center rounded-lg shadow p-6">
         <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-[linear-gradient(rgba(14,22,40,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(14,22,40,0.8)_1px,transparent_1px)]"
          style={{ backgroundSize: "100px 100px" }}
        />
      </div>
      <motion.div
        className="absolute top-0 left-1/2 z-0 h-[300px] w-[600px] -translate-x-1/2 translate-y-1/4 rounded-[100%] bg-[#4d9fff] opacity-20 blur-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      />

      {/* Additional smaller light for more accurate effect */}
      <motion.div
        className="absolute top-0 left-1/2 z-0 h-[150px] w-[300px] -translate-x-1/2 translate-y-1/3 rounded-[100%] bg-[#9a4dff] opacity-30 blur-[60px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
   {
    userPositions?.positions && (
      <MintTokenForm
       positions={userPositions?.positions} 
   />
    )
   }
 </div>
  )
}

export default Page