"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LayoutGrid, Package, PuzzleIcon, BarChart3, ChevronRight } from "lucide-react";
import { GlowingEffect } from "@/components/pages/common/glowing-effect";
import Image from "next/image";

// Integration card component
interface IntegrationCardProps {
  task:{
    name: string;
  description: string;
  page: string;
  action: string;
  logo: JSX.Element;
  externalLink?: string;
  }
}

const IntegrationCard= ({task}:IntegrationCardProps) => {

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
        <div className="h-10 w-10 overflow-hidden rounded-md">{task.logo}</div>
        {/* chevron-right */}
      <div className=" w-52 h-7 rounded-full justify-center items-center flex  bg-blue-950/50 border border-gray-50/20">
        {task.action}
      </div>
      </div>
      <h3 className="mb-2 text-xl font-medium  cursor-pointer text-gray-200">
        {task.name}
      </h3>
      <p className="text-sm text-gray-400">{task.description}</p>
    </div>
  );
};


export default IntegrationCard