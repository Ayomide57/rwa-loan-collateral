## ChainCredit

## Title
Revolutionizing Lending: Blockchain-Based Platform with Real-World Asset Collateral

## Problem

Title: Traditional Lending Limitations
Bullets:
Lack of accessibility to loans for many individuals and businesses.
Lengthy approval processes and high interest rates.
Limited transparency and trust in traditional lending institutions.
Inadequate collateral options for borrowers.

## Project Information

- **Name:** ChainCredit
- **Title:** ChainCredit
- **Version:** 0.0.1
- **Summary:** The purpose of this contract is create blockchain based lending platform using Real-world assets as collateral.

## Author Information

- **Author:** Quadri Lekan Ayomide Aderojuola
- **GitHub:** [Ayomide](https://github.com/Ayomide57/)
- **Email:** [aderojuolaayomide57@gmail.com](mailto:aderojuolaayomide57@gmail.com)
- **Email:** [quadriaderojuola@gmail.com](mailto:quadriaderojuola@gmail.com)
- **Git Repository:** [rwa-loan-collateral](https://github.com/Ayomide57/rwa-loan-collateral)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contract Addresses

ChainCredit Contract is deployed to [0xC45D2a264139C27Ad5E3e2D41DC3cDFd7E8593f1] on shardeum
Deployer: [0x08d4cBA7460bAc481D1dc37CE5298942d3626273]
Transaction hash: 0xe56c900ab8161864b617466aeb5dc2df35958345bb685eb465d6c602b3dedf68
(https://explorer-sphinx.shardeum.org/transaction/0xe56c900ab8161864b617466aeb5dc2df35958345bb685eb465d6c602b3dedf68) on Shardeum.


Registrar Contract is deployed to [0x8464135c8F25Da09e49BC8782676a84730C318bC] on shardeum
Deployer: [0x70997970C51812dc3A010C7d01b50e0d17dc79C8]
Transaction hash: 0x09480c8fdd1b5e9f2769093c3cf03ebd4f47f8c03880eb0c4ae4be6927ea0c47
The project is deployed to [DeCW2vrjkkproab8aRGyzx4YACC9Rt2NNJD3TA4mz7WR](https://explorer-sphinx.shardeum.org/transaction/0x09480c8fdd1b5e9f2769093c3cf03ebd4f47f8c03880eb0c4ae4be6927ea0c47) on Shardeum.

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge create --legacy --rpc-url https://sphinx.shardeum.org/ --private-key <your_private_key> src ChainCreditContract.sol:ChainCreditContract
$ forge create --legacy --rpc-url https://sphinx.shardeum.org/ --private-key <your_private_key> src/Registrar.sol:Registrar

```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
