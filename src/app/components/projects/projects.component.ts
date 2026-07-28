import { Component, OnInit } from '@angular/core';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projects = [
      {
        id: 1,
        title: 'Insurance System',
        description: 'Enterprise-level insurance management handling complex workflows including policy management, endorsements, quotations, claims, and underwriting modules.',
        tags: ['Angular', 'TypeScript', 'Enterprise'],
        link: '#',
        image: 'images/project-insurance.png'
      },
      {
        id: 2,
        title: 'Vessel Monitoring System',
        description: 'Satellite-based monitoring system for managing and tracking fishing vessel positions in real-time across web, tablet, and mobile platforms.',
        tags: ['Real-time', 'WebSocket', 'Maps'],
        link: '#',
        image: 'images/project-vessel.png'
      },
      {
        id: 3,
        title: 'HR Management System',
        description: 'Centralized HR system for managing employee information, payroll, attendance, performance reviews, and organizational hierarchy.',
        tags: ['Angular', 'Dashboard', 'Data Viz'],
        link: '#',
        image: 'images/project-hr.png'
      },
      {
        id: 4,
        title: 'Linkup API Platform',
        description: 'API platform for building, testing, and managing RESTful APIs with comprehensive documentation and integration capabilities.',
        tags: ['API', 'Documentation', 'Integration'],
        link: '#',
        image: 'images/project-linkup.png'
      }
    ];
  }
}
