import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const mdFile = slug ? 'assets/content/' + slug + '.md' : null;

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
