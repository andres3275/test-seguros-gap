import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AutenticacionService } from './autenticacion.service';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [LoginComponent],
  providers: [AutenticacionService]
})
export class LoginModule { }
