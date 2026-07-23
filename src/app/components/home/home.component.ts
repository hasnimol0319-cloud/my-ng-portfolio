import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';

interface Solution {
  id: number,
  title: string,
  description: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  solutions: Solution[] = [];

  constructor(
    private http: HttpClient
  ) {}

ngOnInit() {
  this.getSolution();
}
  getSolution() {
    this.http.get('/db/solutions.json').pipe(map((d:any) => d.solutions)).subscribe((res: Solution[]) => {
      this.solutions = res;
    })
  }
}
