import { swapEventHandler } from './handlers/pool.v3.swap.event.handler';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { abi as POOL_ABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';
import { abi as ERC20_ABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json';
const web3 = new Web3(process.env.NETWORK_URL_WSS as string);
const poolContractAddress = process.env.POOL_ADDRESS as string;
const token0Address = process.env.TOKEN0_ADDRESS as string;
const token1Address = process.env.TOKEN1_ADDRESS as string;


export const setupListener = async () => {
    console.log(`listener setup...`)

    const poolContract = new web3.eth.Contract(POOL_ABI as AbiItem[], poolContractAddress);

    poolContract.events.Swap({})
        .on('data', async (event: any) => {
            await swapEventHandler.handlerEvent(event);
        })
        .on('changed', (changed: any) => console.log(changed))
        .on('error', (err: any) => { throw new Error(`Error encountered ${err}`) })
        .on('connected', (str: any) => console.log(str))
    /*
        const token0 = await poolContract.methods.token0.call().call();
        console.log(`token0 : ${token0}`)
    
        const token1 = await poolContract.methods.token1.call().call();
        console.log(`token1 : ${token1}`)
    */

    const token0Contract = new web3.eth.Contract(ERC20_ABI as AbiItem[], token0Address);
    const token1Contract = new web3.eth.Contract(ERC20_ABI as AbiItem[], token1Address);

    const token0ReserveAmt = await token0Contract.methods.balanceOf(poolContractAddress).call();
    console.log(`token0ReserveAmt : ${JSON.stringify(token0ReserveAmt)}`);

    const token1ReserveAmt = await token1Contract.methods.balanceOf(poolContractAddress).call();
    console.log(`token1ReserveAmt : ${JSON.stringify(token1ReserveAmt)}`);
}