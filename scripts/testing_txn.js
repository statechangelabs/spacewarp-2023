// import { ethers } from "hardhat";
require("ethers");
require("dotenv").config();

const Web3 = require("Web3");
const ENDPOINT = "https://api.hyperspace.node.glif.io/rpc/v1";

let web3 = new Web3(ENDPOINT);

const DEPLOYER_PRIVATE_KEY = network.config.accounts[0]

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
    let contract_address = "0x7B64F83b1183e644e9495DFa465E7AebB8e479F1";
    const provider = new ethers.providers.JsonRpcProvider(ENDPOINT);
    const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);
    const SimpleCoin = await ethers.getContractFactory("SimpleCoin");
    const simpleCoin = await SimpleCoin.attach(contract_address);

    const tx = await simpleCoin.connect(deployer).sendCoin("0x90f14e3282977416286085e0d90210A400bEFD22", 1000);
    console.log("Transaction :", tx);
    const receipt = await tx.wait();
    console.log("Receipt :", receipt);
    console.log("Transaction events:", receipt.events);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
