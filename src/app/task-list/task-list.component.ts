import { Component, inject, OnInit } from '@angular/core';
import { Task, TaskService } from '../services/task.service';
import { NgFor } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskModalComponent } from '../components/create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private modalService = inject(NgbModal);

  tasks: any[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (error) => console.error('Fehler beim Abrufen der Aufgaben:', error),
    })
  }

  openAddTaskModal(): void {
    const modalRef = this.modalService.open(CreateTaskModalComponent);
    modalRef.componentInstance.taskCreated.subscribe((newTask: Partial<Task>) => {
      this.taskService.createTask(newTask).subscribe({
        next: (task) => this.tasks.push(task),
        error: (error) => console.error('Fehler beim Erstellen der Aufgabe:', error),
      });
    })
  }

  toggleTaskStatus(task: Task): void {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        this.tasks = this.tasks.map((t) =>
          t.id === task.id ? updatedTask : t
        );
      },
      error: (err) => console.error('Fehler beim Aktualisieren der Aufgabe:', err),
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => (this.tasks = this.tasks.filter((task) => task.id !== id)),
      error: (error) => console.error('Fehler beim Löschen der Aufgabe:', error),

    });
  }

}
