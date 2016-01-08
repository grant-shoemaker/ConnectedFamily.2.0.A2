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
var router_1 = require('angular2/router');
var list_service_1 = require('../services/list.service');
var ListDetailComponent = (function () {
    function ListDetailComponent(_routeParams, _listService) {
        this._routeParams = _routeParams;
        this._listService = _listService;
        this.list = {
            listId: -1,
            listName: 'List Detail',
            itemCount: 0,
            items: [],
            orderId: -1
        };
        this.listLoaded = false;
        this.editingListName = false;
        this.originalListName = '';
    }
    ListDetailComponent.prototype.ngOnInit = function () {
        this.getListDetail();
    };
    ListDetailComponent.prototype.ngAfterViewInit = function () {
        jQuery(function () {
            jQuery('[data-toggle="tooltip"]').tooltip();
        });
    };
    ListDetailComponent.prototype.editListName = function () {
        this.originalListName = this.list.listName;
        this.editingListName = true;
        return false;
    };
    ListDetailComponent.prototype.saveListName = function () {
        var _this = this;
        this._listService.saveList(this.list)
            .then(function () { return _this.closeListNameEditor(); }, function (jqXHR, textStatus, errorThrown) { return console.log("ERROR SAVING LIST: ", errorThrown, textStatus, jqXHR); });
    };
    ListDetailComponent.prototype.cancelListNameEditor = function () {
        this.list.listName = this.originalListName;
        this.closeListNameEditor();
    };
    ListDetailComponent.prototype.closeListNameEditor = function () {
        this.editingListName = false;
    };
    ListDetailComponent.prototype.getListDetail = function () {
        var _this = this;
        var id = parseInt(this._routeParams.get('id'));
        this._listService.getList(id)
            .subscribe(function (lst) {
            _this.list = lst;
            _this.listLoaded = true;
        });
    };
    ListDetailComponent.prototype.toggleCheck = function (item) {
        item.checked = !item.checked;
    };
    ListDetailComponent = __decorate([
        core_1.Component({
            selector: 'list-detail',
            templateUrl: './app/lists/list-detail.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.RouteParams, list_service_1.ListService])
    ], ListDetailComponent);
    return ListDetailComponent;
})();
exports.ListDetailComponent = ListDetailComponent;
//# sourceMappingURL=list-detail.component.js.map