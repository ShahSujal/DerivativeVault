import { BarChart3, ChevronRight, Home, Zap } from "lucide-react"
import Sidebar from "@/components/global/sidebar"
import { getGreetingBasedOnTime } from "@/lib/utils";

export default function Dashboard() {
  const greeting = getGreetingBasedOnTime();

  return (
    <div className="flex h-screen bg-black text-white">

      <main className="flex-1 overflow-auto p-6">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
          <span>Dashboard</span>
        </div>

        <h1 className="text-2xl font-semibold mb-8">{greeting} </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900 to-indigo-900 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 hover:-translate-y-1">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-600/20 blur-3xl group-hover:bg-purple-600/30"></div>
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl group-hover:bg-blue-600/30"></div>
            <div className="relative flex justify-between">
              <div>
                <h2 className="text-4xl font-bold">42</h2>
                <p className="text-sm text-purple-300">Active Tasks</p>
              </div>
              <button className="rounded-md bg-white/10 px-3 py-1 text-xs backdrop-blur-sm transition-colors hover:bg-white/20">
                View details
              </button>
            </div>
            <div className="absolute bottom-4 right-4 text-purple-300/40">
              <Zap className="h-8 w-8" />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gray-900 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gray-800/20 hover:-translate-y-1">
            <div className="relative flex justify-between">
              <div>
                <h2 className="text-4xl font-bold">21</h2>
                <p className="text-sm text-gray-400">Client Review</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-gray-900 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gray-800/20 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">Revenue Forecast</h3>
              <p className="text-xs text-gray-400">Showing revenue and expenses</p>
            </div>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-48">
            <RevenueChart />
          </div>
        </div>
      </main>
    </div>
  )
}

function RevenueChart() {
  const months = ["J", "F", "March", "A", "May", "June", "July", "August", "S", "O", "N", "D"]

  return (
    <div className="flex h-full items-end gap-2">
      {months.map((month, i) => {
        const revenueHeight = Math.random() * 70 + 10
        const expenseHeight = Math.random() * 50 + 10
        const isHighlight = i === 4

        return (
          <div key={month} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full flex gap-1 justify-center">
              <div
                className={`w-3 rounded-t ${isHighlight ? "bg-purple-500" : "bg-gray-700"}`}
                style={{ height: `${revenueHeight}%` }}
              ></div>
              <div
                className={`w-3 rounded-t ${isHighlight ? "bg-blue-400" : "bg-gray-800"}`}
                style={{ height: `${expenseHeight}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">{month}</div>
          </div>
        )
      })}
    </div>
  )
}

