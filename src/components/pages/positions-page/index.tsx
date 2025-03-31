import React from 'react'
import PositionTokenList from './positiontokenlist'
import PriceChart from './graphChart'

type Props = {}

const PositionPage = (props: Props) => {
  return (
    <div className=' min-h-screen px-4 w-full flex flex-col bg-[#0b0f18]'>
        <PositionTokenList/>
      
    </div>
  )
}

export default PositionPage