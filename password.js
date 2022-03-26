const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = (userPassword) => {
    let encryptPassword = bcrypt.hash(userPassword, saltRounds);
    return encryptPassword;
}

const checkEncryptedPassword = ({enteredUserPassword, encyptedPass}) => {
    //bcrypt.compare(enteredUserPassword, encyptedPass, (err,passCheck) => {
    //console.log('Password Decrption Match = ' + passCheck);
    //return 'a';
    //});
    return 'a';
}

module.exports = { encryptPassword, checkEncryptedPassword}