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
    user3: SignerWithAddress;

  beforeEach(async function () {
    contractFactory = await ethers.getContractFactory("RandomGopher");
    [owner, user1, user2, user3] = await ethers.getSigners();
    contract = await contractFactory.deploy();

    // contract basic info
    expect(await contract.name()).to.equal("RandomGopher");
    expect(await contract.symbol()).to.equal("RG");
    expect(await contract.totalSupply()).to.equal(0);
    expect(await contract.balanceOf(owner.address)).to.equal(0);
  });
  it("success mint", async function () {
    // mint token
    const mintTx = await contract.connect(owner).safeMint(owner.address);
    await mintTx.wait();

    // token info
    expect(await contract.totalSupply()).to.equal(1);
    expect(await contract.balanceOf(owner.address)).to.equal(1);
    expect(await contract.ownerOf(0)).to.equal(owner.address);
    expect(await contract.tokenURI(0)).to.be.oneOf([
      "https://gateway.pinata.cloud/ipfs/QmcKYEkNXnDpZGfLo3PvybJwbETpAcyRLTTLs1hki1DEGd/1.png",
      "https://gateway.pinata.cloud/ipfs/QmcKYEkNXnDpZGfLo3PvybJwbETpAcyRLTTLs1hki1DEGd/2.png",
      "https://gateway.pinata.cloud/ipfs/QmcKYEkNXnDpZGfLo3PvybJwbETpAcyRLTTLs1hki1DEGd/3.png",
      "https://gateway.pinata.cloud/ipfs/QmcKYEkNXnDpZGfLo3PvybJwbETpAcyRLTTLs1hki1DEGd/4.png",
    ]);
  });
});
