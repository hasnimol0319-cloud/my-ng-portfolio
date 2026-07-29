import { Component } from '@angular/core';
import { PromiseTabsComponent } from './promise-tabs/promise-tabs.component';
import { SkillsComponent } from "./skills/skills.component";
import { ExperiencesComponent } from "./experiences/experiences.component";
import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PromiseTabsComponent, SkillsComponent, ExperiencesComponent, ProfilePhotoComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
