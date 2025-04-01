// File: src/components/OptionsExerciser.js
import { Button } from "@/components/ui/button";
import React from "react";
// import OptionsTable from '../mint-page/PositionTable';
import useGetUserExercise from "@/lib/hooks/useGetUserExercise";
import { useAccount } from "wagmi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart4,
  CheckCircle,
  Clock,
  DollarSign,
  Hash,
  Hourglass,
  TimerOff,
  Wallet,
} from "lucide-react";
import { walletAddressShortn } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { exerciseOption } from "@/lib/scripts/exerciseOption";
import { TExerciseData } from "@/types/type";

const OptionsExerciser = () => {
  const { address } = useAccount();
  const { data: exercise, isLoading } = useGetUserExercise(address);

  // Function to check if option is exercisable (within 1 hour of expiry)
  const isExercisable = (expiryTimestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const oneHourBeforeExpiry = expiryTimestamp - 3600;
    return now >= oneHourBeforeExpiry && now <= expiryTimestamp;
  };

  // Function to check if option is expired
  const isExpired = (expiryTimestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    return now > expiryTimestamp;
  };

  // Function to get status text and class
  const getStatusInfo = (expiryTimestamp: number) => {
    if (isExpired(expiryTimestamp)) {
      return {
        text: "Expired",
        className: "bg-red-100 text-red-800",
      };
    } else if (isExercisable(expiryTimestamp)) {
      return {
        text: "Exercisable",
        className: "bg-green-100 text-green-800",
      };
    } else {
      return {
        text: "Pending",
        className: "bg-yellow-100 text-yellow-800",
      };
    }
  };

  // Calculate time remaining until exercisable or until expiry
  const getTimeRemaining = (expiryTimestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const oneHourBeforeExpiry = expiryTimestamp - 3600;

    if (now < oneHourBeforeExpiry) {
      // Time until exercisable
      const secondsRemaining = oneHourBeforeExpiry - now;
      return `Exercisable in ${formatTimeRemaining(secondsRemaining)}`;
    } else if (now <= expiryTimestamp) {
      // Time until expiry
      const secondsRemaining = expiryTimestamp - now;
      return `Expires in ${formatTimeRemaining(secondsRemaining)}`;
    } else {
      // Already expired
      return "Expired";
    }
  };

  // Format seconds into days, hours, minutes
  const formatTimeRemaining = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let result = "";
    if (days > 0) result += `${days}d `;
    if (hours > 0 || days > 0) result += `${hours}h `;
    result += `${minutes}m`;

    return result;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-40 rounded"></div>
      </div>
    );
  }

  if (!exercise || exercise?.length < 1) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No options available to exercise. Mint some options first.
        </p>
      </div>
    );
  }

  const handleExercise = async (execrise: TExerciseData) => {
    if (!address) {
      return
    }
    const submitExecrise = await exerciseOption({
      assetToken: execrise.collateralAsset,
      userAddress: address,
      amount: execrise.collateralAmount.toString(),
    });
  };

  return (
    <div className="overflow-x-auto">
      {/* Execrise start */}

      <div className="w-full rounded-md border border-gray-800 bg-gray-950 p-4">
        <Table>
          <TableCaption>Your Active and Expired Options</TableCaption>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-gray-900">
              <TableHead className="text-gray-400 w-16">
                <Hash className="h-4 w-4 inline mr-1" /> ID
              </TableHead>
              <TableHead className="text-gray-400">
                <BarChart4 className="h-4 w-4 inline mr-1" /> Type
              </TableHead>
              <TableHead className="text-gray-400">
                <Wallet className="h-4 w-4 inline mr-1" /> Asset
              </TableHead>
              <TableHead className="text-gray-400">
                <DollarSign className="h-4 w-4 inline mr-1" /> Amount
              </TableHead>
              <TableHead className="text-gray-400">Strike</TableHead>
              <TableHead className="text-gray-400">
                <Clock className="h-4 w-4 inline mr-1" /> Expiry
              </TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercise.map((exerciseItem, index) => {
              const statusInfo = getStatusInfo(Number(exerciseItem.expiryTime));

              return (
                <TableRow
                  key={index}
                  className="border-gray-800 hover:bg-gray-900"
                >
                  <TableCell className="font-medium text-gray-400">
                    #{index}
                  </TableCell>
                  <TableCell>
                    {exerciseItem.isBuyOption ? (
                      <span className="text-green-500 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" /> CALL
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center">
                        <ArrowDownRight className="h-4 w-4 mr-1" /> PUT
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {walletAddressShortn(exerciseItem.derivativeToken)}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    ${Number(exerciseItem.exercisePrice)}
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-300">
                      {getTimeRemaining(Number(exerciseItem.expiryTime))}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        {Number(exerciseItem.expiryTime) <
                        Math.floor(Date.now() / 1000) ? (
                          <TimerOff className="h-3 w-3 mr-1" />
                        ) : (
                          <Hourglass className="h-3 w-3 mr-1" />
                        )}
                        {getTimeRemaining(Number(exerciseItem.expiryTime))}
                      </div>
                      {getTimeRemaining(Number(exerciseItem.expiryTime))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {statusInfo.text === "Expired" && (
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1 w-fit"
                      >
                        <AlertCircle className="h-3 w-3" /> {statusInfo.text}
                      </Badge>
                    )}
                    {statusInfo.text === "Pending" && (
                      <Badge className="flex items-center gap-1 w-fit bg-amber-500">
                        <Clock className="h-3 w-3" /> {statusInfo.text}
                      </Badge>
                    )}
                    {statusInfo.text === "Exercisable" && (
                      <Badge className="flex items-center gap-1 w-fit bg-green-600">
                        <CheckCircle className="h-3 w-3" /> {statusInfo.text}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleExercise(exerciseItem)}
                      disabled={!isExercisable(Number(exerciseItem.expiryTime))}
                      variant={
                        isExercisable(Number(exerciseItem.expiryTime))
                          ? "default"
                          : "ghost"
                      }
                      className="px-3 py-1 w-24"
                      size="sm"
                    >
                      Exercise
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Exercise End */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">
          Exercise Window Information
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Options can only be exercised during the exercise window, which starts
          1 hour before expiry. If an option is profitable (i.e., the current
          price compared to the strike price results in a profit), you can
          exercise it during this window to claim your profit.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
            <p className="mt-2 text-sm text-gray-600">
              Option is not yet exercisable. The exercise window will open 1
              hour before expiry.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Exercisable
            </span>
            <p className="mt-2 text-sm text-gray-600">
              Option is within the exercise window and can be exercised if
              profitable.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Expired
            </span>
            <p className="mt-2 text-sm text-gray-600">
              Option has expired and can no longer be exercised. Original assets
              are returnable to the position owner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsExerciser;
