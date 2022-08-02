import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { IBreadCrumb } from './breadcrumb.interface';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from '../api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public breadcrumbs: IBreadCrumb[];

    constructor(
          private router: Router
        , private activatedRoute: ActivatedRoute
        , private api: ApiService
        ) {
            this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
        }

    ngOnInit() {
        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd),
            distinctUntilChanged(),
        ).subscribe((next) => {
            //console.log('ROUTER', next, this.activatedRoute.root);
            this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
            this.renameLabels();
            //console.log('ROUTER END');
        });
  }

    buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
        // If no routeConfig is avalailable we are on the root path
        let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
        let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

        if (path === 'dashboard' ) {
            return [];
        }

        // If the route is dynamic route such as ':id', remove it
        // Nota that here, the id appears before the actions, thus, using "shift" instead of "pop"
        const lastRoutePart = path.split('/').shift();
        const isDynamicRoute = lastRoutePart.startsWith(':');
        let type = null;
        if (isDynamicRoute && !!route.snapshot) {
            const paramName = lastRoutePart.split(':')[1];
            path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
            label = route.snapshot.params[paramName]; // '_' + paramName + ':' + route.snapshot.params[paramName];
            type = paramName;
        }

        // In the routeConfig the complete path is not available,
        // so we rebuild it each time
        const nextUrl = path ? `${url}/${path}` : url;

        const breadcrumb: IBreadCrumb = {
            label,
            url: nextUrl,
            type
        };
        // Only adding route with non-empty label
        const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
        if (route.firstChild) {
            // If we are not on our current path yet,
            // there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }

    private renameLabels() {
        const rememberVariables = {
            idNovel: null,
            idDictionary: null,
            idCategory: null,
            noChapter: null
        };
        //console.log('header calls');
        this.breadcrumbs.forEach(el => {
            if (el.type) {
                rememberVariables[el.type] = parseInt(el.label, 10);
                el.label = '';
                switch (el.type) {
                    case 'idNovel':
                        this.api.Novel.get({ id: rememberVariables.idNovel})
                            .then(novel => {
                                el.label = 'Chapters: ' + novel.nameCustom;
                            });
                        break;
                    case 'idDictionary':
                        this.api.Dictionary.get({ id: rememberVariables.idDictionary })
                            .then(dictionary => {
                                el.label = 'Cat: ' + dictionary.name;
                            });
                        break;
                    case 'idCategory':
                        this.api.Category.get({ idDictionary: rememberVariables.idDictionary, id: rememberVariables.idCategory })
                            .then(category => {
                                el.label = 'Entries: ' + category.name;
                            });
                        break;
                    case 'noChapter':
                        this.api.Chapter.get({ idNovel: rememberVariables.idNovel, no: rememberVariables.noChapter })
                            .then(chapter => {
                                el.label = 'Chapter: ' + chapter.title;
                            });
                        break;
                }
            }
        });
        //console.log('header calls end');
    }
}
