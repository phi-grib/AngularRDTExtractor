import { Component, OnInit, Input,ViewChildren,QueryList,ElementRef,AfterViewInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,AfterViewInit {

  objectKeys = Object.keys;
  relevant_form : boolean;

  table_info = {};
  @Input() searchFormTable = {};
  @ViewChildren('cmp') components:QueryList<ElementRef>;
  

  constructor(private findService : FindingsService) {}

  ngOnInit() {
    this.findService.currentTable.subscribe (table_info => this.table_info = table_info);
  }

  ngAfterViewInit() {

    this.components.changes.subscribe((component) => { 
      
      if (this.components !== undefined){
        this.components.forEach((child) => { 
         
          let options = {'width':200, 'height':200};
          let smilesDrawer = new SmilesDrawer.Drawer(options);
        
          SmilesDrawer.parse("CC(=O)OC1=CC=CC=C1C(=O)O", function (tree) {
            smilesDrawer.draw(tree,child.nativeElement.id, 'light', false);
            }, function (err) {
              console.log(err);
            });
        });
      }
    });

  }
  Page(page:number){
    this.findService.searchFinding(this.searchFormTable,page).subscribe(res => this.table_info = res); 
  }

}
