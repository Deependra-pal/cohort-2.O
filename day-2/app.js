const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("I am  Server")
});

app.get('/about',(req,res)=>{
    res.send("This is About")
});

app.get('/home',(req,res)=>{
    res.send("This is Home")
});



app.listen(8000);