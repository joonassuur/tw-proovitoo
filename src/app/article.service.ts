import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleData } from './types';
import { baseURL } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private url = `${baseURL}/list/972d2b8a`;

  constructor(private http: HttpClient) {}

  getArticle(): Observable<ArticleData> {
    return this.http.get<ArticleData>(this.url);
  }
}
