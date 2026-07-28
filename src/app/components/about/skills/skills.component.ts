import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

type Category = 'frontend' | 'backend' | 'tools';

interface Skill {
  name: string;
  category: Category;
  pct: number;
  level: string;
  icon: string;    // path to an svg file in /public, e.g. '/images/svg/nodejs.svg'
  color: string;    // ring color
  iconBg: string;   // icon badge background
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit, OnDestroy {

  readonly CIRC = 2 * Math.PI * 50; // circle r=50 -> ~314.159, matches stroke-dasharray in template

  filters: { key: Category | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'tools', label: 'Tools' }
  ];

  activeFilter: Category | 'all' = 'all';

  skills: Skill[] = [
    { name: 'HTML', category: 'frontend', pct: 90, level: '', icon: '/images/svg/html.svg', color: '#ff7a5c', iconBg: '' },
    { name: 'CSS', category: 'frontend', pct: 90, level: '', icon: '/images/svg/css.svg', color: '#1172B8', iconBg: '' },
    { name: 'SCSS', category: 'frontend', pct: 90, level: '', icon: '/images/svg/scss.svg', color: '#CD6799', iconBg: '' },
    { name: 'Angular', category: 'frontend', pct: 75, level: '', icon: '/images/svg/angular.svg', color: '#C3002F', iconBg: '' },
    { name: 'JavaScript', category: 'frontend', pct: 75, level: '', icon: '/images/svg/javascript.svg', color: '#F7DF1E', iconBg: '' },
    { name: 'TypeScript', category: 'frontend', pct: 65, level: '', icon: '/images/svg/typescript.svg', color: '#3178C6', iconBg: '' },
    { name: 'Vue.js', category: 'frontend', pct: 50, level: '', icon: '/images/svg/vue.svg', color: '#41b883', iconBg: '' },
    { name: 'React', category: 'frontend', pct: 50, level: '', icon: '/images/svg/react.svg', color: '#61dafb', iconBg: '' },

    { name: 'Node.js', category: 'backend', pct: 50, level: '', icon: '/images/svg/nodejs.svg', color: '#6bc96b', iconBg: '' },
    { name: 'Express.js', category: 'backend', pct: 40, level: '', icon: '/images/svg/express.svg', color: '#E8D34D', iconBg: '' },
    { name: 'Nest.js', category: 'backend', pct: 60, level: '', icon: '/images/svg/nestjs.svg', color: '#E0234E', iconBg: '' },
    { name: 'Laravel', category: 'backend', pct: 30, level: '', icon: '/images/svg/laravel.svg', color: '#FF2D20', iconBg: '' },
    { name: 'MongoDB', category: 'backend', pct: 50, level: '', icon: '/images/svg/mongo.svg', color: '#439A45', iconBg: '' },
    { name: 'MySQL', category: 'backend', pct: 50, level: '', icon: '/images/svg/mysql.svg', color: '#00758F', iconBg: '' },
    { name: 'PostgreSQL', category: 'backend', pct: 50, level: '', icon: '/images/svg/postgresql.svg', color: '#336791', iconBg: '' },

    { name: 'GitHub', category: 'tools', pct: 80, level: '', icon: '/images/svg/github.svg', color: '#7B2CBF', iconBg: '' },
    { name: 'GitLab', category: 'tools', pct: 70, level: '', icon: '/images/svg/gitlab.svg', color: '#E24329', iconBg: '' },
    { name: 'GitTea', category: 'tools', pct: 85, level: '', icon: '/images/svg/gitea.svg', color: '#609926', iconBg: '' },
    { name: 'Figma', category: 'tools', pct: 50, level: '', icon: '/images/svg/figma.svg', color: '#FF7262', iconBg: '' }
  ];

  // Tracks which cards have scrolled into view, keyed by skill name, so each ring
  // only animates its fill once (and independently of filtering).
  visible = new Set<string>();

  @ViewChildren('cardRef') cardRefs!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.setBgRgbs();
  }

  ngAfterViewInit(): void {
    // IntersectionObserver only exists in the browser — skip entirely during SSR.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = (entry.target as HTMLElement).dataset['name'];
            if (name) {
              this.visible.add(name);
            }
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    this.cardRefs.forEach((ref) => this.observer?.observe(ref.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  setBgRgbs() {
    this.skills = this.skills.map(s => ({ ...s, level: this.getLevel(s.pct), iconBg: this.hexToRgba(s.color) }));

  }

  hexToRgba(hex: string, alpha = 0.14): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  getLevel(pct: number) {
    switch (true) {
      case pct < 50:
        return 'Basic';

      case pct >= 50 && pct <= 60:
        return 'Familiar';

      case pct > 60 && pct < 75:
        return 'Intermediate';

      default:
        return 'Expert';
    }
  }

  setFilter(key: Category | 'all'): void {
    this.activeFilter = key;
  }

  isShown(skill: Skill): boolean {
    return this.activeFilter === 'all' || this.activeFilter === skill.category;
  }

  ringOffset(skill: Skill): number {
    if (!this.visible.has(skill.name)) {
      return this.CIRC;
    }
    return this.CIRC - (skill.pct / 100) * this.CIRC;
  }

  trackByName(_index: number, skill: Skill): string {
    return skill.name;
  }
}