// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract Counter {
    uint256 public count=0;

    function increment() public {
        count += 1;
    }

    function decrement() public {
        count -= 1;
    }
}