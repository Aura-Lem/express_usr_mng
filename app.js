// import express from "express"
const express = require("express");

const port = 3011;
const app = express();

const userArray = [
    {id: 1, userName: 'Vardas1', email: 'user1@gmail.com', password: 'slaptazodis1'},
    {id: 2, userName: 'Vardas2', email: 'user2@gmail.com', password: 'slaptazodis2'},
    {id: 3, userName: 'Vardas3', email: 'user3@gmail.com', password: 'slaptazodis3'}
]
const dataBase = {maxId: 3, users: userArray};

app.use(express.json());

// http://localhost:3011/
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.get("/users", (req, res) => {
    res.status(200).json(dataBase.users);
})

app.get("/users/:id", (req, res) => {
    const {id} = req.params;
    userId = parseInt(id);
    if(!userId) {    
        return res.status(400).json(
            {
                message: "Url endpoint must contain user id as number"
            }
        )
    }
   
    findUserById = dataBase.users.find(user => user.id === userId);

    if(!findUserById) {
        return res.status(400).json(
            {
                message: "User not found"
            }
        )
    } 
    res.status(200).json(findUserById);
})

app.post("/users", (req, res) => {
    const {userName, email, password} = req.body;

    // validation all request body properties ar mandatory
    // response on error:
    // 400, "Request properties 'userName', 'email' and 'password' are mandatory"

    const newUser = {
        id: ++dataBase.maxId,  //id: dataBase.maxId + 1
        userName: userName,
        email: email,
        password: password
    };

    // validation userName:
    // userName is unique, doNotContains spaces.

    for(let i = 0; i <= userArray.length; i++) {
        if(userName === userArray[i].userName) {
            return res.status(400).json(
                {
                    message: "Name already exist"
                }
            ) 
        } else {
            return res.status(201).json(
                {
                    message: 'User created',
                    user: newUser
                }
            )
        }
    }

    if(!userName || !email || !password) {
        return res.status(400).json(
            {
                message: "Request properties 'userName', 'email' and 'password' are mandatory."
 
            }
        )
    } 

    userIndexByName = dataBase.users.findIndex(user => user.userName === updatedUser.userName);
    userIndexByEmail = dataBase.users.findIndex(user => user.email === updatedUser.email);

    if(userName.includes(' ')) {
        return res.status(400).json(
            {
                message: "User name must be without spaces"
            }
        )
    }

    // validation email:
    // email is unique, appropriate email format.

    if(userIndexByEmail !== -1) {
        return res.status(400).json(
            {
                message: "Email already exist"
            }
        )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
        return res.status(400).json(
            {
                message: "Invalid email format"
            }
        );
    }

    // validation password:
    // length 8, contains Aa, 0-9 or special char.

    if(password.length < 8) {
        return res.status(400).json(
            {
                message: "The password must consist of at least 8 characters"
            }
        )
    } 
 
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\d]).{8,}$/;
    if (!password.match(passwordRegex)) {
        return res.status(400).json(
            {
                message: "Password must be at lest 8 characters long and include letters, numbers and special char."
            }
        );
    }
    
    dataBase.maxId = newUser.id;
    dataBase.users.push(newUser);
    
    res.status(201).json(
        {
            message: 'User created',
            user: newUser
        }
    );
    
});

// PUT user details

app.put("/users/:id", (req, res) => {
    const {userName, email, password} = req.body;
    const {id} = req.params;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userId = parseInt(id);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\d]).{8,}$/;

    const updatedUser = {
        id: userId,
        userName: userName,
        email: email,
        password: password
    };

    if(!userName || !email || !password) {
        return res.status(400).json(
            {
                message: "Request properties 'userName', 'email' and 'password' are mandatory."
 
            }
        )
    } 

    userIndex = dataBase.users.findIndex(user => user.id === updatedUser.id);
    userIndexByName = dataBase.users.findIndex(user => user.userName === updatedUser.userName);
    userIndexByEmail = dataBase.users.findIndex(user => user.email === updatedUser.email);

    if(userIndex === -1) {
        return res.status(400).json(
            {
                message: "User not found"
            }
        )
    }

    if(userName.includes(' ')) {
            return res.status(400).json(
                {
                  message: "User name must be without spaces"
                }
            )
    }

    if(userIndexByName !== -1) {
        return res.status(400).json(
            {
                message: "User name already exist"
            }
        )
    }

    if(userIndexByEmail !== -1) {
        return res.status(400).json(
            {
                message: "Email already exist"
            }
        )
    }

    if (!email.match(emailRegex)) {
        return res.status(400).json(
            {
                message: "Invalid email format"
            }
        );
    }
 
    if (!password.match(passwordRegex)) {
        return res.status(400).json(
            {
                message: "Password must be at lest 8 characters long and include letters, numbers and special char."
            }
        );
    }
    
    dataBase.users[userIndex] = updatedUser;

    res.status(200).json(
        {
            message: 'User updated',
            user: updatedUser
        }
    );
});

// DELETE user

app.delete("/users/:reqId", (req, res) => {
    const {reqId} = req.params;
    const id = parseInt(reqId);

    userIndex = dataBase.users.findIndex(user => user.id === id);

    if(userIndex === -1) {
        res.status(400).json(
            {
                message: "User does not exist"
            }
        )
    }
    
    dataBase.users.splice(userIndex, 1);

    res.status(200).json(
        {
            message: "User deleted.",
            userId: id
        }
    )
});

// localhost -> 127.0.0.1
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});