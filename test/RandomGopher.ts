import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("RandomGopher", function () {
  let contractFactory;
  let contract: Contract;
  let owner: SignerWithAddress,
    user1: SignerWithAddress,
    user2: SignerWithAddress,
    user3: SignerWithAddress,
    treasury: SignerWithAddress;

  beforeEach(async function () {
    contractFactory = await ethers.getContractFactory("RandomGopher");
    [owner, user1, user2, user3, treasury] = await ethers.getSigners();
    contract = await contractFactory.deploy(treasury.address);

    // contract basic info
    expect(await contract.name()).to.equal("RandomGopher");
    expect(await contract.symbol()).to.equal("RG");
    expect(await contract.totalSupply()).to.equal(0);
    expect(await contract.balanceOf(owner.address)).to.equal(0);
  });

  it("success mint", async function () {
    const beforeMinter = await user1.getBalance();
    const beforeTreasury = await treasury.getBalance();

    const mintTx = await contract
      .connect(user1)
      .safeMint({ value: ethers.utils.parseEther("0.01") });
    await mintTx.wait();

    const afterMinter = await user1.getBalance();
    const afterTreasury = await treasury.getBalance();
    expect(ethers.utils.parseEther("0.01")).to.lessThan(
      beforeMinter.toBigInt() - afterMinter.toBigInt()
    );
    expect(ethers.utils.parseEther("0.01")).to.equal(
      afterTreasury.toBigInt() - beforeTreasury.toBigInt()
    );
    expect(await contract.totalSupply()).to.equal(1);
    expect(await contract.balanceOf(user1.address)).to.equal(1);
    expect(await contract.ownerOf(0)).to.equal(user1.address);
    expect(await contract.tokenURI(0)).to.be.oneOf([
      "https://gateway.pinata.cloud/ipfs/QmcKYEkNXnDpZGfLo3PvybJwbETpAcyRLTTLs1hki1DEGd/1.png",
      "https://gateway.pinata.cloud/ipfs/QmcKYEkNXnDpZGfLo3PvybJwbETpAcyRLTTLs1hki1DEGd/2.png",
      "https://gateway.pinata.cloud/ipfs/QmcKYEkNXnDpZGfLo3PvybJwbETpAcyRLTTLs1hki1DEGd/3.png",
      "https://gateway.pinata.cloud/ipfs/QmcKYEkNXnDpZGfLo3PvybJwbETpAcyRLTTLs1hki1DEGd/4.png",
    ]);
  });
  it("failed mint: lack of money", async function () {
    await expect(
      contract
        .connect(user1)
        .safeMint({ value: ethers.utils.parseEther("0.008") })
    ).to.be.reverted;
  });
});
