import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () => import('../app/components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('../app/components/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'skill',
        loadComponent: () => import('../app/components/skill/skill.component').then(m => m.SkillComponent)
    },
    {
        path: 'not-found',
        loadComponent: () => import('../app/components/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
