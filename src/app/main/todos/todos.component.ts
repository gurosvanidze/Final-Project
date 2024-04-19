import { Component, OnInit } from '@angular/core';
import { ApiTodosService } from 'src/app/api-services/api.todos.service';
import { TodosInterface } from 'src/app/interfaces/todos.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: TodosInterface[];

  constructor(private apiTodosService: ApiTodosService) {}

  ngOnInit(): void {
    this.apiTodosService.getAllTodo().subscribe((todos) => {
      this.todos = todos;
    });
  }
}
