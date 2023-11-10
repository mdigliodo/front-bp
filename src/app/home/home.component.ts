import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app.contants';
import { Benefis } from '../shared/interfaces/benefis.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bankBenefits: Benefis[] = AppConstants.benefits;

  constructor() { }

  ngOnInit(): void {
  }

}
