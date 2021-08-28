'use strict';

class Recipe{
    constructor(recipe){
        this.name=recipe.label,
        this.image=recipe.image,
        this.calories=recipe.calories
    }
}

module.exports=Recipe