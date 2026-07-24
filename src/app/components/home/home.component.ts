import { Component } from '@angular/core';
import solutions from '@public/db/solutions.json';

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
  solutionList: Solution[] = [];

  constructor() {}

ngOnInit() {
  this.getSolution();
}
  getSolution() {
    this.solutionList = solutions.solutions;
  }
}
