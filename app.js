const express = require('express')
const Hashes = require('jshashes')
const hash = require('jshashes')
const app = express()

const store = new Map();

const port = 7001

app.use(express.json())

app.post('/',(req,res) =>{
    console.log(req.body);
    const SHA1 = new Hashes.SHA1;
    const short = 'http://localhost:7001/' + (SHA1.hex(req.body.longURL)).slice(0,8);
    const response = {
        "longURL" : req.body.longURL,
        "shortURL": short
    }
    store.set(req.body.longURL,short)
    store.set(short, req.body.longURL)
    //console.log(store);
    res.send(response);
})


app.get('/:shortURL',(req,res) =>{
    //console.log(store.get(req.params.abc));
    //console.log(store);
    //res.send(req.params)
    res.redirect((store.get('http://localhost:7001/' + req.params.shortURL)));
})

app.listen(port, console.log('Server listening...'));

