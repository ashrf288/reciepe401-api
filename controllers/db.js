'user strict';
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI);


let RecipeSchema=mongoose.Schema({
    name:String,
    image:String,
    calories:Number
})


let Recipe=mongoose.model('Recipe',RecipeSchema);


getFav=(req,res)=>{
    Recipe.find().then(result=>res.json(result)).catch(err=>res.json(err))
}

addRecipe=(req,res)=>{
   let data=req.body
    let recipe=new Recipe(data)
    recipe.save();
    res.status(200).json('recipe added secssufully')
}


updRecipe=(req,res)=>{
    id=req.params.id;
    data=req.body
    Recipe.findByIdAndUpdate({_id:id},{$set:data}).then(result=>{
        if(result){res.status(200).json({msg:'user updated seccsuffuly',resul:result})}
        else{res.status(404).json('recipe with that id not found')}
    }).catch(err=>res.status(500).json({msg:'plese provide a valid id ',error:err}))
}

deleteRecipe=(req,res)=>{
    let id =req.params.id;
    Recipe.findByIdAndDelete(id).then(result=>{
        if(result){res.status(200).json('deleted succesfully')}
        else{res.status(404).json('user not found or already deleted')}
    }).catch(err=>{res.status(500).send({msg:'plese provide a valid id ',error:err})})
}





module.exports= {addRecipe,getFav,updRecipe,deleteRecipe};