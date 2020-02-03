import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export interface user{
  emailOrUsername: string;
  password: string;
}
 
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  
  emailOrUsername: string;
  password: string;
  logInUser: user;
  patternPassword: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$';
  validationString: string;
  validationBool: boolean = true;

  constructor(private router: Router, private authService: AuthService) { }

  logIn(){
     this.logInUser = {
       emailOrUsername: this.emailOrUsername,
       password: this.password
     }
      
     this.authService.logIn(this.logInUser).subscribe(res => {
            if(res.statusObj == 'User does not exist'){
               this.validationString = 'User does not exist!'; 
               this.validationBool = false;
            }
            else if(res.statusObj == 'Wrong password'){
               this.validationString = 'Wrong password!'; 
               this.validationBool = false;
            }
            else{ 
              localStorage.setItem('fzx', res.obj.token);
              localStorage.setItem('email', res.obj.userEmail);
              this.router.navigate(['/lockedPage']);
            }
      }, 
      err => {
        this.validationString = 'Error occurred!';
        this.validationBool = false;
      });
  }

}
