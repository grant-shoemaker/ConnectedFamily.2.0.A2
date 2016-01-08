import {Home} from './home/Home';
import {About} from './about/About';
import {ListsComponent} from './lists/lists.component';
import {ListDetailComponent} from './lists/list-detail.component';
import {RecipesComponent} from './recipes/recipes-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit.component';
import {Route, Router} from 'angular2/router';

export var Routes = {
    home: new Route({ path: '/', name: 'Home', component: Home }),
    about: new Route({ path: '/about', name: 'About', component: About }),

    lists: new Route({ path: '/lists', name: 'Lists', component: ListsComponent }),
    listDetail: new Route({ path: '/lists/:id', name: 'ListDetail', component: ListDetailComponent }),

    recipes: new Route({ path: '/recipes', name: 'Recipes', component: RecipesComponent }),
    recipeDetail: new Route({ path: '/recipes/:id', name: 'RecipeDetail', component: RecipeDetailComponent }),
    recipeEdit: new Route({ path: '/recipes/edit/:id', name: 'RecipeEdit', component: RecipeEditComponent })
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
