import { Component, OnInit } from '@angular/core';

interface WorkflowStep {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: 'discovery' | 'architecture' | 'optimization' | 'deployment';
}

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [],
  templateUrl: './workflow.component.html',
  styleUrl: './workflow.component.scss'
})
export class WorkflowComponent implements OnInit {

  steps: WorkflowStep[] = [];

  ngOnInit(): void {
    this.getSteps();
  }

  getSteps() {
    this.steps = [
      {
        id: 1,
        number: '01',
        title: 'Discovery & Scope',
        description: 'Understand the real problem before writing a line of code requirements, constraints, edge cases, and success criteria are mapped out together with stakeholders.',
        icon: 'discovery'
      },
      {
        id: 2,
        number: '02',
        title: 'Architecture & Prototyping',
        description: 'Design a scalable component structure and data flow, then validate the approach with quick prototypes before committing to full implementation.',
        icon: 'architecture'
      },
      {
        id: 3,
        number: '03',
        title: 'Optimization & Testing',
        description: 'Refine performance, accessibility, and edge-case handling, backed by unit and integration tests so regressions get caught before I ship.',
        icon: 'optimization'
      },
      {
        id: 4,
        number: '04',
        title: 'Deployment',
        description: 'Carefully build and verify the production output, then deploy it manually with a final check at each step giving me direct control over exactly what goes live and when.',
        icon: 'deployment'
      }
    ];
  }
}
