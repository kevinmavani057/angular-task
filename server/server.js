const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./users.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
    return userdb.users.find(user => user.email === email && user.password === password)
}

function isExist({ email }) {
    const userList = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
    return userList.users.find(user => user.email === email)
}

function checkPassword({ password, cPassword }) {
    // const userList = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
    return (password !== cPassword);

}
// Add New User
server.post('/users', (req, res) => {
    console.log("register endpoint called; request body:");
    console.log(req.body);
    const { userType, firstName, lastName, email, password, cPassword } = req.body;
    // console.log(email);
    if (isExist({ email })) {
        const status = 400;
        const message = '* Username and Password already exist';
        // res.status(status).json({ status, message });
        res.status(status).json({ status, message });

        return
    }
    if (checkPassword({ password, cPassword })) {
        const status = 402;
        const message = '* The Password dont match';
        res.status(status).json({ status, message });
        return
    }
    fs.readFile("./users.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };

        // Get current users data   
        var data = JSON.parse(data.toString());

        // Get the id of last user
        var last_item_id = data.users[data.users.length - 1].id;

        //Add new user
        data.users.push({ id: last_item_id + 1, userType: userType, firstName: firstName, lastName: lastName, email: email, password: password, cPassword: cPassword }); //add some data
        var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => { // WRITE
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
        // const status = 200;
        // const message = "success";

        res.status(200).json({ result: "success", userType: userType });
    });
})

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const { email, password } = req.body;
    const user = isAuthenticated({ email, password });
    console.log(user);
    if (!isAuthenticated({ email, password })) {
        const status = 401
        const message = 'Incorrect username or password'
        res.status(status).json({ status, message })
        return
    }

    const access_token = createToken({ email, password })
    console.log("Access Token:" + access_token);
    res.status(200).json({ token: access_token, user: { email: user.email, userType: user.userType, id: user.id, firstName: user.firstName, lastName: user.lastName } });
})

// server.use(/^(?!\/auth).*$/,  (req, res, next) => {
//   if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
//     const status = 401
//     const message = 'Error in authorization format'
//     res.status(status).json({status, message})
//     return
//   }
//   try {
//     let verifyTokenResult;
//      verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

//      if (verifyTokenResult instanceof Error) {
//        const status = 401
//        const message = 'Access token not provided'
//        res.status(status).json({status, message})
//        return
//      }
//      next()
//   } catch (err) {
//     const status = 401
//     const message = 'Error access_token is revoked'
//     res.status(status).json({status, message})
//   }
// })

// Edit User
server.put('/user/edit', (req, res) => {
    console.log("edit user endpoint called; request body:");
    console.log(req.body);
    req.body.userrole = '2';
    const { email, id } = req.body;
    console.log(id);
    fs.readFile("./users.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };

        var data = JSON.parse(data.toString());

        const checkUser = data.users.find(user => user.email === email && user.id !== id);
        if (checkUser) {
            const status = 400;
            const message = 'Email already exist';
            res.status(status).json({ status, message });
            return
        }

        // Get current users data
        var foundIndex = data.users.findIndex(user => user.id === id);
        console.log(foundIndex);
        data.users[foundIndex] = req.body;
        //Add new user
        var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
        res.status(200).json({ result: "success" });
    });
});

// Edit User
server.get('/user/:userId', (req, res) => {
    console.log("get user endpoint called; request id:");
    console.log(req.params);
    const userId = Number(req.params.userId);

    fs.readFile("./users.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };
        var data = JSON.parse(data.toString());
        // Get current users data
        var userInfo = data.users.find(user => user.id === userId);
        res.status(200).json(userInfo);
    });
})

server.get('/users', (req, res) => {

    fs.readFile("./users.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.json({ status, message })
            return
        };
        var data = JSON.parse(data.toString());
        // if (data.users.userType == 'user') {

        //     const result = data.users.filter(el => (el.userType === 'user'))
        //     res.status(200).json(result);
        //     console.log('user');
        // } else {
        const result = data.users.filter(el => (el.userType === 'user') || (el.userType === 'admin'));
        res.status(200).json(result);
        // console.log('admin')
        // }
    });
})

server.put('/profile', (req, res) => {
    console.log(req.body);
    req.body.userrole = '2';
    const { password, phone, address, age, id, name } = req.body;

    fs.readFile("./users.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };

        var data = JSON.parse(data.toString());

        // Get current users data
        var foundIndex = data.users.findIndex(user => user.id === id);
        var userDetails = data.users.find(user => user.id === id);
        userDetails.password = password;
        userDetails.age = age;
        userDetails.address = address;
        userDetails.phone = phone;
        userDetails.name = name;
        data.users[foundIndex] = userDetails;

        //Add new user
        var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
        res.status(200).json({ result: "success" });
    });
});

server.delete('/users/:userId', (req, res) => {
    console.log("get user endpoint called; request id:");
    console.log(req.params);
    const userId = Number(req.params.userId);

    fs.readFile("./users.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };
        var data = JSON.parse(data.toString());
        var foundIndex = data.users.findIndex(user => user.id === userId);
        data.users.splice(foundIndex, 1);

        // Get current users data
        var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
        res.status(200).json({ result: "success" });
    });
})


server.use(router)

server.listen(8000, () => {
    console.log('Run Auth API Server')
})