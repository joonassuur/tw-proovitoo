import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ArticleService } from '../article.service';
import { ArticleData } from '../types';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  @Input() article!: ArticleData;
  loading = false;

  constructor(
    private articleService: ArticleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadArticle();
  }

  loadArticle(): void {
    this.loading = true;
    this.articleService.getArticle().subscribe(
      (response) => {
        this.article = response;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
