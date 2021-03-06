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
var http_1 = require('angular2/http');
var config_1 = require('../config');
require('rxjs/add/operator/map');
var ListService = (function () {
    function ListService(http) {
        this.http = http;
    }
    ListService.prototype.getLists = function () {
        return this.http.get(config_1.Config.apiPaths.lists)
            .map(function (res) { return res.json(); });
    };
    ListService.prototype.getList = function (id) {
        var url = config_1.Config.apiPaths.lists + "/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ListService.prototype.saveList = function (list) {
        if (list.listId === 0) {
            return jQuery.post(config_1.Config.apiPaths.lists, { listName: list.listName });
        }
        else {
            return jQuery.ajax({
                type: 'PUT',
                url: config_1.Config.apiPaths.lists + "/" + list.listId,
                data: {
                    list: list
                }
            });
        }
    };
    ListService.prototype.addRecipeToList = function (listId, recipeId) {
        var url = config_1.Config.apiPaths.lists + "/" + listId + "/addrecipe/" + recipeId;
        return jQuery.ajax({
            type: 'PUT',
            url: url,
            data: {
                listId: listId,
                recipeId: recipeId
            }
        });
    };
    ListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListService);
    return ListService;
})();
exports.ListService = ListService;
//# sourceMappingURL=list.service.js.map