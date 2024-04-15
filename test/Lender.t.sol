// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Lender} from "../src/Lender.sol";

contract LenderTest is Test {
    Lender public lender;

    function setUp() public {
        //registrar contract address
        lender = new Lender(address(0));
    }


}
