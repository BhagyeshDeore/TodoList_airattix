import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class ListdataService {
  private apiUrl = 'http://localhost:3000/todos';
  private taskListSource = new BehaviorSubject<Task[]>([]);
  currentTaskList: Observable<Task[]> = this.taskListSource.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  public loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Loaded data:', data);
        if (Array.isArray(data)) {
          this.taskListSource.next(data);
        } else {
          console.error('Loaded data is not an array or data is undefined:', data);
          this.taskListSource.next([]); 
        }
      },
      error: (err) => console.error('Error loading tasks:', err)
    });
  }
  
  
  

  addTask(task: Task): void {
    this.http.post<Task>(this.apiUrl, task).subscribe({
      next: (newTask) =>{ 
        console.log("addTask()--postService :" , newTask);
        const currentTasks = this.taskListSource.getValue(); 
        
        console.log('currentTasks:', currentTasks);
        console.log('Is Array:', Array.isArray(currentTasks));
  
        if (Array.isArray(currentTasks)) {
          this.taskListSource.next([...currentTasks, newTask]); 
        } else {
          console.error('currentTasks is not an array');
        }
      },
      error: (err) => console.error('Error adding task', err)
    });
  }
  



  updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
  }

  removeTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }


}
