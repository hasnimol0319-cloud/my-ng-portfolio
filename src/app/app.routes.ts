import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('../components/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'not-found',
        loadComponent: () => import('../components/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
