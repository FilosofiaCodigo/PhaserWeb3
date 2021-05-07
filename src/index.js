var contract;
var accounts;
var web3;


async function getRevertReason(txHash){

  const tx = await web3.eth.getTransaction(txHash)

  var result = await web3.eth.call(tx, tx.blockNumber)

  result = result.startsWith('0x') ? result : `0x${result}`

  if (result && result.substr(138)) {

    const reason = web3.utils.toAscii(result.substr(138))
    console.log('Revert reason:', reason)
    return reason

  } else {

    console.log('Cannot get reason - No return value')

  }

}



const displayClickCount = async () => {
  click_count = await contract.methods.msgSenderToResult(accounts[0]).call()
  console.log(click_count)
  setClickCount("Previous result: " + click_count)

  console.log(click_count)
  setDice(parseInt(click_count))

  //getRevertReason("0x502765a1f0de9c9adcc2ab44a27586f83c911326bbf54762296f5c5d892e27d7")
};

const click = async () => {
  await contract.methods
    .roll("1234")
    .send({ from: accounts[0], gas: 400000 });
  displayClickCount()
}

async function optionTradesApp() {
  console.log(23)
  var awaitWeb3 = async function() {
    web3 = await getWeb3();
    var awaitContract = async function() {
      contract = await getContract(web3)
      var awaitAccounts = async function() {
        accounts = await web3.eth.getAccounts()
        displayClickCount(contract)
      }
      awaitAccounts()
    }
    awaitContract()
  }
  awaitWeb3()
}

optionTradesApp();


var t=setInterval(displayClickCount,1000);