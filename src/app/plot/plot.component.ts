import { Component, OnInit, Input,ViewChildren,QueryList,ElementRef,AfterViewInit ,ViewContainerRef, Renderer2} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  table_info = {};
  @Input() searchFormTable = {};
  @ViewChildren('cmp') components:QueryList<ElementRef>;

  constructor(private findService : FindingsService, 
    private modalDialogService: ModalDialogService, 
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2) {}

  ngOnInit() {
    this.findService.currentTable.subscribe (table_info => this.table_info = table_info);
  }
}
