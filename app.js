const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const fb=require("./firebase")
const setup = require('./passport')
const passport = require('passport')
const cors = require('cors')
const cookie_seesion = require('cookie-session')

const port = process.env.PORT || 5000;
app = express()
app.use('/static',express.static('static')); 
app.set('view engine','ejs')
app.use(cors())
app.use(cookie_seesion({
    maxAge:24*60*60*1000,
    keys:['Ranjith']
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/',(req,res)=>{
    console.log(req.user)
    if(req.user){
        fetch('https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&apiKey=4c9bcf89dd3640929b9570bc573e4e81')
        .then(res => res.json())
        .then(json => {
           
            res.render('home.ejs',{data:json['articles']})
        });

    }
    else{
        res.redirect('/login')
    }
   
})
app.get('/about',(req,res)=>{
    res.render('about.ejs')
})
app.post('/news',(req,res)=>{
    
    res.render('news.ejs',{
        body:req.body
    })
});
app.get('/auth/google',passport.authenticate('google',{
    scope:['profile']
}))
app.get('/auth/google/callback',passport.authenticate('google',
{
    successRedirect: '/',
    failureRedirect: '/login'
})
,(req,res)=>{
    res.redirect('/')
})
app.get('/login',(req,res)=>{
    if(req.user){
        res.redirect('/')
    }

    res.render('login.ejs')
})
app.listen(port,()=>{
    console.log('Port')
})