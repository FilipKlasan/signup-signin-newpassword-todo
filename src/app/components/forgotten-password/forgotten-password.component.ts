import { Component, OnInit, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

interface verificCode {
  code: string;
}

interface newPassword {
  email: string;
  password: string;
}

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent {
 
  email: string;
  password: string;
  repeatPassword: string;
  validationString: string;
  validationBool: boolean = true;
  newPasswordObject: newPassword;
  patternPassword: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$';
  verificationCodeBE: string;
  disableButton: boolean = false;

  constructor(private router: Router, 
              private authService: AuthService, 
              private dialog: MatDialog){}
   
  newPassword(){
    this.disableButton = true;
    if(this.password !== this.repeatPassword){
      this.validationString = 'Password mismatch!';
      this.validationBool = false;
      this.disableButton = false;
    }
    else{
       this.validationBool = true;
       this.validationString = '';
       this.newPasswordObject = {
          email: this.email,
          password: this.password
       } 
       this.authService.emailVerificationNewPassword(this.newPasswordObject).subscribe(res => {
         if(res.statusObj == 'Wrong email'){
             this.validationString = 'Wrong email!';
             this.validationBool = false;
             this.disableButton = false;
          }
         else{
             let dialogSettings = {
              width: '', height: '', data: {}, disableClose: true
             }
             this.verificationCodeBE = res.statusObj;
             let dialogRef = this.dialog.open(VerificationDialogForgPassComponent, dialogSettings);
             dialogRef.afterClosed().subscribe(result => {
              if(result == this.verificationCodeBE){
                 this.authService.newPassword(this.newPasswordObject).subscribe(resp => {
                    if(resp.statusObj == 'Password successfully changed'){ 
                    this.router.navigate(['/passwordSuccessfullyChanged']);
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
        this.validationBool = false; console.log(err);
      });
    }
  }
}


@Component({
  selector: 'verification-dialog-forg-pass',
  templateUrl: './verification-dialog-forg-pass.component.html',
})
export class VerificationDialogForgPassComponent{
 
 constructor(@Inject(MAT_DIALOG_DATA) private dialogData: verificCode){}

}
