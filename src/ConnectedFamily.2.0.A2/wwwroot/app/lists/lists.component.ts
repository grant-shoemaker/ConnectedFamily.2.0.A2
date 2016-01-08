import {Component, OnInit} from 'angular2/core';
import {List} from '../models';
import {ListService} from '../services/list.service';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Routes, APP_ROUTES} from '../routes.config';

@Component({
    selector: 'app',
    templateUrl: './app/lists/lists.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ListsComponent implements OnInit {
    public routes;
    constructor(private _listService: ListService) {
        this.routes = Routes;
    }
    
    listOfLists: List[] = [];

    ngOnInit() {
        this.getLists();
    }

    private getLists() {
        this._listService.getLists()
            .subscribe(lists => this.listOfLists = lists);
    }
}