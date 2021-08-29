'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;

// Middleware: checkpoint to parse the body of the request
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/cats2', { useNewUrlParser: true, useUnifiedTopology: true });

const kittySchema = new mongoose.Schema({
    name: String,
    breed: String
});

const ownerSchema = new mongoose.Schema({
    name: String,
    cats: [kittySchema]
});

const myCatModel = mongoose.model('kitten', kittySchema);
const myOwnerModel = mongoose.model('owner', ownerSchema);

// function seedKittyCollection() {
//     // const sherry = new myCatModel({
//     //     name:'sherry',
//     //     breed: 'angora'
//     // })
//     const emzeki = new myCatModel({
//         name:'emzeki',
//         breed: 'baladi'
//     })
//     // console.log(sherry);
//     // sherry.save();
//     emzeki.save();
// }
// seedKittyCollection()


function seedOwnerCollection() {
    const razan = new myOwnerModel({
        name: 'razan',
        cats: [
            {
                name: 'sherry',
                breed: 'angora'
            },
            {
                name: 'emzeki',
                breed: 'baladi'
            }
        ]
    })
    const razan2 = new myOwnerModel({
        name: 'razan2',
        cats: [
            {
                name: 'sherry2',
                breed: 'angora'
            },
            {
                name: 'emzeki2',
                breed: 'baladi'
            }
        ]
    })

    // razan.save();
    razan2.save();
}
// seedOwnerCollection();



// proof of life
app.get('/', homePageHandler);

// http://localhost:3001/cat?ownerName=razan
app.get('/cat',getOwnerCatsData);

// localhost:3001/addCat?catName=fluffy&catBreed=baldi&ownerName=razan
app.post('/addCat',addCatHandler);

// localhost:3001/deleteCat/1?ownerName=razan
app.delete('/deleteCat/:catId',deleteCatHandler)

// localhost:3001/updateCat/1
app.put('/updateCat/:catID',updateCatHandler);


function homePageHandler(req, res) {
    res.send('all good')
}

function getOwnerCatsData(req,res) {
    let ownerName = req.query.ownerName;
    // let {ownerName} = req.query
    myOwnerModel.find({name:ownerName},function(error,ownerData){
        if(error) {
            res.send('did not work')
        } else {
            res.send(ownerData[0].cats)
        }
    })
}

function addCatHandler(req,res) {
    console.log(req.body)
    let {catName, catBreed, ownerName} = req.body;

    myOwnerModel.find({name:ownerName},(error,ownerData)=>{
        if(error) {res.send('cant find user')}
        else{
            console.log('before adding',ownerData)
            ownerData[0].cats.push({
                name:catName,
                breed:catBreed
            })
            console.log('after adding',ownerData[0])
            ownerData[0].save()
            res.send(ownerData[0].cats)
        }
    })

}

function deleteCatHandler(req,res) {
    console.log(req.params)
    console.log(req.query)

    let index = Number(req.params.catId);
    console.log(index)
    let ownerName = req.query.ownerName;
    myOwnerModel.find({name:ownerName},(error,ownerData)=>{
        if(error) {res.send('cant find user')}
        else{
           console.log('before deleting',ownerData[0].cats)

           let newCatsArr = ownerData[0].cats.filter((cat,idx)=>{
               if(idx !== index) {return cat}
            // return idx!==index
           })
           ownerData[0].cats=newCatsArr
           console.log('after deleting',ownerData[0].cats)
           ownerData[0].save();
           res.send(ownerData[0].cats)
        }

    })
}

function updateCatHandler(req,res) {
    console.log('aaaaaa',req.body);
    console.log('aaaaaa',req.params);
    // let numberCat = 10;
    // console.log('numberCat',numberCat)
    // console.log({numberCat})

    let {catName,catBreed,ownerName} = req.body;
    let index = Number(req.params.catID);

    myOwnerModel.findOne({name:ownerName},(error,ownerData)=>{
        if(error) res.send('error in finding the data')
        else {
            console.log(ownerData)
            ownerData.cats.splice(index,1,{
                name:catName,
                breed:catBreed
            })
            console.log(ownerData)
            ownerData.save();
            res.send(ownerData.cats)
            
        }
    })


}


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})