import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface TabData {
  id: string;
  label: string;
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-promise-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promise-tabs.component.html',
  styleUrls: ['./promise-tabs.component.scss']
})
export class PromiseTabsComponent implements AfterViewInit, OnDestroy {

  tabs: TabData[] = [
    {
      id: 'promise',
      label: 'Our promise',
      eyebrow: 'Our promise',
      heading: 'Reliable software built around real operations.',
      description:
        'We focus on clear delivery, maintainable systems, and solutions that support how teams actually work day to day.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80'
    },
    {
      id: 'journey',
      label: 'Our Journey',
      eyebrow: 'Our journey',
      heading: 'Built from real projects, not a pitch deck.',
      description:
        'Every process we recommend has been tested on an actual deadline, with an actual team, under actual pressure — not designed in a vacuum.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80'
    },
    {
      id: 'values',
      label: 'Our Values',
      eyebrow: 'Our values',
      heading: 'Clarity first, complexity only when it earns its place.',
      description:
        "We'd rather ship something simple that works than something impressive that breaks. Every decision gets weighed against that.",
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80'
    }
  ];

  activeIndex = 0;
  replayAnimation = true;

  indicatorWidth = 0;
  indicatorX = 0;

  @ViewChildren('tabBtn') tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  private resizeHandler = () => this.moveIndicator(this.activeIndex);

  ngAfterViewInit(): void {
    // Wait a tick so font/layout is settled before measuring the first tab.
    setTimeout(() => this.moveIndicator(this.activeIndex));
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
  }

  selectTab(index: number): void {
    if (index === this.activeIndex) {
      // Still replay the enter animation if the same tab is tapped again.
      this.retriggerAnimation();
      return;
    }
    this.activeIndex = index;
    this.moveIndicator(index);
    this.retriggerAnimation();
  }

  private moveIndicator(index: number): void {
    const btnEl = this.tabButtons?.get(index)?.nativeElement;
    if (!btnEl) { return; }
    this.indicatorWidth = btnEl.offsetWidth;
    this.indicatorX = btnEl.offsetLeft;
  }

  private retriggerAnimation(): void {
    // Toggle the animation class off then on so CSS keyframes replay every switch.
    this.replayAnimation = false;
    setTimeout(() => (this.replayAnimation = true));
  }
}
