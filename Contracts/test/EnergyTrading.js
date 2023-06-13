const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EnergyTrading", function () {
  let energyTrading;
  let meter1;
  let meter2;
  let meter3;
  const energyAmount = 100;

  beforeEach(async () => {
    const EnergyTrading = await ethers.getContractFactory("EnergyTrading");
    energyTrading = await EnergyTrading.deploy();
    await energyTrading.deployed();
    [meter1, meter2, meter3] = await ethers.getSigners();
  });

  it("should add a meter with the correct energy", async function () {
    // await energyTrading.connect(meter1).addMeter(100);
    // const meter = await energyTrading.getMeter(1);
    // console.log(meter)
    // expect(meter.energy).to.equal(100);
    await energyTrading.connect(meter1).addMeter(100);
    console.log("Added meter with ID 1");
    const meter = await energyTrading.getMeter(1);
    console.log("Retrieved meter:", meter);
    console.log(meter[1])
    expect(meter[1]).to.equal(100);

  });

  it("should initiate a trade", async function () {
    await energyTrading.connect(meter1).addMeter(200);
    await energyTrading.connect(meter2).addMeter(300);
    await energyTrading.connect(meter1).initiateTrade(1, 2, energyAmount);
  });

  it("should execute a trade", async function () {
    await energyTrading.connect(meter1).addMeter(200);
    await energyTrading.connect(meter2).addMeter(300);
    await energyTrading.connect(meter1).initiateTrade(1, 2, energyAmount);
    await energyTrading.connect(meter2).executeTrade(1);
    const meter1Energy = (await energyTrading.getMeter(1))[1];
    const meter2Energy = (await energyTrading.getMeter(2))[1];
    expect(meter1Energy).to.equal(100);
    expect(meter2Energy).to.equal(400);
    const trade = await energyTrading.trades(1);
    expect(trade.executed).to.equal(true);
  });

  it("should get the correct meter", async function () {
    await energyTrading.connect(meter1).addMeter(200);
    await energyTrading.connect(meter2).addMeter(300);
    const meter = await energyTrading.getMeter(2);
    // expect(meter.energy).to.equal(300);
    expect(meter[2]).to.equal(meter2.address);
  });
});