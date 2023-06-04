export type SwapEventParam = {
    sender: string;
    recipient: string;
    amount0: string;
    amount1: string;
    sqrtPriceX96: string;
    liquidity: string;
    tick: string;
}

export type SwapEventResponse = {
    data?: SwapEventParam;
    error?: string;
}