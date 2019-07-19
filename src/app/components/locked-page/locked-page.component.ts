import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

export interface todo{
   id: number;
   todo: string;
   buttonEdit: any;
   buttonDelete: any;
}

export interface EditDialogData{
   todo: string;
}

@Component({
  selector: 'app-locked-page',
  templateUrl: './locked-page.component.html',
  styleUrls: ['./locked-page.component.css']
})
export class LockedPageComponent {

   todo: string;
   todoList: todo[] = [];
   tempTodoArray = [];
   tempSessionArray = [];
   columnNames: string[] = ['id', 'todo', 'edit', 'delete'];
   dataSource = new MatTableDataSource();
   userEmail: string;
   

  constructor(private authService: AuthService, 
              private dataService: DataService, 
              private dialog: MatDialog) {
       this.userEmail = this.authService.getEmail();
       this.getAllTodos();
       this.todo = sessionStorage.getItem('textArea');
       this.tempSessionArray = JSON.parse(sessionStorage.getItem('todoArray'));
       if(this.tempSessionArray == null){
           console.log('Array is empty');
       }
       else{
           this.tempTodoArray = this.tempSessionArray;
           this.todoList = this.tempTodoArray;
           this.dataSource.data = this.todoList;
       }
  }
   
  insertTodo(){
       if(this.todo.trim() == ''){
           console.log('Empty field')
       }
       else{
        let todoObj = {
           id: this.todoList.length + 1,
           todo: this.todo
        }
        this.tempTodoArray.push(todoObj);
        sessionStorage.setItem('todoArray', JSON.stringify(this.tempTodoArray));
        this.todoList = this.tempTodoArray;
        this.dataSource.data = this.todoList;
        let obj = {
          email: this.userEmail,
          todo: this.todo
        }
        this.dataService.insertTodo(obj).subscribe(res => {
            if(res.statusObj == 'Todo successfully saved'){
                console.log('Todo successfully saved');
            }
        },
        err => {
            console.log(err);
        });
        sessionStorage.removeItem('textArea');
        this.todo = '';
       }
      
  }
  
  getAllTodos(){
       let obj = {
          email: this.userEmail
       };
       this.dataService.getAllTodos(obj).subscribe(res => {
            if(res.statusObj == 'Todo list is empty'){
                console.log('Todo list is empty');
            }
            else{
                this.todoList = res.obj.todoList;
                this.dataSource.data = this.todoList;
                this.tempTodoArray = res.obj.todoList;
            }
       }, 
       err => {
           console.log(err);
      });
  }
  
  sessStorage(){
       sessionStorage.setItem('textArea', this.todo);
  }

  edit(i: number){
       let dialogRef = this.dialog.open(EditDialogComponent, {
       width: '400px', height: '400px', data: { todo: this.tempTodoArray[i].todo }
       });
       dialogRef.afterClosed().subscribe(res => {
          this.tempTodoArray[i].todo = res.todo;
          this.todoList[i].todo = res.todo;
          sessionStorage.setItem('todoArray', JSON.stringify(this.tempTodoArray));
          this.dataSource.data = this.todoList;
          let obj = {
             email: this.userEmail,
             todoID: i,
             todo: res.todo
          }
          this.dataService.editTodo(obj).subscribe(res => {
               console.log(res);
          },
          err => {
               console.log(err);
          });
       });
  }

  delete(i: number){
      let dialogSettings = {
         width: '',
         height: '',
         data: {}
      };
      let obj = {
         email: this.userEmail,
         todoID: i
      }
      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogSettings);
      dialogRef.afterClosed().subscribe(res => { 
          if(res == true){
            this.dataService.deleteTodo(obj).subscribe(resp => {
                 if(resp.statusObj == 'Todo successfully deleted'){
                     console.log('Todo successfully deleted');
                 }
                 else{
                     console.log('Todo has not been deleted');
                 }
             },
             err => {
                 console.log(err);
             }
            ); 
            this.todoList.splice(i, 1);
            for(let i = 0; i < this.todoList.length; i++){
                this.todoList[i].id = i + 1;
            }
            sessionStorage.setItem('todoArray', JSON.stringify(this.tempTodoArray));
            this.dataSource.data = this.todoList;
          }
      });
  }

}
  
@Component({
  selector: 'app-delete-dialog', 
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent{

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>){}

  close(){
    this.dialogRef.close();
  }
  
}

@Component({
  selector: 'app-edit-dialog', 
  templateUrl: './edit-dialog.component.html'
})
export class EditDialogComponent{
  
  constructor(private dialogRef: MatDialogRef<EditDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private dialogData: EditDialogData){}
    
    patternPassword: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$';

    close(){
      this.dialogRef.close();
    }

}