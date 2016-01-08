var Home_1 = require('./home/Home');
var About_1 = require('./about/About');
var lists_component_1 = require('./lists/lists.component');
var list_detail_component_1 = require('./lists/list-detail.component');
var recipes_component_1 = require('./recipes/recipes.component');
var recipe_detail_component_1 = require('./recipes/recipe-detail.component');
var recipe_edit_component_1 = require('./recipes/recipe-edit.component');
var router_1 = require('angular2/router');
exports.Routes = {
    home: new router_1.Route({ path: '/', name: 'Home', component: Home_1.Home }),
    about: new router_1.Route({ path: '/about', name: 'About', component: About_1.About }),
    lists: new router_1.Route({ path: '/lists', name: 'Lists', component: lists_component_1.ListsComponent }),
    listDetail: new router_1.Route({ path: '/lists/:id', name: 'ListDetail', component: list_detail_component_1.ListDetailComponent }),
    recipes: new router_1.Route({ path: '/recipes', name: 'Recipes', component: recipes_component_1.RecipesComponent }),
    recipeDetail: new router_1.Route({ path: '/recipes/:id', name: 'RecipeDetail', component: recipe_detail_component_1.RecipeDetailComponent }),
    recipeEdit: new router_1.Route({ path: '/recipes/edit/:id', name: 'RecipeEdit', component: recipe_edit_component_1.RecipeEditComponent })
};
exports.APP_ROUTES = Object.keys(exports.Routes).map(function (r) { return exports.Routes[r]; });
//# sourceMappingURL=routes.config.js.map