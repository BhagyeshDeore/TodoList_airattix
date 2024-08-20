import { Component } from '@angular/core';
import { ListdataService } from '../Service/listdata.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],

})
export class AddTaskComponent {
  list: any[] = [];
  taskform = new FormGroup({
    task: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required])
  })

  constructor(private listdata: ListdataService) {}

  addTask() {
    console.log('Add Task called');
    console.log('Form Valid:', this.taskform.valid);

    if (this.taskform.valid) {

      const newTask: Task = { 
        task: this.taskform.value.task as string,
        description: this.taskform.value.desc as string,
        status: false
      };
      
      this.listdata.addTask(newTask);
      this.taskform.reset();

      console.log('Task added:', newTask);

    } else {
      this.taskform.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

}
