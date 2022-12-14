const express = require('express');
const { createUserTokenTable } = require('./dao/repository/userToken.repository');
const authRouter = require('./routes/authRouter');
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to auth-server"});
});

(() => {
    createUserTokenTable();
})();

app.listen(process.env.PORT, (err) => {
    if(err){
        console.log("Error in starting server", err);
    }
});