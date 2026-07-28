import { Component } from '@angular/core';
import { PromiseTabsComponent } from './promise-tabs/promise-tabs.component';
import { SkillsComponent } from "./skills/skills.component";
import { ExperiencesComponent } from "./experiences/experiences.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PromiseTabsComponent, SkillsComponent, ExperiencesComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
