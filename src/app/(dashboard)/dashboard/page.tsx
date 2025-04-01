"use client";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ChartNoAxesColumn,
  ChevronRight,
  DraftingCompass,
  Hammer,
  Home,
  LockIcon,
  Zap,
} from "lucide-react";
import Sidebar from "@/components/global/sidebar";
import { getGreetingBasedOnTime } from "@/lib/utils";
import IntegrationCard from "@/components/pages/common/intreactive-cards";
import useGetUserPositions from "@/lib/hooks/useGetUserPositions";
import { useAccount } from "wagmi";
import PositionCard from "@/components/pages/common/position-card";
import { integrationTasks } from "@/lib/constants/integrateTask";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  const greeting = getGreetingBasedOnTime();
  const { address } = useAccount();
  const { data: userPositions } = useGetUserPositions(address);

  return (
    <div className="flex h-screen bg-[#06080d] text-white">
      <main className="flex-1 overflow-auto p-6">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
          <span>Dashboard</span>
        </div>

        <h1 className="text-2xl font-semibold mb-8">{greeting} </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {integrationTasks.map((task, index) => (
            <IntegrationCard key={index} task={task} />
          ))}
        </div>

        <div className=" flex flex-row justify-between items-center">
          <h1 className="text-2xl ml-2 font-semibold my-8">Your Positions</h1>
          <Link href={"/positionlist"}>
            <Button className=" px-3 h-10 rounded-full hover:bg-black justify-center items-center flex  bg-blue-950/50 border border-gray-50/20">
              View All
              <ChevronRight className=" text-gray-600" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6  lg:grid-cols-2">
          {userPositions ? (
            userPositions.positions.map((task, index) => (
              <PositionCard key={index} position={task} />
            ))
          ) : (
            <div className=" text-center w-full h-36 text-2xl text-gray-600">
              Create Your First Position On Uniswap
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
