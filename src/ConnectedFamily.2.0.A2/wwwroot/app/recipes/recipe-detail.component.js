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
var router_1 = require('angular2/router');
var recipe_service_1 = require('../services/recipe.service');
var list_service_1 = require('../services/list.service');
var router_2 = require('angular2/router');
var RecipeDetailComponent = (function () {
    function RecipeDetailComponent(_routeParams, _recipeService, _listService, _router) {
        this._routeParams = _routeParams;
        this._recipeService = _recipeService;
        this._listService = _listService;
        this._router = _router;
        this.recipe = {
            recipeId: -1,
            title: 'Recipe Detail',
            recipeDescr: '',
            nbrServings: -1,
            notes: '',
            ingredients: [],
            steps: []
        };
        this.lists = [];
        this.recipeLoaded = false;
    }
    RecipeDetailComponent.prototype.ngOnInit = function () {
        this.getRecipeDetail();
    };
    RecipeDetailComponent.prototype.addIngredientsToList = function (listId) {
        var _this = this;
        this._listService.addRecipeToList(listId, this.recipe.recipeId)
            .then(function (data) { return _this._router.navigate(['ListDetail', { id: listId }]); }, function (jqXHR, textStatus, errorThrown) { return console.log("ERROR ADDING RECIPE TO LIST: ", errorThrown, textStatus, jqXHR); });
        return false;
    };
    RecipeDetailComponent.prototype.getRecipeDetail = function () {
        var _this = this;
        var id = parseInt(this._routeParams.get('id'));
        this._recipeService.getRecipe(id)
            .subscribe(function (r) {
            _this.recipe = r;
            _this.recipeLoaded = true;
        });
        this._listService.getLists()
            .subscribe(function (l) { return _this.lists = l; });
    };
    RecipeDetailComponent = __decorate([
        core_1.Component({
            selector: 'recipe-detail',
            templateUrl: './app/recipes/recipe-detail.component.html',
            directives: [router_2.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.RouteParams, recipe_service_1.RecipeService, list_service_1.ListService, router_2.Router])
    ], RecipeDetailComponent);
    return RecipeDetailComponent;
})();
exports.RecipeDetailComponent = RecipeDetailComponent;
//# sourceMappingURL=recipe-detail.component.js.map