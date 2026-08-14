import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { finalize, forkJoin, map } from 'rxjs';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ArticlesService } from '../../services/articles.service';

interface Article {
  id: number;
  title: string;
  description: string;
  source: string;
  author: string;
  date: string;
  image: string;
  link?: string;     // external Medium URL — used when there's no slug
  slug?: string;      // if set, the card links internally to /blog/:slug instead
  mdFile?: string;    // path to the markdown file blog-post should load for this slug
}

interface LinkPreviewData {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  slug?: string;
  mdFile?: string;
}
const URL_REGEX = /\/([^/]+)-([a-f0-9]+)$/;

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {

  private http = inject(HttpClient);
  private articlesService = inject(ArticlesService);

  articles: Article[] = [];
  loading = true;

  myArticleData = signal<LinkPreviewData[]>([]);

  ngOnInit(): void {
    this.getArticles();
    this.getMyArticleLinks();
  }

  async getMyArticleLinks() {
    this.loading = true;
    const links = await this.articlesService.getMyArticleLinks();
    this.getPreview(links);
  }

  getArticles() {
    this.articles = [
      {
        id: 1,
        title: 'I Just Read Your Angular Code. You Are Still Writing It Like It Is 2021.',
        description: 'I reviewed a pull request last week from a developer with four years of experience.',
        source: '',
        author: 'Code Master',
        date: 'Jul 22',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*qwLkJT3uQv1QnZ-4mTPU4w.png',
        link: 'https://medium.com/@saneekadam1326/i-just-read-your-angular-code-you-are-still-writing-it-like-it-is-2021-a0f1d918b375'
      },
      {
        id: 2,
        title: 'Write Better Code with TypeScript Patterns',
        description: 'Frontend codebases have a habit of growing faster than our architectural plans.',
        source: '',
        author: 'Onix React',
        date: 'Jul 23',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*2mwPAiU1l2UpYdrULzywnA.png',
        link: 'https://medium.com/@onix_react/write-better-code-with-typescript-patterns-066077ed40b0'
      },
      {
        id: 3,
        title: `Signal Forms vs Reactive Forms: The Migration Path Nobody's Talking About`,
        description: `Angular 21 made Signal Forms default. Here's what actually breaks when you migrate.`,
        source: '',
        author: 'Krati Varshney',
        date: 'Feb 07',
        image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*y1_6IfqaIh7ihN6vAj0Gew.png',
        link: 'https://medium.com/javascript-in-plain-english/signal-forms-vs-reactive-forms-the-migration-path-nobodys-talking-about-dd0fc6f6f5e3'
      },
      {
        id: 5,
        title: 'Spread operator in javaScript',
        description: `I'd be happy to explain the spread operator in JavaScript and provide a clear example.`,
        source: '',
        author: 'PonleuDev',
        date: 'Jul 24',
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*5lvniIMg5mlkdSE6U2nSag.png',
        link: 'https://medium.com/@ponleu913/spread-operator-in-javascript-76d4e2083627'
      }
    ];
  }

  getPreview(links: string[]) {
    const apiKey = '1d7400f44315e46ccb1999deab411563';

    const requests = links.map(link => {
      const url = `https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(link)}`;
      return this.http.get<LinkPreviewData>(url);
    });

    if (!requests.length) {
      this.loading = false;
      return;
    }

    forkJoin(requests).pipe(map(d => this.modifyData(d)), finalize(() => this.loading = false)).subscribe(
      (modifiedData) => {
        this.myArticleData.set(modifiedData);
        this.loading = false;
      }
    );
  }

  modifyData(data: LinkPreviewData[]): LinkPreviewData[] {
    const modifiedData: LinkPreviewData[] = data.map((item) => ({
      id: this.getHasIdFromUrl(item.url) || '',
      ...item
    }));
    return modifiedData;
  }

  getSlugFromUrl(url: string = ''): string | null {
    const match = url.match(URL_REGEX);
    return match ? match[1] : null;
  }

  getMdFileFromUrl(url: string = ''): string | null {
    const slug = this.getSlugFromUrl(url);
    return slug ? `assets/content/${slug}.md` : null;
  }

  getHasIdFromUrl(url: string = ''): string | null {
    const match = url.match(URL_REGEX);
    return match ? match[2] : null;
  }
}
