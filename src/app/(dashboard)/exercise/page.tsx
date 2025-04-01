"use client";
import OptionsExerciser from "@/components/pages/exercise-page/PositionExcersier";
import React from "react";


const Page = () => {


  return (
    <div className=" rounded-lg bg-[#0b0f18] min-h-screen shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Exercise Options</h2> 
      <OptionsExerciser/>
    </div>
  );
};

export default Page;