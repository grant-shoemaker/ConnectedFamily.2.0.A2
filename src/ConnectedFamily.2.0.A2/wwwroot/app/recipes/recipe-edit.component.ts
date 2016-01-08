import {Component, View, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Recipe, RecipeIngredient, RecipeStep} from '../models';
import {RecipeService} from '../services/recipe.service';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'recipe-editor',
    templateUrl: './app/recipes/recipe-edit.component.html',
    styles: [`
        textarea {
            overflow: hidden;
            resize: none;
        }
    `],
    directives: [ROUTER_DIRECTIVES]
})
export class RecipeEditComponent implements OnInit {

    private recipe: Recipe = {
        recipeId: 0,
        title: '',
        recipeDescr: '',
        nbrServings: 0,
        notes: '',
        ingredients: [],
        steps: []
    };

    ingredients: string = '';
    steps: string = '';

    recipeLoaded = false;
    submitting = false;

    constructor(
        private _routeParams: RouteParams,
        private _recipeService: RecipeService,
        private _router: Router) { }

    ngOnInit() {
        this.getRecipeDetail();
    }
    
    onSubmit() {
        this.submitting = true;

        this.recipe.ingredients = this.getIngredientsArray();
        this.recipe.steps = this.getStepsArray();

        this._recipeService.saveRecipe(this.recipe)
            .then(
                (data) => this._router.navigate(['RecipeDetail', { id: data }]),
                (jqXHR, textStatus, errorThrown) => console.log("ERROR SAVING RECIPE: ", errorThrown, textStatus, jqXHR));
    }

    deleteRecipe() {
        this._recipeService.deleteRecipe(this.recipe.recipeId)
            .then(() => this._router.navigate(['Recipes']));
    }

    delayedResize(txt: HTMLTextAreaElement) {
        window.setTimeout(() => this.resize(txt), 0);
    }

    navigate(heroForm, routeName) {
        console.log('navigate()', routeName, heroForm);

        var args = (routeName === 'RecipeDetail') ? {
            id: this.recipe.recipeId
        } : {};

        if (heroForm.form.dirty) {
            if (confirm('You have unsaved changes. Continue?')) {
                this._router.navigate([routeName, args]);
            }
        } else {
            this._router.navigate([routeName, args]);
        }
    }

    private getRecipeDetail() {
        let id = parseInt(this._routeParams.get('id'));
        if (id <= 0) {
            this.recipeLoaded = true;
        } else {
            this._recipeService.getRecipe(id)
                .subscribe(r => {
                    this.recipe = r;
                    this.recipeLoaded = true;

                    this.ingredients = r.ingredients
                        .map(ingr => ingr.name)
                        .join('\n');
                    this.steps = r.steps
                        .map(step => step.stepDescr)
                        .join('\n\n');
                    
                    this.resizeAllTextareas();
                });
        }
    }

    private getIngredientsArray() {
        return this.ingredients.split('\n')
            .filter((item) => item.length > 0)
            .map((ingr, idx) => {
                return {
                    ingredientId: 0,
                    name: ingr,
                    orderId: idx + 1
                };
            });
    }

    private getStepsArray() {
        return this.steps.split('\n')
            .filter((item) => item.length > 0)
            .map((step, idx) => {
                return {
                    recipeStepId: 0,
                    stepNumber: idx + 1,
                    stepDescr: step
                };
            });
    }

    private resizeAllTextareas() {
        window.setTimeout(() => {
            jQuery('textarea.autosize')
                .each((idx, ta) => this.resize(ta));
        }, 0);
    }

    private resize(txt) {
        //TODO: add some element to the dom that will take the current height of the textarea
        txt.style.height = 'auto';
        txt.style.height = txt.scrollHeight + 'px';
        var div = jQuery(txt).parent()[0];
        div.style.height = txt.style.height;
    }
}