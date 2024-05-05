// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Test, console } from "forge-std/Test.sol";
import { Counter } from "contracts/Counter.sol";
contract CounterTest is Test {
    Counter public counter;
    function setup() public {
        counter = new Counter();
    }
    function test_increment() public {
        setup();
        counter.increment();
        console.log("count: ", counter.count());
        assertEq(counter.count(), 1);
    }
}