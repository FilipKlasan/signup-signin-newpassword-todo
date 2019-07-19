import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { InvalidLinkComponent } from './components/invalid-link/invalid-link.component';
import { HomeComponent } from './components/home/home.component';
import { LockedPageComponent } from './components/locked-page/locked-page.component';
import { AuthGuard } from './services/auth.guard';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { SuccessfullyRegisteredComponent } from './components/successfully-registered/successfully-registered.component'
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';

const routerRoutes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'lockedPage', component: LockedPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LogInComponent },
    { path: 'forgottenPassword', component: ForgottenPasswordComponent },
    { path: 'passwordSuccessfullyChanged', component: PasswordChangedComponent},
    { path: 'registration', component: RegistrationComponent },
    { path: 'successfullyRegistered', component: SuccessfullyRegisteredComponent },
    { path: '**', component: InvalidLinkComponent }
    
]

export const routes: ModuleWithProviders = RouterModule.forRoot(routerRoutes);
