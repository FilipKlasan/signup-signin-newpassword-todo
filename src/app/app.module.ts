import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './routes';
import {
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatTableModule,
  MatMenuModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSnackBarModule,
  MatGridListModule,
  MatRadioModule,
  MatSortModule,
  MatPaginatorModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatListModule,
  MatTabsModule,
  MAT_DIALOG_DATA,  
  MatDialogRef,
  MatTableDataSource
 } from '@angular/material';

import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegistrationComponent, VerificationDialogComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';
import { SuccessfullyRegisteredComponent } from './components/successfully-registered/successfully-registered.component';
import { InvalidLinkComponent } from './components/invalid-link/invalid-link.component';
import { ForgottenPasswordComponent, VerificationDialogForgPassComponent } from './components/forgotten-password/forgotten-password.component';
import { LockedPageComponent, DeleteDialogComponent, EditDialogComponent } from './components/locked-page/locked-page.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegistrationComponent,
    HomeComponent,
    PasswordChangedComponent,
    SuccessfullyRegisteredComponent,
    InvalidLinkComponent,
    ForgottenPasswordComponent,
    LockedPageComponent,
    VerificationDialogComponent,
    VerificationDialogForgPassComponent,
    DeleteDialogComponent,
    EditDialogComponent
  ],
  imports: [
    routes,
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    MatGridListModule,
    MatRadioModule,
    MatSortModule,
    MatPaginatorModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatListModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {}}, 
    { provide: MatDialogRef, useValue: {}}
  ],
  entryComponents: [
    AppComponent,
    VerificationDialogComponent, 
    VerificationDialogForgPassComponent,
    DeleteDialogComponent,
    EditDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);