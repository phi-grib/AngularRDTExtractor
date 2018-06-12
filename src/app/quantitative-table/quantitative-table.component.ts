import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import {TooltipModule} from "ngx-tooltip";
import {
    TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
TreeviewEventParser, DownlineTreeviewEventParser, DownlineTreeviewItem} from 'ngx-treeview';
import { isNull } from 'util';

@Component({
  selector: 'app-quantitative-table',
  templateUrl: './quantitative-table.component.html',
  styleUrls: ['./quantitative-table.component.css'],
 providers: [
    { provide: TreeviewEventParser, useClass: DownlineTreeviewEventParser }
]
})
export class QuantitativeTableComponent{

  
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
     hasAllCheckBox: false,
      hasFilter: true,
      maxHeight: 400   
  });
  buttonClass = 'btn-outline-secondary';
  rows={}
  objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
    let organs ={"hola":{},"adios":{},"liver":{"liver1":{"liver11":{},"liver12":{"liver121":{},"liver122":{}}},"liver2":{}},
             "lunge":{}}
     this.items=this.createTreeview(organs);   
 }
 

 /*Recursive function*/ 
 createTreeview (organs:{}):TreeviewItem[]{
    
    let items: TreeviewItem[] = [];
    let item
    for (var key in organs) {   
        if (Object.keys(organs[key]).length>0){    
            this.createTreeview(organs[key])
            item = new TreeviewItem({ text:key, value:key, collapsed: true, checked: false,children: this.createTreeview(organs[key])})
            items.push(item);
        }
        else{
            item = new TreeviewItem({ text:key, value:key, collapsed: true,checked: false})
            items.push(item);
        }      
    }  
   return items;
 }



  onFilterChange(downlineItems: DownlineTreeviewItem[]) {

    this.rows = {};
        downlineItems.forEach(downlineItem => {   
            const item = downlineItem.item;
            this.rows[item.text]=true;
            let parent = downlineItem.parent;
           while (!isNull(parent) && parent.item.checked) {
                this.rows[parent.item.text]=true;
                parent = parent.parent;
            }
        });
        
    
    }
}
