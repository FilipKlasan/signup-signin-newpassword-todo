import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

interface user {
   email: string;
   username: string;
   password: string;
   todoList: string[];
}

interface verificationCode {
  code: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
   
  constructor(private authService: AuthService, 
              private router: Router,
              private dialog: MatDialog){}
   
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
  registerUser: user;
  patternUsername: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$';
  patternPassword: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$';
  validationString: string;
  validationBool: boolean = true;
  verificationCodeBE: string;
  disableButton: boolean = false;

  register(){
    this.disableButton = true;
    if(this.password != this.passwordRepeat){
      this.validationString = 'Password mismatch!';
      this.validationBool = false;
      this.disableButton = false;
    }
    else{
      this.validationBool = true;
      this.validationString = '';
      this.registerUser = {
      email: this.email,
      username: this.username,
      password: this.password,
      todoList: []
     }
     this.authService.emailAndUsernameVerification(this.registerUser).subscribe(res => {
        if(res.statusObj == 'Email already exists'){
          this.validationString = 'Email already exists!';
          this.validationBool = false;
          this.disableButton = false;
        }
        else if(res.statusObj == 'Username already exists'){
          this.validationString = 'Username already exists!';
          this.validationBool = false;
          this.disableButton = false;
        }
        else{
          this.verificationCodeBE = res.statusObj;
          let dialogSettings = { width: '', height: '', data: {}, disableClose: true };
          let dialogRef = this.dialog.open(VerificationDialogComponent, dialogSettings);
          dialogRef.afterClosed().subscribe(result => {
              if(result == this.verificationCodeBE){
                 this.authService.registration(this.registerUser).subscribe(resp => {
                    if(resp.statusObj == 'Successfully registered'){ 
                    this.router.navigate(['/successfullyRegistered']);
                    }
                 },
                 err => {
                   this.validationString = 'Error occurred!'; 
                   this.validationBool = false; 
                   console.log(err);
                   this.disableButton = false;
                  });
              }
              else{
               this.validationString = 'Wrong verification code!';
               this.validationBool = false;
               this.disableButton = false;
             }
          });
        }
     }, 
     err => {
        this.validationString = 'Error occurred!';
        this.validationBool = false; 
        console.log(err);
      });
   
    }
  }

}

@Component({
   selector: 'verification-dialog',
   templateUrl: './verification-dialog.component.html'
})
export class VerificationDialogComponent{
  
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: verificationCode){}

}
