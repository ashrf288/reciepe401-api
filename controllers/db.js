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



addUser=(req,res)=>{
    let email=req.params.email;
    Recipe.find({email:email}).then(result=>{
     if (result.length>0){res.json(`welcom back ${email}`)}
         else{
            let a=new Recipe({
                email:email,
                recipes:[]
            })
            a.save()
            res.json('user created')
         }
    
    }).catch(err=>res.json(err))


}



getFav=(req,res)=>{
    let email=req.params.email;
    Recipe.find({email:email}).then(result=>{res.json(result)}).catch(err=>res.json(err))
    
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
    let email=req.params.email;
    let id=req.body.id
    Recipe.find({email:email})
    .then(result=>{
       let indx= result[0].recipes.findIndex(ele=>{
            return id===ele._id 
        })
        console.log(result)
        result[0].recipes.splice(indx,1);
        result[0].save();
        res.json(result)
     })
     .catch(err=>res.json(err))
}





module.exports= {addRecipe,getFav,updRecipe,deleteRecipe,addUser};