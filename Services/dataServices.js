const jwt = require('jsonwebtoken')
const db = require('./db')


users = {
}

const register = (uname, email, password, phone, date) => {
    return db.User.findOne({ users }).then(user => {
        console.log(user.user, "hwwww");
        var da = user.user.filter(d => d.email == email).map(d => d.email)
        console.log(da, "dddd");
        var ad = user.admin
        console.log(ad);
        if (email == da || email == ad) {
            {
                return {
                    statusCode: 401,
                    status: false,
                    message: "Account already Exists...Please Login!!!"
                }
            }
        } else {
            user.user.push({
                uname: uname,
                email: email,
                password: password,
                phone: phone,
                date: date
            })
            user.save()

            console.log(user.user, "daammmn");

            return {
                statusCode: 200,
                status: true,
                message: "account successfully created!!"
            }
        }
    })
}


const login = (email, password) => {
    return db.User.findOne({ users }).then(user => {
        var usermail = user["user"].filter(d => d.email == email).map(d => d.email).filter(d => d == email)
        var userpass = user["user"].filter(d => d.email == email).map(d => d.password).filter(d => d == password)
        console.log(user);
        console.log(user.admin);
        console.log(user["password"]);
        if (email == user["admin"]) {
            if (password == user["password"]) {

                currentuser = user["admin"]

                //token generation
                const token = jwt.sign({
                    currentId: user["admin"]
                }, 'supersecretkey123')
                return {
                    statusCode: 201,
                    status: true,
                    message: "Admin Logged In", currentuser, token
                }
            } else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "Wrong Paswwrd!!"
                }
            }
        } else if (email == usermail) {
            if (password == userpass) {
                currentuser = usermail
                const token = jwt.sign({
                    currentId: email
                }, 'supersecretkey123')
                return {
                    statusCode: 202,
                    status: true,
                    message: "User successfully loged in", currentuser, token
                }
            } else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "Wrong User PAss!!!"
                }
            }
        }else {
            return {
                statusCode: 401,
                status: false,
                message: "Invalide cirdatal!!!"
            }
        }
    })
}

const userlist = (req) => {
    return db.User.findOne({ users }).then(user => {
        username = req.currentId
        if (username = user["admin"]) {
            return {
                statusCode: 200,
                status: true,
                userlist: user["user"].map(d => d.uname)
            }
        }
    })
    
}



//export
module.exports = {
    register,
    login,
    userlist

}