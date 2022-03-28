const { createUser, getEditProfileDetails, checkUsernameExists, checkUsernameAndPassword, updateUsersProfile, deleteUserFromDB, getAdminData, makeAdminInDB, makeUserInDB } = require('./webUser');
const { encryptPassword, checkEncryptedPassword } = require('./password');
const user = require('./user.js');
let myUser = new user;
   
const newUser = (req,res) => {
    let username = req.body.uname;
    let password = req.body.pword;
    encryptPassword(password)
    .then(result => {
        createUser({username,password, result})
        .then(() => res.render('login', {message: 'User Account Successfully Created. Please login!'})) 
        .catch(() => res.status(500).send('error'));
        })
        .catch(() => res.status(500).send('error'));

   
    }


const editProfile = (req, res) => {
    let uID = myUser.getuid;
    if(myUser.getIsAdmin != 'Y') {
            res.render('login', {message: ""});
        } else {
        getEditProfileDetails({uID})
        .then(() => res.render('profile', {uName: myUser.getUsername, password: myUser.getPassword }))
        .catch(() => res.status(500).send('error'));
    }  
}

const processLogon = (req, res) => {
    let enteredUsername = req.body.uname;
    let p = req.body.pword; 
    checkUsernameExists(enteredUsername)
    .then(result => {
        if(result.rowCount == 0) {
            res.render('login', {message: 'Invalid Username or Password'});
        } else {
            checkUsernameAndPassword(enteredUsername, p)
            .then(result => {
                 let enteredUserPassword = p;
                 let encyptedPass = result.rows[0].password2;
                checkEncryptedPassword({enteredUserPassword, encyptedPass})
                .then(() => res.status(200).send('OK - Enc'))
                   // console.log('result is ' + passCheck);
                    // if(passCheck === true) {
                    //           myUser.setUsername = enteredUsername;
                    //           myUser.setPassword = result.rows[0].password;
                    //           myUser.setIsAdmin = result.rows[0].isAdmin;
                    //           myUser.setUid = result.rows[0].id;
                    //          res.render('welcome', {message: myUser.getUsername});
                    //      } else {
                    //          res.render('login', {message: 'Invalid Username or Password'});
                    //      }
               // })
                .catch(() => res.status(500).send('error - Enc'));
            //  end Enc Checks  
            })
            .catch(() => res.status(500).send('error - Overall'));
            //end username get
        } // else nuser found
    }) // check username .then
    .catch(() => res.status(500).send('error2'));
}

const processLogOut = (req, res) => { 
    myUser.setUid = '';
    myUser.setUsername = '';
    myUser.setPassword = '';
    myUser.setIsAdmin = '';
    res.render('login', {message: 'Successfully Logged Out'});
}

const updateEditProfile = (req,res) => {
    let uid = myUser.getuid
    let password = req.body.pword;
    updateUsersProfile(uid,password)
    .then(() => res.render('welcome', {message: myUser.getUsername}))
    .catch(() => res.status(500).send('error'));
}

const deleteSelectedUser = (req, res) => {
    let uid = req.body.hiddenDelID;
    deleteUserFromDB(uid)
    .then(() => drawAdminPage(req,res))
    .catch(() => res.status(500).send('error'));
}

const drawAdminPage = (req,res) => {
    if(myUser.getIsAdmin != 'Y') {
        res.render('login', {message: ""});
    } else {
        getAdminData()
        .then(result => {
            let data = result.rows;
            res.render('admin', {data});
        })
        .catch(() => res.status(500).send('error'));
    }
}

const promoteUserToAdmin = (req,res) => {
    let uid = req.body.hiddenID;
    makeAdminInDB(uid)
    .then(() => drawAdminPage(req,res))
    .catch(() => res.status(500).send('error'));
}

const demoteAdminToUser = (req,res) => {
    let uid = req.body.hiddenID2;
    makeUserInDB(uid)
    .then(() => drawAdminPage(req,res))
    .catch(() => res.status(500).send('error'));
}

    module.exports =  {newUser, editProfile, processLogon, processLogOut, updateEditProfile,
                       deleteSelectedUser, drawAdminPage, promoteUserToAdmin, demoteAdminToUser};