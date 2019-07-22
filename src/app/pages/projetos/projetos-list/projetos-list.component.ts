import { Component, Injector } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';
import { Projeto } from '../shared/projeto.model';
import { ProjetoService } from '../shared/projeto.service';

@Component({
  selector: 'ngx-projetos-list',
  templateUrl: './projetos-list.component.html',
  styleUrls: ['./projetos-list.component.scss'],
})
export class ProjetosListComponent extends BaseResourceListComponent<Projeto> {

  constructor(
    service: ProjetoService,
    injector: Injector,
  ) {
    super(service, injector);
  }

  columns = [
    { prop: 'title', name: 'Titulo', sortable: true },
    { prop: 'icone', name: 'Icone', sortable: false },
    { prop: 'acoes', name: 'acoes', sortable: false },
  ];
}
