import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo, TodoService } from '../services/todo.service';
import { CreateTodoModalComponent } from '../components/create-todo-modal/create-todo-modal.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
      console.log(data);
    });
  }

  completeTodo(id: string) {
    this.todoService.completeTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  openCreateTodoModal() {
    const modalRef = this.modalService.open(CreateTodoModalComponent);
    modalRef.result.then((newTodoDescription) => {
      if (newTodoDescription) {
        this.todoService.addTodo(
          newTodoDescription
        ).subscribe(() => {
          this.loadTodos();
        })
      }
    })
  }
}
