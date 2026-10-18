import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import solutions from '@public/db/solutions.json';
import { FeatureImageComponent } from '../../shared/components/feature-image/feature-image.component';
import { WorkflowComponent } from '../workflow/workflow.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

interface Solution {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FeatureImageComponent, WorkflowComponent, ButtonModule, TooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  solutionList: Solution[] = [];

  ngOnInit() {
    this.getSolution();
  }

  getSolution() {
    this.solutionList = solutions.solutions;
  }
}
