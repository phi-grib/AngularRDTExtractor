import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FindingsService {

  private search_form = new BehaviorSubject<any>({});
  currentSearch = this.search_form.asObservable();

  private table_form = new BehaviorSubject<any>({});
  currentTable = this.table_form.asObservable();

  apiRoot = 'http://localhost:8000/api/findings';

  constructor(private http: HttpClient) { }

  changeSearch(search){
    this.search_form.next(search);
  }

  changeTable(table){
    this.table_form.next(table);
  }
  
  getOrgans():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/organs');
  }
  getObservations():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/observations');
  }
  getRoutes():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/routes');
  }
  getSpecies():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/species');
  }
  getSex():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/sex');
  }

  searchFinding(search_filter,page): Observable<any>{
    let url: string = this.apiRoot;
    let params = new HttpParams({ fromObject: search_filter });
    params = params.set('page',page.toString())
    return this.http.get(url, {params: params})
    
  }
}

