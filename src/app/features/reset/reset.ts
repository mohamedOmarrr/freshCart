import { Component, signal, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetService } from '../../shared/services/reset-service';
import { Router } from '@angular/router';
import { authInterface } from '../../shared/interfaces/auth';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, FloatLabelModule, MessageModule, ProgressSpinnerModule, ToastModule],
  templateUrl: './reset.html',
  styleUrls: ['./reset.scss']
})
export class Reset {

  level = signal<'email' | 'code' | 'repass'>('email');
  loading = signal<boolean>(false);
  type:string = 'password'

  constructor(private reset: ResetService, private router: Router, private messageService: MessageService) {}
  
  ngOnInit() {
    console.log("🔄 Angular component initialized");
  }

  // ====== Email control ======
emailForm = new FormGroup({
  email: new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com)$/)
  ])
})

  // ====== Code form ======
  codeForm = new FormGroup({
    d1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    d2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    d3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    d4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    d5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    d6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
  });

getCode(codeForm: any): string {
  return Object.values(codeForm).join("");
}
  // ====== Back navigation ======
  goBack() {
    if (this.level() === 'code') {
      this.level.set('email');
    } else if (this.level() === 'repass') {
      this.level.set('code');
    }
  }

  // ====== Reset password form ======
  repassForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com)$/)
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    ]),
  });

  // Submit email
  submitEmail() {
    
    if (this.emailForm.valid) {
      this.loading.set(true);
      this.reset.forgetPass(this.emailForm.value as string).subscribe({
        next: (res) => {
          this.level.set('code');
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
        }
      });
    }
  }


  // Submit code
submitCode(event?: Event) {
  event?.preventDefault(); 
  const code = this.getCode(this.codeForm.value);

  if (code.length === 6) {
    this.loading.set(true);

    this.reset.verifyCode(code).subscribe({
      next: (res) => {
        
        this.level.set('repass');
        this.loading.set(false);
      },
      error: (err) => {
        
        this.loading.set(false);
      }
    });
  }
}


 
  submitRepass(event?: Event) {
    event?.preventDefault()
    if (this.repassForm.valid) {
      this.loading.set(true);

      this.reset.rePass(this.repassForm.value as authInterface).subscribe({
        next: (res) => {
          this.loading.set(false);
          this.router.navigate(['/log']);
           this.messageService.add({
            severity: 'success',
            summary: 'Success Process',
            detail: 'Reset Password completed successfully',
          });
        },
        error: (err) => {
          console.error('Error in reset password', err);
          this.loading.set(false);
        }
      });
    }
  }

  // Code input navigation
  nextMove(event: any, nextInput: HTMLInputElement) {
    if (event.target.value) {
      nextInput.focus();
    }
  }

  prevMove(event: any, prevInput: HTMLInputElement) {
    if (event.key === 'Backspace' && !(event.target as HTMLInputElement).value) {
      prevInput.focus();
    }
  }

}
