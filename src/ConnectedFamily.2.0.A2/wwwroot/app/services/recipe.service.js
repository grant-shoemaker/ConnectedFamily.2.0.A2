var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var models_1 = require('../models');
var http_1 = require('angular2/http');
var config_1 = require('../config');
require('rxjs/add/operator/map');
var RecipeService = (function () {
    function RecipeService(http) {
        this.http = http;
    }
    RecipeService.prototype.listRecipes = function () {
        return this.http.get(config_1.Config.apiPaths.recipes)
            .map(function (res) {
            var recipes = res.json();
            return recipes.map(function (r) { return models_1.RecipeVM.fromRecipeModel(r); });
        });
    };
    RecipeService.prototype.getRecipe = function (recipeId) {
        var url = config_1.Config.apiPaths.recipes + "/" + recipeId;
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    RecipeService.prototype.saveRecipe = function (recipe) {
        if (recipe.recipeId === 0) {
            return jQuery.post(config_1.Config.apiPaths.recipes, { recipe: recipe });
        }
        else {
            return jQuery.ajax({
                type: 'PUT',
                url: config_1.Config.apiPaths.recipes + "/" + recipe.recipeId,
                data: {
                    recipe: recipe
                }
            });
        }
    };
    RecipeService.prototype.deleteRecipe = function (recipeId) {
        var s = {
            method: 'DELETE',
            data: { recipeId: recipeId },
            url: config_1.Config.apiPaths.recipes + "/" + recipeId
        };
        return jQuery.ajax(s);
    };
    RecipeService.prototype.biggify = function (r) {
        return {
            RecipeId: r.recipeId,
            Title: r.title,
            RecipeDescr: r.recipeDescr,
            NbrServings: r.nbrServings,
            Notes: r.notes,
            Ingredients: r.ingredients.map(function (i) {
                return {
                    IngredientId: i.ingredientId,
                    Name: i.name,
                    OrderId: i.orderId
                };
            }),
            Steps: r.steps.map(function (s) {
                return {
                    RecipeStepId: s.recipeStepId,
                    StepNumber: s.stepNumber,
                    StepDescr: s.stepDescr
                };
            })
        };
    };
    RecipeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RecipeService);
    return RecipeService;
})();
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe.service.js.map