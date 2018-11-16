import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Globals } from './globals'

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

  constructor(private http: HttpClient, public globals: Globals) { }

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

  download(data: any) {
    var blob = new Blob([data], { type: "application/zip"});
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

  downloadFiles(): void {
    let url: string = this.apiRoot+'/download';
    let params = new HttpParams();
    this.globals.downloading = true
    this.http.get(url, {responseType: 'blob' as 'json', params: params}).subscribe(
      (response: any) =>{
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', 'results.zip');
          document.body.appendChild(downloadLink);
          downloadLink.click();
          this.globals.downloading = false
         
      }
    )
  }
}