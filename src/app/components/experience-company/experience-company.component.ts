import { Component, OnInit } from '@angular/core';

interface Experience {
  id: number;
  role: string;
  period: string;
  description: string;
  tags: string[];
  icon: 'code' | 'target' | 'spark';
  color: string;
}

@Component({
  selector: 'app-experience-company',
  standalone: true,
  imports: [],
  templateUrl: './experience-company.component.html',
  styleUrl: './experience-company.component.scss'
})
export class ExperienceCompanyComponent implements OnInit {

  experiences: Experience[] = [];

  ngOnInit(): void {
    this.getExperiences();
  }

  getExperiences() {
    this.experiences = [
      {
        id: 1,
        role: 'Internship Frontend Developer',
        period: '01 February 2021 - 30 April 2021',
        description:
          'Learning the basics of building websites using HTML, CSS, and JavaScript to make pages look good and work correctly. I practiced building web apps using Angular tools like components, routing, and data binding. I also worked on connecting our web pages to servers (API) so the apps could safely send, receive, change, and delete information.',
        tags: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular Framework', 'RxJS', 'HTTP'],
        icon: 'code',
        
        color: 'var(--primary)'
      },
      {
        id: 2,
        role: 'Junior Frontend Developer',
        period: '01 May 2021 - 31 March 2024',
        description:
          'Engineered a high-performance interactive analytics dashboard, transforming raw operational data into clear, actionable insights for key decision-makers. Spearheaded the frontend implementation of complex financial, statistical, and operational data processing models. Partnered cross-functionally with backend engineering teams to architect seamless, robust API integrations. Shipped highly optimized UI features including advanced pagination, custom filtering, and dynamic sorting significantly improving application speed, responsiveness, and frontend scalability.',
        tags: ['Angular Feature', 'Version Control', 'Communication', 'Project Structure, ClickUp'],
        icon: 'target',
        color: '#f59e0b'
      },
      {
        id: 3,
        role: 'Frontend Developer',
        period: '01 April 2024 - 30 June  2026',
        description:
          'Making smart choices about how we build web systems so they stay strong and last for a long time. I guide different teams to work together smoothly and follow the same technical plans. Another big part of my job is teaching and helping other developers write clean code so they can improve their skills. I also manage project timelines and solve big problems to make sure everything gets finished on time.',
        tags: ['Project Management', 'Project Leader', 'Problem Solving', 'Time Management', 'Teamwork Communication', 'Mentoring'],
        icon: 'spark',
        color: '#ec4899'
      }
    ];
  }
}
