import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  standalone: true,
  imports: [],
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.scss'
})
export class ProfilePhotoComponent {
  @Input() imageSrc: string = '';
  @Input() alt: string = 'Profile photo';
}
