const { expect } = require("chai");
const hre = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("ChainCreditContract contract", function () {
    let deployer, account1, account2;

  async function ChainCreditContractFixture() {
    const chaincredit = await ethers.deployContract("ChainCreditContract", [
      "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    ]);
    [deployer, account1, account2] = await ethers.getSigners();

    //await chaincredit.register();

    return { chaincredit };
  }

  it("Should add new user/borrower/company", async function () {
      const { chaincredit } = await loadFixture(ChainCreditContractFixture);
                  await chaincredit
                    .connect(account1)
                    .registerCandidate(
                      "Lightout",
                      "lekan",
                      "lagos",
                      8147643756
                    );
                  const response = await chaincredit.getCompany(account1);
      
      console.log(response)

    //await chaincredit.register("Lightout", "lekan", "lagos", 8147643756);
    //expect(await chaincredit.getCompany()).to.equal(1);
  });

});
