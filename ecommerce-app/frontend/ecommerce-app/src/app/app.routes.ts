import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./maintenance/maintenance').then(m => m.Maintenance),
}];
