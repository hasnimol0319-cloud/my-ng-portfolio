import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-image',
  standalone: true,
  imports: [],
  templateUrl: './feature-image.component.html',
  styleUrl: './feature-image.component.scss'
})
export class FeatureImageComponent {
  @Input() imageSrc: string = 'assets/images/coding.jpg';
  @Input() alt: string = 'Working on a laptop';
}
