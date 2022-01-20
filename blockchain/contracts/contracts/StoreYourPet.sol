// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.11;

contract StoreYourPet {
    
    uint public totalPets;
    struct Pet {
        string name;
        uint age;
        string color;
    }

    Pet public pet;
    Pet[] pets;

    mapping(address => Pet) public ownerPetCount;

    function addPet(string memory _name, uint _age, string memory _color) public {
        totalPets++;
        pets.push(Pet(_name, _age, _color));
        ownerPetCount[msg.sender].name = _name;
        ownerPetCount[msg.sender].age = _age;
        ownerPetCount[msg.sender].color = _color;
    }
}