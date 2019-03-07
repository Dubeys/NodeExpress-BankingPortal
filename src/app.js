const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({extended: true}))

const accountData = fs.readFileSync( path.join(__dirname, 'json','accounts.json'),'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync( path.join(__dirname,'json','users.json'),'utf8' );
const users = JSON.parse(userData);

app.get('/',(req,res) => res.render('index', {title: 'Account Summary', accounts}));

app.get('/savings',(req,res)=> {
    res.render('account',{account: accounts.savings});
});

app.get('/checking', (req,res)=> {
    res.render('account',{account: accounts.checking})
});

app.get('/credit', (req,res)=> {
    res.render('account',{account: accounts.credit})
});

app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0]});
});

app.get('/transfer', (req, res) => {
    res.render('transfer')
})

app.post('/transfer', (req, res) => {
    const fromAccount = accounts[req.body.from];
    const toAccount = accounts[req.body.to];
    fromAccount.balance = parseFloat(fromAccount.balance) - parseFloat(req.body.amount);
    toAccount.balance = parseFloat(toAccount.balance) + parseFloat(req.body.amount);

    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'),accountsJSON,{encoding: 'utf8'});
    res.send({message:"Transfer Completed"})
})

app.get('/payment', (req, res) => {
    res.render('payment', {account: accounts.credit})
})

app.post('/payment', (req, res) => {
    accounts.credit.balance = parseFloat(accounts.credit.balance) - parseFloat(req.body.amount);
    accounts.credit.available = parseFloat(accounts.credit.available) + parseFloat(req.body.amount);
    
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, { encoding: 'utf8' });
    res.send({ message: "Payment Succesful", account: accounts.credit })
})

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!')
})