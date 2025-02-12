import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'register',
                title: 'Register',
                loadComponent: () => import('./dashboard/pages/register-user/register-user.component'),
            },
            {
                path: 'blogs',
                title: 'Blogs',
                loadComponent: () => import('./dashboard/pages/blogs/blogs.component'),
            },
            {
                path: 'blog/:id',
                title: 'Blog',
                loadComponent: () => import('./dashboard/pages/blog/blog.component'),
            },
            {
                path: 'favourite-blogs',
                title: 'Favourite Blogs',
                loadComponent: () => import('./dashboard/pages/favourite-blogs/favourite-blogs.component'),
            },
            {
                path: 'contact',
                title: 'Contact',
                loadComponent: () => import('./dashboard/pages/contact/contact.component'),
            },
        ]
    },
    {
        path: '',
        redirectTo: '/dashboard/blogs',
        pathMatch: 'full'
    }
];
