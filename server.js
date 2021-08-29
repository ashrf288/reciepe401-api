const express = require('express');
const cors = require('cors');
const app=express();
const axios = require('axios');
require('dotenv').config();
app.use(express.json());
app.use(cors());
const getall=require('./controllers/contorlloers')
const {addRecipe,getFav,updRecipe,deleteRecipe,addUser}=require('./controllers/db')
const PORT=process.env.PORT;


app.get('/',getall);
//////// user logged in 
app.get('/fav/:email',getFav);
app.post('/add/:email',addRecipe);
app.post('/addUser/:email',addUser);
app.put('/update/:email',updRecipe);
app.delete('/delete/:email',deleteRecipe);

app.listen(PORT,console.log(`on port ${PORT}`))
