const express = require('express');
const itemsRouter = require("./routes")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemsRouter);


app.get('/', (req, res, next) => {
    res.send("This is root")
    next();
})


module.exports = app;