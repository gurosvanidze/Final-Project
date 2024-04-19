import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodosInterface } from '../interfaces/todos.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiTodosService {
  constructor(private http: HttpClient) {}

  getAllTodo(): Observable<TodosInterface[]> {
    return this.http.get<TodosInterface[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }
}
