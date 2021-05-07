var contract;
var accounts;
var web3;

const displayClickCount = async () => {
  click_count = await contract.methods.click_count().call()
  console.log(click_count)
  setClickCount("Click count: " + click_count)
};

const click = async () => {
  await contract.methods
    .click()
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
        setAddress(accounts[0])
        displayClickCount(contract)
      }
      awaitAccounts()
    }
    awaitContract()
  }
  awaitWeb3()
}

optionTradesApp();