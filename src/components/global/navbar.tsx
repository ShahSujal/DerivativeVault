"use client";
import { walletAddressShortn } from "@/lib/actions";
import { useAppKit } from "@reown/appkit/react";
import React from "react";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";

type Props = {};

const Navbar = (props: Props) => {
  const { open, close } = useAppKit();
  const { address, chain } = useAccount();
  return (
    <div className="flex justify-end w-full h-16 items-center   ">
      {chain?.name ? (
        <Button className=" rounded-2xl mx-3">{chain?.name}</Button>
      ) : (
        <></>
      )}
      <button
        className="relative   inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mr-3"
        onClick={() => open()}
      >
        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#172554_0%,#1d7bff_50%,#ffffff_100%)]" />
        <span className="inline-flex h-full  w-full cursor-pointer items-center justify-center rounded-full bg-black px-3 py-1  font-hatton font-medium text-xs  text-white backdrop-blur-3xl">
          {address ? walletAddressShortn(address) : "Connect Wallet"}
        </span>
      </button>
    </div>
  );
};

export default Navbar;
