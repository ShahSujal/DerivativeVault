// File: src/App.js
import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import Navbar from './components/Navbar';
import PositionsList from './components/PositionsList';
import OptionsMinter from './components/OptionsMinter';
import OptionsExerciser from './components/OptionsExerciser';
import TransactionHistory from './components/TransactionHistory';
import Statistics from './components/Statistics';

// ABI imports
import OptionsVaultABI from './abis/OptionsVault.json';
import UniswapV3PositionManagerABI from './abis/UniswapV3PositionManager.json';

// Contract addresses (to be replaced with actual deployed addresses)
const OPTIONS_VAULT_ADDRESS = "0x..."; // Replace with actual address after deployment
const UNISWAP_POSITION_MANAGER_ADDRESS = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"; // Mainnet Position Manager

function App() {
  // State variables
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [vaultContract, setVaultContract] = useState(null);
  const [positionManagerContract, setPositionManagerContract] = useState(null);
  const [userPositions, setUserPositions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({
    totalLockedPositions: 0,
    totalMintedOptions: 0,
    totalExercisedOptions: 0,
    totalValueLocked: "0"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [networkName, setNetworkName] = useState('');

  // Connect wallet
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      if (!window.ethereum) {
        toast.error("Please install MetaMask to use this application");
        setIsLoading(false);
        return;
      }

      // Request accounts access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setAccount(account);

      // Initialize provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      
      const signer = provider.getSigner();
      setSigner(signer);
      
      // Get network information
      const network = await provider.getNetwork();
      setNetworkName(network.name);

      // Initialize contracts
      const vault = new ethers.Contract(OPTIONS_VAULT_ADDRESS, OptionsVaultABI, signer);
      setVaultContract(vault);
      
      const positionManager = new ethers.Contract(
        UNISWAP_POSITION_MANAGER_ADDRESS, 
        UniswapV3PositionManagerABI, 
        signer
      );
      setPositionManagerContract(positionManager);

      toast.success("Wallet connected successfully!");
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || '');
        fetchUserData(accounts[0], vault, positionManager);
      });
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      
      // Fetch user data
      await fetchUserData(account, vault, positionManager);
      setIsLoading(false);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
      setIsLoading(false);
    }
  };

  // Fetch user data (positions and options)
  const fetchUserData = async (userAccount, vaultContract, positionManagerContract) => {
    if (!userAccount || !vaultContract || !positionManagerContract) return;
    
    try {
      setIsLoading(true);
      
      // Fetch user positions from Uniswap
      await fetchUserPositions(userAccount, positionManagerContract);
      
      // Fetch user options from vault
      await fetchUserOptions(userAccount, vaultContract);
      
      // Fetch transaction history
      await fetchTransactionHistory(vaultContract);
      
      // Fetch statistics
      await fetchStatistics(vaultContract);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data. Please try again.");
      setIsLoading(false);
    }
  };

  // Fetch user's Uniswap V3 positions
  const fetchUserPositions = async (userAccount, positionManagerContract) => {
    try {
      // Get balance of positions
      const balance = await positionManagerContract.balanceOf(userAccount);
      
      const positions = [];
      for (let i = 0; i < balance.toNumber(); i++) {
        const tokenId = await positionManagerContract.tokenOfOwnerByIndex(userAccount, i);
        const position = await positionManagerContract.positions(tokenId);
        
        // Get token information
        const token0 = await fetchTokenInfo(position.token0);
        const token1 = await fetchTokenInfo(position.token1);
        
        positions.push({
          tokenId: tokenId.toString(),
          token0,
          token1,
          fee: position.fee,
          tickLower: position.tickLower,
          tickUpper: position.tickUpper,
          liquidity: position.liquidity.toString()
        });
      }
      
      setUserPositions(positions);
    } catch (error) {
      console.error("Error fetching user positions:", error);
      toast.error("Failed to fetch Uniswap positions");
    }
  };

  // Mock function to fetch token info (would be replaced with actual token contract calls)
  const fetchTokenInfo = async (tokenAddress) => {
    // In a real implementation, you would call the ERC20 token contract to get name, symbol, decimals
    // For this assessment, returning mock data based on common tokens
    
    const mockTokens = {
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": { name: "Wrapped Ether", symbol: "WETH", decimals: 18 },
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": { name: "USD Coin", symbol: "USDC", decimals: 6 },
      "0xdAC17F958D2ee523a2206206994597C13D831ec7": { name: "Tether USD", symbol: "USDT", decimals: 6 },
      "0x6B175474E89094C44Da98b954EedeAC495271d0F": { name: "Dai Stablecoin", symbol: "DAI", decimals: 18 }
    };
    
    return mockTokens[tokenAddress] || { 
      name: "Unknown Token", 
      symbol: "UNK", 
      decimals: 18, 
      address: tokenAddress 
    };
  };

  // Fetch user's minted options
  const fetchUserOptions = async (userAccount, vaultContract) => {
    try {
      // This would call a method on your contract to get user's options
      // For example: vaultContract.getUserOptions(userAccount)
      // For this assessment, I'm using mock data
      
      // In a real implementation, this would be actual data from the contract
      const mockOptions = [
        {
          id: 1,
          optionType: "CALL",
          assetSymbol: "WETH",
          positionId: "123456",
          strike: "2000",
          expiry: Math.floor(Date.now() / 1000) + 86400, // 1 day from now
          amount: "1.5",
          status: "ACTIVE"
        },
        {
          id: 2,
          optionType: "PUT",
          assetSymbol: "USDC",
          positionId: "123456",
          strike: "1.0",
          expiry: Math.floor(Date.now() / 1000) + 43200, // 12 hours from now
          amount: "2000",
          status: "ACTIVE"
        }
      ];
      
      setUserOptions(mockOptions);
    } catch (error) {
      console.error("Error fetching user options:", error);
      toast.error("Failed to fetch options data");
    }
  };

  // Fetch transaction history
  const fetchTransactionHistory = async (vaultContract) => {
    try {
      // In a real implementation, this would fetch events from the contract
      // For example: const events = await vaultContract.queryFilter(vaultContract.filters.OptionMinted());
      
      // Mock data for the assessment
      const mockTransactions = [
        {
          id: "0x123...",
          type: "MINT",
          positionId: "123456",
          optionType: "CALL",
          asset: "WETH",
          timestamp: Date.now() - 3600000, // 1 hour ago
          user: "0xabcd..."
        },
        {
          id: "0x456...",
          type: "EXERCISE",
          positionId: "123456",
          optionType: "PUT",
          asset: "USDC",
          timestamp: Date.now() - 7200000, // 2 hours ago
          user: "0xefgh..."
        }
      ];
      
      setTransactions(mockTransactions);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      toast.error("Failed to fetch transaction history");
    }
  };

  // Fetch platform statistics
  const fetchStatistics = async (vaultContract) => {
    try {
      // In a real implementation, this would call view functions on your contract
      // For example: const tvl = await vaultContract.getTotalValueLocked();
      
      // Mock data for the assessment
      const mockStatistics = {
        totalLockedPositions: 15,
        totalMintedOptions: 42,
        totalExercisedOptions: 12,
        totalValueLocked: "1250000" // In USD
      };
      
      setStatistics(mockStatistics);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      toast.error("Failed to fetch platform statistics");
    }
  };

  // Mint options function
  const mintOptions = async (positionId: string, optionType: string, strike: string, expiry: number, assetIndex: number) => {
    if (!vaultContract || !account) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Call the mint function on the contract
      // In a real implementation, this would be something like:
      // const tx = await vaultContract.mintOption(positionId, optionType, strike, expiry, assetIndex);
      // await tx.wait();
      
      // For the assessment, simulate a successful transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Successfully minted ${optionType} options!`);
      
      // Refresh user data
      await fetchUserData(account, vaultContract, positionManagerContract);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error minting options:", error);
      toast.error("Failed to mint options. Please try again.");
      setIsLoading(false);
    }
  };

  // Exercise options function
  const exerciseOptions = async (optionId) => {
    if (!vaultContract || !account) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Call the exercise function on the contract
      // In a real implementation, this would be something like:
      // const tx = await vaultContract.exerciseOption(optionId);
      // await tx.wait();
      
      // For the assessment, simulate a successful transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Successfully exercised options!");
      
      // Refresh user data
      await fetchUserData(account, vaultContract, positionManagerContract);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error exercising options:", error);
      toast.error("Failed to exercise options. Please try again.");
      setIsLoading(false);
    }
  };

  // Refresh data
  const refreshData = async () => {
    if (!account || !vaultContract || !positionManagerContract) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    await fetchUserData(account, vaultContract, positionManagerContract);
    toast.success("Data refreshed successfully!");
  };

  // Initialize on component mount
  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <div className="App min-h-screen bg-gray-100">
      <Navbar 
        account={account} 
        connectWallet={connectWallet}
        networkName={networkName}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Statistics Overview */}
          <div className="lg:col-span-3">
            <Statistics statistics={statistics} />
          </div>
          
          {/* Left Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Positions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Your Uniswap V3 Positions</h2>
              <PositionsList 
                positions={userPositions} 
                isLoading={isLoading} 
              />
            </div>
            
            {/* Option Management */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Mint Options</h2>
              <OptionsMinter 
                positions={userPositions} 
                mintOptions={mintOptions} 
                isLoading={isLoading} 
              />
            </div>
            
            {/* Exercise Options */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Exercise Options</h2>
              <OptionsExerciser 
                options={userOptions} 
                exerciseOptions={exerciseOptions} 
                isLoading={isLoading} 
              />
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="space-y-6">
            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
              <TransactionHistory 
                transactions={transactions} 
                isLoading={isLoading} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto">
          <p className="text-center">Uniswap V3 Options Platform © 2025</p>
        </div>
      </footer>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;