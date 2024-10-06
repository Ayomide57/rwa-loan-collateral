// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ChainCreditContract} from "../src/ChainCreditContract.sol";

contract ChainCreditContractTest is Test {
    ChainCreditContract public chainCredit;

    function setUp() public {
        // lender contract address
        chainCredit = new ChainCreditContract(10, 5);
    }


}

