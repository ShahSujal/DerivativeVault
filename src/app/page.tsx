import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen px-4 w-full justify-center items-center flex flex-col"
      style={{
        backgroundImage: "url('/assets/dashboard.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" backdrop-blur-sm justify-center  items-center flex flex-col rounded-lg">
        <h1 className=" text-[9vw] text-white font-bold">Digital Vault</h1>
        <h4
          className=" text-2xl font-bold text-blue-500 backdrop-blur-3xl p-4"
          style={{
            textShadow: "15px 15px 20px rgba(0,0,0,0) ",
          }}
        >
          Exercise Your Trade To Win Rewards{" "}
        </h4>
        <Link href={"/dashboard"}>
          <button className="relative w-60 inline-flex h-12 mt-5  overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xl font-medium text-white backdrop-blur-3xl">
              Start Journey
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
