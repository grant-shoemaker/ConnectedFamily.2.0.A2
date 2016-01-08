import {Injectable} from 'angular2/core';
import {List} from '../models';
import {Http, Response} from 'angular2/http';
import {Config} from '../config';
import 'rxjs/add/operator/map';

@Injectable()
export class ListService {

    constructor(private http: Http) { }

    getLists() {
        return this.http.get(Config.apiPaths.lists)
            .map((res) => <List[]>res.json());
    }

    getList(id: number) {
        var url = `${Config.apiPaths.lists}/${id}`
        return this.http.get(url)
            .map((res) => <List>res.json());
    }

    saveList(list: List) {
        if (list.listId === 0) {
            return jQuery.post(Config.apiPaths.lists, { listName: list.listName });
        } else {
            return jQuery.ajax({
                type: 'PUT',
                url: `${Config.apiPaths.lists}/${list.listId}`,
                data: {
                    list: list
                }
            });
        }
    }

    addRecipeToList(listId: number, recipeId: number) {
        var url = `${Config.apiPaths.lists}/${listId}/addrecipe/${recipeId}`;

        return jQuery.ajax({
            type: 'PUT',
            url: url,
            data: {
                listId: listId,
                recipeId: recipeId
            }
        });
    }
}