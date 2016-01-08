import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';
import {App} from './app';
import {ListsComponent} from './lists/lists.component';
import {ListService} from './services/list.service';
import {RecipeService} from './services/recipe.service';

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_BINDINGS,
    ListService,
    RecipeService
]);
