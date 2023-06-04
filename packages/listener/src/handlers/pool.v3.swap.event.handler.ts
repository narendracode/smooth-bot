// import { abi as POOL_ABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';
import Web3 from 'web3';
import { SwapEventParam, SwapEventResponse } from '../types';

class V3PoolSwapEventHandler {
    private web3: Web3;
    constructor() {
        this.web3 = new Web3(process.env.NETWORK_URL as string);
    }
    handlerEvent = async (event: any, _txn: any): Promise<SwapEventResponse> => {
        const swapEventIndex = 9;
        try {
            const sender = await this.decodeParameter('address', event.topics[1]);
            const recipient = await this.decodeParameter('address', event.topics[2]);

            // const inputs = POOL_ABI[swapEventIndex];
            /*
                inputs are taken from above ABI
            */
            const inputs = [
                {
                    "indexed": false,
                    "internalType": "int256",
                    "name": "amount0",
                    "type": "int256"
                },
                {
                    "indexed": false,
                    "internalType": "int256",
                    "name": "amount1",
                    "type": "int256"
                },
                {
                    "indexed": false,
                    "internalType": "uint160",
                    "name": "sqrtPriceX96",
                    "type": "uint160"
                },
                {
                    "indexed": false,
                    "internalType": "uint128",
                    "name": "liquidity",
                    "type": "uint128"
                },
                {
                    "indexed": false,
                    "internalType": "int24",
                    "name": "tick",
                    "type": "int24"
                }
            ];

            const decodedResult = await this.decodeLog(inputs, event.data, event.topics);
            const amount0 = decodedResult.amount0;
            const amount1 = decodedResult.amount1;
            const sqrtPriceX96 = decodedResult.sqrtPriceX96;
            const liquidity = decodedResult.liquidity;
            const tick = decodedResult.tick;

            const swapEventParam: SwapEventParam = {
                sender: String(sender),
                recipient: String(recipient),
                amount0: amount0,
                amount1: amount1,
                sqrtPriceX96: sqrtPriceX96,
                liquidity: liquidity,
                tick: tick
            }
            return {
                data: swapEventParam
            }
        } catch (e) {
            console.log(`exception while decoding : ${e}`)
            return {
                error: 'Error while parsing event'
            }
        }
    }

    // for indexed parameter in event
    decodeLog = async (abi: any, data: string, topics: string[]) => {
        try {
            return this.web3.eth.abi.decodeLog(abi, data, topics);
        } catch (err) {
            // console.error(`Error encountered in decodeParameter(type,topic) : ${error}`)
            throw new Error('Invalid inputs or hexString or topics passed');
        }
    }

    // for non-indexed parameter in event
    decodeParameter = async (type: string, topic: string) => {
        try {
            return await this.web3.eth.abi.decodeParameter(type, topic);
        } catch (err) {
            throw new Error('Invalid type or topic');
        }
    }

    isSwapEventTopic = async (topic: string) => {
        //Swap(sender,recipient,amount0,amount1,sqrtPriceX96,liquidity,tick)
        return topic === this.web3.utils.keccak256('Swap(address,address,int256,int256,uint160,uint128,int24)')
    }

    getTransaction = async (txnHash: string): Promise<any | null | never> => {
        try {
            return await (await this.web3).eth.getTransaction(txnHash);
        } catch (error) {
            // console.error(`Error encountered in getTransaction(txnHash) : ${error} `)
            throw new Error('Invalid transaction hash');
        }
    };

    getTransactionReceipt = async (
        txnHash: string
    ): Promise<any | null | never> => {
        try {
            return await (await this.web3).eth.getTransactionReceipt(txnHash);
        } catch (error) {
            // console.error(`Error encountered in getTransactionReceipt(txnHash) : ${error} `)
            throw new Error('Invalid transaction hash');
        }
    };

}
export const swapEventHandler = new V3PoolSwapEventHandler();
