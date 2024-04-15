// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Borrower} from "../src/Borrower.sol";

contract BorrowerTest is Test {
    Borrower public borrower;

    function setUp() public {
        // lender contract address
        borrower = new Borrower(address(0x08d4cBA7460bAc481D1dc37CE5298942d3626273));
    }


}
