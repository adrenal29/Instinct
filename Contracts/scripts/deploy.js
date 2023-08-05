async function main() {
  // We get the contract to deploy
  const MyContract = await ethers.getContractFactory("EnergyTrading");
  const myContract = await MyContract.deploy();

  console.log("MyContract deployed to:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

  //0x5FbDB2315678afecb367f032d93F642f64180aa3
  //0x0FDEeAC014808578c5E640637191330634BBeE67