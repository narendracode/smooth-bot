import { swapEventHandler } from './handlers/pool.v3.swap.event.handler';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { abi as POOL_ABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';

const web3 = new Web3(process.env.NETWORK_URL_WSS as string);
const poolContractAddress = process.env.POOL_ADDRESS as string;

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

}