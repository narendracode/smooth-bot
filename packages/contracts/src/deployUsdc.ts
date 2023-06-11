import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();
    console.log(`owner : ${JSON.stringify(owner)}}`)

    const usdCoinContact = await ethers.getContractFactory("UsdCoin", owner);
    const usdCoin = await usdCoinContact.deploy();
    await usdCoin.deployed();
    console.log("USD coin deployed to:", usdCoin.address);

    await usdCoin.connect(owner).mint(
        owner.address,
        ethers.utils.parseEther('100000')
    )

    console.log(`USDC tokens minted.`)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});