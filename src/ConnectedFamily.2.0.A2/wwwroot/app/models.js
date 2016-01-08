var RecipeVM = (function () {
    function RecipeVM(recipeId, title, recipeDescr, nbrServings, notes, ingredients, steps, filtered) {
        this.recipeId = recipeId;
        this.title = title;
        this.recipeDescr = recipeDescr;
        this.nbrServings = nbrServings;
        this.notes = notes;
        this.ingredients = ingredients;
        this.steps = steps;
        this.filtered = filtered;
    }
    RecipeVM.fromRecipeModel = function (recipe) {
        return new RecipeVM(recipe.recipeId, recipe.title, recipe.recipeDescr, recipe.nbrServings, recipe.notes, recipe.ingredients, recipe.steps, false);
    };
    return RecipeVM;
})();
exports.RecipeVM = RecipeVM;
//# sourceMappingURL=models.js.map