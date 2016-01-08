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
var recipe_service_1 = require('../services/recipe.service');
var router_1 = require('angular2/router');
var routes_config_1 = require('../routes.config');
var RecipesComponent = (function () {
    function RecipesComponent(_recipeService) {
        this._recipeService = _recipeService;
        this.recipes = [];
        this.filterApplied = false;
        this.routes = routes_config_1.Routes;
    }
    RecipesComponent.prototype.ngOnInit = function () {
        this.getRecipes();
    };
    RecipesComponent.prototype.getRecipes = function () {
        var _this = this;
        this._recipeService.listRecipes()
            .subscribe(function (rcps) { return _this.recipes = rcps; });
    };
    RecipesComponent.prototype.filterRecipes = function (filterString) {
        var filter = filterString.trim().toLowerCase();
        //Clear any previous filter
        this.recipes.forEach(function (recipe) { return recipe.filtered = false; });
        this.filterApplied = false;
        if (filter.length > 0) {
            this.recipes.filter(function (recipe) { return recipe.title.toLowerCase().indexOf(filter) >= 0; })
                .forEach(function (recipe) { return recipe.filtered = true; });
            this.filterApplied = true;
        }
    };
    RecipesComponent = __decorate([
        core_1.Component({
            selector: 'lists',
            templateUrl: './app/recipes/recipes.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [recipe_service_1.RecipeService])
    ], RecipesComponent);
    return RecipesComponent;
})();
exports.RecipesComponent = RecipesComponent;
//# sourceMappingURL=recipes.component.js.map