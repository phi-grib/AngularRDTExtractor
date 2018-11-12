import { Injectable } from '@angular/core';
@Injectable()
export class Globals {
  showSpinner: boolean = false;
  totalStudies: number = 0;
  totalStructures: number = 0;
  totalFindings: number = 0;
  showError: boolean = false;
  errorMsg: string;
  downloading:boolean = false;
}