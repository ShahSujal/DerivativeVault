import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  DollarSign, 
  Wallet, 
  BarChart4, 
  Hash, 
  AlertCircle, 
  CheckCircle, 
  TimerOff, 
  Hourglass 
} from "lucide-react";

const OptionsTable = () => {
  // Mock data for the options
  const options = [
    { id: '1001', optionType: 'CALL', assetSymbol: 'BTC', amount: 0.5, strike: 72500, expiry: new Date(Date.now() + 3600000 * 24).getTime(), status: 'active' },
    { id: '1002', optionType: 'PUT', assetSymbol: 'ETH', amount: 5, strike: 3800, expiry: new Date(Date.now() + 3600000 * 2).getTime(), status: 'active' },
    { id: '1003', optionType: 'CALL', assetSymbol: 'SOL', amount: 20, strike: 155, expiry: new Date(Date.now() - 3600000 * 5).getTime(), status: 'expired' },
    { id: '1004', optionType: 'PUT', assetSymbol: 'BNB', amount: 3, strike: 610, expiry: new Date(Date.now() + 3600000 * 48).getTime(), status: 'active' },
    { id: '1005', optionType: 'CALL', assetSymbol: 'ADA', amount: 500, strike: 0.58, expiry: new Date(Date.now() + 3600000 * 10).getTime(), status: 'active' },
  ];

  // Helper function to format expiry time
  const formatExpiryTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Helper function to get time remaining
  const getTimeRemaining = (timestamp: number) => {
    const now = Date.now();
    const diff = timestamp - now;
    
    if (diff < 0) return "Expired";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h remaining`;
    }
    
    return `${hours}h ${minutes}m remaining`;
  };

  // Helper function to check if option is exercisable
  const isExercisable = (timestamp: number) => {
    return timestamp > Date.now();
  };

  // Helper function to get status information
  const getStatusInfo = (timestamp: number) => {
    const now = Date.now();
    
    if (timestamp < now) {
      return { text: "Expired", variant: "destructive" };
    }
    
    const diff = timestamp - now;
    const hoursRemaining = diff / (1000 * 60 * 60);
    
    if (hoursRemaining < 6) {
      return { text: "Near Expiry", variant: "warning" };
    }
    
    return { text: "Active", variant: "success" };
  };

  // Handler for the exercise button
  const handleExercise = (id:number) => {
    console.log(`Exercise option #${id}`);
  };

  return (
    <div className="w-full rounded-md border border-gray-800 bg-gray-950 p-4">
      <Table>
        <TableCaption>Your Active and Expired Options</TableCaption>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-gray-900">
            <TableHead className="text-gray-400 w-16"><Hash className="h-4 w-4 inline mr-1" /> ID</TableHead>
            <TableHead className="text-gray-400"><BarChart4 className="h-4 w-4 inline mr-1" /> Type</TableHead>
            <TableHead className="text-gray-400"><Wallet className="h-4 w-4 inline mr-1" /> Asset</TableHead>
            <TableHead className="text-gray-400"><DollarSign className="h-4 w-4 inline mr-1" /> Amount</TableHead>
            <TableHead className="text-gray-400">Strike</TableHead>
            <TableHead className="text-gray-400"><Clock className="h-4 w-4 inline mr-1" /> Expiry</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {options.map((option) => {
            const statusInfo = getStatusInfo(option.expiry);
            
            return (
              <TableRow key={option.id} className="border-gray-800 hover:bg-gray-900">
                <TableCell className="font-medium text-gray-400">
                  #{option.id}
                </TableCell>
                <TableCell>
                  {option.optionType === 'CALL' ? (
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> CALL
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDownRight className="h-4 w-4 mr-1" /> PUT
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-gray-300">{option.assetSymbol}</TableCell>
                <TableCell className="text-gray-300">{option.amount}</TableCell>
                <TableCell className="text-gray-300">${option.strike}</TableCell>
                <TableCell>
                  <div className="text-gray-300">{formatExpiryTime(option.expiry)}</div>
                  <div className="text-xs text-gray-500 flex items-center mt-1">
                    {option.expiry < Date.now() ? <TimerOff className="h-3 w-3 mr-1" /> : <Hourglass className="h-3 w-3 mr-1" />}
                    {getTimeRemaining(option.expiry)}
                  </div>
                </TableCell>
                <TableCell>
                  {statusInfo.variant === "destructive" && (
                    <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                      <AlertCircle className="h-3 w-3" /> {statusInfo.text}
                    </Badge>
                  )}
                  {statusInfo.variant === "warning" && (
                    <Badge variant="warning" className="flex items-center gap-1 w-fit bg-amber-500">
                      <Clock className="h-3 w-3" /> {statusInfo.text}
                    </Badge>
                  )}
                  {statusInfo.variant === "success" && (
                    <Badge variant="success" className="flex items-center gap-1 w-fit bg-green-600">
                      <CheckCircle className="h-3 w-3" /> {statusInfo.text}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleExercise(Number(option.id))}
                    disabled={!isExercisable(option.expiry)}
                    variant={isExercisable(option.expiry) ? "default" : "ghost"}
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
  );
};

export default OptionsTable;