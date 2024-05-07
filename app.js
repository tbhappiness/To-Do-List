const { setEngine } = require('crypto');
const express = require('express');
const app = express();
const path = require('path');
const PORT  = 3003;
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

tasks = ['dancing','singing','playing'];

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        tasks
    })
})

app.get('/newTask', (req, res) => {
    tasks.push(req.query.taskName);
    res.redirect('/');
})

app.get('/inc', (req, res) => {
    const indx = tasks.indexOf(req.query.taskName);
    if(indx > 0 && indx < tasks.length){
        const temp = tasks[indx];
        tasks[indx] = tasks[indx-1];
        tasks[indx-1] = temp;
        res.redirect('/');
    }
})

app.get('/dec', (req, res) => {
    const indx = tasks.indexOf(req.query.taskName);
    if(indx >= 0 && indx < tasks.length-1){
        const temp = tasks[indx];
        tasks[indx] = tasks[indx+1];
        tasks[indx+1] = temp;
        res.redirect('/');
    }
})

app.get('/del', (req, res) => {
    const indx = tasks.indexOf(req.query.taskName);
    if(indx >= 0 && indx < tasks.length){
        tasks = tasks.filter((value) => value != req.query.taskName);
        res.redirect('/');
    }
})

app.listen(PORT, () => {
    console.log('http://localhost:'+PORT);
})