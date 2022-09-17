const { assert } = require("chai")
const { network, getNamedAccounts, ethers } = require("hardhat")
const { dvelopmentChains } = require("../../helper-hardhat-config")

dvelopmentChains.includes(network.name)
    ? describe.skip
    : describe("Fund staging test", function () {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("1")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("Fund")
          })
          it("allows people to fund and withdraw", async () => {
              const fundTxResponse = await fundMe.fund({ value: sendValue })
              const fundTxReceipt = await fundTxResponse.wait()
              const withdrawTxResponse = await fundMe.withdraw()
              const withdrawTxReceipt = await withdrawTxResponse.wait()

              const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
              assert.equal(endingFundMeBalance.toString(), "0")
          })
      })
