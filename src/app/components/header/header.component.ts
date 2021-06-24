import { Component } from '@angular/core';

export interface MenuItem {
  url: string;
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuItems: MenuItem[] = [
    {
      url: '/apps',
      title: 'Uygulamalar'
    },
    {
      url: '/products',
      title: 'Ürünler'
    }
  ];

  constructor() { }

}
