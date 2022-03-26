const express = require('express');
const app = express();
var http = require('http');
var bodyParser = require('body-parser');
const { response } = require('express');
const path = require('path');
app.use(express.static(path.join(__dirname, '/public/')));
const client = require('./database.js');
const user = require('./user.js');
const { Console } = require('console');
const webController = require('./webController.js');
let myUser = new user;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login', {message: ''});
});

app.get('/weclome', (req, res) => {
    res.render('welcome');
});

app.get('/admin', webController.drawAdminPage);
app.get('/logOut', webController.processLogOut);
app.get('/profile', webController.editProfile);

app.post('/register', webController.newUser);
app.post('/login', webController.processLogon);
app.post('/deleteUser', webController.deleteSelectedUser);
app.post('/makeAdmin', webController.promoteUserToAdmin);
app.post('/demoteAdmin', webController.demoteAdminToUser);
app.post('/profile', webController.updateEditProfile);

app.listen(3000, function(){
    console.log('running on port 3000');
});