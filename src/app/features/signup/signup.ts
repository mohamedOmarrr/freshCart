import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../shared/services/register-service';
import { authInterface } from '../../shared/interfaces/auth';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    MessageModule,
    ProgressSpinnerModule,
    ToastModule,
    RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

  errorMessage:string = '' 
  type:string = 'password'
  loading = signal<boolean>(false);

  constructor(private signUpService:RegisterService,
    private router:Router,
    private messageService: MessageService){

    const nav = this.router.getCurrentNavigation()
    const data = nav?.extras?.state as {toast?: any; source:string} | undefined

    if (!data) return;

    if (data.source === 'cart' && data.toast) {
      this.messageService.add(data.toast);
    }

    
    else if (data.source === 'guard' && data.toast) {
      this.messageService.add(data.toast);
    }
  }

  signForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com)$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0-2,5][0-9]{8}$/)]),

  }, { validators:this.confirmPassword });

  confirmPassword(group:AbstractControl){
    return group.get('password')?.value === group.get('rePassword')?.value ? null : { mismatch: true }
  }



  submit() {
  this.signForm.markAllAsTouched();

  if (this.signForm.valid) {
    this.loading.set(true)
    
    this.signUpService.signUp(this.signForm.value as authInterface).subscribe({
    next: (res) => {
      console.log('User registered successfully:', res);
      if(res.message === 'success'){
        this.errorMessage =''
          this.router.navigate(['/log'])
          this.loading.set(false)
          this.messageService.add({
            severity: 'success',
            summary: 'Success Process',
            detail: 'Register completed successfully, Start login',
          });
      }

      
    },
    error:  (err) => {
          console.error('Login failed:', err);
          this.errorMessage = err.error.message;
          this.loading.set(false);

          this.messageService.add({
            severity: 'error',
            summary: 'Register Failed',
            detail: this.errorMessage,
          });
        },
  });
}
}
}
