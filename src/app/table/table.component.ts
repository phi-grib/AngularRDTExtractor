import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, 
  ViewContainerRef} from '@angular/core';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';
import { ModalDialogService } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { Globals } from '../globals';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit,AfterViewInit {

  table_info = <any>{};
  search_form = <any>{};
  categories_search_form = <any>{};
  currentSubstance = '';
  rowIndex = 0;
  splitRow = {};

  @ViewChildren('cmp') components:QueryList<ElementRef>;  
  @ViewChildren('cmpTooltip') componentsTooltip:QueryList<ElementRef>;

  constructor(private findService : FindingsService, 
          private modalDialogService: ModalDialogService, 
          private viewContainer: ViewContainerRef,
          private _router: Router,
          public globals: Globals) {}

  ngOnInit() {
    this.findService.currentTable.subscribe (table_info => this.table_info = table_info);
    this.findService.currentSearchFormTable.subscribe (searchFormTable => this.search_form = searchFormTable);
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm => this.categories_search_form = categoriesSearchForm);
  }

  openCustomModal(id:string) {
    this.modalDialogService.openDialog(this.viewContainer, {
      childComponent: CustomModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close',
        modalDialogClass: "modal-dialog modal-dialog-centered modal-lg"
      },
      data: id
    });
  }

  ngAfterViewInit() {
    if (this.components !== undefined) {
      this.components.forEach((child) => {         
        let options = {'width':100, 'height':75};
        let smilesDrawer = new SmilesDrawer.Drawer(options);
        SmilesDrawer.parse(child.nativeElement.textContent, function (tree) {
          smilesDrawer.draw(tree,child.nativeElement.id, 'light', false);
          }, function (err) {
            console.log(err);
          });    
      });
    }

    this.components.changes.subscribe((component) => {  
      if (this.components !== undefined){
        this.components.forEach((child) => {         
          let options = {'width':100, 'height':75};
          let smilesDrawer = new SmilesDrawer.Drawer(options);
          SmilesDrawer.parse(child.nativeElement.textContent, function (tree) {
            smilesDrawer.draw(tree,child.nativeElement.id, 'light', false);
          }, function (err) {
            console.log(err);
          });
        });
      }
    });
  }

  Page(page:number){
    //this.spinner.show();
    this.globals.showSpinner = true;
    this.findService.page(page).subscribe(res => {
      this.table_info.data = res.data;
      this.table_info.range_pages = res.range_pages
      this.table_info.num_pages = res.num_pages	
      this.table_info.page = res.page
      this.table_info.previous_page = res.previous_page	
      this.table_info.next_page = res.next_page
      //this.spinner.hide(); 
      this.globals.showSpinner = false
    });
  }
  closeError(){
    this._router.navigate(['/']);
  }
}