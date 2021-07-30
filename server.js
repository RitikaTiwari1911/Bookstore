const express = require('express');
const app  = express();

//middleware has access to req and res
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//configuring the database
const dbConnect = require('./config/database.config');
dbConnect();

//define a simple route
app.get('/',(req,res) => {
    res.json({"message":"Welcome to the Bookstore application 📚"});
});

//listen for request
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at 3000`);
})