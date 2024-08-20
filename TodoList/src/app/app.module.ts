import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from './add-task/add-task.component';
import { ShowtaskComponent } from './showtask/showtask.component';
import { ListdataService } from './Service/listdata.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskUpdateDialogComponent } from './task-update-dialog/task-update-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ShowtaskComponent,
    AddTaskComponent,
    TaskUpdateDialogComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    HttpClientModule
    
],
  providers: [ListdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
