import { ChangeDetectorRef, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { FormBuilder,  Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PayService } from '../../shared/services/pay-service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CartService } from '../../shared/services/cart-service';

@Component({
  selector: 'app-checkout',
  imports: [ButtonModule,
    FloatLabelModule,
    MessageModule,
    ProgressSpinnerModule,
  ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {

  loading = false;
  shippingForm!: FormGroup
  
  constructor(
    private message: MessageService,
    private fb: FormBuilder, 
    private activate : ActivatedRoute,
    private pay:PayService,
    private cart:CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef 
  ) {}

  
  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: ['', Validators.required]
      })
    });
    
    
  }
  
  gitId(){
    return this.activate.snapshot.paramMap.get('id');
  }
  
  submit() {
    if (this.shippingForm.valid) {
      
      let shipping = this.shippingForm.value
      let id = this.gitId()
      
      this.cd.detectChanges();
      this.loading = true;
      
      if(!id){
        this.loading = false;
        this.cd.detectChanges();
        return
      }
        this.pay.goSession(id,shipping).pipe(finalize(() =>{ this.loading = false; this.cd.detectChanges(); }))
        .subscribe({
          next:(res) => {
            this.cart.cartItems.set(0)
            if (isPlatformBrowser(this.platformId)) {
              window.open(res.url, '_blank');
            }
            
          },
          error:(err) => {
          
            console.log(err);
            
          }
  
        })
      
    }
  }

}
