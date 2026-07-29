import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import menus from '@public/db/menu.json';
import { Menu } from '../../models/menu';
import { contact, social } from '@public/db/contact.json';
import { Contact } from '../../models/contact';
import { Social } from '../../models/social';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  
  email = 'hasnimol0319@gmail.com';
  phone = '+855 66 817 892';
  location = 'Phnom Penh, Cambodia'
  locationLink = 'https://www.google.com/maps/place/Toi/@11.5981772,104.8604297,49m/data=!3m1!1e3!4m6!3m5!1s0x310953b5147b7a47:0x26c42c22123aa276!8m2!3d11.5982825!4d104.8604314!16s%2Fg%2F11p13w_1gl?authuser=0&entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D';
  menu: Menu[] = [];
  contactList: Contact[] = [];
  socialList: Social[] = [];

  ngOnInit(): void {
    this.getMenu();
    this.getContactList();
    this.getSocialList();
  }

  getMenu() {
    this.menu = menus.menu;
  }

  getContactList(){
    this.contactList = contact;
  }

  getSocialList(){
    this.socialList = social;
  }
}
