import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GroqResponse {
  answer: string;
  updatedHistory: { role: string; content: string }[];
}
@Injectable({
  providedIn: 'root'
})
export class GroqService {
  private url = 'http://127.0.0.1:5000/chat/ask-workoTn';

  constructor(private http: HttpClient) { 


    
  }
  ask(history: any): Observable<GroqResponse> {
    return this.http.post<GroqResponse>(this.url, { history });
  }
}
