"use client"
import type React from "react"
import {
  BarChart2,
  Clock,
  DraftingCompass,
  FileText,
  Flame,
  Layers,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Skull,
  Users,
  Wallet,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useAccount } from "wagmi"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const {address} = useAccount()
  const pathname = usePathname()
    // Navigation items array
    const navItems = [
      { icon: <Zap className="h-4 w-4" />, label: "Dashboard", link: "/dashboard" },
      { icon: <BarChart2 className="h-4 w-4" />, label: "Statistics", link: "/statistics" },
      { icon: <Flame className="h-4 w-4" />, label: "Mint", link: "/mint" },
      { icon: <DraftingCompass className="h-4 w-4" />, label: "Exercise", link: "/exercise" },
      { icon: <Skull className="h-4 w-4" />, label: "Position List", link: "/positionlist" },
    ]
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-800 bg-gray-950 p-4">
      <div className="flex items-center gap-2 px-2 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-white text-black">
          <Layers className="h-3 w-3" />
        </div>
        <span className="font-semibold">Derivative Vault</span>
      </div>

     
      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavItem
            key={item.link}
            icon={item.icon}
            label={item.label}
            active={pathname === item.link}
            link={item.link}
          />
        ))}
      </nav>

      <div className="mt-auto">
        <div className="rounded-md bg-gray-900 p-3">
          <div className="flex items-center justify-between">
          
      
                <Button className="text-sm font-medium w-full" variant={"default"}>{address ? address?.slice(0,5) + "..." + address?.slice(-5) : "Connect Wallet"}</Button>
         
          
        
          </div>
        </div>
      </div>
    </aside>
  )
}

function NavItem({
  icon,
  label,
  active,
  link,
  children,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  link:string
  children?: React.ReactNode
}) {
  return (
    <Link
      href={link}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        active ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-900/50 hover:text-gray-300"
      }`}
    >
      {icon}
      <span>{label}</span>
      {children}
    </Link>
  )
}

