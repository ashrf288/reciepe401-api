'user strict';
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI);

RecipeSchema=mongoose.Schema({
    name:String,
    image:String,
    calories:Number
})

let UserSchema=mongoose.Schema({
    email:String,
    recipes:[RecipeSchema]

})


let Recipe=mongoose.model('Recipe',UserSchema);

// let a=new Recipe({
//     email:'ashrfmathkour@gmail.com',
//     recipes:[{
//         name:"Baked Chicken",
//         image:"https://www.edamam.com/web-img/01c/01cacb70890274fb7b7cebb975a93231.jp...",
//         calories:901.58575
//     }]
// })
// a.save()



getFav=(req,res)=>{
    let email=req.params.email;
    Recipe.find({email:email}).then(result=>res.json(result)).catch(err=>res.json(err))
    
}

addRecipe=(req,res)=>{
    let email=req.params.email;
   let data=req.body
   Recipe.find({email:email})
   .then(result=>{
       console.log(result)
       result[0].recipes.push(data);
       result[0].save();
       res.json(result)
    })
    .catch(err=>res.json(err))
    // let recipe=new Recipe(data)
    // recipe.save();
    // res.status(200).json('recipe added secssufully')
}


updRecipe=(req,res)=>{
    let email=req.params.email;
    let data=req.body
    let id=data.id
 
   Recipe.findOneAndUpdate({email:email},{$set:data}).then(result=>{
      res.json(result)
   }).catch(err=>res.json(err))


 
}

deleteRecipe=(req,res)=>{
    let id =req.params.id;
    Recipe.findByIdAndDelete(id).then(result=>{
        if(result){res.status(200).json('deleted succesfully')}
        else{res.status(404).json('user not found or already deleted')}
    }).catch(err=>{res.status(500).send({msg:'plese provide a valid id ',error:err})})
}





module.exports= {addRecipe,getFav,updRecipe,deleteRecipe};