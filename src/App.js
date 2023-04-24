import './App.css';
import Web3 from 'web3/dist/web3.min.js'
import NumberChanger from "./artifacts/contracts/NumberChanger.sol/NumberChanger.json"
import {useState} from 'react'

function App() {
  // const web3 = new Web3("http://localhost:7545");
  const web3 = new Web3("https://rinkeby.infura.io/v3/b9485d5209674b059bb5bcabceeb60bb");
  const contractAddress = '0xaF68b857d01f8dfC66451efC23b7DC1792f07485'
  const contract = new web3.eth.Contract(NumberChanger.abi, contractAddress)
  console.log('cc', contract)
  console.log(NumberChanger.abi)
  
  const [number, setNumberLocalState] = useState()

  async function getNumber() {
    try {
      const getStateNumber = await contract.methods.getNumber().call()
      console.log('gs', getStateNumber)
      setNumberLocalState(getStateNumber)
    } catch (err) {
      console.log("err: ", err)
    }
  }

  async function setNumberBlockchain() {
    // Assign array of accounts into getAccount variable
    let getAccount = await web3.eth.getAccounts();
    console.log('getacc', getAccount)

    // Calling setNumber function and using first account to send transaction
    await contract.methods.setNumber(number).send({from: getAccount[0]})

    setNumberLocalState('')
  }

  return (
    <div className="App">
      {/* <input type="text" onChange={e => setNumberBlockchain(e.target.value)} value={number} /> */}
      <button onClick={getNumber}>Get Number</button> <span>number is: {number}</span> <br /><br />
      <button onClick={setNumberBlockchain}>Set Number</button> <input type="text" onChange={e => setNumberLocalState(e.target.value)} value={number} />
    </div>
  );
}

export default App;
