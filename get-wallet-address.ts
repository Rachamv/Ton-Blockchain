
//npm install @ton/ton @ton/crypto @ton/core --start
import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";

async function main() {
    const mnemonic = `champion idle fat error iron nothing zoo degree victory snack chicken sniff organ style weasel parade find angry clap increase orange story bulb squeeze`;

    const key = await mnemonicToWalletKey(mnemonic.split(" "));

    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    console.log(wallet.address.toString({ testOnly: true }));

    console.log("workchain:", wallet.address.workChain);
}

main();
//kQB2Wo3uAjW8eYKnU1pc7TIt_aO__HsMrlcCVMvRiwBpby5a
//workchain: 0

//npm install @orbs-network/ton-access --ton access