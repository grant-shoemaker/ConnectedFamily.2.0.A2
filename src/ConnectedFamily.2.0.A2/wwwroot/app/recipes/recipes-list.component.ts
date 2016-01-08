import {Component, OnInit} from 'angular2/core';
import {Recipe, RecipeVM} from '../models';
import {RecipeService} from '../services/recipe.service';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Routes, APP_ROUTES} from '../routes.config';

@Component({
    selector: 'lists',
    templateUrl: './app/recipes/recipes-list.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class RecipesComponent implements OnInit {
    public routes;
    constructor(private _recipeService: RecipeService) {
        this.routes = Routes;
    }

    recipes: RecipeVM[] = [];
    filterApplied = false;
    
    ngOnInit() {
        this.getRecipes();
    }

    getRecipes() {
        this._recipeService.listRecipes()
            .subscribe(rcps => this.recipes = rcps);
    }

    filterRecipes(filterString: string) {
        var filter = filterString.trim().toLowerCase();

        //Clear any previous filter
        this.recipes.forEach((recipe) => recipe.filtered = false);
        this.filterApplied = false;

        if (filter.length > 0) {
            this.recipes.filter((recipe) => recipe.title.toLowerCase().indexOf(filter) >= 0)
                .forEach((recipe) => recipe.filtered = true);
            this.filterApplied = true;
        }
    }
}