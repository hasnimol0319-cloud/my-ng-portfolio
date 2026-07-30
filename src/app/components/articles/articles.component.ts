import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  source: string;
  author: string;
  date: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [NgClass],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];
  myArticles: Article[] = [];

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articles = [
      {
        id: 1,
        title: 'I Just Read Your Angular Code. You Are Still Writing It Like It Is 2021.',
        excerpt: 'I reviewed a pull request last week from a developer with four years of experience.',
        source: '',
        author: 'Code Master',
        date: 'Jul 22',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*qwLkJT3uQv1QnZ-4mTPU4w.png',
        link: 'https://medium.com/@saneekadam1326/i-just-read-your-angular-code-you-are-still-writing-it-like-it-is-2021-a0f1d918b375'
      },
      {
        id: 2,
        title: 'Write Better Code with TypeScript Patterns',
        excerpt: 'Frontend codebases have a habit of growing faster than our architectural plans.',
        source: '',
        author: 'Onix React',
        date: 'Jul 23',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*2mwPAiU1l2UpYdrULzywnA.png',
        link: 'https://medium.com/@onix_react/write-better-code-with-typescript-patterns-066077ed40b0'
      },
      {
        id: 3,
        title: 'Signal Forms vs Reactive Forms: The Migration Path Nobody’s Talking About',
        excerpt: 'Angular 21 made Signal Forms default. Here’s what actually breaks when you migrate.',
        source: 'JavaScript in Plain English',
        author: 'Krati Varshney',
        date: 'Feb 07',
        image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*y1_6IfqaIh7ihN6vAj0Gew.png',
        link: 'https://medium.com/javascript-in-plain-english/signal-forms-vs-reactive-forms-the-migration-path-nobodys-talking-about-dd0fc6f6f5e3'
      },
      {
        id: 4,
        title: 'Solution to the Angular Component Design Challenge',
        excerpt: 'This is the solution to the design problem published here Can You Optimize This Angular Design Problem?',
        source: 'Level Up Codeing',
        author: 'Pawan Kumawat',
        date: 'Jul 27',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*kcaUam9uVAaHYUPF.png',
        link: 'https://medium.com/gitconnected/solution-to-the-angular-component-design-challange-ffef7eccc52a'
      },
      {
        id: 5,
        title: 'Spread operator in javaScript',
        excerpt: 'I’d be happy to explain the spread operator in JavaScript and provide a clear example.',
        source: '',
        author: 'PonleuDev',
        date: 'Jul 24',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*5lvniIMg5mlkdSE6U2nSag.png',
        link: 'https://medium.com/@ponleu913/spread-operator-in-javascript-76d4e2083627'
      }
    ];

    this.myArticles = [
      {
        id: 1,
        title: 'Stop Hardcoding Buttons in Every Angular Component',
        excerpt: 'Most Angular tutorials teach you to put buttons directly in your component template, wire up (click) handlers, and call it a day. It works...',
        source: '',
        author: 'Se Has',
        date: 'Jul 30',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*SLeV0Cbzf11dC5qhkX65MQ.png',
        link: 'https://medium.com/@hasnimol0319/stop-hardcoding-buttons-in-every-angular-component-a319ab5fac69'
      }
    ]
  }
}
