const express = require('express');
const app  = express();

//middleware has access to req and res
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//define a simple route
app.get('/',(req,res) => {
    res.json({"message":"Welcome to the Bookstore application 📚"});
});

//listen for request
app.listen(3000,()=>{
    console.log(`Server is listening at 3000`);
})