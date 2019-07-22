import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { Projeto } from '../shared/projeto.model';
import { ProjetoService } from '../shared/projeto.service';
import { Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-projetos-form',
  templateUrl: './projetos-form.component.html',
  styleUrls: ['./projetos-form.component.scss'],
})
export class ProjetosFormComponent extends BaseResourceFormComponent<Projeto> {


  show_menu: boolean;

  constructor(
    protected projetoService: ProjetoService,
    protected injector: Injector,
    private _location: Location,
  ) {
    super(injector, new Projeto(), projetoService, Projeto.fromJson);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [Guid.create().toString()],
      title: [null, [Validators.required, Validators.minLength(3)]],
      icon: [null, [Validators.required, Validators.minLength(3)]],
      show_menu: [null],
    });

  }

  protected creationPageTitle(): string {
    return 'Cadastro de novo projeto';
  }

  protected editionPageTitle(): string {
    const projetoTitle = this.resource.title || '';

    return 'Editando Projeto: ' + projetoTitle;
  }

  backClicked() {
    this._location.back();
  }
}
