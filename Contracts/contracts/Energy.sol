// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyTrading {
    struct Meter {
        uint256 id;
        uint256 energy;
        uint256 carbonCredits;
        address owner;
    }

    struct Trade {
        uint256 meter1;
        uint256 meter2;
        uint256 energy;
        uint256 costPerKwh;
        bool executed;
    }

    mapping(uint256 => Meter) public meters;
    mapping(uint256 => Trade) public trades;
    uint256 public meterCount = 0;
    uint256 public tradeCount = 0;

    function addMeter(uint256 energy, uint256 carbonCredits) public {
        meterCount++;
        meters[meterCount] = Meter(
            meterCount,
            energy,
            carbonCredits,
            msg.sender
        );
    }

    function getMeter(
        uint256 id
    ) public view returns (uint256, uint256, uint256, address) {
        require(id <= meterCount, "Invalid meter ID");
        Meter memory meter = meters[id];
        return (meter.id, meter.energy, meter.carbonCredits, meter.owner);
    }

    function executeTrade(uint256 tradeId) public {
        require(tradeId <= tradeCount, "Invalid trade ID");
        Trade storage trade = trades[tradeId];
        require(trade.executed == false, "Trade already executed");
        Meter storage meter1 = meters[trade.meter1];
        Meter storage meter2 = meters[trade.meter2];
        require(
            meter1.energy >= trade.energy,
            "Not enough energy in meter1 to execute trade"
        );
        require(
            meter1.carbonCredits >= trade.energy,
            "Not enough carbon credits in meter1 to execute trade"
        );
        meter1.energy -= trade.energy;
        meter1.carbonCredits -= trade.energy;
        meter2.energy += trade.energy;
        meter2.carbonCredits += trade.energy;
        trade.executed = true;
    }

    function updateMeterEnergyAndCarbonCredits(
        address owner,
        uint256 energy,
        uint256 carbonCredits
    ) public {
        for (uint256 i = 1; i <= meterCount; i++) {
            Meter storage meter = meters[i];
            if (meter.owner == owner) {
                meter.energy = energy;
                meter.carbonCredits = carbonCredits;
                return;
            }
        }
        revert("No meter found for owner address");
    }

    function transferEnergyAndCarbonCredits(
        address sender,
        address receiver,
        uint256 energyAmount,
        uint256 costPerKwh,
        uint256 carbonCreditsToAdd
    ) public payable {
        require(sender != address(0), "Invalid sender address");
        require(receiver != address(0), "Invalid receiver address");
        require(sender != receiver, "Cannot transfer energy to self");
        require(energyAmount > 0, "Invalid energy amount");
        require(costPerKwh > 0, "Invalid cost per kWh");
        require(carbonCreditsToAdd >= 0, "Invalid carbon credits");

        // Find the meters associated with each address
        uint256 senderMeter = 0;
        uint256 receiverMeter = 0;
        for (uint256 i = 1; i <= meterCount; i++) {
            if (meters[i].owner == sender) {
                senderMeter = i;
            } else if (meters[i].owner == receiver) {
                receiverMeter = i;
            }
        }

        // Check that both addresses have meters associated with them
        require(senderMeter != 0 && receiverMeter != 0, "Invalid meter owner");

        // Check that the trade can be initiated
        uint256 energyCost = energyAmount * costPerKwh;
        require(
            msg.value >= energyCost,
            "Insufficient ethers sent for energy cost"
        );
        require(
            meters[senderMeter].energy >= energyAmount,
            "Not enough energy to transfer"
        );
        require(!trades[tradeCount].executed, "Trade already executed");

        // Initiate the trade
        tradeCount++;
        trades[tradeCount] = Trade(
            senderMeter,
            receiverMeter,
            energyAmount,
            costPerKwh,
            false
        );

        // Add carbon credits to the sender's meter
        Meter storage senderMeterData = meters[senderMeter];
        Meter storage receiverMeterData = meters[receiverMeter];
        senderMeterData.carbonCredits += carbonCreditsToAdd;
        trades[tradeCount].executed = true;

        senderMeterData.energy -= energyAmount;
        receiverMeterData.energy += energyAmount;

        // Transfer ethers from sender to receiver based on energy cost
        address payable senderPayable = payable(sender);
        address payable receiverPayable = payable(receiver);
        receiverPayable.transfer(energyCost);
        senderPayable.transfer(msg.value - energyCost);
    }
}
