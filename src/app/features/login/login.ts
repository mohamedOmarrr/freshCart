import { Component, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../shared/services/login-service';
import { SignUpResponse } from '../../shared/interfaces/auth';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    FloatLabelModule,
    MessageModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [],
})
export class Login  {
  errorMessage: string = '';
  type: string = 'password';
  loading = signal<boolean>(false);

  
  constructor(
    private log: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {

    const nav = this.router.getCurrentNavigation()
    const data = nav?.extras?.state as {toast?: any} | undefined

    if(data?.toast){
      this.messageService.add(data.toast)
    }
  }
  

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com)$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
    ]),
  });

  submit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.loading.set(true);
      this.log.login(this.loginForm.value as SignUpResponse).subscribe({
        next: (res: any) => {

          this.errorMessage = '';
          this.router.navigate(['/home']);
          this.loading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Success Process',
            detail: 'Login completed successfully',
          });
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = err.error.message;
          this.loading.set(false);

          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: this.errorMessage,
          });
        },
      });
    }
  }
}
