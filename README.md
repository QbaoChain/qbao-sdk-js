# qbao-sdk-js

## Steps
git clone
```
git clone git@github.com:QbaoChain/qbao-sdk-js.git
```
安装依赖
```
cd qbao-sdk-js
npm install
```
安装pm2后台管理工具
```
npm install pm2 -g
```
运行
```
pm2 start src/rest.js
```

## Examples

### New Address
根据充值助记词和account_index生成新地址
```
GET Request:
http://localhost:5100/newAddress?account_index=0
```
result:
```
{
    "result": "success",
    "address": "qbt16x7ucq7c79kpmfz0c2jcnl3htfmywcf808g3g0"
}
```

### Transfer
提币转账/汇集转账
```
POST Request:
http://localhost:5100/transfer

汇集转账RequestBody:
{
	"to":"qbt1pkeelrpsz48a6nq2eyg6avy66fevm6v0rf43ju",
	"from":"qbt16x7ucq7c79kpmfz0c2jcnl3htfmywcf808g3g0",
	"amount":10,
	"account_index":0,
	"is_withdraw":false
}
```
result:
```
{
    "result": "success",
    "hash": "0F43FB71B8CBD01087790D5F11ABA969E0ED72BC4E629AF563E971E571A34912"
}
```


## Qbao Rest Api Swagger
http://47.52.40.208/api/swagger-ui/#/

## Examples 

### Get txs by block
```
http://47.52.40.208/api/txs?page=1&limit=1000&tx.height=1101
```
### Get balance by address
```
http://47.52.40.208/api/bank/balances/qbt16x7ucq7c79kpmfz0c2jcnl3htfmywcf808g3g0
```
> Notice: In qbaochain, 1qbt=10^18aqbt
