// import express from "express"
const express = require("express");

const port = 3011;
const app = express();

app.use(express.json());

// localhost -> 127.0.0.1
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});