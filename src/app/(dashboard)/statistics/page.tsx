import React from 'react'

type Props = {}

const page = (props: Props) => {
    // const statistics: {
    //     totalLockedPositions: number;
    //     totalMintedOptions: number;
    //     totalExercisedOptions: number;
    //     totalValueLocked: string;
    // }
  return (
    <div>
         <div className="lg:col-span-3">
            <Statistics statistics={statistics} />
          </div>
    </div>
  )
}

export default page