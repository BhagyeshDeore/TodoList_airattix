import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListdataService } from '../Service/listdata.service';
import { TaskUpdateDialogComponent } from '../task-update-dialog/task-update-dialog.component';
import { Task } from '../Task';

@Component({
  selector: 'app-showtask',
  templateUrl: './showtask.component.html',
  styleUrls: ['./showtask.component.css'],
})
export class ShowtaskComponent implements OnInit {
  taskList: Task[] = [];

  constructor(private listdata: ListdataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.listdata.currentTaskList.subscribe((list) => {
      console.log('ngOnInit() -- Task List:', list);
      this.taskList = list || [];
    });
  }

  openUpdateDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskUpdateDialogComponent, {
      width: '250px',
      data: { ...task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateTask(result);
      }
    });
  }

  updateTask(updatedTask: Task) {
    this.listdata.updateTask(updatedTask).subscribe({
      next: () => {
        this.listdata.loadTasks(); 
      },
      error: (err) => console.error('Error updating task', err),
    });
  }

  removeTask(id?: string) {
    if (id) {
      this.listdata.removeTask(id).subscribe({
        next: () => {
          this.listdata.loadTasks();
        },
        error: (err) => console.error('Error removing task', err),
      });
    } else {
      console.error('Task ID is undefined');
    }
  }

  toggleStatus(task: Task) {
    const updatedTask: Task = { ...task, status: !task.status };
    this.listdata.updateTask(updatedTask).subscribe({
      next: () => {
        this.listdata.loadTasks();
      },
      error: (err) => console.error('Error toggling task status', err),
    });
  }
}
