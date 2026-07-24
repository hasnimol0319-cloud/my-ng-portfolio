import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import menus from '@public/db/menu.json';

interface Menu{
  id: number,
  name: string,
  url: string
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  menu:Menu[] = [];

  alert(h: string) {
    console.log(h);
    
  }
constructor() {}
  ngOnInit(){
    this.getMenu();
  }

  getMenu() {
    this.menu = menus.menu;
  }
}
