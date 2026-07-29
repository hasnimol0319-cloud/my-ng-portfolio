import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/services/message-alert/alert.service';
import { EmailSendingService } from '../../services/email-sending.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  form: FormGroup;
  submitted = false;
  sending = false;
  email = 'hasnimol0319@gmail.com';
  phone = '+855 66 817 892';
  location = 'Phnom Penh, Cambodia'
  locationLink = 'https://www.google.com/maps/place/Toi/@11.5981772,104.8604297,49m/data=!3m1!1e3!4m6!3m5!1s0x310953b5147b7a47:0x26c42c22123aa276!8m2!3d11.5982825!4d104.8604314!16s%2Fg%2F11p13w_1gl?authuser=0&entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D';

  constructor(private fb: FormBuilder, private alertService: AlertService, private emailSendingService: EmailSendingService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.alertService.error('Please input data of compulsory fields.')
      return;
    }

    this.sending = true;
    this.emailSendingService.sendEmail(this.form, this.email)
    .then(() => {
            this.sending = false;
            this.submitted = false;
            this.form.reset();
            this.alertService.success('Your message has been sent successfully! I will get back to you soon.');
          })
          .catch((err) => {
            console.error('EmailJS error:', err);
            this.sending = false;
            this.alertService.error('Something went wrong while sending your message. Please try again later.');
          });
  }
}
