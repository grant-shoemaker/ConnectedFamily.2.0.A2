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
var list_service_1 = require('../services/list.service');
var router_1 = require('angular2/router');
var routes_config_1 = require('../routes.config');
var ListsComponent = (function () {
    function ListsComponent(_listService) {
        this._listService = _listService;
        this.listOfLists = [];
        this.routes = routes_config_1.Routes;
    }
    ListsComponent.prototype.ngOnInit = function () {
        this.getLists();
    };
    ListsComponent.prototype.getLists = function () {
        var _this = this;
        this._listService.getLists()
            .subscribe(function (lists) { return _this.listOfLists = lists; });
    };
    ListsComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: './app/lists/lists.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [list_service_1.ListService])
    ], ListsComponent);
    return ListsComponent;
})();
exports.ListsComponent = ListsComponent;
//# sourceMappingURL=lists.component.js.map