class myAppUser {
    constructor(uid, username, password, isadmin) {
        this.uid = uid;
        this.username = username;
        this.password = password,
        this.isadmin = isadmin
      }

      get getuid() {
          return this.uid;
      }
      
      get getUsername(){
          return this.username;
      }

      get getPassword() {
          return this.password;
      }

      get getIsAdmin() {
          return this.isadmin;
      }

      set setUid(uid){
          this.uid = uid;
      }

      set setUsername(username) {
        this.username = username;
      }

      set setPassword(password){
          this.password = password;
      }

      set setIsAdmin(isadmin) {
          this.isadmin = isadmin
      }
    };


    module.exports = myAppUser;

