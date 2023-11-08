import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';
import { AppConstants } from 'src/app/app.contants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: Menu[] = AppConstants.menuItems;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect(link: string) {
    this.router.navigate([link]);
  }
}
