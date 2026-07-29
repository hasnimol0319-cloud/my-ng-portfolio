import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/services/message-alert/alert.service';
import { EmailSendingService } from '../../services/email-sending.service';
import { contact, social } from '@public/db/contact.json';
import { Contact } from '../../models/contact';
import { Social } from '../../models/social';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{

  form!: FormGroup;
  submitted = false;
  sending = false;
  email = 'hasnimol0319@gmail.com'
  contactList: Contact[] = [];
  socialList: Social[] = [];

  constructor(private fb: FormBuilder, private alertService: AlertService, private emailSendingService: EmailSendingService) {
    
  }

  ngOnInit(): void {
    this.initForm();
    this.getContactList();
    this.getSocialList();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  getContactList(){
    this.contactList = contact;
  }

  getSocialList(){
    this.socialList = social;
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
