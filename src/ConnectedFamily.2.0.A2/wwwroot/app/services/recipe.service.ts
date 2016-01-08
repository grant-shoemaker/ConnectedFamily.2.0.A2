import {Injectable} from 'angular2/core';
import {Recipe, RecipeVM} from '../models';
import {Http} from 'angular2/http';
import {Config} from '../config';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipeService {

    constructor(private http: Http) { }

    listRecipes() {
        return this.http.get(Config.apiPaths.recipes)
            .map((res) => {
                var recipes: Recipe[] = res.json();
                return recipes.map((r) => RecipeVM.fromRecipeModel(r));
            });
    }

    getRecipe(recipeId: number) {
        var url = `${Config.apiPaths.recipes}/${recipeId}`;
        return this.http.get(url)
            .map((res) => < Recipe > res.json());
    }

    saveRecipe(recipe: Recipe) {
        if (recipe.recipeId === 0) {
            return jQuery.post(Config.apiPaths.recipes, { recipe: recipe });
        } else {
            return jQuery.ajax({
                type: 'PUT',
                url: `${Config.apiPaths.recipes}/${recipe.recipeId}`,
                data: {
                    recipe: recipe
                }
            });
        }
    }

    deleteRecipe(recipeId: number) {
        var s: JQueryAjaxSettings = {
            method: 'DELETE',
            data: { recipeId: recipeId },
            url: `${Config.apiPaths.recipes}/${recipeId}`
        };
        return jQuery.ajax(s);
    }

    private biggify(r: Recipe) {
        return {
            RecipeId: r.recipeId,
            Title: r.title,
            RecipeDescr: r.recipeDescr,
            NbrServings: r.nbrServings,
            Notes: r.notes,
            Ingredients: r.ingredients.map((i) => {
                return {
                    IngredientId: i.ingredientId,
                    Name: i.name,
                    OrderId: i.orderId
                };
            }),
            Steps: r.steps.map((s) => {
                return {
                    RecipeStepId: s.recipeStepId,
                    StepNumber: s.stepNumber,
                    StepDescr: s.stepDescr
                };
            })
        }
    }
}