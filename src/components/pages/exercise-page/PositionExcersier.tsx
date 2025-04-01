import useGetUserExercise from '@/lib/hooks/useGetUserExercise';
import React from 'react';
import { useAccount } from 'wagmi';

const OptionsExerciser= () => {
  const {address} = useAccount()
  const {data:exercise} = useGetUserExercise(address)
  return (
    <div className="">
 
    </div>
  );
};

export default OptionsExerciser;