import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();
    console.log(`owner : ${JSON.stringify(owner)}}`)

    const unfinanceContract = await ethers.getContractFactory("UnfinanceCoin", owner);
    const unfinanceToken = await unfinanceContract.deploy();

    await unfinanceToken.deployed();
    console.log("Unfinance token deployed to:", unfinanceToken.address);

    await unfinanceToken.connect(owner).mint(
        owner.address,
        ethers.utils.parseEther('100000')
    )

    console.log(`UNF tokens minted.`)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});