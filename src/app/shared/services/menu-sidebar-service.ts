import { Injectable, Injector } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { MenuSideBarModel } from '../models/menu-sidebar.model';
import { BaseResourceService } from './base-resource.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const env = environment.APIs.Iccm;
export const servicePath = `${env.BasePath}/${env.Menu}`;


@Injectable()
export class MenuSidebarService extends BaseResourceService<MenuSideBarModel> {

  constructor(protected injector: Injector) {
    super(servicePath, injector, MenuSideBarModel.fromJson);
  }
  getById(id: string): Observable<MenuSideBarModel> {
    const url = `${this.apiPath}/${id}/items`;

    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
    );
  }
}
