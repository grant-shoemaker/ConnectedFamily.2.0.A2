import {Component, View, OnInit} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {List, ListItem} from '../models';
import {ListService} from '../services/list.service';

@Component({
    selector: 'list-detail',
    templateUrl: './app/lists/list-detail.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ListDetailComponent implements OnInit {

    private list: List = {
        listId: -1,
        listName: 'List Detail',
        itemCount: 0,
        items: [],
        orderId: -1
    }
    listLoaded = false;

    constructor(
        private _routeParams: RouteParams,
        private _listService: ListService) { }

    ngOnInit() {
        this.getListDetail();
    }

    private getListDetail() {
        let id = parseInt(this._routeParams.get('id'));
        this._listService.getList(id)
            .subscribe(lst => {
                this.list = lst;
                this.listLoaded = true;
            });
    }

    toggleCheck(item: ListItem) {
        item.checked = !item.checked;
    }
}