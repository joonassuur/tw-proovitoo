import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from './types';
import { baseURL } from './constants';
import { Observable } from 'rxjs';

interface ApiResponse {
  list: Person[];
}

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private url = `${baseURL}/list`;

  constructor(private http: HttpClient) {}

  getPeople(page: number = 1, limit: number = 108): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.url}?page=${page}&limit=${limit}`
    );
  }
}
