import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import menus from '@public/db/menu.json';
import { Menu } from '../../models/menu';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  menu: Menu[] = [];
  isMenuOpen = false;

  alert(h: string) {
    console.log(h);
    
  }
constructor() {}
  ngOnInit(){
    this.getMenu();
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(){
    this.isMenuOpen = false;
  }

  getMenu() {
    this.menu = menus.menu;
  }
}
