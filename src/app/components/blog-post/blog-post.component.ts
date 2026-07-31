import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

// Registry of slug -> markdown file. Add a new line here every time you
// add a new post, and make sure the same slug is used on the article card
// in articles.component.ts.
const BLOG_POSTS: Record<string, string> = {
  'angular-wizard-footer-pattern': 'assets/content/angular-wizard-footer-pattern.md'
};

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [MarkdownModule, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {

  src: string | null = null;

  loading = true;
  loadFailed = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const mdFile = slug ? BLOG_POSTS[slug] : null;

    if (mdFile) {
      this.src = mdFile;
    } else {
      // No matching post for this slug — show the error state directly.
      this.loading = false;
      this.loadFailed = true;
    }
  }

  onLoad() {
    this.loading = false;
    this.loadFailed = false;
  }

  onError() {
    this.loading = false;
    this.loadFailed = true;
  }
}
