// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {ChainCreditContract} from "../src/ChainCreditContract.sol";

contract ChainCreditContractScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ChainCreditContract chainCreditContract = new ChainCreditContract(10, 5);

        vm.stopBroadcast();
    }
}

//forge script --chain 12227332 script/ChainCreditContract.s.sol:ChainCreditContractScript --rpc-url $NEO_RPC_URL --broadcast --sender 0x15427D97E45e3374DF934B0f1292C8556D1B79DD --gas-price 40000000000 --legacy -vvvv

