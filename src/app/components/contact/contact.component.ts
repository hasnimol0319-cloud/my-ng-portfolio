import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

// EmailJS setup (https://www.emailjs.com):
// 1. Create a free account and an Email Service (e.g. Gmail).
// 2. Create an Email Template. In the template, add a "To Email" field set to
//    hasnimol0319@gmail.com (or use {{to_email}} and pass it as a param below).
// 3. Replace the three values below with your own Service ID, Template ID, and Public Key.
const EMAILJS_SERVICE_ID = 'service_1hh6dcs';
const EMAILJS_TEMPLATE_ID = 'template_swuynwm';
const EMAILJS_PUBLIC_KEY = 's18rX2cVWAyKxJlve';

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

  constructor(private fb: FormBuilder) {
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
      return;
    }

    this.sending = true;

    const templateParams = {
      to_email: 'hasnimol0319@gmail.com',
      name: this.form.value.name,
      email: this.form.value.email,
      title: this.form.value.subject,
      message: this.form.value.message
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, { publicKey: EMAILJS_PUBLIC_KEY })
      .then(() => {
        this.sending = false;
        this.submitted = false;
        this.form.reset();
        alert('Your message has been sent successfully! I will get back to you soon.');
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        this.sending = false;
        alert('Something went wrong while sending your message. Please try again later.');
      });
  }
}
