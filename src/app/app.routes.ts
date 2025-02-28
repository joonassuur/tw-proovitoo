import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ArticleComponent } from './article/article.component';

export const routes: Routes = [
  { path: '', redirectTo: 'article', pathMatch: 'full' },
  { path: 'article', component: ArticleComponent },
  { path: 'table', component: TableComponent },
];
