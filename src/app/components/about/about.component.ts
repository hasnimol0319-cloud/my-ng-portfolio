import { Component } from '@angular/core';
import { PromiseTabsComponent } from './promise-tabs/promise-tabs.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PromiseTabsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
