import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackagesComponent } from './pages/packages/packages.component';
import { PackageComponent } from './pages/package/package.component';
import { SearchComponent } from './pages/search/search.component';
import { GuideComponent } from './pages/guide/guide.component';

const routes: Routes = [
  {
    path: 'packages',
    component: PackagesComponent,
  },
  {
    path: 'categories/:category',
    component: PackagesComponent,
  },
  {
    path: 'package/:package',
    component: PackageComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'guide',
    component: GuideComponent,
  },
  { path: 'categories', redirectTo: 'packages', pathMatch: 'full' },
  { path: '**', redirectTo: 'packages', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
