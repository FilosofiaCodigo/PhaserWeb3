var contract;
var erc_contract;
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

  //getRevertReason("0x84b88ae8dfa0779d2aa8c80850a043c0d00f5e202f92c79193b0c8ad79aa784f")
};

const click = async () => {
  await contract.methods
    .roll("1234")
    .send({ from: accounts[0], gas: 400000 });
  displayClickCount()
}


const approve = async () => {
  await erc_contract.methods
    .approve("0x28092De136685a45F09B5B420C0d225b9EC1E636", "1000000000000000000000")
    .send({ from: accounts[0], gas: 400000 });
  displayClickCount()
}



async function optionTradesApp() {
  console.log(23)
  var awaitWeb3 = async function() {
    web3 = await getWeb3();
    var awaitContract = async function() {
      contract = await getContract(web3)
      var awaitERCContract = async function() {
        erc_contract = await getMyERC20Contract(web3)
        var awaitAccounts = async function() {
          accounts = await web3.eth.getAccounts()
          displayClickCount(contract)
        }
        awaitAccounts()
      }
      awaitERCContract()
    }
    awaitContract()
  }
  awaitWeb3()
}

optionTradesApp();


var t=setInterval(displayClickCount,1000);