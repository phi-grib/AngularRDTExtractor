import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FindingsService {

  private table_form = new BehaviorSubject<any>({});
  currentTable = this.table_form.asObservable();

  private plot_info = new BehaviorSubject<any>({});
  currentPlot = this.plot_info.asObservable();

  private searchFormTable = new BehaviorSubject<any>({});
  currentSearchFormTable = this.searchFormTable.asObservable();

  private categoriesSearchForm = new BehaviorSubject<any>({});
  currentCategoriesSearchForm= this.categoriesSearchForm.asObservable();

  apiRoot = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  changeTable(table){
    this.table_form.next(table);
  }

  changePlot(plot){
    this.plot_info.next(plot);
  }

  changeSearchFormTable(table){
    this.searchFormTable.next(table);
  }

  changeCategoriesSearchForm(table){
    this.categoriesSearchForm.next(table);
  }

  initFinding(): Observable<any>{
    let url: string = this.apiRoot+"/initFindings";
    let params = new HttpParams();
    params = params.set('page','1')
    return this.http.get(url, {params: params})    
  }

  searchFinding(search_filter,categories_search_filter,page): Observable<any>{
    let url: string = this.apiRoot+"/findings";
    let params = new HttpParams({ fromObject: search_filter });
    let organ_list: string[]=[];
    let observation_list: string[]=[];
    let grade_list: string[]=[];
    let new_value: string;

    Object.keys(categories_search_filter).forEach(function (category) {
      Object.keys(categories_search_filter[category]).forEach(function (key) {
        if (!(categories_search_filter[category][key] == undefined)) {
          for (var i = 0, len = categories_search_filter[category][key].length; i < len; i++) {
            var filter_value = categories_search_filter[category][key][i];
            new_value = category;
            new_value = new_value.concat('|', filter_value);
            if (key === "parameters") {
              organ_list.push(new_value);
            } else if (key === "observations") {
              observation_list.push(new_value);
            } else if (key === "grades") {
              grade_list.push(new_value);
            }
          }
        }
      });
    });
    
    if (organ_list.length > 0) {
      params = params.set("parameters", organ_list.join('@'));
    }
    if (observation_list.length > 0) {
      params = params.set("observations", observation_list.join('@'));
    }
    if (grade_list.length > 0) {
      params = params.set("grades", grade_list.join('@'));
    }
    params = params.set('page',page.toString());
    return this.http.get(url, {params: params})
                    .catch(this.errorHandler);
  }

  page(page): Observable<any>{
    let params = new HttpParams();
    params = params.set('page',page.toString())
    return this.http.get(this.apiRoot+'/page', {params: params})
  }

  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error || "Server Error")
  }

  downloadFiles(): Observable<any>{
    let url: string = this.apiRoot+"/download";
    console.log(url);
    return this.http.get(url)
  }
}