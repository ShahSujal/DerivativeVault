
// File: src/components/OptionsMinter.js
import React, { useState } from 'react';


const OptionsMinter: React.FC<OptionsMinterProps> = ({ positions, mintOptions, isLoading }) => {

  return (
    <div className='bg-slate-500'>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-40 bg-gray-700 rounded"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-700">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <select
              name="positionId"
              value={formData.positionId}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select a position</option>
              {positions.map((position) => (
                <option key={position.tokenId} value={position.tokenId}>
                  #{position.tokenId} - {position.token0.symbol}/{position.token1.symbol}
                </option>
              ))}
            </select>
          </div>
          
          {selectedPosition && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="optionType"
                      value="CALL"
                      checked={formData.optionType === 'CALL'}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2">CALL</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="optionType"
                      value="PUT"
                      checked={formData.optionType === 'PUT'}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2">PUT</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="assetIndex"
                      value={'0'}
                      checked={formData.assetIndex === '0'}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2">{selectedPosition.token0.symbol}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="assetIndex"
                      value={'1'}
                      checked={formData.assetIndex === '1'}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2">{selectedPosition.token1.symbol}</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Strike Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="strike"
                    value={formData.strike}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      USD
                    </span>
                  </div>
                </div>
              </div>
              
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
      )}
    </div>
  );
};

export default OptionsMinter;
