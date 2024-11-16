import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.css'
})
export class CreateTaskModalComponent {
  @Output() taskCreated = new EventEmitter<any>();

  task = {title: '', description: '', isCompleted: false};

  constructor(public activeModal: NgbActiveModal) {
    
  }

  saveTask(){
    this.taskCreated.emit(this.task);
    this.activeModal.close();
  }
}
