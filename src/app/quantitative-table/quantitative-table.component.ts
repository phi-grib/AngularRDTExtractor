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
    let organs ={'organ system': {'endocrine system': {'endocrine gland': {'adrenal gland': {'adrenal gland medulla': {}}}},
    'visceral organ system': {'reproductive system': {'female reproductive system': {'vagina': {},
       'female reproductive gland/organ': {'vagina': {}}}}},
    'integumental system': {'skin': {'skin mucocutaneous zone': {'vagina': {}}}},
    'cardiovascular system': {'vascular system': {'blood vessel': {'arterial blood vessel': {'aorta': {}},
       'trunk blood vessel': {'thoracic segment blood vessel': {'thoracic cavity blood vessel': {'thoracic cavity artery': {'aorta': {}}}}}},
      'arterial system': {'arterial blood vessel': {'aorta': {}}}}}},
   'anatomic region': {'trunk': {'abdominal segment of trunk': {'abdomen': {'abdomen organ': {'adrenal gland': {'adrenal gland medulla': {}}}},
      'abdominal segment organ': {'abdomen organ': {'adrenal gland': {'adrenal gland medulla': {}}},
       'pelvis organ': {'female reproductive gland/organ': {'vagina': {}}}},
      'pelvis': {'pelvis organ': {'female reproductive gland/organ': {'vagina': {}}}}},
     'trunk organ': {'abdominal segment organ': {'abdomen organ': {'adrenal gland': {'adrenal gland medulla': {}}},
       'pelvis organ': {'female reproductive gland/organ': {'vagina': {}}}}},
     'thoracic segment of trunk': {'thoracic segment blood vessel': {'thoracic cavity blood vessel': {'thoracic cavity artery': {'aorta': {}}}},
      'thoracic cavity': {'thoracic cavity blood vessel': {'thoracic cavity artery': {'aorta': {}}}}},
     'trunk blood vessel': {'thoracic segment blood vessel': {'thoracic cavity blood vessel': {'thoracic cavity artery': {'aorta': {}}}}}}}}
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
