const anchor = require('@project-serum/anchor');
const { assert } = require('chai');
//const { assert } = require('assert');
const {SystemProgram} = anchor.web3

describe('postfeedapp', () => {
  const provider = anchor.Provider.local();
  
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.Postfeedapp;
  const feedPostApp = anchor.web3.Keypair.generate();
  it('Is initialized!', async () => {
    const num = new anchor.BN(2)
    
    await program.rpc.createPost('hello','www.imagrurl.com',num,false,{
      accounts:{
        feedPostApp:feedPostApp.publicKey,
        user:provider.wallet.publicKey,
        systemProgram:SystemProgram.programId
      },
     signers:[feedPostApp]
    })
    const account = await program.account.feedPostApp.fetch(feedPostApp.publicKey) 
   //const tx = await program.rpc.initialize(); 
   //console.log("Your transaction signature", tx);
    assert.ok(account.media === 'www.imagerurl.com');
    assert.ok(account.admin===false);
    assert.ok(account.text==='hello');
  });
});