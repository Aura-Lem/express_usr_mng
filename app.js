// import express from "express"
const express = require("express");

const port = 3011;
const app = express();

app.use(express.json());

// http://localhost:3011/
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.get("/users", (req, res) => {
    res.status(200).send("List of users");
})

app.get("/users/1", (req, res) => {
    res.status(200).send("User details by id:1");
})

app.post("/users", (req, res) => {
    res.status(200).send("New user created");
})


// localhost -> 127.0.0.1
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});