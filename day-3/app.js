const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("I am Server");
});

app.get('/home',(req,res)=>{
    res.send("I am Home");
});

app.get('/about',(req,res)=>{
    res.send("I am About");
});

app.listen(8000);

 