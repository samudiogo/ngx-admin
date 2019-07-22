import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Projeto extends BaseResourceModel {

  constructor(
    public id?: string,
    public title?: string,
    public icon?: string,
    public show_menu?: boolean,
  ) {
    super();
  }

  static fromJson(jsonData: any): Projeto {
    return Object.assign(new Projeto(), jsonData);
  }

}
