import { Component, OnInit, ViewChildren,QueryList, ElementRef, AfterViewInit} from '@angular/core';
import * as SmilesDrawer from 'smiles-drawer';
import { FindingsService } from '../findings.service';
import { delay } from 'rxjs/operator/delay';

@Component({
  selector: 'app-qualitative-table',
  templateUrl: './qualitative-table.component.html',
  styleUrls: ['./qualitative-table.component.css']
})
export class QualitativeTableComponent implements AfterViewInit {

  
  table_info = {};

  constructor(private findService : FindingsService) { }

  @ViewChildren('cmp') components:QueryList<ElementRef>;
  
  
  ngAfterViewInit() {

    this.findService.currentTable.subscribe (table_info => {
        this.table_info = table_info;   
    });
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

  Draw(last){

    alert(last);
  }
 
}
