import { Component, OnInit, Input } from '@angular/core';
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
  @Input() searchFormTable = {};

  constructor(private findService : FindingsService) {}

  ngOnInit() {
    this.findService.currentTable.subscribe (table_info => this.table_info = table_info);
  }

  Page(page:number){
    this.findService.searchFinding(this.searchFormTable,page).subscribe(res => this.table_info = res); 
  }
}
