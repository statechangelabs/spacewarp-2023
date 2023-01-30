// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error SimpleCoin__NotEnoughBalance();

contract SimpleCoin {
    mapping(address => uint) balances;
    uint256 private i_tokensToBeMinted = 10000;

    event TestEvent2();
    event SentToken(address from, address to, uint amount);

    constructor(uint256 tokensToBeMinted) {
        balances[tx.origin] = tokensToBeMinted;
        i_tokensToBeMinted = tokensToBeMinted;
        emit TestEvent2();
    }

    function sendCoin(address receiver, uint amount) public returns (bool sufficient) {
        if (balances[msg.sender] < amount) {
            // return false;
            revert SimpleCoin__NotEnoughBalance();
        }

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit SentToken(msg.sender, receiver, amount);
        return true;
    }

    function getBalanceInEth(address addr) public view returns (uint) {
        return getBalance(addr) * 2;
    }

    function getBalance(address addr) public view returns (uint) {
        return balances[addr];
    }

    function getMintedTokenBalance() public view returns (uint256) {
        return i_tokensToBeMinted;
    }
}
