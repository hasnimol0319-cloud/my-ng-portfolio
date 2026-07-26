import { Component } from '@angular/core';
import { PromiseTabsComponent } from './promise-tabs/promise-tabs.component';
import { SkillsComponent } from "./skills/skills.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PromiseTabsComponent, SkillsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
