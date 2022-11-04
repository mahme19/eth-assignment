let Bank = artifacts.require('Bank.sol')

contract('Bank', (accounts) => {
// BeforeEach function to instantiate Bank and make it easier for test to access address.
  beforeEach(async () => {
     bank = await Bank.new();
     bankAccount = bank.address;
  });
  it('Checking balance of bank', async () => {
    let balance = await bank.getBalance(bankAccount);
    let parsedBalance = parseInt(web3.utils.fromWei(balance));
    assert.equal(parsedBalance, 0)
    
  });
  it('Deposit 2 ETH to bank and withdraw 1 ETH from bank', async () => {
    let account = accounts[3];
    let amount = web3.utils.toWei('2', 'ether');
    let amount2 = web3.utils.toWei('1', 'ether');


    let balance = await bank.getBalance(bankAccount);
    let parsedBalance = web3.utils.fromWei(balance);
    assert.equal(parsedBalance, 0)

    
    await bank.deposit({from: account, value: amount})


    let newBalance = await bank.getBalance(bankAccount);
    let newBalanceParsed = parseInt(web3.utils.fromWei(newBalance));

    assert.equal(newBalance, amount)
 
    await bank.withdraw(amount2,{ from: account });

    let newBalance2 = await bank.getBalance(bankAccount);
    
    let parsedAmount2 = parseInt(web3.utils.fromWei(amount2))
    let parsedNewBalance2 = parseInt(web3.utils.fromWei(newBalance2))
    assert.equal(parsedNewBalance2+parsedAmount2, newBalanceParsed)

  });
  it('Deposit 10 ETH to Bank Account', async () => {
    let account = accounts[3];
    let amount = web3.utils.toWei('10', 'ether');
    let balance = await bank.getBalance(bankAccount);
    let parsedBalance = parseInt(web3.utils.fromWei(balance));
    assert.equal(parsedBalance, 0)

    await bank.deposit({from: account, value: amount})

    let newBalance = await bank.getBalance(bankAccount);
    let parsedNewBalance = parseInt(web3.utils.fromWei(newBalance));
    assert.equal(parsedNewBalance, 10)

  });
});


