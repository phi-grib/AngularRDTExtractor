import { Component } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent{
  colors:Array<any> =
  ["#A11E22",
    "#E8A631",
    "#E8C098",
    "#E5E4DA",
    "#BFB6B3",
    "#FAAC77",
    "#C9C980",
    "#F8EFEE",
    "#60686F",
    "#333C3E"
  ];
  type:string = 'doughnut';
  datasets: any[] = [
    {
      data: [350, 450, 100],
      backgroundColor: this.colors.slice(0,3)
    }];
   labels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 
  
}
