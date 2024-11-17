import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-todo-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-todo-modal.component.html',
  styleUrl: './create-todo-modal.component.css'
})
export class CreateTodoModalComponent {
  description: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  close() {
    this.activeModal.dismiss();
  }

  addTodo() {
    this.activeModal.close(this.description);
  }
}
