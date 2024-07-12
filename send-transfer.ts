import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4, internal } from "@ton/ton";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const mnemonic = `champion idle fat error iron nothing zoo degree victory snack chicken sniff organ style weasel parade find angry clap increase orange story bulb squeeze`;
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("wallet is not deployed");
    }

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();

    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [internal({
            to: "EQA4P3-7QwrqjE3P87XDWrW1umKK2vy6g3ILR51sxyhXPxJZ",
            value: "0.05",
            body: "Hello",
            bounce: false
        })]
    });

    let currentSeqno = seqno;
    while (currentSeqno === seqno) {
        console.log("waiting for transaction to confirm...");
        await sleep(1500);  // Added await here
        currentSeqno = await walletContract.getSeqno();
    }

    console.log("transaction confirmed!");
}

main();
