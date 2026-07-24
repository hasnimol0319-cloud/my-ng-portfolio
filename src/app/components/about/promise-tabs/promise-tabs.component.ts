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
      label: 'Architecture',
      eyebrow: 'Architecture',
      heading: 'Architecture before code',
      description:
        'I map data flow, state, and module boundaries before writing a single component so the system scales without a rewrite.',
      image: 'images/Architecture.jpg'
    },
    {
      id: 'journey',
      label: 'Performance',
      eyebrow: 'Performance',
      heading: 'Performance is a feature',
      description:
        "Load time and responsiveness aren't cleanup tasks for later. I budget for them from the first commit.",
      image: 'images/Performance.jpg'
    },
    {
      id: 'values',
      label: 'Clean Code',
      eyebrow: 'Clean Code',
      heading: 'Code someone else can read',
      description:
        "Clean, documented, and consistent because the next person to touch this code might be me, six months from now.",
      image: 'images/clean_code.png'
    }
  ];

  activeIndex = 0;
  replayAnimation = true;

  indicatorWidth = 0;
  indicatorX = 0;

  @ViewChildren('tabBtn') tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  private resizeHandler = () => this.moveIndicator(this.activeIndex);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    // Wait a tick so font/layout is settled before measuring the first tab.
    setTimeout(() => this.moveIndicator(this.activeIndex));
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') {
      return;
    }

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
