import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType = 'success' | 'error' | 'info';

export interface AlertMessage {
  id: number;
  type: AlertType;
  text: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertsSubject = new BehaviorSubject<AlertMessage[]>([]);
  alerts$ = this.alertsSubject.asObservable();

  private nextId = 0;

  show(type: AlertType, text: string, duration: number = 4000) {
    const id = this.nextId++;
    const alert: AlertMessage = { id, type, text, duration };

    this.alertsSubject.next([...this.alertsSubject.value, alert]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  success(text: string, duration?: number) {
    this.show('success', text, duration);
  }

  error(text: string, duration?: number) {
    this.show('error', text, duration);
  }

  info(text: string, duration?: number) {
    this.show('info', text, duration);
  }

  dismiss(id: number) {
    this.alertsSubject.next(this.alertsSubject.value.filter(a => a.id !== id));
  }
}
