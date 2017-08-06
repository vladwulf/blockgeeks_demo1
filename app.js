const Web3 = require('web3');


const express = require('express');
var app = express();



const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const abi = [{"constant":false,"inputs":[{"name":"newWord","type":"string"}],"name":"setWord","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getWord","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"}];
const contract = web3.eth.contract(abi).at("0xe102125aa6fea3ddfb255a52393afbb9f04131dd");





app.use(express.static('public'))

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/api/get', function(req, res){
    res.send(contract['getWord'].call({from: web3.eth.accounts[0], gas: 5000000}))
})

app.get('/api/set', function(req, res){
    const value = req.query.value;
    web3.personal.unlockAccount(web3.eth.accounts[0], '0000');
    contract['setWord'](value, {from: web3.eth.accounts[0], gas:5000000})
    res.send('transaction accepted');
})





app.listen(3000,'localhost',function(){
    console.log('server is running')
})