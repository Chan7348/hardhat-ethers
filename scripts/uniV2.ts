import { ethers } from "hardhat";
import IUniswapV2Factory from "@uniswap/v2-core/build/IUniswapV2Factory.json";
import IUniswapV2Pair from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import IWETH from "../abis/WETH.json";
// async function main() {
//     // const provider = ethers.provider;
//     const feeData = await ethers.provider.getFeeData();
//     const [ signer ] = await ethers.getSigners();
//     const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
//     const WETHaddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
//     const USDTaddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
//     const WETH_USDTaddress = "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852";
//     const factory = await ethers.getContractAt(IUniswapV2Factory.abi, factoryAddress);
//     console.log(`all pairs length: ${await factory.allPairsLength()}`);
//     console.log(`firat pairs address: ${await factory.allPairs(0)}`);
//     const pair1Address = await factory.allPairs(0);
//     const pair1 = await ethers.getContractAt(IUniswapV2Pair.abi, pair1Address);
//     console.log(`pair1 name: ${await pair1.name()}`);
    
//     const WETH = await ethers.getContractAt(IWETH, WETHaddress);
//     const USDT = await ethers.getContractAt(IWETH, USDTaddress);
//     const UniswapV2Pair = await ethers.getContractAt(IUniswapV2Pair.abi, pair1Address);
//     console.log(`WETH name: ${await WETH.name()}`);

//     // await WETH.deposit({ value: ethers.utils.parseEther("999"), maxFeePerGas: feeData.maxFeePerGas, maxPriorityFeePerGas: feeData.maxPriorityFeePerGas });
    
//     console.log(`ETH balance: ${await signer.provider.getBalance(signer.address)}`);
//     console.log(`WETH balance: ${await WETH.balanceOf(signer.address)}`);
//     console.log(`WETH decimals: ${await WETH.decimals()}`);
//     // await WETH.approve(WETH_USDTaddress, ethers.utils.parseEther("9999999"));
//     console.log(`WETH allowance: ${await WETH.allowance(signer.address, WETH_USDTaddress)}`);
//     const wethBefore = await WETH.balanceOf(WETH_USDTaddress);
//     console.log(`WETH balance in WETH_USDT before swap: ${wethBefore}`);
//     const reserve0Before = await pair1.getReserves();
//     console.log(`reserve0Before: ${reserve0Before}`);
//     const usdtBefore = await USDT.balanceOf(WETH_USDTaddress);
//     console.log(`USDT balance in WETH_USDT before swap: ${usdtBefore}`);
//     const reserve1Before = await pair1.getReserves();
//     console.log(`reserve1Before: ${reserve1Before}`);
//     // console.log(`WETH * USDT rate before swap: ${await pair1.getReserves()}`);
//     console.log(`wethBefore * usdtBefore before swap: ${wethBefore * usdtBefore}`);

//     await UniswapV2Pair.swap(ethers.utils.parseEther("9"), ethers.utils.parseEther("0"), WETH_USDTaddress, "0x", { maxFeePerGas: feeData.maxFeePerGas, maxPriorityFeePerGas: feeData.maxPriorityFeePerGas });

//     const wethAfter = await WETH.balanceOf(WETH_USDTaddress);
//     console.log(`WETH balance in WETH_USDT before swap: ${wethAfter}`);
//     const reserve0After = await pair1.getReserves();
//     console.log(`reserve0After: ${reserve0After}`);
//     const usdtAfter = await USDT.balanceOf(WETH_USDTaddress);
//     console.log(`USDT balance in WETH_USDT before swap: ${usdtAfter}`);
//     const reserve1After = await pair1.getReserves();
//     console.log(`reserve1After: ${reserve1After}`);
//     console.log(`wethAfter * usdtAfter before swap: ${wethAfter * usdtAfter}`);
// }

// main().then(() => process.exit(0)).catch(error => {
//   console.error(error);
//   process.exit(1);
// });

async function main() {
    const [signer] = await ethers.getSigners();
    const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
    const WETHaddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    const USDTaddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const factory = await ethers.getContractAt(IUniswapV2Factory.abi, factoryAddress);
    const WETH_USDT_PairAddress = await factory.getPair(WETHaddress, USDTaddress);
    const pair = await ethers.getContractAt(IUniswapV2Pair.abi, WETH_USDT_PairAddress);

    // Get reserves
    const [reserve0, reserve1] = await pair.getReserves();
    console.log(`Reserves WETH: ${reserve0.toString()} USDT: ${reserve1.toString()}`);

    // Check if enough liquidity
    if (reserve0.lt(ethers.utils.parseEther("10")) || reserve1.lt(ethers.utils.parseUnits("1000", 6))) {
        console.error('Insufficient liquidity for this trade.');
        return;
    }

    // Execute swap if sufficient liquidity
    const amountIn = ethers.utils.parseEther("1");
    const amountOutMin = 0; // Should be calculated based on your slippage tolerance

    await pair.swap(amountOutMin, 0, signer.address, ethers.utils.hexlify(0), {
        gasLimit: 3000000
    });

    console.log('Swap executed');
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});