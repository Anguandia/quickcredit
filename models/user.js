const encrypt = require('crypto');
const token = require('jsonwebtoken');
const users = require('./users');

exports.User = class User{
    constructor(firstName, lastName, email, password, hash, salt,
        isAdmin=true, status='unverified', tel='',
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hash = hash;
        this.salt = salt;
        this.isAdmin = isAdmin;
        this.status = status;
        this.tel = tel;
        this._id = User.counter;
    }
    get id(){
        return this._id;
    }
    // initialize the class instance counter
    static get counter() {
        User._counter = (User._counter || 0) + 1;
        return User._counter;
    }
    //hash password
    setPassword(password){
        this.salt = encrypt.randomBytes(16).toString('hex');
        this.hash = encrypt.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    }
    //validate password
    validatePassword(password){
        let hash = encrypt.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash == hash;
    }
    //generate token
    generateToken(){
        let now = new Date();
        let exp = new Date(now);
        exp.setMinutes(now.getMinutes() + 10);
        return token.sign({
            id: this.id,
            email: this.email,
            exp: parseInt(exp.getTime()/1000),
        }, 'secret');
    }
    // push user object to users' array
    save(){
        users.push(this);
    }
    //return json representation of user
    toAuthJson(){
        return {
            token: this.generateToken(),
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.hash
        };
    }
};
