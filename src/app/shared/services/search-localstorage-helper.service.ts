import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SearchLocalStorageHelperService {
  private searchTermSub = new Subject<string>();

  public watchStorage(): Observable<any> {
    return this.searchTermSub.asObservable();
  }
  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.searchTermSub.next('changed');
  }
}
