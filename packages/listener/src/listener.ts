import { swapEventHandler } from './handlers/pool.v3.swap.event.handler';
import { SwapEventResponse } from './types';

export const setupListener = async () => {
    console.log(`listener setup...`)
    // await swapEventHandler.handlerEvent({}, 'txnhash')

    const txnHash = '0xdb2be7e93c73d18d831f1dbf7ee7f383f3064a6830edf5c4391fb765b697d3ea'
    // const txnHash = '0xa6e09bc363bc7ffee3bdbae2fffaa97d43d7b4f8bf0bcf393877b72969e2736a'
    const tx = await swapEventHandler.getTransaction(txnHash)
    // console.log(`tx : ${JSON.stringify(tx, null, 4)}`)

    const txReceipt = await swapEventHandler.getTransactionReceipt(txnHash)
    // console.log(`tx : ${JSON.stringify(txReceipt, null, 4)}`)
    const logs = txReceipt.logs;
    for (let i = 0; i < logs.length; i++) {
        const log = logs[i];
        const eventTopic = (log.topics && log.topics.length) ? log.topics[0] : '';
        // console.log(`checking event topic : ${eventTopic}`)
        if (eventTopic.length) {
            const isEvent = await swapEventHandler.isSwapEventTopic(eventTopic);
            if (isEvent) {
                // console.log(`swap event found : ${eventTopic}`);
                // console.log(`log : ${JSON.stringify(log, null, 4)}`)
                console.log(`address of pool contract : ${log.address}, pool can be visited at : https://info.uniswap.org/#/pools/${log.address}`)

                const swapEventResponse: SwapEventResponse = await swapEventHandler.handlerEvent(log, tx);
                console.log(`swapEventResponse : ${JSON.stringify(swapEventResponse, null, 4)}`)
            }
        }
    }
}