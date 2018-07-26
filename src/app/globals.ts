import { Injectable } from '@angular/core';
@Injectable()
export class Globals {
  showSpinner: boolean = false;
  totalStructures: number = 0;
  actualStructures: number = 0;
  totalStudies: number = 0;
  actualStudies: number = 0;
}