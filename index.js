// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require('@solana/web3.js');

// Get public key from the user via CLI
const userPublicKey = process.argv.slice(2);

// Connect to the Devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

console.log('Public Key of the generated keypair', userPublicKey);

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
  try {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    // console.log('Connection object is:', connection);

    // Make a wallet (keypair) from privateKey and get its balance
    const walletBalance = await connection.getBalance(
      new PublicKey(userPublicKey[0])
    );
    console.log(
      `Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async () => {
  try {
    // Connect to the Devnet and make a wallet from privateKey
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Request airdrop of 2 SOL to the wallet
    console.log('Airdropping some SOL to my wallet!');
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(userPublicKey[0]),
      2 * LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

mainFunction();
