import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        title: 'DevHas',
        loadComponent: () => import('../app/components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'about',
        title: 'DevHas | About',
        loadComponent: () => import('../app/components/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'experience',
        title: 'DevHas | Experience',
        loadComponent: () => import('../app/components/experience-company/experience-company.component').then(m => m.ExperienceCompanyComponent)
    },
    {
        path: 'projects',
        title: 'DevHas | Projects',
        loadComponent: () => import('../app/components/projects/projects.component').then(m => m.ProjectsComponent)
    },
    {
        path: 'articles',
        title: 'DevHas | Articles',
        loadComponent: () => import('../app/components/articles/articles.component').then(m => m.ArticlesComponent)
    },
    {
        path: 'contact',
        title: 'DevHas | Contact',
        loadComponent: () => import('../app/components/contact/contact.component').then(m => m.ContactComponent)
    },
    {
        path: 'not-found',
        title: 'DevHas | Not Found',
        loadComponent: () => import('../app/components/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
