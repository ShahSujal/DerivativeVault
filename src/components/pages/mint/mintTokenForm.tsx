"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// import { GlowEffect } from "./gloweffect"
interface Position {
  tokenId: string;
  token0: { symbol: string };
  token1: { symbol: string };
}

interface OptionsMinterProps {
  positions: Position[];
  mintOptions: (
    positionId: string,
    optionType: "CALL" | "PUT",
    strike: number,
    expiry: number,
    assetIndex: number
  ) => Promise<void>;
  isLoading: boolean;
}
const MintTokenForm: React.FC<OptionsMinterProps> = ({
  positions,
  mintOptions,
  isLoading,
}) => {
  const [amount, setAmount] = useState("1.409928");
  const [formData, setFormData] = useState<{
    positionId: string;
    optionType: "CALL" | "PUT";
    assetIndex: string; // '0' for token0, '1' for token1
    strike: string;
    expiry: string;
  }>({
    positionId: "",
    optionType: "CALL",
    assetIndex: "0",
    strike: "",
    expiry: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert expiry to timestamp if needed
    const expiryTimestamp = new Date(formData.expiry).getTime() / 1000;

    mintOptions(
      formData.positionId,
      formData.optionType,
      parseFloat(formData.strike),
      expiryTimestamp,
      parseInt(formData.assetIndex)
    );
  };

  // Find selected position
  const selectedPosition = positions.find(
    (p) => p.tokenId === formData.positionId
  );

  return (
    <Card className="w-full z-30 max-w-[550px] bg-[#11111660] border-[#2a2a36] backdrop-blur-lg rounded-3xl overflow-hidden">
      <CardContent className="">
        <h1 className="text-3xl font-medium text-gray-600 mb-4">Mint Options</h1>

        {/* Main Transfer Card */}
        <Card className="bg-[#1a1a2378] border-[#2a2a36] backdrop-blur-sm rounded-2xl mb-2">
          <CardContent className="p-6">
            {/* From Section */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Position</span>
                <span className="text-gray-400">
                  {positions.length}{" "}
                  <span className="text-gray-500">Total Position</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <Select
                  name="positionId"
                  value={formData.positionId}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "positionId", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem
                        key={position.tokenId}
                        value={position.tokenId}
                      >
                        #{position.tokenId} - {position.token0.symbol}/
                        {position.token1.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Swap Direction Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <Button
                variant="outline"
                size="icon"
                className="bg-[#1a1a23] border-[#2a2a36] rounded-full h-8 w-8"
              >
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
              </Button>
            </div>

            {/* To Section */}
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Option Type</span>
                <span className="text-gray-400">Strike Amount</span>
              </div>

              <div className="flex justify-between items-center">
                <Select
                  name="optionType"
                  value={formData.optionType}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "optionType", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select OptionType" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"CALL"}>CALL</SelectItem>
                    <SelectItem value={"PUT"}>PUT</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="0.00"
                  className="w-36 "
                  type="number"
                  name="strike"
                  value={formData.strike}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* To Section */}
            {selectedPosition?.token0.symbol && selectedPosition?.token1.symbol &&
              <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Select Asset</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <RadioGroup
                    value={formData.assetIndex} // Bind the value to formData.assetIndex
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        assetIndex: value,
                      })
                    }
                    className=" flex flex-row"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="0"
                        id="option-one"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 bg-[#1a1a23] border-[#2a2a36]"
                      />
                      <Label htmlFor="option-one" className="text-white">
                        {selectedPosition?.token0.symbol}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="1"
                        id="option-two"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 bg-[#1a1a23] border-[#2a2a36]"
                      />
                      <Label htmlFor="option-two" className="text-white">
                        {selectedPosition?.token1.symbol}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            }
          </CardContent>
        </Card>

        {/* Send Button */}
        <div className="relative w-full mb-4 group">
        
          {/* <Button
            className="relative w-full bg-[#3b3b4f] hover:bg-[#4a4a5f] text-white rounded-xl h-14 text-lg font-medium z-10"
            
          ></Button> */}
          <button className="relative w-full inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-5"
          onClick={() => console.log("Send transaction")}
          >
            <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#0000000d_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#1a1a23] px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
             Send Transaction
            </span>
          </button>
        </div>

        {/* Transaction Details */}
      </CardContent>
    </Card>
  );
};

export default MintTokenForm;

/*
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-700">
    
          
          {selectedPosition && (
            <>
              <div>
               
              
             
             
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="datetime-local"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Processing...' : 'Mint Options'}
                </button>
              </div>
            </>
          )}
        </form>

*/
