import { Component, OnInit, Input } from '@angular/core';
import { DndDropEvent } from "ngx-drag-drop";

@Component({
  selector: 'app-mono-plot',
  templateUrl: './mono-plot.component.html',
  styleUrls: ['./mono-plot.component.css']
})
export class MonoPlotComponent implements OnInit {


  @Input() data:any[]
  @Input() labels:any[]
  @Input() datasets:any[]
  @Input() chartType:string = 'line'
  @Input() legend:boolean = true
  @Input() options : any 
  
  charts = [
    {id: 'line', name: "Line"},
    {id: 'pie', name: "Pie"},
    {id: 'doughnut', name: "Doughnut"},
    {id: 'horizontalBar', name: "Horizontal Bar"},
    {id: 'bar', name: "Verical Bar"},
    {id: 'radar', name: "Radar"},
  ];

 
  
  public xAxis:string[] = [
  ];

  public yAxis:string[] = [
  ];

  constructor() { }

  ngOnInit() {

    this.options={
      responsive: true
    };

    //this.labels=['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
    //this.data=[350, 450, 100]

  }

  onDrop( event:DndDropEvent, list:any[] ) {

    let index = event.index;
    if( typeof index === "undefined" ) {
      index = list.length;
    }
    list.splice( index, 0, event.data );
    if (this.xAxis.length>0 && this.yAxis.length>0){
      alert("Both")
    }
  }

  onDragged( item:any, list:any[] ) {
    const index = list.indexOf( item );
    list.splice( index, 1 );
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
