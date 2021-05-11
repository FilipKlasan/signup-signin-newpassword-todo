import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from '../../services/data.service';


interface todo {
   _id: number;
   todo: string;
}

interface EditDialogData {
   todo: string;
}

@Component({
  selector: 'app-locked-page',
  templateUrl: './locked-page.component.html',
  styleUrls: ['./locked-page.component.css']
})
export class LockedPageComponent implements OnInit {

  todo: string;
  todoList: todo[] = [];
  columnNames: string[] = ['id', 'todo', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  userEmail: string;
   
  constructor(private dataService: DataService, 
              private dialog: MatDialog) {}

  ngOnInit() {
    this.dataService.getAllTodos().subscribe(res => {
        if(res.statusObj == 'Todo list is empty') {
            console.log('Todo list is empty');
            this.dataSource.data = this.todoList;
        }
        else{
            this.todoList = res.obj;
            this.dataSource.data = this.todoList;
        }
    }, 
    err => {
       console.log(err);
    });
  }
   
  insertTodo(){
     let obj = {
         _id: new Date().getTime(),
         todo: this.todo
     }
     this.todoList.push(obj);
     this.dataSource.data = this.todoList;
     let objToSend = {
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
           let obj = {
               index: i,
               todo: this.todoList[i].todo
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

  delete(i: number, element){
      let dialogSettings = {
         width: '',
         height: '',
         data: {}
      };

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogSettings);
      dialogRef.afterClosed().subscribe(res => {
          if(res == true){
            this.todoList.splice(i, 1);
            this.dataSource.data = this.todoList;
            let obj = {
                _id: element._id
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