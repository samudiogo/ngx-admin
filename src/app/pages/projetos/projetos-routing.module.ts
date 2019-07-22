import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosListComponent } from './projetos-list/projetos-list.component';
import { ProjetosFormComponent } from './projetos-form/projetos-form.component';

const routes: Routes = [
  { path: '', component: ProjetosListComponent },
  { path: 'novo', component: ProjetosFormComponent },
  { path: ':id/editar', component: ProjetosFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjetosRoutingModule { }
