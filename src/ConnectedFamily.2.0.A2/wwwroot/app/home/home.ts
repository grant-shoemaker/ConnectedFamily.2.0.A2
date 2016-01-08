import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';

@Component({
    selector: 'home',
    templateUrl: './app/home/home.html'
})
export class Home {

    public _routes = Routes;

    constructor(private _router: Router) {
    }

    navigate(route) {
        this._router.navigate([route.name, {}]);
    }

}