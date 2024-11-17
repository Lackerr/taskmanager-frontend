import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';

export const routes: Routes = [
    { path: 'tasks', component: TaskListComponent },
    { path: 'todos', component: TodoListComponent },
    { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];
