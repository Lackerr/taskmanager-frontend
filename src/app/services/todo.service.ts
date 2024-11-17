import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Todo {
  id: string;
  description: string;
  completed: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/todos';

  constructor(private http:HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(description: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, description);
  }

  completeTodo(id: string): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}/complete`, id);
  }
}
