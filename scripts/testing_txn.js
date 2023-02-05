// import { ethers } from "hardhat";
require("ethers");
require("dotenv").config();

const Web3 = require("Web3");
const ENDPOINT = "https://api.hyperspace.node.glif.io/rpc/v1";

let web3 = new Web3(ENDPOINT);

const DEPLOYER_PRIVATE_KEY = network.config.accounts[0]
const AKSHAY_KEY = network.config.accounts[1]
// async function callRpc(method, params) {
//     var options = {
//         method: "POST",
//         url: "https://api.hyperspace.node.glif.io/rpc/v1",
//         // url: "http://localhost:1234/rpc/v0",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             jsonrpc: "2.0",
//             method: method,
//             params: params,
//             id: 1,
//         }),
//     }
//     const res = await request(options)
//     return JSON.parse(res.body).result
// }


async function main() {
    console.log("Sending Coins");
    let contract_address = "0xC34C6656f8bB3d6B0b0F4f1EB8615909187f3d84";
    const provider = new ethers.providers.JsonRpcProvider(ENDPOINT);
    const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);
    const akshay = new ethers.Wallet(AKSHAY_KEY, provider);
    const SimpleCoin = await ethers.getContractFactory("SimpleCoin");
    const simpleCoin = await SimpleCoin.attach(contract_address);

    const tx_1 = await simpleCoin.connect(deployer).sendCoin("0x90f14e3282977416286085e0d90210A400bEFD22", 10000);
    console.log("Transaction :", tx_1);
    const receipt_1 = await tx_1.wait();
    console.log("Receipt :", receipt_1);
    console.log("Transaction events:", receipt_1.events);

    const tx_2 = await simpleCoin.connect(deployer).sendCoin("0x47C0485Ac6392EeA8ae37BB469f485e8c0aCdd86", 10000);
    console.log("Transaction :", tx_2);
    const receipt_2 = await tx_2.wait();
    console.log("Receipt :", receipt_2);
    console.log("Transaction events:", receipt_2.events);

    const tx_3 = await simpleCoin.connect(akshay).sendCoin("0x47C0485Ac6392EeA8ae37BB469f485e8c0aCdd86", 42);
    console.log("Transaction :", tx_3);
    const receipt_3 = await tx_3.wait();
    console.log("Receipt :", receipt_3);
    console.log("Transaction events:", receipt_3.events);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
