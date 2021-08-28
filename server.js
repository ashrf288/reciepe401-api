const express = require('express');
const cors = require('cors');
const app=express();
const axios = require('axios');
require('dotenv').config();
app.use(express.json());
app.use(cors());
const getall=require('./controllers/contorlloers')
const {addRecipe,getFav,updRecipe,deleteRecipe}=require('./controllers/db')
const PORT=process.env.PORT;


app.get('/',getall);
//////// user logged in 
app.get('/fav',getFav);
app.post('/add',addRecipe);
app.put('/update/:id',updRecipe)
app.delete('/delete/:id',deleteRecipe)

app.listen(PORT,console.log(`on port ${PORT}`))
