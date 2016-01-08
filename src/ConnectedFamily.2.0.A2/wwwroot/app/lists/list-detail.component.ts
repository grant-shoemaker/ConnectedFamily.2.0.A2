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
    editingListName = false;
    originalListName = '';

    constructor(
        private _routeParams: RouteParams,
        private _listService: ListService) { }

    ngOnInit() {
        this.getListDetail();
    }

    ngAfterViewInit() {
        jQuery(() => {
            jQuery('[data-toggle="tooltip"]').tooltip();
        });
    }

    editListName() {
        this.originalListName = this.list.listName;
        this.editingListName = true;
        return false;
    }

    saveListName() {
        this._listService.saveList(this.list)
            .then(
                () => this.closeListNameEditor(),
                (jqXHR, textStatus, errorThrown) => console.log("ERROR SAVING LIST: ", errorThrown, textStatus, jqXHR));
    }

    cancelListNameEditor() {
        this.list.listName = this.originalListName;
        this.closeListNameEditor();
    }

    closeListNameEditor() {
        this.editingListName = false;
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