import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutfullComponent } from './layout/layoutfull/layoutfull.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full',
},
{
  path: '',
  children: [
    {
      path: 'pages',
      component: LayoutfullComponent,
      loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
      
    }
  ]
}


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
