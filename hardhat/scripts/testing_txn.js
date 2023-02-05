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
