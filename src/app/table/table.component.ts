import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, AfterViewInit, 
        ViewContainerRef, Renderer2} from '@angular/core';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';
import { ModalDialogService } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';
import { Globals } from '../globals';
import {TooltipModule} from "ngx-tooltip";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,AfterViewInit {

  table_info = {};
  search_form = {};
  categories_search_form = {};
  currentSubstance = '';
  rowIndex = 0;
  splitRow = {};
 
  @ViewChildren('cmp') components:QueryList<ElementRef>;  
<<<<<<< HEAD
  @ViewChildren('cmpTooltip') componentsTooltips:QueryList<ElementRef>;  
=======
  @ViewChildren('cmpTooltip') componentsTooltip:QueryList<ElementRef>;
>>>>>>> dcfadeb749419d877ba2e9e3771f2aec332c2a19

  constructor(private findService : FindingsService, 
              private modalDialogService: ModalDialogService, 
              private viewContainer: ViewContainerRef,
              private renderer: Renderer2,
              private globals: Globals) {}

  ngOnInit() {
    this.findService.currentTable.subscribe (table_info => this.table_info = table_info);
    this.findService.currentSearchFormTable.subscribe (searchFormTable => this.search_form = searchFormTable);
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm => this.categories_search_form = categoriesSearchForm);
  }

  openCustomModal(id:string) {
    this.modalDialogService.openDialog(this.viewContainer, {
      //title: "Molecule",
      childComponent: CustomModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close',
        modalDialogClass: "modal-dialog modal-dialog-centered modal-lg"
      },
      data: id
    });
  }

  ngAfterViewInit() {

    if (this.components !== undefined){
      this.components.forEach((child) => {         
        let options = {'width':150, 'height':150};
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
          let options = {'width':150, 'height':150};
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

    this.findService.searchFinding(this.search_form,this.categories_search_form,page).subscribe(res => {
      this.table_info = res;
      //this.spinner.hide(); 
      this.globals.showSpinner = false
    });
  }
}
