import { BarChart3, ChartNoAxesColumn, ChevronRight, DraftingCompass, Hammer, Home, LockIcon, Zap } from "lucide-react"
import Sidebar from "@/components/global/sidebar"
import { getGreetingBasedOnTime } from "@/lib/utils";
import IntegrationCard from "@/components/pages/common/intreactive-cards";

export default function Dashboard() {
  const greeting = getGreetingBasedOnTime();

      //     : number;
    //     : number;
    //     totalExercisedOptions: number;
    //     totalValueLocked: string;

  const integrationTasks = [
    {
      name: "TotalLockedPositions",
      description: "Total Locked Positions on Uniswap V3 ",
      logo: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
         <LockIcon className=" text-gray-600"/>
        </div>
      ),
    },
    {
      name: "TotalMintedOptions",
      description: "Total Minted Options on Uniswap V3 ",
      logo: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
         <Hammer className=" text-gray-600"/>
        </div>
      ),
    },
    {
      name: "TotalExercisedOptions",
      description: "Total Exercised Options on Uniswap V3 ",
      logo: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
        <DraftingCompass className=" text-gray-600"/>
        </div>
      ),
    },
    {
      name: "TotalValueLocked",
      description: "Total Value Locked on Uniswap V3 ",
      logo: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
        <ChartNoAxesColumn className=" text-gray-600"/>
        </div>
      ),
    },
      
    
  ];
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
        <IntegrationCard key={index} logo={task.logo} name={task.name} description={task.description} />
      ))}
    </div>
      </main>
    </div>
  )
}


