import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-update-dialog',
  templateUrl: './task-update-dialog.component.html',
  styleUrls: ['./task-update-dialog.component.css']
})
export class TaskUpdateDialogComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = new FormGroup({
      task: new FormControl(data.task, [Validators.required]),
      desc: new FormControl(data.description, [Validators.required])
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const { task, desc } = this.taskForm.value;
    
      console.log('Task:', task);
      console.log('Description:', desc)
      console.log('Form values:', this.taskForm.value); 
      const updatedTask = { ...this.data, task, description: desc };
      this.dialogRef.close(updatedTask);
    }
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
