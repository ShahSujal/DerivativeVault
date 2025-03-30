// File: src/components/OptionsExerciser.js
import { Button } from '@/components/ui/button';
import React from 'react';
import OptionsTable from './PositionTable';

interface OptionsExerciserProps {
  options: Array<{
    id: number;
    optionType: 'CALL' | 'PUT';
    assetSymbol: string;
    amount: number;
    strike: number;
    expiry: number;
  }>;
  exerciseOptions: (optionId: number) => void;
  isLoading: boolean;
}

const OptionsExerciser: React.FC<OptionsExerciserProps> = ({ options, exerciseOptions, isLoading }) => {
  // Function to format timestamp
  const formatExpiryTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };
  
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
        className: "bg-red-100 text-red-800"
      };
    } else if (isExercisable(expiryTimestamp)) {
      return {
        text: "Exercisable",
        className: "bg-green-100 text-green-800"
      };
    } else {
      return {
        text: "Pending",
        className: "bg-yellow-100 text-yellow-800"
      };
    }
  };
  
  // Function to handle exercise button click
  const handleExercise = (optionId: number) => {
    exerciseOptions(optionId);
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

  if (!options || options.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No options available to exercise. Mint some options first.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* <table className="min-w-full divide-y ">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Strike
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {options.map((option) => {
            const statusInfo = getStatusInfo(option.expiry);
            
            return (
              <tr key={option.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                  #{option.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={option.optionType === 'CALL' ? 'text-green-600' : 'text-red-600'}>
                    {option.optionType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {option.assetSymbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {option.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${option.strike}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{formatExpiryTime(option.expiry)}</div>
                  <div className="text-xs text-gray-400">{getTimeRemaining(option.expiry)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.className}`}>
                    {statusInfo.text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    onClick={() => handleExercise(option.id)}
                    disabled={!isExercisable(option.expiry)}
                    className={`px-3 py-1 rounded-lg text-white font-medium ${
                      isExercisable(option.expiry)
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : ' cursor-not-allowed'
                    }`}
                  >
                    Exercise
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
       */}

       <OptionsTable/>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Exercise Window Information</h3>
        <p className="mt-2 text-sm text-gray-600">
          Options can only be exercised during the exercise window, which starts 1 hour before expiry.
          If an option is profitable (i.e., the current price compared to the strike price results in a profit),
          you can exercise it during this window to claim your profit.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
            <p className="mt-2 text-sm text-gray-600">
              Option is not yet exercisable. The exercise window will open 1 hour before expiry.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Exercisable
            </span>
            <p className="mt-2 text-sm text-gray-600">
              Option is within the exercise window and can be exercised if profitable.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Expired
            </span>
            <p className="mt-2 text-sm text-gray-600">
              Option has expired and can no longer be exercised. Original assets are returnable to the position owner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsExerciser;