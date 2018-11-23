import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  constructor( public globals: Globals) {}

  ngOnInit() {
  }

  toggleNav() {
    if (document.getElementById("mySidenav").style.width === "330px") {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenav").style.overflow = "hidden";
      document.getElementById("main").style.marginLeft= "25px";
      document.getElementById("main").style.width = "100%";
    } else {
      document.getElementById("mySidenav").style.width = "330px";
      document.getElementById("mySidenav").style.overflow = "auto";
      document.getElementById("main").style.marginLeft = "330px";
      document.getElementById("main").style.width = "calc(100% - 330px)";
    }
  }
}
