// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "hardhat/console.sol";

contract NumberChanger {
    uint number;

    constructor(uint _number) {
        number = _number;
    }
    function getNumber() public view returns (uint256) {
        return number;
    }

    function setNumber(uint256 _number) public {
        number = _number;
        console.log(number);
    }
}
