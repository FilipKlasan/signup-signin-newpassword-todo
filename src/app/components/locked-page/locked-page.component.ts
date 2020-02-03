import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from '../../services/data.service';


export interface todo{
   id: number;
   todo: string;
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
   tempArr = [];
   columnNames: string[] = ['id', 'todo', 'edit', 'delete'];
   dataSource = new MatTableDataSource();
   userEmail: string;
   

  constructor(private dataService: DataService, 
              private dialog: MatDialog) {
       let obj = {
           email: localStorage.getItem('email')
       };
       this.dataService.getAllTodos(obj).subscribe(res => {
          if(res.statusObj == 'Todo list is empty'){
              console.log('Todo list is empty');
              this.dataSource.data = this.todoList;
          }
          else{
              this.todoList = res.obj.todoList;
              this.dataSource.data = this.todoList;
          }
     }, 
     err => {
         console.log(err);
    });
  }
   
  insertTodo(){
     this.tempArr = this.todoList;
     let ind = this.tempArr.length + 1;
     let obj = {
         id: ind,
         todo: this.todo
     }
     this.tempArr.push(obj);
     this.todoList = this.tempArr;
     this.dataSource.data = this.todoList;
     let objToSend = {
        email: localStorage.getItem('email'),
        todo: this.todo
     }
     this.dataService.insertTodo(objToSend).subscribe(res => {
        console.log('Todo has been saved');
     }, 
     err => {
        console.log(err);
     });
     this.todo = '';
  }
  
  edit(i: number){
       let dialogRef = this.dialog.open(EditDialogComponent, {
       width: '400px', height: '400px', data: { todo: this.todoList[i].todo }
       });
       dialogRef.afterClosed().subscribe(res => {
           this.todoList[i].todo = res.todo;
           let todoListToSend = [];
           for(let i = 0; i < this.todoList.length; i++) {
               todoListToSend.push(this.todoList[i].todo);
           }
           let obj = { 
               email: localStorage.getItem('email'),
               todoList: todoListToSend
           }
           this.dataService.editTodo(obj).subscribe(res => {
               console.log('Todo has been edited');
           },
           err => {
               console.log(err);
           });
       },
       err => {
               console.log(err);
       });
  }

  delete(i: number){
      let dialogSettings = {
         width: '',
         height: '',
         data: {}
      };

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogSettings);
      dialogRef.afterClosed().subscribe(res => { 
          if(res == true){
            this.todoList.splice(i, 1);
            for(let i = 0; i < this.todoList.length; i++) {
                this.todoList[i].id = i + 1;
            }
            this.dataSource.data = this.todoList;

            let todoListToSend = [];
            for(let i = 0; i < this.todoList.length; i++) {
                todoListToSend.push(this.todoList[i].todo);
            }
            let obj = {
                email: localStorage.getItem('email'),
                todoList: todoListToSend
            }
            this.dataService.deleteTodo(obj).subscribe(resp => {
                 console.log('Todo has been deleted');
             },
             err => {
                 console.log(err);
             }
            ); 
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

  close() {
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

    close() {
      this.dialogRef.close();
    }

}