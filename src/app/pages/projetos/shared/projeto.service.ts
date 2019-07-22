import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IResponse } from '../../../shared/services/alternative-response.interface';

import { Projeto } from './projeto.model';

const env = environment.APIs.IpsenseForms;

export const servicePath = `${env.BasePath}/${env.Projeto}`;

@Injectable({
  providedIn: 'root',
})
export class ProjetoService extends BaseResourceService<Projeto> {

  constructor(protected injector: Injector) {
    super(servicePath, injector, Projeto.fromJson);
  }

  getAll(): Observable<Projeto[]> {
    return this.http.get(this.apiPath).pipe(
      map((res: IResponse) => res.body.Items),
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError),
    );
  }

  getById(id: string): Observable<Projeto> {
    const url = `${this.apiPath}?id=${id}`;

    return this.http.get(url).pipe(
      map((res: IResponse) => res.body.Items[0]),
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
    );
  }

  update(resource: Projeto): Observable<Projeto> {
    const url = `${this.apiPath}?id=${resource.id}`;

    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError),
    );
  }

  delete(id: string): Observable<any> {
    const url = `${this.apiPath}?id=${id}`;

    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError),
    );
  }
}
