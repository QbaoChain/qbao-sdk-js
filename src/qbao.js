const qbaojs = require("./base");

// [WARNING] This mnemonic is qbao for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic_withdraw = "behind business quality obvious quality hamster media bench keen please fatal else glide entry glide midnight height loud erosion sand kind monitor circle media";
const mnemonic_deposit = "reward segment alter simple cake urge olive turtle actual space lens flee lunar aerobic awkward position olive extend sword sock chase candy blood easily";
const qbao = qbaojs.network("http://47.52.40.208/api", "qbao-testnet");
qbao.setBech32MainPrefix("qbt");
const BigNumber = require('bignumber.js');

function newAddress(account_index) {
    qbao.setPath("m/44'/521'/" + account_index + "'/0/0");
    return qbao.getAddress(mnemonic_deposit);
}

function transfer(from, to, amount, account_index, is_withdraw) {
    var mnemonic;
    if (is_withdraw)
        mnemonic = mnemonic_withdraw;
    else
        mnemonic = mnemonic_deposit;

    var realAmount = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(18)).toFixed();
    console.log("### Send from: " + from + " to: " + to + ", amount: " + realAmount + " ###");

    qbao.setPath("m/44'/521'/" + account_index + "'/0/0");
    const ecpairPriv = qbao.getECPairPriv(mnemonic);
    return qbao.getAccounts(from).then(data => {
        let stdSignMsg = qbao.NewStdMsg({
            type: "cosmos-sdk/MsgSend",
            from_address: from,
            to_address: to,
            amountDenom: "aqbt",
            amount: realAmount,
            feeDenom: "aqbt",
            fee: 5000000000000000,
            gas: 200000,
            memo: "",
            account_number: data.result.value.account_number,
            sequence: data.result.value.sequence
        });

        const signedTx = qbao.sign(stdSignMsg, ecpairPriv);
        return qbao.broadcast(signedTx);
    }).then(response => {
        console.log("broadcast result:", response);
        var raw_log = response.raw_log;
        var result;
        if (raw_log.indexOf("\"success\":true") !== -1)
            result = "success";
        else
            result = "fail";
        return {
            "result": result,
            "hash": response.txhash
        };
    });
}


module.exports = {
    newAddress: newAddress,
    transfer: transfer
}
