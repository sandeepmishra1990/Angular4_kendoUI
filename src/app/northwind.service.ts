import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';

export abstract class NorthwindService extends BehaviorSubject<GridDataResult> {
    private BASE_URL = 'https://odatasampleservices.azurewebsites.net/V4/Northwind/Northwind.svc/';

    constructor(
        private http: HttpClient,
        protected tableName: string
    ) {
        super(null);
    }

    public query(state: any): void {
        this.fetch(this.tableName, state)
            .subscribe(x => super.next(x));
    }

    protected fetch(tableName: string, state: any): Observable<GridDataResult> {
        const queryStr = `${toODataString(state)}&$count=true`;
        console.log(queryStr);
        return this.http
            .get(`${this.BASE_URL}${tableName}?${queryStr}`)
            .pipe(
                map(response => (<GridDataResult>{
                    data: response['value'],
                    total: parseInt(response['@odata.count'], 10)
                }))
            );
    }

  protected products3(): Observable<any> {

      return this.http.get('assets/products2.json')
        .pipe(
     map(res => {return res}));





}

  protected products5(): Observable<GridDataResult> {

      return this.http.get('assets/products2.json')
        .pipe(
     map(res => ( <GridDataResult>{
                    data: res['books'],
                    total: 13
                })
        )

      );





}
}



  @Injectable()
export class CategoriesService extends NorthwindService {
    constructor(http: HttpClient) { super(http, 'Categories'); }

    queryAll(st?: any): Observable<GridDataResult> {
        const state = Object.assign({}, st);
        delete state.skip;
        delete state.take;

        return this.fetch(this.tableName, state);
    }

    products2(): Observable<any[]> {


      return this.products3();
    }

      products4(): Observable<GridDataResult> {
       return this.products5();
     }

}