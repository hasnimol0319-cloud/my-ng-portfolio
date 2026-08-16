import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import menus from '@public/db/menu.json';
import { Menu } from '../../models/menu';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  themeService = inject(ThemeService);
  menu: Menu[] = [];
  isMenuOpen = false;

  ngOnInit() {
    this.getMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  getMenu() {
    this.menu = menus.menu;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
