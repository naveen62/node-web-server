const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('View engine', 'hbs');
app.use((req, res, next) => {
    var date = new Date().toString();
    var log = `${date}: ${req.url} ${req.method}`
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
})
app.use((req, res, next) => {
    res.render('maintence.hbs')
})
app.use(express.static(__dirname + '/public'))
hbs.registerHelper('getcurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcome: 'Welcome to home page',
        test: {
            name: 'name',
            age: 19
        }
    })
})
app.get('/about', (req, res) => {
    res.render('about.hbs', {pageTitle: 'About page'})
})
app.get('/bad', (req, res) => {
    res.send({
        error: 'failed',
        errMsg: 'bad connection server not responding'
    })
})

app.listen(3000);