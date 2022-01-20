import { STOREYOURPET_ADDRESS, STOREYOURPET_ABI } from './config.js';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState();
  const [contactList, setContactList] = useState();
  const [contacts, setContacts] = useState([]);

  console.log('ACCOUNT', account)
  console.log('PETLIST',contactList)
  console.log('PETS',contacts)

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      // Instantiate smart contract using ABI and address.
      const contactList = new web3.eth.Contract(STOREYOURPET_ABI, STOREYOURPET_ADDRESS);
      // set contact list to state variable.
      setContactList(contactList);
      // Then we get total number of contacts for iteration
      const counter = await contactList.methods.ownerPetCount('0x54e58C3daB9897df9fb11feF56e03e10B538b2DC').call();
      // iterate through the amount of time of counter
      console.log('COUNTER',counter)
      for (var i = 1; i <= counter; i++) {
        // call the contacts method to get that particular contact from smart contract
        const contact = await contactList.methods.contacts(i).call();
        // add recently fetched contact to state variable.
        setContacts((contacts) => [...contacts, contact]);
      }
    }
    load();
  }, []);

  return (
    <div className="App">
      <p>DAPP DEMO  </p>
    </div>
  );
}

export default App;
