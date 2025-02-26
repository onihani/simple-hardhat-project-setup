// imports
import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Spacebear", function () {
  async function deploySafebearContract() {
    // get accounts/signers
    const [owner, otherAccount, notAnNftOwner] = await hre.ethers.getSigners();

    // deploy and get contract instance
    const Spacebear = await hre.ethers.getContractFactory("Spacebear");
    const spacebear = await Spacebear.deploy(owner.address);

    return { spacebear, owner, otherAccount, notAnNftOwner };
  }

  describe("Deployment", function () {
    it("should deploy with owner", async () => {
      const { spacebear, owner } = await loadFixture(deploySafebearContract);

      const contractOwner = await spacebear.owner();

      expect(contractOwner).to.equal(owner.address);
    });
  });

  describe("Mint, Transfer, Buy", function () {
    it("is possible to safe mint a token", async () => {
      const { spacebear, owner, otherAccount } = await loadFixture(
        deploySafebearContract
      );

      // mint a token for other account
      await spacebear.safeMint(otherAccount.address, { from: owner });

      // get the owner of token id 0
      const tokenZeroOwnerAddress = await spacebear.ownerOf(0);

      expect(tokenZeroOwnerAddress).to.equal(otherAccount.address);
    });

    it("fails to transfer tokens from the wrong address", async () => {
      const { spacebear, owner, otherAccount, notAnNftOwner } =
        await loadFixture(deploySafebearContract);

      // mint a token for other account
      await spacebear.safeMint(otherAccount.address, { from: owner });

      await expect(
        spacebear
          .connect(notAnNftOwner)
          .transferFrom(otherAccount.address, owner.address, 0)
      ).to.be.reverted;
    });

    it("allows buying of tokens", async () => {
      const { spacebear, notAnNftOwner } = await loadFixture(
        deploySafebearContract
      );

      // by a token for not an nfy owner
      await spacebear
        .connect(notAnNftOwner)
        .buyToken({ value: hre.ethers.parseEther("0.1") });

      // get the owner of token id 0
      const tokenZeroOwnerAddress = await spacebear.ownerOf(0);

      expect(tokenZeroOwnerAddress).to.equal(notAnNftOwner.address);
    });
  });
});
