const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'src/views'));

app.use(path.join(__dirname,'src/public'));

app.get('/',(req,res) => {
    res.render('index', {title: 'Index'})
})

app.listen(3000, (req, res) => {
    console.log('PS Project Running on port 3000!')
})