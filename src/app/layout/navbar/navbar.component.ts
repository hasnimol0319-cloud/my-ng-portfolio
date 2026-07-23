import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { map } from 'rxjs';

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
constructor(
  private http: HttpClient
) {}
  ngOnInit(){
    this.getMenu();
  }

  getMenu() {
    this.http.get('/db/menu.json').pipe(map((d:any) => d.menu)).subscribe((res:Menu[]) => {
      this.menu = res;
    })
  }
}
