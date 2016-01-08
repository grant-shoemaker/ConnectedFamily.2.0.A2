import {Component, View, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Recipe, RecipeIngredient, RecipeStep, List} from '../models';
import {RecipeService} from '../services/recipe.service';
import {ListService} from '../services/list.service';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'recipe-detail',
    templateUrl: './app/recipes/recipe-detail.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class RecipeDetailComponent implements OnInit {

    private recipe: Recipe = {
        recipeId: -1,
        title: 'Recipe Detail',
        recipeDescr: '',
        nbrServings: -1,
        notes: '',
        ingredients: [],
        steps: []
    };
    lists: List[] = [];
    recipeLoaded = false

    constructor(
        private _routeParams: RouteParams,
        private _recipeService: RecipeService,
        private _listService: ListService) {
    }

    ngOnInit() {
        this.getRecipeDetail();
    }

    addIngredientsToList(listId: number) {
        alert(`TODO: Adding to list: ${listId}`);
        return false;
    }

    private getRecipeDetail() {
        let id = parseInt(this._routeParams.get('id'));
        this._recipeService.getRecipe(id)
            .subscribe(r => {
                this.recipe = r;
                this.recipeLoaded = true;
            });

        this._listService.getLists()
            .subscribe(l => this.lists = l);
    }
}