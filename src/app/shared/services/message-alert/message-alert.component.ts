import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-message-alert',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './message-alert.component.html',
  styleUrl: './message-alert.component.scss'
})
export class MessageAlertComponent {

  constructor(public alertService: AlertService) {}

  dismiss(id: number) {
    this.alertService.dismiss(id);
  }
}
