import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FindingsService {

  /*private search_form = new BehaviorSubject<any>({});
  currentSearch = this.search_form.asObservable();*/

  private table_form = new BehaviorSubject<any>({});
  currentTable = this.table_form.asObservable();

  apiRoot = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  /*changeSearch(search){
    this.search_form.next(search);
  }*/

  changeTable(table){
    this.table_form.next(table);
  }
  
  getOrgans():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/findings/organs');
  }
  getObservations():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/findings/observations');
  }
  getRoutes():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/findings/routes');
  }
  getSpecies():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/findings/species');
  }
  getSex():Observable<string[]>{
    return this.http.get<string[]>(this.apiRoot+'/findings/sex');
  }

  searchFinding(search_filter,page): Observable<any>{
    let url: string = this.apiRoot+"/findings";
    let params = new HttpParams({ fromObject: search_filter });
    params = params.set('page',page.toString())
    return this.http.get(url, {params: params})
    
  }

  getStudy(study_id): Observable<any>{
    let params = new HttpParams();
    params = params.set('id',study_id.toString())
    return this.http.get(this.apiRoot+'/study', {params: params})
  }
}

