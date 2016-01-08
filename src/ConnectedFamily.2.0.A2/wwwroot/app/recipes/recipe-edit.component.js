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
var router_2 = require('angular2/router');
var RecipeEditComponent = (function () {
    function RecipeEditComponent(_routeParams, _recipeService, _router) {
        this._routeParams = _routeParams;
        this._recipeService = _recipeService;
        this._router = _router;
        this.recipe = {
            recipeId: 0,
            title: '',
            recipeDescr: '',
            nbrServings: 0,
            notes: '',
            ingredients: [],
            steps: []
        };
        this.ingredients = '';
        this.steps = '';
        this.recipeLoaded = false;
        this.submitting = false;
    }
    RecipeEditComponent.prototype.ngOnInit = function () {
        this.getRecipeDetail();
    };
    RecipeEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitting = true;
        this.recipe.ingredients = this.getIngredientsArray();
        this.recipe.steps = this.getStepsArray();
        this._recipeService.saveRecipe(this.recipe)
            .then(function (data) { return _this._router.navigate(['RecipeDetail', { id: data }]); }, function (jqXHR, textStatus, errorThrown) { return console.log("ERROR SAVING RECIPE: ", errorThrown, textStatus, jqXHR); });
    };
    RecipeEditComponent.prototype.deleteRecipe = function () {
        var _this = this;
        this._recipeService.deleteRecipe(this.recipe.recipeId)
            .then(function () { return _this._router.navigate(['Recipes']); });
    };
    RecipeEditComponent.prototype.delayedResize = function (txt) {
        var _this = this;
        window.setTimeout(function () { return _this.resize(txt); }, 0);
    };
    RecipeEditComponent.prototype.navigate = function (heroForm, routeName) {
        console.log('navigate()', routeName, heroForm);
        var args = (routeName === 'RecipeDetail') ? {
            id: this.recipe.recipeId
        } : {};
        if (heroForm.form.dirty) {
            if (confirm('You have unsaved changes. Continue?')) {
                this._router.navigate([routeName, args]);
            }
        }
        else {
            this._router.navigate([routeName, args]);
        }
    };
    RecipeEditComponent.prototype.getRecipeDetail = function () {
        var _this = this;
        var id = parseInt(this._routeParams.get('id'));
        if (id <= 0) {
            this.recipeLoaded = true;
        }
        else {
            this._recipeService.getRecipe(id)
                .subscribe(function (r) {
                _this.recipe = r;
                _this.recipeLoaded = true;
                _this.ingredients = r.ingredients
                    .map(function (ingr) { return ingr.name; })
                    .join('\n');
                _this.steps = r.steps
                    .map(function (step) { return step.stepDescr; })
                    .join('\n\n');
                _this.resizeAllTextareas();
            });
        }
    };
    RecipeEditComponent.prototype.getIngredientsArray = function () {
        return this.ingredients.split('\n')
            .filter(function (item) { return item.length > 0; })
            .map(function (ingr, idx) {
            return {
                ingredientId: 0,
                name: ingr,
                orderId: idx + 1
            };
        });
    };
    RecipeEditComponent.prototype.getStepsArray = function () {
        return this.steps.split('\n')
            .filter(function (item) { return item.length > 0; })
            .map(function (step, idx) {
            return {
                recipeStepId: 0,
                stepNumber: idx + 1,
                stepDescr: step
            };
        });
    };
    RecipeEditComponent.prototype.resizeAllTextareas = function () {
        var _this = this;
        window.setTimeout(function () {
            jQuery('textarea.autosize')
                .each(function (idx, ta) { return _this.resize(ta); });
        }, 0);
    };
    RecipeEditComponent.prototype.resize = function (txt) {
        //TODO: add some element to the dom that will take the current height of the textarea
        txt.style.height = 'auto';
        txt.style.height = txt.scrollHeight + 'px';
        var div = jQuery(txt).parent()[0];
        div.style.height = txt.style.height;
    };
    RecipeEditComponent = __decorate([
        core_1.Component({
            selector: 'recipe-editor',
            templateUrl: './app/recipes/recipe-edit.component.html',
            styles: ["\n        textarea {\n            overflow: hidden;\n            resize: none;\n        }\n    "],
            directives: [router_2.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.RouteParams, recipe_service_1.RecipeService, router_2.Router])
    ], RecipeEditComponent);
    return RecipeEditComponent;
})();
exports.RecipeEditComponent = RecipeEditComponent;
//# sourceMappingURL=recipe-edit.component.js.map