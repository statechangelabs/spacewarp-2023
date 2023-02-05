const Web3 = require("Web3");
const ENDPOINT = "https://api.hyperspace.node.glif.io/rpc/v1";

let web3 = new Web3(ENDPOINT);
const DEPLOYER_PRIVATE_KEY = network.config.accounts[0]


async function checkTransactionCount(startBlockNumber, endBlockNumber) {
  transactions = [];

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    let block = await web3.eth.getBlock(i);
    if (block != null) {
      if (block.transactions != null && block.transactions.length != 0) {
        transactions = transactions.concat(block.transactions);
      }
    }
  }

  return transactions;
}

async function main() {
  console.log(
    "Searching for non-zero transaction counts between blocks 16600 and 16640"
  );
  let transactions = await checkTransactionCount(16600, 16640);

  console.log(transactions.length + " transactions found");
  console.log(transactions);


}

main();