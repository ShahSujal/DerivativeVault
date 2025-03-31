
// File: src/components/PositionsList.js
import React from 'react';

interface Position {
  tokenId: string;
  token0: { symbol: string };
  token1: { symbol: string };
  fee: number;
  liquidity: string;
  tickLower: number;
  tickUpper: number;
}

interface PositionsListProps {
  positions: Position[] | null;
  isLoading: boolean;
}

const PositionsList: React.FC<PositionsListProps> = ({ positions, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!positions || positions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No Uniswap V3 positions found. Create a position in Uniswap first.</p>
        <a 
          href="https://app.uniswap.org/#/pool" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Create Position on Uniswap
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pair
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fee Tier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Liquidity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price Range
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {positions.map((position) => (
            <tr key={position.tokenId} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{position.tokenId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {position.token0.symbol}/{position.token1.symbol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {position.fee / 10000}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {parseInt(position.liquidity).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {position.tickLower} - {position.tickUpper}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsList;