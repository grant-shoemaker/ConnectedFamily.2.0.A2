var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var app_1 = require('./app');
var list_service_1 = require('./services/list.service');
var recipe_service_1 = require('./services/recipe.service');
browser_1.bootstrap(app_1.App, [
    router_1.ROUTER_PROVIDERS,
    http_1.HTTP_BINDINGS,
    list_service_1.ListService,
    recipe_service_1.RecipeService
]);
//# sourceMappingURL=bootstrap.js.map