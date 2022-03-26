const { is } = require('express/lib/request');
const user = require('./users');

class supUser extends user {
    constructor(uid, username, password, isadmin) {
        super(uid);
        super(username);
        super(password);
        this.isadmin = isadmin;
    }

    get getIsAdmin() {
        return this.isadmin
    }

    set setIsAdmin(isadmin) {
        this.isadmin = isadmin;
    }

}

module.exports = supUser;