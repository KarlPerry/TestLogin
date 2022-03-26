const client  = require('./database.js');

const createUser = ({username, password}) => {
    let tableName = 'MyNodeTable';
    return client.query(
        `INSERT INTO"${tableName}" (username, password) VALUES ('${username}', '${password}')`
    );
   }

const getEditProfileDetails = ({uID}) => {
        let tableName = 'MyNodeTable';
        return client.query(
            `SELECT * FROM "${tableName}" WHERE id = ${uID}`
        );
}

const checkUsernameExists = (enteredUsername) => {
    let tableName = 'MyNodeTable';
    let columnName = 'username';
    return client.query(
        `SELECT username FROM "${tableName}" WHERE ${columnName} = '${enteredUsername}'`,
        );
}

const checkUsernameAndPassword = (enteredUsername, password) => {
    let tableName = 'MyNodeTable';
    let columnName = 'username';
    return client.query(
        `SELECT id, password, "isAdmin" FROM "${tableName}" WHERE ${columnName} = '${enteredUsername}'`
        );
}

const updateUsersProfile = (uid, password) => {
    let tableName = 'MyNodeTable';
    return client.query(
        `UPDATE "${tableName}" SET password = '${password}' WHERE id = ${uid} AND password != '${password}'`,
    );
}

const deleteUserFromDB = (uid) => {
    let tableName = 'MyNodeTable';
    return client.query(
        `DELETE FROM "${tableName}" WHERE id = ${uid}`
    );
}

const getAdminData = () => {
    let tableName = 'MyNodeTable';
    return client.query(
        `SELECT * FROM "${tableName}"`
    );
}

const makeAdminInDB = (uid) => {
    let tableName = 'MyNodeTable';
    return client.query(
        `UPDATE "${tableName}" SET "isAdmin" = 'Y' WHERE ID = ${uid}`
    );
}

const makeUserInDB = (uid) => {
    let tableName = 'MyNodeTable';
    return client.query(
        `UPDATE "${tableName}" SET "isAdmin" = 'N' WHERE ID = ${uid}`
    );
}

   module.exports = {
       createUser, getEditProfileDetails, checkUsernameExists, checkUsernameAndPassword,
       updateUsersProfile, deleteUserFromDB, getAdminData, makeAdminInDB, makeUserInDB
   }