import { OnInit, Injector, OnDestroy } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';
import { BaseResourceModel } from '../../models/base-resource.model';
import { NbSearchService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { SearchLocalStorageHelperService } from '../../services/search-localstorage-helper.service';

import Swal from 'sweetalert2';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit, OnDestroy {
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  resources: T[] = [];


  tempResources: T[] = [];
  searchTerm: string = '';
  table_loaded: boolean = false;
  private searchSubscription: Subscription;
  protected searchService: NbSearchService;
  private searchHelper: SearchLocalStorageHelperService;
  constructor(
    private resourceService: BaseResourceService<T>,
    protected injector: Injector,
  ) {
    this.searchService = this.injector.get(NbSearchService);
    this.searchHelper = this.injector.get(SearchLocalStorageHelperService);
    this.searchSubscription = this.searchService.onSearchSubmit().subscribe(data => {
      this.searchTerm = data.term;
      this.updateFilter(this.searchTerm);
    });

  }

  ngOnInit() {

    this.resourceService.getAll().subscribe(

      res => {
        this.resources = res.sort((a, b) => a.id.localeCompare(b.id));
        this.tempResources = [...this.resources];
        this.table_loaded = true;
      },
      error => {
        if ( error.status === 0) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Acesso não autorizado!',
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Erro ao carregar a lista!',
          });
        }
      },
    );

    this.searchHelper.watchStorage().subscribe(
      () => {
        this.searchTerm = localStorage.getItem('search_term');
        this.updateFilter(this.searchTerm);
      });
  }

  clearSearch() {
    this.resources = this.tempResources;
    this.searchTerm = '';
  }
  updateFilter(term: string) {
    term = term.toLowerCase();

    this.resources = this.tempResources.filter(row => {

      const values: any[] = Object.values(row);

      let resultValidation = false;

      values.forEach(val => {
        if (typeof (val) !== 'undefined' && typeof (val) !== 'object' && val !== null) {
          const validation = val.toString().toLowerCase().indexOf(term) !== -1 || !term;

          if (validation) {
            resultValidation = true;
            return;
          }
        }
      });
      return resultValidation;
    });

  }

  deleteResourceById(id: string): void {
    Swal.fire({
      title: 'Deseja realmente excluir?',
      text: 'Você não poderá reverter isso!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!',
    }).then((result) => {
      if (result.value) {
        const resource = this.resources.find(res => res.id === id);
        this.resourceService.delete(resource.id).subscribe(
          () => this.resources = this.resources.filter(element => element !== resource),
          () => {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Erro ao tentar excluir!',
            });
          },
        );
        Swal.fire(
          'Excluído!',
          'Seu item foi deletado.',
          'success',
        );
      }
    });
  }

  deleteResource(resource: T): void {
    Swal.fire({
      title: 'Deseja realmente excluir?',
      text: 'Você não poderá reverter isso!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!',
    }).then((result) => {
      if (result.value) {
        this.resourceService.delete(resource.id).subscribe(
          () => this.resources = this.resources.filter(element => element !== resource),
          () => alert('Erro ao tentar excluir!'),
        );
        Swal.fire(
          'Excluído!',
          'Seu item foi deletado.',
          'success',
        );
      }
    });
  }
}
