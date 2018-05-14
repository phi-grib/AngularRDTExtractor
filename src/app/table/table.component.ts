import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  objectKeys = Object.keys;
  relevant_form : boolean;
  table_info = {};
  apiRoot = 'http://localhost:8000';
  data=[];
  range_pages=[];
  num_pages:number = 0;
  page:number = 0;
  previous_page:number = 0;
  next_page:number = 0;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {

    let url: string = this.apiRoot+'/findings';
    let search = new HttpParams();
    search = search.set('page', '0');
    this.httpClient.get(url, {params: search})
    .subscribe(res =>{
                      this.data = res['data'];
                      this.range_pages = res['range_pages'];
                      this.num_pages = res['num_pages'];
                      this.page = res['page'];
                      this.previous_page = res['previous_page'];
                      this.next_page = res['next_page'];         
                    }); 
  }

}
