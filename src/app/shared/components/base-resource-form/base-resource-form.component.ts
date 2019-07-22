import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';


export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T,
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'novo')
      this.createResource();
    else // currentAction == "edit"
      this.updateResource();
  }


  // PRIVATE METHODS

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'novo')
      this.currentAction = 'novo';
    else
      this.currentAction = 'editar';
  }

  protected loadResource() {
    if (this.currentAction === 'editar') {

      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(params.get('id'))),
      )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource); // binds loaded resource data to resourceForm
          },
          (error) => {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Ocorreu um erro no servidor, tente mais tarde.',
            });
          });
    }
  }


  protected setPageTitle() {
    if (this.currentAction === 'novo')
      this.pageTitle = this.creationPageTitle();
    else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }


  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource)
      .subscribe(
        res => this.actionsForSuccess(res),
        error => this.actionsForError(error),
      );
  }


  protected updateResource() {

    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource)
      .subscribe(
        res => this.actionsForSuccess(res),
        error => this.actionsForError(error),
      );
  }


  protected actionsForSuccess(resource: T) {
    // Swal.fire({
    //   type: 'success',
    //   text: 'Solicitação processada com sucesso!',
    // });

    Swal.fire({
      text: 'Solicitação processada com sucesso!',
      type: 'success',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.value) {
        // location.reload();
      }
    });

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    // redirect/reload component page
    this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
      () => this.router.navigate(['pages', baseComponentPath]),
    );
  }


  protected actionsForError(error) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Ocorreu um erro ao processar a sua solicitação!',
    });

    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
  }


  protected abstract buildResourceForm(): void;
}
