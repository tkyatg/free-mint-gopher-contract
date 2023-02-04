const { ethers } = require("hardhat");

async function main() {
  // deploy
  const Contract = await ethers.getContractFactory("RandomGopher");
  const contract = await Contract.deploy(process.env.TREASURY_ADDRESS);
  await contract.deployed();

  console.log("contract deployed to:", contract.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
