// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Bank {
    mapping(address => uint256) public balance;
   
    function deposit() public payable {
        balance[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public payable {
        require(balance[msg.sender] >= amount);
        balance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getBalance(address account) public view returns (uint256) {
        return address(account).balance;
    }
}
