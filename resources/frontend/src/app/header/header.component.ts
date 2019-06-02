import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { IBreadCrumb } from './breadcrumb.interface';
import { filter, distinctUntilChanged } from 'rxjs/operators';

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
        ) {
            this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
        }

    ngOnInit() {
        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd),
            distinctUntilChanged(),
        ).subscribe(() => {
            this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
            this.renameLabels();
            console.log(this.breadcrumbs);
        })
	}

    buildBreadCrumb(route:ActivatedRoute, url: string = '/novel', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[]{
        //If no routeConfig is avalailable we are on the root path
        let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
        let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

        // If the route is dynamic route such as ':id', remove it
        const lastRoutePart = path.split('/').pop();
        const isDynamicRoute = lastRoutePart.startsWith(':');
        if (isDynamicRoute && !!route.snapshot) {
            const paramName = lastRoutePart.split(':')[1];
            path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
            label = paramName;//route.snapshot.params[paramName];
        }

        //In the routeConfig the complete path is not available,
        //so we rebuild it each time
        const nextUrl = path ? `${url}/${path}` : url;

        const breadcrumb: IBreadCrumb = {
            label: label,
            url: nextUrl,
        };
        // Only adding route with non-empty label
        const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
        if (route.firstChild) {
            //If we are not on our current path yet,
            //there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }

    private renameLabels(){
        this.breadcrumbs.forEach(el => {
            console.log(el);
            if(el.url.indexOf('dictionary') > 0){
                switch(el.label){
                    case 'idNovel':
                        el.label = 'Dictionary Language';
                        break;
                    case 'idDictionary':
                        el.label = 'Categories';
                        break;
                    case 'idCategory':
                        el.label = 'Entries';
                        break;
                }
            } else {
                switch (el.label) {
                    case 'idNovel':
                        el.label = 'List Chapters';
                        break;
                    case 'noChapter':
                        el.label = 'Categories';
                        break;
                }
            }
        });
    }
}
