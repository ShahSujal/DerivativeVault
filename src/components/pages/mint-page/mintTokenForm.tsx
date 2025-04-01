"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown} from "lucide-react";
import { HashLoader } from "react-spinners";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GlowingEffect } from "../common/glowing-effect";
import { createMintOptions } from "@/lib/scripts/mintOptions";
import { TCurrentStatus, TPosition } from "@/types/type";
import { walletAddressShortn } from "@/lib/actions";
import { parseUnits } from "viem";
import {
  getPoolAddress,
  getSevenDaysPoolPrice,
} from "@/lib/scripts/getSevenDaysPoolPrice";
import { getPoolPriceByTokenAddress } from "@/lib/scripts/getTokenPriceByTokenAddress";
import { EReciptStatus } from "@/types/enum";
import Image from "next/image";
import { useAccount } from "wagmi";

// import { GlowEffect } from "./gloweffect"

interface OptionsMinterProps {
  positions: TPosition[];
}
const MintTokenForm: React.FC<OptionsMinterProps> = ({ positions }) => {
  const [formData, setFormData] = useState<{
    positionId: string;
    optionType: "CALL" | "PUT";
    assetIndex: string;
    strike: string;
    expiry: string;
  }>({
    positionId: "",
    optionType: "CALL",
    assetIndex: "0",
    strike: "",
    expiry: "",
  });

  const {address} = useAccount()

  const [currentStep, setCurrentStep] = useState<TCurrentStatus>({
    status: EReciptStatus.LOADING,
    description: "Please wait for a while..",
    title: "Processing Transaction",
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

  const handleSubmit = async () => {
    setCurrentStep({
      status: EReciptStatus.LOADING,
      description: "Please wait for a while..",
      title: "Processing Transaction",
    });

       if (!address) {
          return  setCurrentStep({
            title: "Transaction Failed",
            status: EReciptStatus.REVERTED,
            description:
              "Please Connect to your metamask Wallet",
          });
        }

    const pos = positions.find(
      (item) => item.positionId == Number(formData.positionId)
    );
    const assetIndex = Number(formData.assetIndex);

    if (!pos) {
      return  setCurrentStep({
        title: "Transaction Failed",
        status: EReciptStatus.REVERTED,
        description:
          "Something went wrong",
      });
    }
    const collateralAsset = assetIndex == 0 ? pos.token0 : pos.token1;
    const exercisePrice = parseUnits(
      formData.strike,
      assetIndex == 0 ? pos.token0Decimal : pos.token1Decimal
    );
    const positionId = pos.positionId
    const expiryTime = Number(formData);
    const isBuyOption = formData.optionType == "CALL" ? true : false;
    const issueAmount = 1;

    const poolAddress = await getPoolAddress({
      tokenA: pos.token0,
      tokenB: pos.token1,
      feeTier: pos.fee,
    });
    const response = await createMintOptions({
      collateralAsset,
      exercisePrice,
      expiryTimeInHours: expiryTime,
      isBuyOption,
      issueAmount,
      poolAddress,
      positionId
    });

    if (response.status == EReciptStatus.SUCCESS) {
      setCurrentStep({
        title: "Transaction Success",
        status: EReciptStatus.SUCCESS,
        description: "Transaction Completed go to exercise page",
      });
    } else {
      setCurrentStep({
        title: "Transaction Failed",
        status: EReciptStatus.REVERTED,
        description:
          "Something went wrong. Please retry later or contact support.",
      });
    }
  };
  const [selectedPosition, setSelectedPosition] = useState<TPosition>();
  useEffect(() => {
    const selectedPosition = positions.find(
      (p) => p.positionId.toString() === formData.positionId
    );
    setSelectedPosition(selectedPosition);
  }, [formData.positionId, positions]);

  return (
    <Card className="w-full z-30 max-w-[550px] bg-[#11111660] border-[#2a2a36] backdrop-blur-lg rounded-3xl ">
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <CardContent className="">
        <h1 className="text-3xl font-medium text-gray-600 mb-4">
          Mint Options
        </h1>

        {/* Main Transfer Card */}
        <Card className="bg-[#1a1a2378] border-[#2a2a36] backdrop-blur-sm rounded-2xl mb-2">
          <CardContent className="p-6">
            {/* From Section */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Position</span>
                <span className="text-gray-400">
                  {positions.length}{" "}
                  <span className="text-gray-500">Total Position </span>
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
                    <SelectValue placeholder="Select position " />
                  </SelectTrigger>
                  <SelectContent className=" relative">
                    {positions.map((position) => (
                      <SelectItem
                        className=" relative flex flex-row "
                        key={position.positionId}
                        value={position.positionId.toString()}
                      >
                        <div className="flex flex-row justify-between items-center">
                          <div className="w-3 h-3  rounded-full bg-gradient-to-tr from-blue-500 via-pink-400 to-purple-500 mr-2" />
                          <h1>
                            {position.token0Symbol}/{position.token1Symbol}
                          </h1>
                        </div>
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
            {selectedPosition?.token0Symbol &&
              selectedPosition?.token1Symbol && (
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Select Asset</span>
                    <span className="text-gray-400">Expiry Time(hrs)</span>
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
                            {selectedPosition?.token0Symbol}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="1"
                            id="option-two"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 bg-[#1a1a23] border-[#2a2a36]"
                          />
                          <Label htmlFor="option-two" className="text-white">
                            {selectedPosition?.token1Symbol}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Input
                      type="number"
                      placeholder="1 hr"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          expiry: e.currentTarget.value,
                        });
                      }}
                      className=" w-36"
                    />
                  </div>
                </div>
              )}
          </CardContent>
        </Card>

        {/* Send Button */}
        <div className="relative w-full mb-4 group">
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="relative w-full inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-5"
                onClick={() => handleSubmit()}
              >
                <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#0000000d_50%,#ffffff_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#1a1a23] px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Mint Option
                </span>
              </button>
            </DialogTrigger>
            <DialogContent
              className={`sm:max-w-[425px] ${
                currentStep.status == EReciptStatus.LOADING
                  ? "[&>button]:hidden"
                  : ""
              }`}
              onInteractOutside={(e) => {
                e.preventDefault();
              }}
            >
              <DialogHeader>
                <div className=" w-full h-[450px] flex justify-center flex-col items-center">
                  <DialogTitle>{currentStep.title}</DialogTitle>

                  <div className=" h-[150px] w-[150px]  mb-10 flex justify-center items-center">
                    {currentStep.status == EReciptStatus.LOADING ? (
                      <HashLoader color="#000" size={150} />
                    ) : currentStep.status == EReciptStatus.REVERTED ? (
                      <Image
                        src={"/assets/error.webp"}
                        width={400}
                        height={400}
                        alt=""
                        className=" w-[150px] h-[150px] object-contain"
                      />
                    ) : (
                      <Image
                        src={"/assets/successfully.webp"}
                        width={400}
                        height={400}
                        alt=""
                        className=" w-[150px] h-[150px] object-contain"
                      />
                    )}
                  </div>
                  <h1 className=" text-center text-xl ">{currentStep.title}</h1>
                  <DialogDescription className="text-center">
                    {currentStep.description}
                  </DialogDescription>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default MintTokenForm;
