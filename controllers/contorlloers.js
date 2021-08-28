
const axios = require('axios');

const Recipe=require('../module/moudle')

getall=(req,res)=>{
     axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=c64ac740&app_key=44ae989b37a23b4fe3efcb47953639e4`)
     .then(resp=>{
         let data=resp.data.hits;
         let newData=  data.map(rec=>{
           return new Recipe(rec.recipe)
         })
         res.json(newData)
     })
}


module.exports=getall;