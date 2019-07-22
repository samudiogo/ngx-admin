import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetosRoutingModule } from './projetos-routing.module';
import { ProjetosListComponent } from './projetos-list/projetos-list.component';
import { ProjetosFormComponent } from './projetos-form/projetos-form.component';

import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    ProjetosListComponent,
    ProjetosFormComponent,
  ],
  imports: [
    CommonModule,
    ProjetosRoutingModule,
    SharedModule,
    NgxDatatableModule,
  ],
})
export class ProjetosModule { }
