import { Component } from '@angular/core';
import solutions from '@public/db/solutions.json';
import { FeatureImageComponent } from '../../shared/components/feature-image/feature-image.component';
import { WorkflowComponent } from '../workflow/workflow.component';

interface Solution {
  id: number,
  title: string,
  description: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeatureImageComponent, WorkflowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  solutionList: Solution[] = [];

  constructor() { }

  ngOnInit() {
    this.getSolution();
  }
  getSolution() {
    this.solutionList = solutions.solutions;
  }
}
