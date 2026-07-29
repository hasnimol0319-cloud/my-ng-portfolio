import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

// EmailJS setup (https://www.emailjs.com):
// 1. Create a free account and an Email Service (e.g. Gmail).
// 2. Create an Email Template. In the template, add a "To Email" field set to
//    hasnimol0319@gmail.com (or use {{to_email}} and pass it as a param below).
// 3. Replace the three values below with your own Service ID, Template ID, and Public Key.
const EMAILJS_SERVICE_ID = 'service_1hh6dcs';
const EMAILJS_TEMPLATE_ID = 'template_swuynwm';
const EMAILJS_PUBLIC_KEY = 's18rX2cVWAyKxJlve';

@Injectable({
  providedIn: 'root'
})
export class EmailSendingService {

  constructor() { }

  sendEmail(form: FormGroup, toEmail: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_email: toEmail,
      name: form.value.name,
      email: form.value.email,
      title: form.value.subject,
      message: form.value.message
    };
     return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, { publicKey: EMAILJS_PUBLIC_KEY });
  }

}
