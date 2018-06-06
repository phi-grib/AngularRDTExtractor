import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import {TooltipModule} from "ngx-tooltip";
import { TreeviewItem, TreeviewConfig, TreeItem } from 'ngx-treeview';

@Component({
  selector: 'app-quantitative-table',
  templateUrl: './quantitative-table.component.html',
  styleUrls: ['./quantitative-table.component.css']
})
export class QuantitativeTableComponent{

  dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
     // hasAllCheckBox: true,
      hasFilter: true,
      //hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
  buttonClass = 'btn-outline-secondary';

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
            item = new TreeviewItem({ text:key, value:key, checked: false,children: this.createTreeview(organs[key])})
            items.push(item);
        }
        else{
            item = new TreeviewItem({ text:key, value:key, checked: false})
            items.push(item);
        }      
    }  
   return items;
 }



  onFilterChange(value: string) {
      console.log('filter:', value);
  }
}
