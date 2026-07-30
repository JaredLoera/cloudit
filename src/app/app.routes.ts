import { Routes } from '@angular/router';
import { Landing } from './public/landing/landing';
import { Networks } from './public/networks/networks';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'networks', component: Networks }
];
