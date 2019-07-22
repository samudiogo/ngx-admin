import { BaseResourceModel } from './base-resource.model';

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  icon: string | null;
}

export class MenuSideBarModel extends BaseResourceModel {
  constructor(
    public title?: string,
    public icon?: string,
    public children?: MenuItem[],
  ) {
    super();
  }

  static fromJson(jsonData: any): MenuSideBarModel {
    return Object.assign(new MenuSideBarModel(), jsonData);
  }
}
