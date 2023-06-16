import dotenv from 'dotenv';
dotenv.config();

import { ethers } from "hardhat";

import { abi as ROUTER_ABI_V2 } from '@uniswap/v2-periphery/build/UniswapV2Router02.json';

import { abi as POOL_ABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';

import { abi as ERC20_ABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json';

const uniswapV3FactoryAddress = process.env.UNISWAP_V3_FACTORY_ADDRESS as string;
const uniswapPoolAddress = process.env.UNISWAP_POOL_ADDRESS as string;
const swapRouterAddress = process.env.SWAP_ROUTER_ADDRESS as string;

const georliProvider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL_GOERLI as string);

const unfTokenAddress = process.env.UNF_ADDRESS as string;
const usdcTokenAddress = process.env.USDC_ADDRESS as string;

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);
const connectedWallet = wallet.connect(georliProvider);

const adminAddress = process.env.PUBLIC_KEY as string;

async function main() {
    const uniswapPoolContract = new ethers.Contract(uniswapPoolAddress, POOL_ABI, georliProvider);

    const unfTokenContract = new ethers.Contract(unfTokenAddress, ERC20_ABI, georliProvider);
    const usdcTokenContract = new ethers.Contract(usdcTokenAddress, ERC20_ABI, georliProvider);

    const approveUNFTx = await unfTokenContract.connect(connectedWallet).approve(swapRouterAddress, 1000);
    const approveUNFTxReceipt = await approveUNFTx.wait();
    console.log('approveUNFTxReceipt', approveUNFTxReceipt);

    const approveUSDCTx = await usdcTokenContract.connect(connectedWallet).approve(swapRouterAddress, 1000);
    const approveUSDCTxReceipt = await approveUSDCTx.wait();
    console.log('approveUSDCTxReceipt', approveUSDCTxReceipt);

    const factoryAddress = await uniswapPoolContract.functions.factory()
    console.log('Factory Address', factoryAddress);

    const fee = await uniswapPoolContract.functions.fee()
    console.log('fee', fee);

    const liquidity = await uniswapPoolContract.functions.liquidity()
    console.log('liquidity', liquidity);

    const swapRouterContract = new ethers.Contract(swapRouterAddress, ROUTER_ABI_V2, georliProvider);

    const currentTimestamp = new Date();
    const currentTimestampPlus5Mins = new Date((currentTimestamp.getTime() + 5 * 60000))
    // Add liquidity

    const tx = await swapRouterContract.connect(connectedWallet).addLiquidity(
        unfTokenAddress,
        usdcTokenAddress,
        100,
        100,
        100,
        100,
        adminAddress,
        currentTimestampPlus5Mins.getTime()
    );

    const receipt = await tx.wait();
    console.log('Receipt', receipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});