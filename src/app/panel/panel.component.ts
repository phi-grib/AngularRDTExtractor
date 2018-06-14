import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FindingsService } from '../findings.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  objectKeys = Object.keys;
  @Input() searchFormPanel = {};
  @Input() key :string;
  @Output()relevantClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private findService : FindingsService) { }

  ngOnInit() {
    this.findService.currentTable.subscribe ();
  }  

  removeThis(key: string,value: string){
    let not_key:string = 'not_'+key;
    if (value===undefined){
      delete this.searchFormPanel[key];
      delete this.searchFormPanel[not_key];
    }
    else{
      this.searchFormPanel[key].splice(value, 1);
      if (this.searchFormPanel[key].length==0){
        delete this.searchFormPanel[key];
      }
      this.searchFormPanel[not_key].splice(value, 1);
      if (this.searchFormPanel[not_key].length==0){
        delete this.searchFormPanel[not_key];
      }
    } 
    this.findService.searchFinding(this.searchFormPanel,1).subscribe(table_info => this.findService.changeTable(table_info));
  }  

  notThis(event:any, key: string, value: string){
    let not_key:string = 'not_'+key;
    if (not_key in this.searchFormPanel && this.searchFormPanel[not_key].indexOf(value)!=-1) {
      // Remove from the 'NOT filter' list
      delete this.searchFormPanel[not_key];
    }
    else{
      // And add to the 'NOT filter' list
      if (not_key in this.searchFormPanel){
        // Check the value isn't already inserted
        if (this.searchFormPanel[not_key].indexOf(value)==-1){   
          this.searchFormPanel[not_key].push(value);
        }
      }
      else{
        this.searchFormPanel[not_key]=[value];
      }
    }   
    this.findService.searchFinding(this.searchFormPanel,1).subscribe(table_info => this.findService.changeTable(table_info));
  }
}
