// src/app/services/database.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Database } from '../model/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private baseUrl = 'http://localhost:8081/database';

  constructor(private http: HttpClient) {}

  getDatabases(): Observable<Database[]> {
    return this.http.get<Database[]>(`${this.baseUrl}`);
  }

  deleteDatabase(alias: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${alias}`);
  }

  createDatabase(database: Database): Observable<Database> {
    return this.http.post<Database>(`${this.baseUrl}/create`, database);
  }

  updateDatabase(alias: string, database: Database): Observable<Database> {
    return this.http.put<Database>(`${this.baseUrl}/update/${alias}`, database);
  }

  executeScript(alias: string, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('alias', alias);

    return this.http.post<void>(`${this.baseUrl}/execute-script`, formData);
  }
}
